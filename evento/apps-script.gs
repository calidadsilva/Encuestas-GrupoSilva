/**
 * GRUPO SILVA · Ruleta digital con registro de leads (evento 25/11)
 *
 * Este script hace tres cosas:
 *  1. Guarda cada registro en la hoja Leads de la planilla.
 *  2. Sortea el premio en el servidor (con stock) cuando el cliente gira en su celular.
 *  3. Le avisa a la pantalla del stand que hay un giro, para que muestre la misma ruleta en grande.
 *
 * INSTALACIÓN (con la cuenta calidad.gsilva@gmail.com):
 *  1. Pegar este archivo completo en un proyecto de script.google.com.
 *  2. Elegir la función "configurar" en la barra superior y tocar Ejecutar (acepta los permisos).
 *  3. Implementar > Nueva implementación > Aplicación web.
 *     Ejecutar como: Yo. Quién tiene acceso: Cualquier persona.
 *  4. Copiar la URL que termina en /exec y pegarla en config.js (scriptUrl).
 *
 * ANTES DEL EVENTO: ejecutar "limpiarPruebas" para borrar los registros de prueba y reiniciar contadores.
 *
 * PREMIOS: hoja Premios, un bloque por marca. Stock = unidades disponibles. Peso = probabilidad relativa
 * (con 8/8/4, cada 20 giros salen exactamente 8, 8 y 4). Cuando Entregados llega a Stock, ese premio deja de salir.
 * No cambiar los nombres de los premios: tienen que coincidir con los de la ruleta (config.js).
 */

var ID_PLANILLA = '1IWnW34NuQO2y22zRRWc0mpIFVCtSBEqihGaIRWpAUT4';
var HOJA_LEADS = 'Leads', HOJA_PREMIOS = 'Premios';
var MARCAS = ['GWM', 'Changan', 'Triumph', 'Grupo Silva'];
var NO_PREMIO = 'Seguí participando';
var COD_AREA = '381';   // código de área que se agrega cuando el cliente escribe solo 7 dígitos (Tucumán)

var LEAD_MS = 6000;     // cuenta regresiva antes de que arranque el giro
var DUR_MS = 7000;      // duración del giro
var HOLD_MS = 9000;     // tiempo que la pantalla muestra el resultado antes de liberar el turno

var COLS = ['Fecha', 'Código', 'Marca', 'Nombre', 'Teléfono', 'Email', 'Quiere prueba de manejo',
            'Plazo de cambio', 'Premio', 'Entregado', 'Fecha del giro', 'Evento'];
var C = { COD: 2, MARCA: 3, NOM: 4, TEL: 5, MAIL: 6, PRUEBA: 7, PLAZO: 8, PREMIO: 9, ENTREG: 10, GIRO: 11, EVENTO: 12 };

function ss_() { return SpreadsheetApp.openById(ID_PLANILLA); }

/* ---------- Preparación de la planilla ---------- */

function configurar() {
  var ss = ss_();
  var l = ss.getSheetByName(HOJA_LEADS) || ss.insertSheet(HOJA_LEADS);
  var enc = l.getLastRow() ? l.getRange(1, 1, 1, COLS.length).getValues()[0] : [];
  if (enc.join('|') !== COLS.join('|') && l.getLastRow() <= 1) {
    l.getRange(1, 1, 1, COLS.length).setValues([COLS]);
    l.setFrozenRows(1);
    l.getRange(1, 1, 1, COLS.length).setFontWeight('bold').setBackground('#232c5a').setFontColor('#ffffff');
    l.getRange('E:E').setNumberFormat('@');
    l.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm');
    l.getRange('K:K').setNumberFormat('dd/mm/yyyy hh:mm');
    l.setColumnWidth(4, 180); l.setColumnWidth(5, 130); l.setColumnWidth(6, 220);
  }
  var p = ss.getSheetByName(HOJA_PREMIOS) || ss.insertSheet(HOJA_PREMIOS);
  if (p.getLastRow() === 0) {
    var filas = [['Marca', 'Premio', 'Stock', 'Peso', 'Entregados']];
    MARCAS.forEach(function (m) {
      filas.push([m, 'Abanico', 100, 5, 0], [m, 'Gorra', 50, 2, 0], [m, NO_PREMIO, 99999, 3, 0]);
    });
    p.getRange(1, 1, filas.length, 5).setValues(filas);
    p.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#232c5a').setFontColor('#ffffff');
    p.setFrozenRows(1);
    p.getRange('G1').setValue('Cargar el stock real de cada marca. Peso = probabilidad relativa. No cambiar los nombres de los premios.');
  }
  var h = ss.getSheetByName('Hoja 1');
  if (h && ss.getSheets().length > 1 && h.getLastRow() === 0) ss.deleteSheet(h);
}

/** Borra los registros de prueba y reinicia contadores, cola y stock entregado. */
function limpiarPruebas() {
  var ss = ss_(), sh = ss.getSheetByName(HOJA_LEADS);
  if (sh.getLastRow() > 1) sh.deleteRows(2, sh.getLastRow() - 1);
  var p = ss.getSheetByName(HOJA_PREMIOS);
  if (p.getLastRow() > 1) p.getRange(2, 5, p.getLastRow() - 1, 1).setValue(0);
  PropertiesService.getScriptProperties().deleteAllProperties();
  var c = CacheService.getScriptCache();
  MARCAS.forEach(function (m) { c.removeAll(['n_' + m, 'q_' + m, 'b_' + m, 'w_' + m]); });
}

/* ---------- Entrada web ---------- */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d = JSON.parse(e.postData.contents);
    lock.waitLock(25000);
    if (d.accion === 'registro') return json(registrar(d));
    if (d.accion === 'girar') return json(girar(d));
    return json({ ok: false, error: 'accion' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

/** La pantalla del stand consulta acá cada segundo. Solo lee la memoria rápida y no devuelve datos personales. */
function doGet(e) {
  var p = (e && e.parameter) || {}, marca = String(p.marca || '');
  var cache = CacheService.getScriptCache();
  var total = cache.get('n_' + marca);
  if (total === null) { total = contar(marca); cache.put('n_' + marca, String(total), 21600); }
  var bien = null, gan = [];
  try { bien = JSON.parse(cache.get('b_' + marca) || 'null'); } catch (x) {}
  try { gan = JSON.parse(cache.get('w_' + marca) || '[]'); } catch (x) {}
  return json({ ok: true, total: Number(total), cola: leerCola(cache, marca, Date.now()), bien: bien, gan: gan, ahora: Date.now() });
}

/* ---------- Registro ---------- */

function registrar(d) {
  var ss = ss_(), sh = ss.getSheetByName(HOJA_LEADS);
  var marca = limpio(d.marca, 20), nombre = limpio(d.nombre, 80), email = limpio(d.email, 120).toLowerCase();
  var tel = normTel(d.telefono);
  if (MARCAS.indexOf(marca) < 0 || nombre.length < 3 || !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(email) || !tel) {
    return { ok: false, error: 'datos' };
  }
  var n = sh.getLastRow() - 1;
  if (n > 0) {
    var filas = sh.getRange(2, 1, n, COLS.length).getValues();
    for (var i = 0; i < filas.length; i++) {
      var f = filas[i];
      if (f[C.MARCA - 1] === marca && String(f[C.TEL - 1]).replace(/\D/g, '') === tel) {
        return { ok: true, codigo: f[C.COD - 1], nombre: f[C.NOM - 1], premio: f[C.PREMIO - 1] || '', ya: !!f[C.PREMIO - 1], ahora: Date.now() };
      }
    }
  }
  var codigo = siguienteCodigo(marca);
  sh.appendRow([new Date(), codigo, marca, nombre, tel, email, d.prueba === 'Sí' ? 'Sí' : 'No',
                limpio(d.plazo, 40), '', false, '', limpio(d.evento, 60)]);
  sh.getRange(sh.getLastRow(), C.ENTREG).insertCheckboxes();
  sumarContador(marca);
  CacheService.getScriptCache().put('b_' + marca, JSON.stringify({ id: codigo, n: nombreCorto(nombre), t: Date.now() }), 600);
  return { ok: true, codigo: codigo, nombre: nombre, premio: '', ya: false, ahora: Date.now() };
}

/* ---------- Giro ---------- */

function girar(d) {
  var ss = ss_(), sh = ss.getSheetByName(HOJA_LEADS);
  var fila = buscarFila(sh, String(d.codigo || ''));
  if (!fila) return { ok: false, error: 'codigo' };
  var row = sh.getRange(fila, 1, 1, COLS.length).getValues()[0];
  var marca = row[C.MARCA - 1], cache = CacheService.getScriptCache();

  if (row[C.PREMIO - 1]) {
    // Ya giró. Si el giro es reciente (reintento por mala señal) se devuelve el mismo evento para que se vea igual.
    var previo = leerCola(cache, marca, Date.now()).filter(function (ev) { return ev.cod === d.codigo; })[0];
    if (previo) return respuestaGiro(previo, true);
    return { ok: true, ya: true, premio: row[C.PREMIO - 1], ahora: Date.now() };
  }

  var premio = sortear(ss, marca);
  sh.getRange(fila, C.PREMIO).setValue(premio);
  sh.getRange(fila, C.GIRO).setValue(new Date());

  var ahora = Date.now();
  var cola = leerCola(cache, marca, ahora);
  var inicio = ahora + LEAD_MS;
  cola.forEach(function (ev) { inicio = Math.max(inicio, ev.inicio + ev.dur + ev.hold); });
  var ev = {
    id: Utilities.getUuid().slice(0, 8), cod: d.codigo, nombre: nombreCorto(row[C.NOM - 1]), premio: premio,
    r1: Math.random(), r2: Math.random(), inicio: inicio, dur: DUR_MS, hold: HOLD_MS
  };
  cola.push(ev);
  cache.put('q_' + marca, JSON.stringify(cola), 600);
  if (premio !== NO_PREMIO) {
    var gan = [];
    try { gan = JSON.parse(cache.get('w_' + marca) || '[]'); } catch (x) {}
    gan.unshift({ n: ev.nombre, p: premio, f: inicio + DUR_MS });
    cache.put('w_' + marca, JSON.stringify(gan.slice(0, 10)), 21600);
  }
  return respuestaGiro(ev, false);
}

function respuestaGiro(ev, ya) {
  return { ok: true, ya: ya, id: ev.id, premio: ev.premio, r1: ev.r1, r2: ev.r2, inicio: ev.inicio, dur: ev.dur, hold: ev.hold, ahora: Date.now() };
}

/* Sorteo con "bolsa": se arma una bolsa con tantos boletos por premio como su Peso (8 Abanico, 8 Gorra,
   4 La suerte sigue girando = 20 boletos), se mezcla y se saca de a uno. Así cada 20 giros salen exactamente
   8 abanicos, 8 gorras y 4 "la suerte sigue girando", en orden al azar. Si se cambian los pesos o se agota
   un premio, la bolsa se rearma sola. */
function sortear(ss, marca) {
  var sh = ss.getSheetByName(HOJA_PREMIOS), n = sh.getLastRow() - 1;
  if (n < 1) return NO_PREMIO;
  var filas = sh.getRange(2, 1, n, 5).getValues(), disp = {}, firma = [];
  filas.forEach(function (r, i) {
    var nom = String(r[1]).trim(), stock = Number(r[2]) || 0, peso = Math.round(Number(r[3]) || 0), ent = Number(r[4]) || 0;
    if (String(r[0]).trim().toLowerCase() !== marca.toLowerCase() || !nom || peso <= 0) return;
    if (nom !== NO_PREMIO && ent >= stock) return;
    disp[nom] = { fila: i + 2, peso: Math.min(peso, 100), ent: ent };
    firma.push(nom + ':' + disp[nom].peso);
  });
  if (!firma.length) return NO_PREMIO;
  firma = firma.join('|');
  var props = PropertiesService.getScriptProperties(), key = 'bolsa_' + marca.toLowerCase().replace(/[^a-z0-9]/g, ''), bolsa = null;
  try { bolsa = JSON.parse(props.getProperty(key) || 'null'); } catch (x) {}
  if (!bolsa || bolsa.firma !== firma) bolsa = { firma: firma, b: [] };
  var elegido = null;
  while (!elegido) {
    if (!bolsa.b.length) bolsa.b = armarBolsa(disp);
    var nom = bolsa.b.pop();
    if (disp[nom]) elegido = nom;            /* si ese premio se agotó, se saltea el boleto */
  }
  props.setProperty(key, JSON.stringify(bolsa));
  if (elegido !== NO_PREMIO) sh.getRange(disp[elegido].fila, 5).setValue(disp[elegido].ent + 1);
  return elegido;
}

function armarBolsa(disp) {
  var b = [];
  Object.keys(disp).forEach(function (nom) { for (var i = 0; i < disp[nom].peso; i++) b.push(nom); });
  for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; }
  return b;
}

/* ---------- Utilidades ---------- */

function leerCola(cache, marca, ahora) {
  var q;
  try { q = JSON.parse(cache.get('q_' + marca) || '[]'); } catch (e) { q = []; }
  return q.filter(function (ev) { return ev.inicio + ev.dur + ev.hold > ahora - 30000; });
}

function buscarFila(sh, codigo) {
  var n = sh.getLastRow() - 1;
  if (n < 1 || !codigo) return 0;
  var cods = sh.getRange(2, C.COD, n, 1).getValues();
  for (var i = cods.length - 1; i >= 0; i--) if (cods[i][0] === codigo) return i + 2;
  return 0;
}

function contar(marca) {
  var sh = ss_().getSheetByName(HOJA_LEADS), n = sh.getLastRow() - 1, t = 0;
  if (n > 0) sh.getRange(2, C.MARCA, n, 1).getValues().forEach(function (r) { if (r[0] === marca) t++; });
  return t;
}

function sumarContador(marca) {
  var c = CacheService.getScriptCache(), v = c.get('n_' + marca);
  if (v !== null) c.put('n_' + marca, String(Number(v) + 1), 21600);
}

function siguienteCodigo(marca) {
  var p = PropertiesService.getScriptProperties(), k = 'seq_' + marca;
  var n = Number(p.getProperty(k) || 0) + 1;
  p.setProperty(k, String(n));
  return marca.slice(0, 3).toUpperCase() + '-' + ('0000' + n).slice(-Math.max(4, String(n).length));
}

/** Acepta el celular con o sin código de área, con 0, 15, +54 o 9. Devuelve 10 dígitos o '' si no es válido. */
function normTel(raw) {
  var d = String(raw || '').replace(/\D/g, '');
  if (d.indexOf('54') === 0 && d.length >= 12) d = d.slice(2);
  if (d.charAt(0) === '9' && d.length === 11) d = d.slice(1);
  if (d.charAt(0) === '0') d = d.slice(1);
  if (d.length === 12 && d.substr(3, 2) === '15') d = d.slice(0, 3) + d.slice(5);
  else if (d.length === 12 && d.substr(2, 2) === '15') d = d.slice(0, 2) + d.slice(4);
  if (d.length === 9 && d.indexOf('15') === 0) d = d.slice(2);
  if (d.length === 7) d = COD_AREA + d;
  return d.length === 10 ? d : '';
}

function nombreCorto(n) {
  var p = String(n).trim().split(/\s+/);
  var cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); };
  return p.length > 1 ? cap(p[0]) + ' ' + p[p.length - 1].charAt(0).toUpperCase() + '.' : cap(p[0]);
}

// Recorta y evita que un texto se interprete como fórmula en la planilla.
function limpio(v, max) {
  var s = String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
