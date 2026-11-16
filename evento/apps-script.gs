/**
 * GRUPO SILVA · Registro de leads por QR con ruleta
 *
 * INSTALACIÓN (una sola vez, con la cuenta calidad.gsilva@gmail.com):
 * 1. Crear una planilla nueva en Google Sheets (ej. "Leads Evento 25-11").
 * 2. Extensiones > Apps Script. Borrar lo que haya y pegar este archivo completo.
 * 3. Elegir la función "configurar" en la barra superior y tocar Ejecutar. Aceptar los permisos.
 *    Se crean las hojas Leads, Premios y Config.
 * 4. Implementar > Nueva implementación > Aplicación web.
 *    Ejecutar como: Yo. Quién tiene acceso: Cualquier persona.
 * 5. Copiar la URL que termina en /exec y pegarla en config.js (scriptUrl).
 *
 * RULETA FÍSICA O DIGITAL: se cambia en la hoja Config, celda B1 (fisica / digital).
 * No hace falta volver a implementar ni cambiar los QR.
 *
 * Cada marca tiene su página, su QR y sus premios. Todos los leads caen en la hoja Leads,
 * con la columna Marca para filtrar. Una misma persona puede jugar una vez en cada stand.
 *
 * PREMIOS (solo ruleta digital): hoja Premios, con el stock de cada stand por separado.
 * Los valores que carga "configurar" son de ejemplo. El "Peso" define la probabilidad
 * (peso 3 sale el triple que peso 1). Cuando Entregados llega a Stock, ese premio deja de salir.
 */

var HOJA_LEADS = 'Leads', HOJA_PREMIOS = 'Premios', HOJA_CONFIG = 'Config';
var COLS = ['Fecha', 'Código', 'Marca', 'Nombre', 'Teléfono', 'Email', 'Quiere prueba de manejo',
            'Plazo de cambio', 'Aciertos trivia', 'Premio', 'Ruleta', 'Evento'];

function configurar() {
  var ss = SpreadsheetApp.getActive();
  var l = ss.getSheetByName(HOJA_LEADS) || ss.insertSheet(HOJA_LEADS);
  if (l.getLastRow() === 0) {
    l.appendRow(COLS); l.setFrozenRows(1);
    l.getRange(1, 1, 1, COLS.length).setFontWeight('bold').setBackground('#232c5a').setFontColor('#ffffff');
    l.getRange('E:E').setNumberFormat('@');
  }
  var p = ss.getSheetByName(HOJA_PREMIOS) || ss.insertSheet(HOJA_PREMIOS);
  if (p.getLastRow() === 0) {
    var filas = [['Marca', 'Premio', 'Stock', 'Peso', 'Entregados']];
    ['GWM', 'Changan', 'Triumph'].forEach(function (m) {
      filas.push([m, 'Gorra', 10, 1, 0], [m, 'Llavero', 50, 4, 0], [m, 'Botella', 15, 1, 0], [m, 'Lapicera', 70, 5, 0]);
    });
    p.getRange(1, 1, filas.length, 5).setValues(filas);
    p.getRange(1, 1, 1, 5).setFontWeight('bold'); p.setFrozenRows(1);
  }
  var c = ss.getSheetByName(HOJA_CONFIG) || ss.insertSheet(HOJA_CONFIG);
  if (c.getLastRow() === 0) {
    c.getRange(1, 1, 1, 3).setValues([['Ruleta', 'fisica', 'Escribir fisica o digital']]);
    c.getRange('A1').setFontWeight('bold');
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d = JSON.parse(e.postData.contents);
    lock.waitLock(20000);
    if (d.accion === 'registro') return json(registrar(d));
    if (d.accion === 'trivia') return json(guardarTrivia(d));
    return json({ ok: false, error: 'accion' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

// Conteo para la pantalla del stand. No devuelve datos personales.
function doGet(e) {
  var sh = SpreadsheetApp.getActive().getSheetByName(HOJA_LEADS);
  var n = Math.max(sh.getLastRow() - 1, 0), por = {};
  if (n > 0) sh.getRange(2, 3, n, 1).getValues().forEach(function (r) { por[r[0]] = (por[r[0]] || 0) + 1; });
  var m = e && e.parameter && e.parameter.marca;
  return json({ ok: true, total: m ? (por[m] || 0) : n, porMarca: por });
}

function registrar(d) {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(HOJA_LEADS);
  var modo = String(ss.getSheetByName(HOJA_CONFIG).getRange('B1').getValue()).toLowerCase().trim() === 'digital' ? 'digital' : 'fisica';
  var tel = String(d.telefono || '').replace(/\D/g, '').slice(-10);
  var nombre = limpio(d.nombre, 80), email = limpio(d.email, 120).toLowerCase(), marca = limpio(d.marca, 20);
  if (tel.length !== 10 || nombre.length < 3 || email.indexOf('@') < 1 || !marca) return { ok: false, error: 'datos' };

  var premios = listaPremios(ss, marca);
  var nombres = premios.map(function (p) { return p.nombre; });
  var n = sh.getLastRow() - 1;
  if (n > 0) {
    var filas = sh.getRange(2, 1, n, COLS.length).getValues();
    for (var i = 0; i < filas.length; i++) {
      if (String(filas[i][4]).replace(/\D/g, '').slice(-10) === tel && String(filas[i][2]) === marca) {
        return { ok: true, duplicado: true, modo: modo, codigo: filas[i][1], premio: filas[i][9], premios: nombres };
      }
    }
  }
  var premio = modo === 'digital' ? sortear(ss, premios) : '';
  var codigo = marca.slice(0, 3).toUpperCase() + '-' + ('0000' + (n + 1)).slice(-4);
  sh.appendRow([new Date(), codigo, marca, nombre, "'" + tel, email, d.prueba === 'Sí' ? 'Sí' : 'No',
                limpio(d.plazo, 40), '', premio, modo, limpio(d.evento, 60)]);
  return { ok: true, duplicado: false, modo: modo, codigo: codigo, premio: premio, premios: nombres };
}

function guardarTrivia(d) {
  var sh = SpreadsheetApp.getActive().getSheetByName(HOJA_LEADS), n = sh.getLastRow() - 1;
  if (n < 1) return { ok: true };
  var cods = sh.getRange(2, 2, n, 1).getValues();
  for (var i = cods.length - 1; i >= 0; i--) {
    if (cods[i][0] === d.codigo) { sh.getRange(i + 2, 9).setValue(Math.max(0, Math.min(9, Number(d.aciertos) || 0))); break; }
  }
  return { ok: true };
}

function listaPremios(ss, marca) {
  var sh = ss.getSheetByName(HOJA_PREMIOS), n = sh.getLastRow() - 1;
  if (n < 1) return [];
  return sh.getRange(2, 1, n, 5).getValues().map(function (r, i) {
    return { fila: i + 2, marca: String(r[0]).trim(), nombre: String(r[1]).trim(), stock: Number(r[2]) || 0, peso: Number(r[3]) || 0, entregados: Number(r[4]) || 0 };
  }).filter(function (p) { return p.nombre && p.marca.toLowerCase() === String(marca).toLowerCase(); });
}

function sortear(ss, premios) {
  var disp = premios.filter(function (p) { return p.peso > 0 && p.entregados < p.stock; });
  var total = disp.reduce(function (s, p) { return s + p.peso; }, 0);
  if (!total) return '';
  var x = Math.random() * total;
  for (var i = 0; i < disp.length; i++) {
    x -= disp[i].peso;
    if (x < 0 || i === disp.length - 1) {
      ss.getSheetByName(HOJA_PREMIOS).getRange(disp[i].fila, 5).setValue(disp[i].entregados + 1);
      return disp[i].nombre;
    }
  }
  return '';
}

// Recorta y evita que un texto se interprete como fórmula en la planilla.
function limpio(v, max) {
  var s = String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
