# Cambios para el informe, la matriz y el análisis transmedia

**Fecha:** 26 de octubre de 2026

El juego cambió después de la Sprint Review y algunos párrafos de los documentos quedaron desactualizados. Para cada uno figura el texto actual, tal como está en `Informe BetAware.docx`, y el texto propuesto. Los documentos originales están en Google Docs; conviene pegar los cambios ahí y después volver a subir la copia a esta carpeta.

Los valores del juego que usan estos textos:

| Parámetro | Valor |
|---|---|
| Saldo inicial | $1.000 y $200 de ahorro |
| Ingreso semanal | $500 |
| Gastos fijos semanales | $250 (viáticos y comida) |
| Metas de ahorro | Entradas a la cancha $800 · Zapatillas $1.200 · Viaje de egresados $2.000 |
| Clases particulares | −$250 · +15% estudio · +5% bienestar |
| Ahorrar para la meta | $150 al ahorro · +5% bienestar |
| Pedir apoyo y pausar | Sin costo · +8% bienestar · +3% estudio · −1 exposición |
| Apostar en el partido | $250 · 10% +$500 netos · 20% +$100 netos · 70% −$250 · pérdida esperada $105 |
| Doble o nada | $300 · 50% +$300 · 50% −$300 · esperanza $0 · la oferta dura 10 segundos |
| Imprevistos | Semanas 4, 7 y 10 (72% de probabilidad): notebook $350 o material $250 · se pagan con el ahorro, con la billetera o pidiendo prestado (se devuelve un 35% más) |
| Mensajes del grupo | Semanas 2, 5 y 8 · "Me prendo" +5% bienestar y apuesta · "Paso" −3% bienestar |
| Pausas de reflexión | Semanas 3, 6, 9 y 11 · Línea 141 en las semanas 9 y 11 |

## Informe

### OE 2 (sección 2.2)

**Actual:**
> OE 2 (Diseño y Prototipado - Semanas 5 a 12): Diseñar y programar un prototipo jugable en 2D (versión alfa) que simule 12 semanas de vida estudiantil, con un presupuesto finito de $1.000 semanales y probabilidades matemáticas desfavorables, durante un período de desarrollo de ocho semanas.

**Propuesto:**
> OE 2 (Diseño y Prototipado - Semanas 5 a 12): Diseñar y programar un prototipo jugable en 2D (versión alfa) que simule 12 semanas de vida estudiantil, con un ingreso de $500 semanales, $250 de gastos fijos y probabilidades matemáticas desfavorables, durante un período de desarrollo de ocho semanas.

### Variable independiente (sección 2.3)

**Actual:**
> Variable Independiente (VI): El videojuego interactivo BetAware, una simulación de 12 semanas de decisiones financieras con probabilidades matemáticas desfavorables explícitas y eventos de la vida cotidiana.

**Propuesto:**
> Variable Independiente (VI): El videojuego interactivo BetAware, una simulación de 12 semanas de decisiones financieras con probabilidades matemáticas desfavorables explícitas, una meta de ahorro, eventos de la vida cotidiana y mensajes de pares que invitan a apostar.

### Persecución de pérdidas (sección 4.6, último párrafo)

**Actual:**
> […] En el prototipo, el evento «doble o nada» se analizará por separado: si su esperanza es nula, no debe presentarse como ejemplo de esperanza negativa. El playtest observará si el participante identifica alternativas a volver a apostar.

**Propuesto:**
> […] En el prototipo, la oferta de «doble o nada» tiene esperanza nula: 50% de ganar $300 y 50% de perder $300. El juego la muestra como «En promedio: $0», separada de la apuesta principal, que pierde $105 en promedio. El playtest observará si el participante identifica alternativas a volver a apostar.

### Sección 5.2

**Actual:**
> BetAware pone al jugador en el rol de un estudiante secundario durante 12 semanas simuladas de vida escolar y social. El presupuesto previsto es de $1.000 semanales para administrar entre estudios, ahorro, apuestas e imprevistos. Los montos son parámetros didácticos del modelo; no representan una estimación del gasto real de adolescentes en 2026.

**Propuesto:**
> BetAware pone al jugador en el rol de un estudiante secundario durante 12 semanas simuladas de vida escolar y social. Empieza con $1.000 y $200 de ahorro. Cada semana cobra $500 y paga $250 de gastos fijos (viáticos y comida), así que le quedan $250 para administrar entre clases particulares, ahorro, apuestas e imprevistos. Al empezar elige una meta de ahorro: entradas a la cancha ($800), zapatillas ($1.200) o viaje de egresados ($2.000). La meta convierte el costo de oportunidad en algo concreto: cada peso apostado es un peso que no llega a la meta. Los montos son parámetros didácticos del modelo; no representan una estimación del gasto real de adolescentes en 2026.

### Sección 5.3

**Actual:**
> En cada semana, el usuario enfrenta un escenario cotidiano y elige una acción. Las tres alternativas económicas principales son estudiar, ahorrar o apostar; el prototipo también incluye la acción de pedir apoyo, según la Sprint Review del equipo.
>
> • Opción A - Invertir en Estudios ($250): El jugador compra libros, cursos o materiales escolares. Estas compras mejoran su rendimiento académico de manera estable y reducen su índice de estrés a largo plazo.
>
> • Opción B - Ahorrar ($150): El jugador guarda fondos en una reserva. No ofrece una gratificación inmediata, pero permite afrontar imprevistos.
>
> • Opción C - Apostar ($250): Antes de confirmar, se informa un 10% de probabilidad de obtener $500 netos, un 20% de obtener $100 netos y un 70% de perder $250. Los cobros brutos correspondientes son $750, $350 y $0. Las probabilidades permanecen fijas y las jugadas se resuelven de forma independiente.

**Propuesto:**
> En cada semana, el usuario elige una de cuatro acciones:
>
> • Opción A - Clases particulares ($250): Suben un 15% el estudio y un 5% el bienestar. Si la exposición a las apuestas es media o alta, el beneficio baja.
>
> • Opción B - Ahorrar para la meta ($150): El dinero pasa al ahorro y el jugador ve cuánto le falta para su meta. No ofrece una gratificación inmediata, pero permite afrontar imprevistos.
>
> • Opción C - Pedir apoyo y pausar (sin costo): Suben un 8% el bienestar y un 3% el estudio, y baja una marca de exposición.
>
> • Opción D - Apostar en el partido ($250): Antes de confirmar, se informa un 10% de probabilidad de obtener $500 netos, un 20% de obtener $100 netos y un 70% de perder $250, también como frecuencias («1 de cada 10», «2 de cada 10», «7 de cada 10»). Los cobros brutos correspondientes son $750, $350 y $0. Las probabilidades permanecen fijas y las jugadas se resuelven de forma independiente.

### Nueva sección: presión de pares (después de la 5.5)

**Propuesto:**
> **5.6. Presión de Pares**
>
> En las semanas 2, 5 y 8, el grupo del curso le escribe al jugador en un chat. Los mensajes empujan a apostar («Metele que es fija», «Yo ya puse $250. ¿Vos?») o muestran solo las ganancias de un amigo, como ocurre en redes. Si responde «Me prendo», hace la apuesta de esa semana y gana un 5% de bienestar por sumarse al grupo; si responde «Paso», pierde un 3% de bienestar. La mecánica responde al pedido de la Sprint Review y del análisis transmedia: la presión de pares es la motivación principal del player persona. El cierre informa cuántas apuestas se hicieron por mensajes del grupo, sin juzgar la decisión.

Si se agrega esta sección, las siguientes pasan a ser 5.7 y 5.8.

### Sección 5.5 (imprevistos y persecución de pérdidas)

**Actual:**
> • Resolución Vía Ahorro: Si el usuario ahorró en semanas previas, puede cubrir el imprevisto y comprobar el valor del autocontrol financiero.
>
> • Persecución de Pérdidas: El evento de volver a apostar después de perder permite representar el intento de recuperar dinero mediante una nueva apuesta (Clark, 2010). La oferta «doble o nada» no garantiza recuperar lo perdido. Su esperanza nula, señalada en la Sprint Review, deberá explicarse y distinguirse de la apuesta principal de esperanza negativa; la claridad de esa diferencia es una corrección pendiente del prototipo.

**Propuesto:**
> • Resolución del Imprevisto: El usuario elige entre tres opciones y cada una muestra su costo antes de elegir: pagar con el ahorro, lo que lo aleja de su meta; pagar con la billetera; o pedir prestado y devolver un 35% más con el ingreso de la semana siguiente (por un imprevisto de $350, devuelve $473). Si el dinero no alcanza, la opción aparece desactivada.
>
> • Persecución de Pérdidas: El evento de volver a apostar después de perder permite representar el intento de recuperar dinero mediante una nueva apuesta (Clark, 2010). La oferta «doble o nada» no garantiza recuperar lo perdido. Tiene esperanza nula y el juego lo muestra como «En promedio: $0», separado de la apuesta principal, de esperanza negativa. La oferta vence en 10 segundos, como las cuotas especiales de las aplicaciones de apuestas.

### Sección 5.6 (interfaz), panel del presente

**Actual:**
> • Panel del Presente: Muestra la situación de la semana, las acciones disponibles y las probabilidades. La versión descrita en la Sprint Review utiliza indicadores de billetera, ahorro, estudio, bienestar y exposición. Se comprobará si sus etiquetas resultan comprensibles para la población destinataria.

**Propuesto:**
> • Panel del Presente: Muestra la situación de la semana, las acciones disponibles y las probabilidades. Usa indicadores de billetera, ahorro (con el avance hacia la meta), estudio, bienestar y exposición; si hay una deuda, también la muestra. Se comprobará si sus etiquetas resultan comprensibles para la población destinataria.

### Sección 5.7 (cierre)

**Actual:**
> Al terminar la semana 12, se presenta una auditoría del dinero apostado, cobrado y del resultado neto. […] El siguiente ejemplo es ilustrativo; no es un resultado de playtesting:
>
> […]
>
> Mensaje de Reflexión: «Ganaste 4 de 12 apuestas y el balance de apuestas fue de −$800. ¿Qué recordabas mejor: las ganancias o las pérdidas? Revisá la trayectoria completa. Ganar alguna jugada no cambia las probabilidades de la siguiente». Si otra partida termina con ganancias, el cierre mostrará ese resultado y explicará que no modifica la esperanza matemática.

**Propuesto:**
> Al terminar la semana 12, y antes de mostrar los números, el juego pregunta cuántas apuestas cree el jugador que ganó. La respuesta es optativa y no puntúa. Después se presenta una auditoría del dinero apostado, cobrado y del resultado neto, junto con lo que el jugador creía, el resultado esperado para esas apuestas y la parte de la meta que se perdió apostando. Debajo aparece la trayectoria completa, semana por semana. […] El siguiente ejemplo sale de una partida de prueba del equipo; no es un resultado de playtesting:
>
> […]
>
> Mensaje de Reflexión: «Ganaste 2 de 5 apuestas. Creías que eran 3. ¿Qué recordabas mejor: las ganancias o las pérdidas? Apostaste $1.250 y cobraste $1.100. Neto: −$150. Con los $150 que perdiste apostando cubrías el 13% de las zapatillas. Lo esperable para tus apuestas era −$525». En esa partida, al jugador le faltaron $100 para las zapatillas. Si otra partida termina con ganancias, el cierre lo muestra y agrega: «Esta vez saliste ganando; las chances no cambiaron».

El párrafo «Resumen Financiero» puede quedar igual.

### Nueva sección: estímulos audiovisuales (al final de la sección 5)

**Propuesto:**
> **5.9. Estímulos Audiovisuales**
>
> La apuesta imita los estímulos de una aplicación de casino: una tragamonedas de tres rodillos que frenan de a uno, anticipación cuando los dos primeros coinciden, monedas y confeti al ganar, una racha visible y vibración en el celular. En el 40% de las derrotas, el tercer rodillo se detiene con el premio justo arriba de la línea: es el efecto de «casi ganar», que puede sostener la conducta de apuesta aunque el resultado sea una pérdida (Clark, 2010). Los estímulos no modifican las probabilidades. El cierre se presenta sin sonido ni efectos, para contrastar la euforia de las apuestas con el balance. Como advierte la matriz de congruencia, el playtest observará si el énfasis audiovisual dificulta la lectura del resultado neto; para eso se pueden comparar sesiones con sonido y sin sonido.

## Matriz de congruencia

### Fila "Azar, ilusión de control y falacia del apostador", columna "Iteraciones"

**Actual:** Aclarar etiquetas, mostrar frecuencias junto a porcentajes y corregir el retorno esperado del prototipo.
**Propuesto:** Hecho: etiquetas aclaradas, frecuencias junto a porcentajes y retorno esperado corregido ($145 de cobro, −$105 de neto).

### Fila "Costo de oportunidad", columna "Mecánicas"

**Actual:** Estudiar, ahorrar, pedir apoyo o apostar; indicadores de billetera, ahorro, estudio, bienestar y exposición.
**Propuesto:** Clases particulares, ahorrar para una meta (cancha, zapatillas o viaje), pedir apoyo o apostar; ingreso de $500 y gastos fijos de $250 por semana; indicadores de billetera, ahorro, estudio, bienestar y exposición.

### Fila "Imprevistos y persecución de pérdidas"

**Mecánicas, actual:** Gastos inesperados; tras perder, oferta de apostar de nuevo, cerrar o separar dinero.
**Mecánicas, propuesto:** Gastos inesperados que se pagan con el ahorro, con la billetera o pidiendo prestado; tras perder, oferta de doble o nada por 10 segundos, con opción de cerrarla o separar dinero.

**Iteraciones, actual:** Revisar texto y balance; explicar el «doble o nada» de esperanza nula y distinguirlo de la apuesta principal de esperanza negativa.
**Iteraciones, propuesto:** Hecho: la oferta muestra «En promedio: $0», separada de la apuesta principal.

### Fila "Cierre y lectura de trayectoria", columna "Iteraciones"

**Actual:** Mostrar el historial completo al final o ajustar la promesa textual; acortar partes repetitivas.
**Propuesto:** Hecho: el cierre muestra el historial completo y los textos se acortaron.

### Nueva fila sugerida: "Presión de pares"

| Columna | Texto |
|---|---|
| Problema | ¿Los mensajes del grupo llevan a apostar aunque el jugador no lo hubiera elegido? |
| Objetivos | Reconocer la influencia del grupo en la decisión de apostar. Vinculación: OE 2 y OE 3. |
| Hipótesis | Si el cierre muestra cuántas apuestas se hicieron por el grupo, se espera que el jugador pueda nombrar esa influencia. |
| Marco teórico | A completar por Psicología. |
| Mecánicas | Mensajes del grupo en las semanas 2, 5 y 8; «Me prendo» +5% bienestar y apuesta; «Paso» −3% bienestar. |
| Criterios de éxito | A definir con Psicología. |
| Playtest | Registrar la respuesta a cada mensaje y preguntar después por qué se eligió. |
| Iteraciones | Ajustar los textos y el costo de pasar según el playtest. |

## Análisis transmedia

### Tabla de extensiones, fila "Versión web jugable"

**Actual:** Versión web jugable (Unity WebGL)
**Propuesto:** Versión web jugable (HTML, CSS y JavaScript; ya funciona en el celular y en la computadora)

### Sección 1, propuestas al final

Las dos propuestas («Darle una meta concreta al protagonista» y «Sumar un grupo de amigos que mande mensajes») ya están en el juego. Se pueden pasar de propuesta a descripción.
