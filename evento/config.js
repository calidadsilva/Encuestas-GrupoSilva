// Configuración compartida por index.html y pantalla.html.
// Pegá entre las comillas la URL de la aplicación web de Apps Script (termina en /exec).
// Mientras scriptUrl esté vacío, la página funciona en MODO PRUEBA y no guarda datos.
window.EVENTO_CONFIG = {
  scriptUrl: 'https://script.google.com/macros/s/AKfycbxHbO_k-lZ-MIRF0bS9OtF2fABzP714zjP3Z6T_Y78c3bVGdSPLloh1tw771tEcZGts/exec',
  evento: 'Evento 25/11',
  // Segmentos de la ruleta (de arriba, en sentido horario). Deben coincidir con los premios de la hoja "Premios".
  segmentosReposo: ['GWM', 'Changan', 'JMEV', 'Triumph', 'Benelli', 'Morbidelli'],
  segmentos: ['Abanico', 'La suerte sigue girando!', 'Gorra', 'Abanico', 'La suerte sigue girando!', 'Gorra'],
  // Usuario de Instagram que aparece en la foto con marco y en el texto al compartir (ej.: '@gruposilva'). Vacío = no se muestra.
  instagram: '@gwmgruposilva'
};
