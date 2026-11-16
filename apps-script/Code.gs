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
      const fila = hoja.getLastRow() + 1;
      hoja.getRange(fila, 1, nuevos.length, COLUMNAS.length).setValues(nuevos.map((evento) => aFila(evento, ahora)));
      hoja.getRange(fila, 2, nuevos.length, 2).setNumberFormat("dd/mm/yyyy hh:mm:ss"); // recibido y fecha, con hora
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

// ---------------------------------------------------------------------------
// Resumen para el análisis: menú BetAware → Actualizar resumen.
// Arma las pestañas "partidas" (una fila por partida) e "indicadores" (por eje de la matriz).
// Guía de lectura: docs/interpretacion-metricas.md
// ---------------------------------------------------------------------------

const SOLO_CON_CODIGO = true; // true: solo partidas con código de participante, es decir, las del piloto
const COSTO_META = { match: 800, sneakers: 1200, trip: 2000 };
const NOMBRE_META = { match: "cancha", sneakers: "zapatillas", trip: "viaje" };
const SEGUNDOS_RAPIDA = 1; // una decisión en menos de 1 segundo cuenta como "sin deliberar"

const COLUMNAS_PARTIDAS = [
  ["codigo", "Código"], ["inicio", "Inicio"], ["dispositivo", "Dispositivo"], ["meta", "Meta"],
  ["termino", "Terminó"], ["semanaFinal", "Última semana"], ["minutos", "Minutos"], ["partidaDelCodigo", "Partida n.º"],
  ["clases", "Clases"], ["ahorrar", "Ahorrar"], ["apoyo", "Apoyo"], ["apostar", "Apostar"],
  ["segDecision", "Seg. por decisión (mediana)"], ["decisionesRapidas", "Decisiones < 1 s"],
  ["apuestasPartido", "Apuestas al partido"], ["ganadasPartido", "Ganadas al partido"], ["casiGano", "Casi gano vistos"],
  ["ofertas", "Ofertas doble o nada"], ["acepto", "Aceptó"], ["cerro", "Cerró"], ["separo", "Separó $150"], ["vencio", "Dejó vencer"], ["segAcepto", "Seg. para aceptar (mediana)"],
  ["ofertasCasi", "Ofertas tras casi gano"], ["aceptadasCasi", "Aceptadas tras casi gano"], ["ofertasComun", "Ofertas tras pérdida común"], ["aceptadasComun", "Aceptadas tras pérdida común"],
  ["mensajes", "Mensajes del grupo"], ["meprendo", "Me prendo"],
  ["impAhorro", "Imprevisto: ahorro"], ["impBilletera", "Imprevisto: billetera"], ["impPrestado", "Imprevisto: prestado"],
  ["pausas", "Pausas"], ["pausasAntes", "Pausas cerradas antes"], ["segPausa", "Seg. por pausa (mediana)"],
  ["apuestasTotales", "Apuestas totales"], ["ganadasTotales", "Ganadas totales"], ["creia", "Creía haber ganado"], ["diferenciaMemoria", "Creía − ganadas"],
  ["apostado", "Apostado"], ["cobrado", "Cobrado"], ["neto", "Neto"], ["esperado", "Esperado"],
  ["ahorroFinal", "Ahorro final"], ["llegoMeta", "Llegó a la meta"], ["metaPerdida", "% de la meta perdido apostando"],
  ["rejugo", "Volvió a jugar"], ["salidas", "Salidas de la pestaña"], ["sesion", "Sesión"],
];

function onOpen() {
  SpreadsheetApp.getUi().createMenu("BetAware").addItem("Actualizar resumen", "actualizarResumen").addToUi();
}

function actualizarResumen() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = libro.getSheetByName(HOJA);
  const valores = hoja ? hoja.getDataRange().getValues() : [];
  const columna = {};
  (valores[0] || []).forEach((nombre, indice) => { columna[nombre] = indice; });
  const eventos = valores.slice(1).map((fila) => leerEvento(fila, columna)).filter(esDelPiloto);
  const partidas = resumirPartidas(eventos);
  escribirHoja(libro, "partidas", COLUMNAS_PARTIDAS.map((par) => par[1]), partidas.map((partida) => COLUMNAS_PARTIDAS.map((par) => valorDeCelda(partida[par[0]]))));
  escribirHoja(libro, "indicadores", ["Eje", "Indicador", "Valor", "Meta", "Cómo leerlo"], calcularIndicadores(partidas));
}

function leerEvento(fila, columna) {
  const campo = (nombre) => (columna[nombre] === undefined ? "" : fila[columna[nombre]]);
  let detalle = {};
  try { detalle = campo("detalle") ? JSON.parse(campo("detalle")) : {}; } catch (error) { detalle = {}; }
  const fecha = campo("fecha") instanceof Date ? campo("fecha") : new Date(campo("fecha"));
  return { sesion: String(campo("sesion")), codigo: String(campo("codigo")).trim(), evento: campo("evento"), semana: numero(campo("semana")), accion: campo("accion"), valor: numero(campo("valor")), segundos: numero(campo("segundos")), ahorro: numero(campo("ahorro")), fecha, detalle };
}

function esDelPiloto(evento) {
  if (evento.codigo === "PRUEBA" || evento.sesion.indexOf("prueba") === 0) return false;
  return !SOLO_CON_CODIGO || evento.codigo !== "";
}

function resumirPartidas(eventos) {
  const porSesion = {};
  eventos.forEach((evento) => { (porSesion[evento.sesion] = porSesion[evento.sesion] || []).push(evento); });
  const partidas = Object.keys(porSesion)
    .map((sesion) => porSesion[sesion].sort((a, b) => a.fecha - b.fecha))
    .filter((lista) => lista.some((evento) => evento.evento === "inicio"))
    .map(resumirPartida)
    .sort((a, b) => a.inicio - b.inicio);
  const vistas = {};
  partidas.forEach((partida) => { vistas[partida.codigo] = (vistas[partida.codigo] || 0) + 1; partida.partidaDelCodigo = vistas[partida.codigo]; });
  return partidas;
}

function resumirPartida(eventos) {
  const de = (tipo, accion) => eventos.filter((evento) => evento.evento === tipo && (accion === undefined || evento.accion === accion));
  const inicio = de("inicio")[0], cierre = de("cierre")[0], memoria = de("memoria")[0];
  const decisiones = de("decision"), apuestas = de("apuesta"), partido = de("apuesta", "partido"), ofertas = de("doble_o_nada"), pausas = de("pausa");
  let ofertasCasi = 0, aceptadasCasi = 0, ofertasComun = 0, aceptadasComun = 0, perdida = null;
  eventos.forEach((evento) => {
    if (evento.evento === "apuesta" && evento.accion === "partido") perdida = evento.valor < 0 ? evento : null;
    if (evento.evento === "doble_o_nada" && perdida) {
      const acepto = evento.accion === "acepto" ? 1 : 0;
      if (perdida.detalle.casiGano) { ofertasCasi++; aceptadasCasi += acepto; } else { ofertasComun++; aceptadasComun += acepto; }
      perdida = null;
    }
  });
  const neto = cierre ? cierre.valor : suma(apuestas.map((evento) => evento.valor));
  const ultimo = eventos[eventos.length - 1];
  const creia = memoria && memoria.accion === "respondio" ? memoria.valor : "";
  const ganadasTotales = apuestas.filter((evento) => evento.valor > 0).length;
  return {
    sesion: inicio.sesion, codigo: inicio.codigo, inicio: inicio.fecha, dispositivo: inicio.detalle.dispositivo || "", meta: inicio.accion,
    termino: Boolean(cierre), semanaFinal: Math.max.apply(null, eventos.map((evento) => evento.semana || 0)), minutos: redondear((ultimo.fecha - inicio.fecha) / 60000, 1),
    clases: de("decision", "clases").length, ahorrar: de("decision", "ahorrar").length, apoyo: de("decision", "apoyo").length, apostar: de("decision", "apostar").length,
    decisiones: decisiones.length, segDecision: mediana(decisiones.map((evento) => evento.segundos)), decisionesRapidas: decisiones.filter((evento) => evento.segundos < SEGUNDOS_RAPIDA).length,
    apuestasPartido: partido.length, ganadasPartido: partido.filter((evento) => evento.valor > 0).length, casiGano: partido.filter((evento) => evento.detalle.casiGano).length,
    ofertas: ofertas.length, acepto: de("doble_o_nada", "acepto").length, cerro: de("doble_o_nada", "cerro").length, separo: de("doble_o_nada", "separo").length, vencio: de("doble_o_nada", "vencio").length,
    segAcepto: mediana(de("doble_o_nada", "acepto").map((evento) => evento.segundos)),
    ofertasCasi, aceptadasCasi, ofertasComun, aceptadasComun,
    mensajes: de("grupo").length, meprendo: de("grupo", "me_prendo").length,
    impAhorro: de("imprevisto", "ahorro").length, impBilletera: de("imprevisto", "billetera").length, impPrestado: de("imprevisto", "prestado").length,
    pausas: pausas.length, pausasAntes: de("pausa", "siguio_antes").length, segPausa: mediana(pausas.map((evento) => evento.segundos)),
    apuestasTotales: apuestas.length, ganadasTotales, creia, diferenciaMemoria: creia === "" || !memoria ? "" : creia - ganadasTotales,
    apostado: cierre ? cierre.detalle.apostado : "", cobrado: cierre ? cierre.detalle.cobrado : "", neto: apuestas.length ? neto : 0, esperado: cierre ? cierre.detalle.esperado : partido.length * -105,
    ahorroFinal: ultimo.ahorro, llegoMeta: cierre ? Boolean(cierre.detalle.llegoALaMeta) : "",
    metaPerdida: neto < 0 && COSTO_META[inicio.accion] ? Math.round(-neto / COSTO_META[inicio.accion] * 100) : 0,
    rejugo: de("rejuego").length > 0, salidas: de("salio").length,
  };
}

function calcularIndicadores(partidas) {
  const todas = partidas.length, terminadas = partidas.filter((partida) => partida.termino);
  const codigos = {}; partidas.forEach((partida) => { codigos[partida.codigo] = true; });
  const filas = [
    ["Datos", "Partidas analizadas", String(todas), "", SOLO_CON_CODIGO ? "Solo partidas con código de participante. Se excluyen las de prueba." : "Todas las partidas, con y sin código. Se excluyen las de prueba."],
    ["Datos", "Participantes (códigos distintos)", String(Object.keys(codigos).length), "15 a 20", "Muestra prevista en el informe para el piloto."],
    ["Datos", "Actualizado", Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm"), "", ""],
  ];
  if (!todas) return filas.concat([["Datos", "Sin partidas", "—", "", "Todavía no hay partidas del piloto para analizar."]]);

  const decisiones = suma(partidas.map((partida) => partida.decisiones));
  const acciones = [["clases", "Clases particulares"], ["ahorrar", "Ahorrar"], ["apoyo", "Pedir apoyo"], ["apostar", "Apostar"]].map((par) => [par[1], suma(partidas.map((partida) => partida[par[0]]))]).sort((a, b) => b[1] - a[1]);
  const abandonos = partidas.filter((partida) => !partida.termino).map((partida) => partida.semanaFinal);
  const conMemoria = terminadas.filter((partida) => partida.diferenciaMemoria !== "");
  const perdieron = terminadas.filter((partida) => partida.neto < 0);
  const segundas = segundasPartidas(partidas);
  const todasLas = (campo) => suma(partidas.map((partida) => partida[campo]));
  const participantes = agruparPorCodigo(partidas), codigosConOfertas = participantes.filter((lista) => lista.some((partida) => partida.ofertas > 0));

  return filas.concat([
    ["Usabilidad y flujo (OE 3)", "Partidas terminadas", proporcion(terminadas.length, todas), "80%", "Matriz: completa las 12 semanas. Que lo haga \"sin ayuda\" se registra con la observación."],
    ["Usabilidad y flujo (OE 3)", "Duración de una partida terminada (mediana)", valorONada(mediana(terminadas.map((partida) => partida.minutos)), " min"), "", "Sirve para planificar la sesión del piloto."],
    ["Usabilidad y flujo (OE 3)", "Semana en la que más se abandona", abandonos.length ? "Semana " + moda(abandonos) + " (" + abandonos.length + (abandonos.length === 1 ? " abandono en total)" : " abandonos en total)") : "Sin abandonos", "", "Cruzar con las notas de observación de esa semana: aburrimiento, sobrecarga o un texto que no se entiende."],
    ["Usabilidad y flujo (OE 3)", "Decisiones en menos de 1 segundo", proporcion(todasLas("decisionesRapidas"), decisiones), "", "Si es alto, el jugador repite sin deliberar: falta variación (matriz, \"Criterios comunes\")."],
    ["Usabilidad y flujo (OE 3)", "Acción más elegida", acciones[0][0] + ": " + proporcion(acciones[0][1], decisiones), "", "Si una acción supera el 60%, revisar el balance: puede que domine a las demás."],
    ["Azar e ilusión de control", "Apuestas al partido por jugador (mediana)", valorONada(mediana(partidas.map((partida) => partida.apuestasPartido))), "", "Conducta dentro del simulador. No mide comprensión: eso lo mide el cuestionario."],
    ["Azar e ilusión de control", "Partidas sin ninguna apuesta", proporcion(partidas.filter((partida) => partida.apuestasTotales === 0).length, todas), "", "Si son muchas, el cierre no muestra a esos jugadores su propia experiencia con el azar."],
    ["Refuerzo, confirmación y memoria", "Respondieron cuántas apuestas creían haber ganado", proporcion(conMemoria.length, terminadas.filter((partida) => partida.apuestasTotales > 0).length), "", "Solo se pregunta a quien apostó. La respuesta es optativa."],
    ["Refuerzo, confirmación y memoria", "Creían haber ganado más de lo real", proporcion(conMemoria.filter((partida) => partida.diferenciaMemoria > 0).length, conMemoria.length), "", "Recordar más ganancias de las reales es compatible con disponibilidad y confirmación. No alcanza para diagnosticar un sesgo."],
    ["Refuerzo, confirmación y memoria", "Diferencia entre lo que creían y lo real (promedio)", valorONada(redondear(promedio(conMemoria.map((partida) => partida.diferenciaMemoria)), 1), " apuestas"), "", "Positivo: sobreestiman lo ganado. Negativo: lo subestiman."],
    ["Costo de oportunidad", "Llegaron a la meta de ahorro", proporcion(terminadas.filter((partida) => partida.llegoMeta).length, terminadas.length), "", "Comparar entre quienes apostaron y quienes no (pestaña partidas)."],
    ["Costo de oportunidad", "Parte de la meta perdida apostando (mediana, entre quienes perdieron)", valorONada(mediana(perdieron.map((partida) => partida.metaPerdida)), "%"), "", "Es la alternativa concreta que se dejó de financiar. Más de 100%: perdió más de lo que costaba la meta. La matriz pide que el 80% identifique esa alternativa: eso se pregunta en el postest."],
    ["Imprevistos y persecución de pérdidas", "Ofertas de doble o nada aceptadas", proporcion(todasLas("acepto"), todasLas("ofertas")), "", "Persecución de pérdidas dentro del juego. Aceptar no prueba por sí solo que no se entendió (matriz)."],
    ["Imprevistos y persecución de pérdidas", "Participantes que rechazaron al menos una oferta", proporcion(codigosConOfertas.filter((lista) => lista.some((partida) => partida.cerro + partida.separo + partida.vencio > 0)).length, codigosConOfertas.length), "80%", "Matriz: 80% encuentra una alternativa a seguir apostando. Cuenta participantes que recibieron alguna oferta, en cualquiera de sus partidas."],
    ["Imprevistos y persecución de pérdidas", "Segundos para aceptar la oferta (mediana)", valorONada(mediana(partidas.map((partida) => partida.segAcepto)), " s"), "", "Una aceptación muy rápida sugiere una decisión impulsiva. La oferta dura 10 s."],
    ["Imprevistos y persecución de pérdidas", "Aceptación tras \"casi gano\" / tras pérdida común", proporcion(todasLas("aceptadasCasi"), todasLas("ofertasCasi")) + " / " + proporcion(todasLas("aceptadasComun"), todasLas("ofertasComun")), "", "Si es mayor tras \"casi gano\", el efecto descripto por Clark (2010) aparece en el simulador. Con pocos casos, informarlo como observación."],
    ["Imprevistos y persecución de pérdidas", "Imprevistos resueltos pidiendo prestado", proporcion(todasLas("impPrestado"), todasLas("impAhorro") + todasLas("impBilletera") + todasLas("impPrestado")), "", "Pedir prestado indica que no alcanzaba ni el ahorro ni la billetera."],
    ["Presión de pares", "Mensajes del grupo respondidos con \"Me prendo\"", proporcion(todasLas("meprendo"), todasLas("mensajes")), "", "Peso de la presión de pares en la decisión de apostar."],
    ["Presión de pares", "Apuestas al partido hechas por el grupo", proporcion(todasLas("meprendo"), todasLas("apuestasPartido")), "", "Qué parte de las apuestas no fue una decisión propia."],
    ["Reflexión y apoyo", "Pausas cerradas antes de que terminen", proporcion(todasLas("pausasAntes"), todasLas("pausas")), "", "Junto con los segundos: si se cierran en 1 o 2 s, probablemente no se leen."],
    ["Reflexión y apoyo", "Segundos con la pausa abierta (mediana)", valorONada(mediana(partidas.map((partida) => partida.segPausa)), " s"), "", "Las pausas duran 7 o 9 s. Matriz: reducir o reformular si interrumpen el ritmo."],
    ["Reflexión y apoyo", "Partidas en las que se eligió \"Pedir apoyo\"", proporcion(partidas.filter((partida) => partida.apoyo > 0).length, todas), "", "Elegir la acción no equivale a reconocer el recurso de ayuda: eso se pregunta al cierre (matriz, 80%)."],
    ["Cierre y segunda partida", "Participantes que volvieron a jugar", proporcion(participantes.filter((lista) => lista.some((partida) => partida.rejugo)).length, participantes.length), "", "Como en PeaceMaker, probar otra estrategia puede sumar aprendizaje."],
    ["Cierre y segunda partida", "En la segunda partida apostaron menos al partido", segundas.total ? proporcion(segundas.menos, segundas.total) : "Sin segundas partidas", "", "Compara la 1.ª y la 2.ª partida de cada código."],
    ["Cuestionario (OE 4)", "Mejora en ilusión de control", "Ver cuestionario", "+25% relativo", "No sale del registro: [(postest − pretest) / pretest] × 100 con las respuestas correctas. Cruzar por código."],
  ]);
}

function agruparPorCodigo(partidas) {
  const porCodigo = {};
  partidas.forEach((partida) => { (porCodigo[partida.codigo] = porCodigo[partida.codigo] || []).push(partida); });
  return Object.keys(porCodigo).map((codigo) => porCodigo[codigo]);
}

function segundasPartidas(partidas) {
  let total = 0, menos = 0;
  agruparPorCodigo(partidas).forEach((todas) => {
    const lista = todas.filter((partida) => partida.termino);
    if (lista.length < 2) return;
    total++;
    if (lista[1].apuestasPartido < lista[0].apuestasPartido) menos++;
  });
  return { total, menos };
}

function escribirHoja(libro, nombre, encabezado, filas) {
  const hoja = libro.getSheetByName(nombre) || libro.insertSheet(nombre);
  hoja.clearContents();
  const datos = [encabezado].concat(filas);
  hoja.getRange(1, 1, datos.length, encabezado.length).setValues(datos);
  hoja.setFrozenRows(1);
}

function valorDeCelda(valor) {
  if (valor === true) return "Sí";
  if (valor === false) return "No";
  if (valor === undefined || valor === null || (typeof valor === "number" && !isFinite(valor))) return "";
  if (typeof valor === "string" && valor !== "" && NOMBRE_META[valor]) return NOMBRE_META[valor];
  return valor;
}

function numero(valor) {
  if (valor === "" || valor === null || valor === undefined) return NaN;
  const resultado = Number(valor);
  return isFinite(resultado) ? resultado : NaN;
}

function suma(valores) { return valores.reduce((total, valor) => total + (isFinite(valor) ? valor : 0), 0); }

function promedio(valores) { const validos = valores.filter((valor) => isFinite(valor)); return validos.length ? suma(validos) / validos.length : NaN; }

function mediana(valores) {
  const validos = valores.filter((valor) => valor !== "" && isFinite(valor)).sort((a, b) => a - b);
  if (!validos.length) return "";
  const medio = Math.floor(validos.length / 2);
  return validos.length % 2 ? validos[medio] : redondear((validos[medio - 1] + validos[medio]) / 2, 1);
}

function moda(valores) {
  const cuenta = {};
  valores.forEach((valor) => { cuenta[valor] = (cuenta[valor] || 0) + 1; });
  return Object.keys(cuenta).sort((a, b) => cuenta[b] - cuenta[a])[0];
}

function redondear(valor, decimales) { const factor = Math.pow(10, decimales); return isFinite(valor) ? Math.round(valor * factor) / factor : ""; }

function proporcion(parte, total) { return total ? Math.round(parte / total * 100) + "% (" + parte + " de " + total + ")" : "Sin casos"; }

function valorONada(valor, unidad) { return valor === "" || valor === undefined ? "Sin casos" : String(valor).replace(".", ",") + (unidad || ""); }
