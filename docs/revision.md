# Revisión del prototipo frente a los documentos

Fecha: 26 de octubre de 2026.

Compara `index.html` con los cuatro documentos de esta carpeta:

- `Informe BetAware.docx`
- `BetAware_ matriz de congruencia conjunta.docx`
- `Sprint Review - Grupo 4.docx`
- `Análisis trasmedia.docx`

Cada punto indica si quedó **corregido** en esta rama o si sigue **pendiente**.

Criterio de texto: cada pantalla muestra el dato en una línea y deja que el jugador saque la conclusión. El juego no debe sonar a sermón (ver `AGENTS.md`).

## Lo que el juego ya cumple

| Pide el documento | Dónde | Estado en el juego |
|---|---|---|
| 12 semanas, una decisión por semana | Informe 5.2, 5.3 | Cumple |
| Estudiar $250, ahorrar $150, pedir apoyo, apostar $250 | Informe 5.3, Sprint Review | Cumple |
| Apuesta: 10% de +$500 netos, 20% de +$100 y 70% de −$250; cobros de $750, $350 y $0 | Informe 5.3, matriz | Cumple |
| Chances fijas e independientes, que no cambian con las rachas | Sprint Review, matriz | Cumple: cada apuesta sortea de nuevo |
| Indicadores de billetera, ahorro, estudio, bienestar y exposición | Informe 5.6 | Cumple |
| Imprevistos que se cubren con el ahorro (notebook de $350) | Informe 5.5 | Cumple, con opciones extra: préstamo, vender un ítem o ayuda sin interés |
| "Doble o nada" después de perder, con opción de cerrar o separar plata | Matriz | Cumple |
| Pausas en las semanas 3, 6, 9 y 11, sin puntuar respuestas, con referencia a la Línea 141 | Sprint Review, matriz | Cumple |
| Historial que no se borra | Informe 5.6 | Cumple |
| Cierre con total apostado, cobrado y neto, y opción de rejugar | Informe 5.7 | Cumple |
| Animaciones y efectos por decisión | Sprint Review ("lo que no se logró") | Cumple |

## Correcciones de esta rama

1. **Retorno esperado mal calculado.** **Corregido.** El juego y el `README.md` decían que el cobro esperado era $160 y la pérdida esperada $90. Con la distribución del informe el cobro esperado es 0,10 × $750 + 0,20 × $350 = $145, y la pérdida esperada es $105 por apuesta. El juego lo muestra en una línea: "En promedio, cada apuesta pierde $105".
2. **El "doble o nada" no explicaba su esperanza cero.** **Corregido.** El cuadro de la oferta suma una línea "En promedio: $0". Se sacó la explicación sobre la persecución de pérdidas: la pantalla muestra los datos y no da una lección.
3. **Etiquetas confusas.** **Corregido.**
   - Se sacó "Presupuesto libre", que mostraba la billetera menos $500 sin explicar por qué.
   - En el cierre, "Necesidades académicas" pasó a ser "Estudio", y "Total recuperado" pasó a ser "Total cobrado", como en el informe.
4. **El cierre no mostraba la trayectoria completa.** **Corregido.** El cierre ahora lista todas las semanas en orden, incluidos los imprevistos y cómo se pagaron. Antes los imprevistos no quedaban en el historial.
5. **Ingreso semanal.** **A medias: falta una decisión del grupo.** El informe (OE 2 y 5.2) dice "$1.000 semanales". El juego da $1.000 al inicio y $500 por semana. Por ahora el juego lo dice claramente en la configuración y en la tarjeta de decisiones. Si se adopta $1.000 por semana, con gastos de $150 a $250 la plata se acumula y los imprevistos pierden peso. Recomendación: mantener $500 y corregir el informe.
6. **Los imprevistos se podían esquivar.** **Corregido.** Un clic fuera del modal lo cerraba sin pagar. Ahora hay que elegir una opción.
7. **Botón "Continuar" sin efecto después de un imprevisto.** **Corregido.** Antes de elegir la acción de la semana aparecía un botón que no hacía nada.
8. **El mensaje del imprevisto mentía.** **Corregido.** Decía "el ahorro funcionó" aunque se hubiera pagado con la billetera.
9. **Frecuencias junto a los porcentajes.** **Corregido.** La apuesta muestra "1 de cada 10", "2 de cada 10" y "7 de cada 10" debajo de cada porcentaje.
10. **Pregunta sobre la memoria.** **Corregido.** Antes del cierre, con las pantallas del juego ocultas, se pregunta cuántas apuestas cree el jugador que ganó. Puede elegir no responder y la respuesta no puntúa. Después el cierre muestra lo que creía junto a la pregunta "¿Qué recordabas mejor: las ganancias o las pérdidas?".
11. **Resultado esperado en el cierre.** **Corregido.** El cierre muestra lo apostado, lo cobrado, el neto y lo esperable para esas apuestas (−$105 por apuesta del partido; el doble o nada promedia $0). Si la partida termina con ganancia, agrega una sola frase: "Esta vez saliste ganando; las chances no cambiaron".
12. **Tono del cierre.** **Corregido.** Se sacó el título "La memoria recuerda la euforia. La planilla recuerda todo.", un contraste dramático que la guía de `AGENTS.md` pide evitar. Ahora el título dice cuántas apuestas se ganaron y el recuadro cambia de rojo a azul cuando el neto no es negativo.
13. **Pantallas que explicaban de más.** **Corregido.** Los mensajes después de cada acción, apuesta, doble o nada e imprevisto ahora tienen un título corto y los números. Se sacaron frases como "Ahora puede aparecer la idea de recuperarlos rápido", "La exposición acumulada fragmenta tu semana" o "Frenaste antes de sumar otra apuesta" (que aparecía aunque el jugador nunca hubiera apostado). La intro también quedó más corta.
14. **Vocabulario de universidad.** **Corregido.** Se cambiaron "cuatrimestre", "semestre", "finales", "liquidez" y "bibliografía" por textos de secundaria.
15. **Pausas que suponían un problema.** **Corregido.** La semana 11 ahora pregunta "Si arrancaras de nuevo, ¿apostarías igual?" a quien apostó, y "¿Qué te llevaría a apostar?" a quien no. Las versiones sin apuestas de las semanas 6 y 9 también son más directas. Conviene revisar estas preguntas con el equipo de Psicología.
16. **Deuda mal descontada.** **Corregido.** Cada semana se descontaba de la billetera toda la deuda, pero la deuda bajaba solo $40. Ahora la deuda se paga entera con el ingreso de la semana siguiente (si no alcanza, se paga lo que haya y el resto queda para la otra semana). El pago queda en el historial, la deuda se ve en el estado mientras exista y, si queda algo al final, aparece en el cierre.
17. **Metas concretas.** **Corregido.** Al empezar, el jugador elige una meta de ahorro: entradas a la cancha ($800), zapatillas ($1.200) o viaje de egresados ($2.000). "Ahorrar" pasa a ser "Ahorrar para las zapatillas" (o la meta elegida) y el ahorro muestra cuánto falta. En los imprevistos se elige si pagar con el ahorro o con la billetera. El cierre dice si se llegó a la meta y, si hubo pérdidas, qué parte de la meta se fue en apuestas. "Invertir en estudio" pasó a llamarse "Clases particulares".

## Pendientes

### Del backlog de la Sprint Review

- **Presión de pares.** Agregar mensajes de amigos ("metele que es fija") que empujen a apostar. Los stakeholders la marcaron como la motivación principal del jugador y el análisis transmedia propone un chat tipo WhatsApp.

### Texto

- **Duración de las pausas.** Se cierran solas a los 7 o 9 segundos. Conviene medir en el playtest si alcanza para leer.

### La billetera siempre crece (falta decidir)

- Entran $500 por semana y cada acción cuesta $250 como mucho, así que la billetera crece todas las semanas. En las pruebas se terminó con más de $4.000 en la billetera sin llegar a la meta, y en los imprevistos no tiene sentido vender algo o pedir un préstamo con $1.950 disponibles. El presupuesto no se siente finito, como pide el OE 2. Se resuelve junto con la decisión del ingreso semanal.

### Para el playtest y la evaluación (OE 3 y OE 4)

- **Registro de la sesión.** La matriz pide registrar elección, tiempo, abandono, finalización y duración. El juego solo permite copiar un resumen. Como no hay servidor, se puede agregar una descarga en CSV o JSON para el facilitador.
- **Instrumentos.** No están en el repo el cuestionario pretest/postest, el protocolo de playtest ni el kit docente. El análisis transmedia ubica el kit como la extensión más factible.
- **Línea 141.** Confirmar en la fuente oficial de SEDRONAR que atiende consultas por apuestas, y citarla. La [guía educativa del GCBA sobre apuestas online (2026)](https://static.buenosaires.gob.ar/sites/default/files/2026-06/Apuestas_online_guia_educativa.pdf) recuerda que el juego de azar está prohibido para menores de 18. El juego podría mencionarlo.

### En los documentos

- **Plataforma.** El análisis transmedia propone una "versión web jugable (Unity WebGL)", pero el prototipo ya es web y está hecho en HTML, CSS y JavaScript, sin Unity.
- **Ingreso semanal.** Alinear el informe o el juego (ver el punto 5).
