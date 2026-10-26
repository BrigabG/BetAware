# BetAware

Prototipo web jugable para Juegos Aplicados. Serious game sobre ludopatía, economía cotidiana y persecución de pérdidas.

## Cómo jugar

Abrir `index.html` en un navegador moderno. El prototipo usa HTML, CSS y JavaScript vanilla dentro de un único archivo, sin dependencias externas.

Los íconos se integran como SVG propios, adaptados de [Lucide](https://lucide.dev/), bajo licencia ISC. No se descarga ninguna biblioteca en tiempo de juego.

## Intención de diseño

La experiencia toma como referencia la estructura de simulador por turnos de [Copero](https://copero.com.ar/juegos/simulador-carrera): una introducción breve, una configuración inicial y una secuencia de decisiones con trayectoria acumulada. La interfaz, el texto y las reglas son propios de BetAware.

La economía muestra una esperanza matemática negativa: cada apuesta de $250 tiene un cobro esperado de $145 (0,10 × $750 + 0,20 × $350), por lo que la pérdida esperada es de $105 por intento. La oferta de "doble o nada" tiene esperanza cero y el juego lo explica en pantalla.

La apuesta imita los estímulos de una app de casino: rodillos con anticipación, "casi gano" en parte de las derrotas, monedas y confeti al ganar, racha visible y una oferta de doble o nada que vence en 10 segundos. Estos efectos no cambian las probabilidades. El cierre se muestra sin sonido ni efectos. El botón de sonido de la barra superior silencia el audio y la vibración.
