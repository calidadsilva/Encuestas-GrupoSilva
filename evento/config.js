// Configuración compartida por index.html y pantalla.html.
// Pegá entre las comillas la URL de la aplicación web de Apps Script (termina en /exec).
// Mientras scriptUrl esté vacío, la página funciona en MODO PRUEBA y no guarda datos.
window.EVENTO_CONFIG = {
  scriptUrl: '',
  evento: 'Evento 25/11',
  // Segmentos de la ruleta (de arriba, en sentido horario). Deben coincidir con los premios de la hoja "Premios".
  segmentos: ['Abanico', 'Seguí participando', 'Gorra', 'Abanico', 'Seguí participando', 'Gorra']
};
