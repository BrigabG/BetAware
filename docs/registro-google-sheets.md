# Registro de partidas en Google Sheets

Cada partida de BetAware manda sus eventos a una planilla de Google Sheets a través de un Apps Script. El registro sirve para el playtest y para cruzar lo que el jugador hace en el juego con lo que responde en el cuestionario pretest/postest (ver `BetAware_ herramientas de medición.docx` y `Análisis de evaluación de un juego serio.docx`).

- **Qué se manda:** las decisiones, los resultados y los tiempos de cada semana. No se mandan el nombre del jugador ni lo que escribe en "Para pensar".
- **Cuándo:** en todas las partidas, desde el link normal, una vez configurada la URL del script.
- **Sin internet:** cada evento queda guardado en el navegador y se reintenta solo cada 15 segundos, al volver la conexión y al abrir el juego de nuevo en ese navegador. El script descarta los eventos repetidos.

## Publicar el script (una sola vez)

1. Crear una planilla nueva en Google Sheets, por ejemplo "BetAware · registro".
2. En la planilla: **Extensiones → Apps Script**.
3. Borrar el código de ejemplo, pegar todo el contenido de [`apps-script/Code.gs`](../apps-script/Code.gs) y guardar.
4. Arriba, elegir la función **`probar`** y tocar **Ejecutar**. Google pide permisos:
   - **Revisar permisos** → elegir la cuenta.
   - Si aparece "Google no verificó esta app": **Configuración avanzada → Ir a … (no seguro) → Permitir**. Es normal en un script propio.
   - En la planilla aparece la pestaña **eventos** con una fila de prueba (código `PRUEBA`). Se puede borrar.
5. **Implementar → Nueva implementación**. En el engranaje de "Seleccionar tipo", elegir **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
   - Tocar **Implementar** y copiar la **URL de la aplicación web** (termina en `/exec`).
6. Abrir esa URL en el navegador. Tiene que decir "BetAware: el registro está activo."

## Conectar el juego

**Para probar antes de cambiar el código**, abrir el juego con la URL del script en el link:

```
https://brigabg.github.io/BetAware/?registro=URL_DEL_SCRIPT
```

Jugar una semana y mirar la planilla: tienen que aparecer filas en **eventos**.

**Para que quede fijo**, la URL va en `index.html`, en la línea `const REGISTRO_URL = "";`. Desde ahí, el link normal registra todas las partidas.

**Si después se cambia el script:** **Implementar → Gestionar implementaciones** → lápiz → Versión: **Nueva versión** → **Implementar**. La URL no cambia.

**Al terminar el piloto:** **Implementar → Gestionar implementaciones → Archivar**, para que nadie más pueda mandar datos.

## Links para el piloto

| Para | Link |
|---|---|
| Un participante con código | `https://brigabg.github.io/BetAware/?codigo=A07` |
| Jugar sin código | `https://brigabg.github.io/BetAware/` |
| El facilitador (botón para descargar el CSV en la pantalla de inicio) | `https://brigabg.github.io/BetAware/?facilitador` |

El código también se puede escribir en la pantalla inicial, en "Código de participante (opcional)". Tiene que ser el mismo del cuestionario. Se guarda en mayúsculas y solo con letras, números, `-` y `_`.

**Respaldo:** al final de cada partida, "Descargar registro (CSV)" baja todos los eventos guardados en ese navegador, incluidas las partidas que no se terminaron. Sirve si en el aula no hubo internet. Para pasarlo a la planilla: **Archivo → Importar → Subir**.

## Columnas

Cada fila es un evento.

| Columna | Qué tiene |
|---|---|
| `id` | Identificador del evento. No se repite. |
| `recibido` | Hora en que llegó a la planilla. |
| `fecha` | Hora en que pasó en el juego. |
| `sesion` | Identificador de la partida. Cada partida nueva (también un rejuego) tiene otra sesión. |
| `codigo` | Código de participante, si lo puso. |
| `evento` | Qué pasó (ver la tabla de abajo). |
| `semana` | Semana del juego, de 1 a 12. |
| `accion`, `valor`, `segundos`, `detalle` | Dependen del evento (ver abajo). `detalle` es un texto en formato JSON. |
| `billetera`, `ahorro`, `estudio`, `bienestar`, `exposicion`, `deuda` | Estado del jugador en ese momento. En `decision`, es el estado antes de la acción. |
| `version` | Versión del juego. |

## Eventos

| `evento` | Cuándo | `accion` | `valor` | `segundos` | `detalle` |
|---|---|---|---|---|---|
| `inicio` | Empieza la partida | Meta: `match` (cancha), `sneakers` (zapatillas) o `trip` (viaje) | | | Prioridad inicial, celular o computadora, ancho de pantalla, sonido, reducir movimiento |
| `decision` | Elige la acción de la semana | `clases`, `ahorrar`, `apoyo` o `apostar` | | Desde que pudo elegir hasta que eligió | `porGrupo: true` si apostó por "Me prendo" |
| `apuesta` | Sale el resultado | `partido` o `doble_o_nada` | Ganancia neta: 500, 100, −250, 300 o −300 | | `casiGano` (solo partido) y `racha` |
| `doble_o_nada` | Responde a la oferta | `acepto`, `cerro`, `separo` (separó $150) o `vencio` (pasaron los 10 s) | | Con la oferta abierta | |
| `grupo` | Responde al chat del grupo | `me_prendo` o `paso` | | Con el chat abierto | |
| `imprevisto` | Resuelve un imprevisto | `ahorro`, `billetera` o `prestado` | Costo del imprevisto | Con la ventana abierta | Qué imprevisto fue |
| `pago_deuda` | Devuelve lo prestado | | Monto devuelto | | |
| `pausa` | Cierra una pausa de reflexión | `siguio_antes` o `espero` (se cerró sola) | | Con la pausa abierta | Pregunta: `expectations`, `money`, `cost` o `control` |
| `memoria` | Responde cuántas apuestas cree que ganó | `respondio` o `no_respondio` | Lo que respondió | | Apuestas y ganadas reales |
| `cierre` | Llega al cierre | | Neto de apuestas | | Apuestas, ganadas, lo que creía, apostado, cobrado, esperado, meta, si llegó a la meta y apuestas por el grupo |
| `salio` / `volvio` | La pestaña quedó oculta o volvió | | | | |
| `reinicio` | Reinicia a mitad de partida | | | | |
| `rejuego` | Vuelve a jugar desde el cierre | | | | |

## Cómo leerlo

- **Abandono:** una sesión sin `cierre`. La última fila dice en qué semana quedó.
- **Lo declarado frente a lo decidido:** filtrar por `codigo` y comparar con el cuestionario. Por ejemplo, quien rechaza la falacia del apostador en el pretest y después responde `acepto` en `doble_o_nada`.
- **Memoria:** en `cierre`, comparar `creia` con `ganadas`.
- **Presión de pares:** en `grupo`, cuántos `me_prendo`; en `decision`, cuántas apuestas tienen `porGrupo`.
- **Si alguien delibera o repite sin pensar:** `segundos` de `decision`, semana por semana.
- **Segunda partida:** los `rejuego` y las sesiones siguientes del mismo `codigo`.

## Seguridad

La URL del script queda escrita en el código del juego, que es público. Cualquiera que la encuentre podría mandar filas. El script solo acepta los eventos de la tabla, recorta los textos largos y neutraliza los que empiezan con `=`, `+`, `-` o `@` para que no se guarden como fórmulas. Al terminar el piloto, archivar la implementación.
