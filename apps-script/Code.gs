/**
 * BetAware: registro de partidas en Google Sheets.
 *
 * Va en Extensiones → Apps Script de la planilla y se publica como aplicación web.
 * Paso a paso: docs/registro-google-sheets.md
 */

const HOJA = "eventos";
const COLUMNAS = ["id", "recibido", "fecha", "sesion", "codigo", "evento", "semana", "accion", "valor", "segundos", "billetera", "ahorro", "estudio", "bienestar", "exposicion", "deuda", "detalle", "version"];
const NUMERICAS = ["semana", "valor", "segundos", "billetera", "ahorro", "estudio", "bienestar", "exposicion", "deuda"];
const EVENTOS = ["inicio", "decision", "apuesta", "doble_o_nada", "grupo", "imprevisto", "pago_deuda", "pausa", "memoria", "cierre", "reinicio", "rejuego", "salio", "volvio"];
const MAX_EVENTOS = 100;
const MAX_TEXTO = 500;
const SEGUNDOS_CACHE = 21600; // 6 horas para descartar envíos repetidos

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const cuerpo = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const recibidos = (Array.isArray(cuerpo.eventos) ? cuerpo.eventos : []).slice(0, MAX_EVENTOS).filter(esValido);
    lock.waitLock(20000);
    const cache = CacheService.getScriptCache();
    const vistos = recibidos.length ? cache.getAll(recibidos.map((evento) => evento.id)) : {};
    const nuevos = recibidos.filter((evento) => {
      if (vistos[evento.id]) return false;
      vistos[evento.id] = "1";
      return true;
    });
    if (nuevos.length) {
      const hoja = obtenerHoja();
      const ahora = new Date();
      hoja.getRange(hoja.getLastRow() + 1, 1, nuevos.length, COLUMNAS.length).setValues(nuevos.map((evento) => aFila(evento, ahora)));
      cache.putAll(Object.fromEntries(nuevos.map((evento) => [evento.id, "1"])), SEGUNDOS_CACHE);
    }
    return respuesta({ ok: true, guardados: nuevos.length, repetidos: recibidos.length - nuevos.length });
  } catch (error) {
    return respuesta({ ok: false, error: String(error) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("BetAware: el registro está activo.");
}

/** Ejecutar una vez desde el editor para autorizar el script y ver una fila de prueba. */
function probar() {
  const resultado = doPost({ postData: { contents: JSON.stringify({ eventos: [{ id: "prueba-" + Date.now(), fecha: new Date().toISOString(), sesion: "prueba", codigo: "PRUEBA", evento: "inicio", semana: 1, detalle: { origen: "editor de Apps Script" } }] }) } });
  Logger.log(resultado.getContent());
}

function esValido(evento) {
  return evento && typeof evento.id === "string" && evento.id.length > 0 && evento.id.length <= 64 && EVENTOS.indexOf(evento.evento) !== -1;
}

function aFila(evento, ahora) {
  return COLUMNAS.map((columna) => {
    if (columna === "recibido") return ahora;
    const valor = evento[columna];
    if (valor === undefined || valor === null || valor === "") return "";
    if (columna === "fecha") { const fecha = new Date(valor); return isNaN(fecha.getTime()) ? "" : fecha; }
    if (NUMERICAS.indexOf(columna) !== -1) { const numero = Number(valor); return isFinite(numero) ? numero : ""; }
    return texto(typeof valor === "string" ? valor : JSON.stringify(valor));
  });
}

// Un texto que empieza con =, +, - o @ se guardaría como fórmula.
function texto(valor) {
  const recortado = String(valor).slice(0, MAX_TEXTO);
  return /^[=+\-@]/.test(recortado) ? "'" + recortado : recortado;
}

function obtenerHoja() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = libro.getSheetByName(HOJA) || libro.insertSheet(HOJA);
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(COLUMNAS);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function respuesta(datos) {
  return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(ContentService.MimeType.JSON);
}
