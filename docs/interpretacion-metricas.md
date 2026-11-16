# Cómo interpretar las métricas de BetAware para el TP

Esta guía ordena los datos del registro (planilla **MetricasBetaware**) según la consigna de la cátedra (`[TPs] Formato y estructura de los trabajos`, v2.1). Cada indicador se conecta con los objetivos del informe (OE 3 y OE 4), con las metas de la matriz de congruencia y con las secciones que pide la segunda entrega.

## 1. Qué mide el registro y qué no

| Nivel (ver `BetAware_ herramientas de medición`) | ¿Sale del registro? | De dónde sale |
|---|---|---|
| Reacción: ¿cómo vivió la experiencia? | En parte: abandono, tiempos y rejuego | Observación y pregunta abierta sobre el tono |
| Aprendizaje: ¿comprendió los sesgos y el riesgo? | **No** | Cuestionario pretest/postest (OE 4) |
| Conducta dentro del simulador | **Sí** | Registro: decisiones, apuestas, respuestas al grupo y a la oferta |
| Conducta fuera del juego | No | Queda fuera del alcance del piloto |

**Regla general:** el registro muestra qué hizo cada jugador en el simulador. Para afirmar qué comprendió hace falta el cuestionario. Para saber por qué hizo algo hace falta la observación o el pensamiento en voz alta. Las tres fuentes se cruzan por el **código de participante**.

## 2. Cómo obtener los números

1. En la planilla: **BetAware → Actualizar resumen**. El menú aparece al abrir la planilla, después de pegar la última versión de `apps-script/Code.gs`.
2. Se generan dos pestañas:
   - **partidas:** una fila por partida, con lo que hizo cada jugador.
   - **indicadores:** los indicadores agrupados por eje de la matriz, con valor, meta y cómo leerlos.
3. Se cuentan solo las partidas **con código de participante**. Quedan afuera las de prueba (código `PRUEBA`) y las jugadas desde el link sin código. Para incluir todas, cambiar `SOLO_CON_CODIGO` a `false` en el script.
4. Se puede actualizar cuantas veces se quiera: el resumen se rehace desde la pestaña **eventos**, que no se modifica.

## 3. Mapa: de los indicadores a las secciones del TP

### 9. Metodología (5%: claridad y estructura)

Describe **cómo** se obtuvieron los datos, no los resultados.

- **Instrumentos:**
  1. registro automático de eventos del juego,
  2. cuestionario pretest/postest,
  3. observación directa con pensamiento en voz alta.
- **Muestra:** cantidad de participantes (pestaña **indicadores**, fila "Participantes"). La meta es de 15 a 20 estudiantes de 13 a 17 años de CABA.
- **Procedimiento:** pretest → partida (y rejuego optativo) → postest, todo con el mismo código.
- **Datos registrados:** remitir a la tabla de eventos de `registro-google-sheets.md` (puede ir en el anexo).

> Ejemplo de redacción (con datos ficticios, solo para mostrar el formato): «Se registraron automáticamente las decisiones de cada partida mediante un script que envía los eventos del juego a una planilla de cálculo. Cada participante utilizó un código que permitió vincular su partida con las respuestas del cuestionario pretest y postest, sin registrar datos personales.»

### 11. Pruebas realizadas (25%: diseño y ejecución 15%, presentación e interpretación 10%)

**Diseño y ejecución:** contar cuántas sesiones se hicieron, con qué dispositivos (columna "Dispositivo" de **partidas**), cuánto duró una partida (indicador "Duración") y qué se observó.

**Presentación e interpretación:** una tabla por eje con el formato de la pestaña **indicadores**, y debajo de cada tabla un párrafo que la interprete. Siempre informar el conteo junto al porcentaje: "6 de 8 (75%)", no solo "75%".

| Eje (matriz) | Indicadores principales | Meta | Fuente que lo completa |
|---|---|---|---|
| Usabilidad y flujo (OE 3) | Partidas terminadas · Semana en la que más se abandona · Decisiones en menos de 1 s · Acción más elegida | 80% termina | Observación: dudas, aburrimiento, textos que no se entienden |
| Azar e ilusión de control | Apuestas por jugador · Partidas sin apuestas | — | Pretest/postest: ítem de ilusión de control (meta +25%) y de falacia del apostador |
| Refuerzo, confirmación y memoria | Respondieron la pregunta de memoria · Creían haber ganado más de lo real · Diferencia promedio | — | Postest: rechazar evaluar una estrategia solo por sus aciertos (matriz: 80%) |
| Costo de oportunidad | Llegaron a la meta · Parte de la meta perdida apostando | — | Postest: nombrar una alternativa concreta que dejó de financiar (matriz: 80%) |
| Imprevistos y persecución de pérdidas | Ofertas aceptadas · Participantes que rechazaron al menos una · Segundos para aceptar · Aceptación tras "casi gano" frente a pérdida común · Imprevistos pagados pidiendo prestado | 80% rechaza al menos una | Postest: explicar que una nueva apuesta puede aumentar la pérdida (matriz: 80%) |
| Presión de pares | "Me prendo" sobre mensajes · Apuestas hechas por el grupo | — | Observación y entrevista: por qué se aceptó o se pasó |
| Reflexión y apoyo | Pausas cerradas antes · Segundos por pausa · Partidas con "Pedir apoyo" | — | Cierre: dónde buscaría ayuda (matriz: 80%) |
| Cierre y segunda partida | Participantes que volvieron a jugar · Apostaron menos en la 2.ª | — | Postest: caso nuevo (transferencia) |

**Gráficos sugeridos** (apoyatura visual, 5% de la nota). Se arman desde la pestaña **partidas** con **Insertar → Gráfico**:

1. **Abandono por semana:** barras con la cantidad de partidas no terminadas según "Última semana".
2. **Qué eligieron:** barras apiladas con Clases, Ahorrar, Apoyo y Apostar por participante.
3. **"Casi gano" y doble o nada:** dos barras, aceptación tras "casi gano" frente a tras pérdida común.
4. **Memoria:** dispersión entre "Creía haber ganado" y "Ganadas totales". Los puntos sobre la diagonal sobreestimaron.
5. **Meta y apuestas:** "% de la meta perdido apostando" por participante.

En APA 7, cada tabla y figura lleva número (*Tabla 1*, *Figura 1*), un título en cursiva y, si hace falta, una nota debajo con la fuente: «Elaboración propia a partir del registro del piloto».

> Ejemplo de redacción (con datos ficticios, solo para mostrar el formato): «De las 18 partidas registradas, 15 se completaron (83%). Los abandonos se concentraron en la semana 6, momento en que coinciden la segunda pausa de reflexión y el regreso de la oferta de doble o nada. En las notas de observación se registraron comentarios sobre la extensión de esa semana.»

### 12. Discusión (15%: coherencia con los resultados 5%, aporte y decisiones futuras 10%)

**Coherencia con los resultados:** volver a la hipótesis general y a las metas de la matriz con una tabla de cierre:

| Criterio (matriz) | Meta | Resultado | ¿Se alcanzó? |
|---|---|---|---|
| Completa las 12 semanas | 80% | _de la pestaña indicadores_ | |
| Rechaza al menos una oferta de doble o nada | 80% | _de la pestaña indicadores_ | |
| Mejora relativa en ilusión de control | +25% | _del cuestionario_ | |
| Identifica una alternativa concreta que dejó de financiar | 80% | _del postest_ | |
| Rechaza evaluar una estrategia solo por sus aciertos | 80% | _del postest_ | |

**Aporte y decisiones futuras:** cada indicador que no alcance la meta o muestre un problema lleva a una decisión de diseño, como prevé la columna "Iteraciones" de la matriz:

| Si el indicador muestra… | Decisión posible |
|---|---|
| Mucho abandono en una semana | Acortar esa semana o mover la pausa |
| Pausas cerradas en 1 o 2 segundos | Reformularlas, acortarlas o reducir su cantidad |
| Muchas decisiones en menos de 1 segundo | Sumar variación: eventos distintos o cambios de costo |
| Una acción que supera el 60% | Revisar el balance de costos y beneficios |
| Más aceptación del doble o nada tras "casi gano" | Usarlo en el kit docente como ejemplo concreto del efecto |
| Muchos "Me prendo" | Trabajar la presión de pares en el debate posterior |
| Sobreestimación de lo ganado | Reforzar la comparación entre memoria y registro en el cierre |

> Ejemplo de redacción (con datos ficticios, solo para mostrar el formato): «El 64% de los mensajes del grupo se respondió con "Me prendo" y esas respuestas explican el 41% de las apuestas registradas. El resultado es coherente con lo señalado en la Sprint Review sobre la presión de pares como motivación principal del player persona. Se propone incorporar este dato al kit docente como disparador del debate posterior a la partida.»

### 14. Anexo (5%: uso correcto de anexos)

- La pestaña **partidas**, exportada como tabla (**Archivo → Descargar → PDF** con esa pestaña elegida).
- El diccionario de eventos y columnas (de `registro-google-sheets.md`).
- El cuestionario pretest/postest y la planilla de observación.

### Tercera entrega: demo jugable

Algunos criterios de la rúbrica de la demo se pueden respaldar con datos del piloto:

| Criterio de la rúbrica | Dato que lo respalda |
|---|---|
| Experiencia jugable completa y autónoma | Partidas terminadas, sin intervención (observación) |
| Al menos una decisión significativa que afecta el resultado | Distribución de acciones: si ninguna domina, la elección importa |
| Consecuencia visible según las acciones | Llegaron a la meta según si apostaron o no; parte de la meta perdida apostando |
| Interfaz que se entiende sin intervención externa | Abandono por semana y notas de observación |

## 4. Cruzar el registro con el cuestionario

El análisis de PeaceMaker (`Análisis de evaluación de un juego serio`) propone comparar **lo que el jugador declara con lo que decide**. Para hacerlo:

1. Cargar las respuestas del pretest y del postest en una pestaña nueva, **cuestionario**, con una fila por código.
2. Traer los datos de cada partida con una fórmula. Por ejemplo, para las ofertas aceptadas (columna `S` de **partidas**):
   `=BUSCARV(A2; partidas!A:S; 19; FALSO)`
   Si un código tiene dos partidas, `BUSCARV` toma la primera, que es la que conviene comparar con el pretest.
3. Buscar casos que muestren diferencias. Por ejemplo:
   - rechaza la falacia del apostador en el pretest y después acepta todas las ofertas de doble o nada;
   - dice que elegir el momento de apostar no cambia las chances, pero apuesta más después de ganar;
   - en el postest dice que hay que revisar también las pérdidas, pero en el juego creía haber ganado más de lo real.

Estos casos no se informan como errores del participante. Muestran la diferencia entre comprender y actuar que el informe reconoce en el apartado 4.8.

## 5. Reglas para no sobreinterpretar

- **Muestra chica:** con 15 a 20 participantes, informar conteos y no generalizar a la población (informe 1.1).
- **Conducta en el simulador no es conducta real:** aceptar el doble o nada no equivale a perseguir pérdidas fuera del juego.
- **Sin diagnósticos:** ningún indicador identifica un problema de juego. El proyecto no diagnostica (informe 4.1).
- **Tiempos:** dependen del dispositivo y de la velocidad de lectura. Sirven para comparar semanas, no personas.
- **Aceptar no es no entender:** la matriz aclara que elegir apostar no prueba por sí solo que no se comprendió el riesgo. Para eso está el postest.
- **Partidas de prueba:** usar siempre un código distinto de `PRUEBA` en el piloto y no jugar con códigos de participantes.
- **Redacción:** en tercera persona o en forma impersonal («se observó», «los participantes eligieron»), como pide la cátedra.
