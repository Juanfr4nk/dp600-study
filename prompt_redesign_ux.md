# Prompt: Rediseño UX/UI Profesional — DP-600 Study Companion

```
# ROL Y PERSPECTIVA

Actúa como un diseñador web de élite, ganador de múltiples premios Awwwards y CSS Design Awards, con 15 años de experiencia en diseño de aplicaciones educativas. Tu especialidad es convertir apps funcionales pero desordenadas en experiencias premium que rivalizan con productos como Notion, Linear, Duolingo Pro y Figma.

Tu filosofía de diseño:
- **"Si el usuario necesita pensar dónde hacer click, ya fallamos"**
- **"Cada píxel debe justificar su existencia"**
- **"Mobile-first no es una feature, es la base"**
- **"La velocidad percibida importa más que la real"**

---

# PROYECTO A REDISEÑAR

## Descripción
SPA educativa offline (HTML/CSS/JS vanilla, sin frameworks, sin dependencias) para preparar la certificación DP-600 (Microsoft Fabric Analytics Engineer). Tiene contenido extenso y funcional, pero el diseño creció orgánicamente sin dirección de UX.

## Ruta del proyecto
C:\work\Viscofan-V2_work\dp600-study\

## Archivos
- `index.html` (28KB, 583 líneas)
- `styles.css` (57KB, 2574 líneas) — dark mode, glassmorphism, Inter font
- `app.js` (107KB+, ~2800 líneas) — toda la lógica de la app
- `data/*.js` — 6 archivos de datos (questions, flashcards, summaries, labs, glossary, curriculum)

## Stack (NO cambiar)
HTML5/CSS3/JS Vanilla, sin build tools, sin dependencias npm, funciona offline. Los archivos `.js` se cargan directamente con `<script>`.

---

# DIAGNÓSTICO ACTUAL (lo que debes arreglar)

## 1. Navegación desbordada
- **12 botones en una barra horizontal**: Mi Ruta, Dashboard, Mapa, Stats, Quiz, Flashcards, Errores, Notas, Resúmenes, Labs, Glosario, Examen
- En pantallas <1400px los botones se comprimen y quedan ilegibles
- En móvil: COMPLETAMENTE ROTO — no hay hamburger menu, no hay bottom bar
- No hay jerarquía: secciones principales y secundarias al mismo nivel
- Dos botones usan el mismo icono (📝 Notas y 📝 Resúmenes)

## 2. Responsive: INEXISTENTE
- `styles.css` tiene 2574 líneas y CERO media queries (@media)
- La app solo funciona bien en pantallas >1400px
- En tablet/móvil: texto se sale de las cards, botones se superponen, quiz ilegible
- No hay consideración de touch targets (botones demasiado pequeños para dedos)

## 3. Densidad de información excesiva
- Dashboard muestra TODO a la vez: 4 stat cards + 3 barras de dominio + badges + plan de estudio + countdown + export/import
- No hay priorización visual — todo compite por atención
- Cards con mucho espacio vacío y poca densidad informativa

## 4. Inconsistencias visuales
- Mezcla de estilos inline en HTML (`style="font-size:1.2rem;font-weight:700;margin-bottom:1rem;"`) y clases CSS
- Algunos componentes con glassmorphism, otros con fondos sólidos
- Bordes radius inconsistentes entre componentes
- Sombras diferentes para cards similares

## 5. Tipografía y legibilidad
- Usa Inter (buena elección) pero con jerarquía débil
- Los tamaños de heading no tienen escalado coherente
- En quiz: la pregunta compite visualmente con las opciones y la explicación
- Texto secundario (var(--text-secondary): #94a3b8) tiene contraste borderline en dark mode

## 6. Performance percibida
- No hay skeleton screens ni loading states
- JavaScript ~150KB+ de archivos .js que parsean al cargar
- Sin lazy loading — todo carga de golpe aunque el usuario solo use 2-3 secciones

---

# PLAN DE REDISEÑO PEDIDO

Genera el siguiente entregable:

## FASE 1: Navegación y Layout (prioridad máxima)

### 1A. Navegación redesigneada
Reemplazar la barra horizontal de 12 botones con un sistema de navegación por capas:

**Desktop (>1024px):**
- Header fijo con logo + 5-6 nav items principales agrupados inteligentemente
- Agrupar secciones por función:
  - **Aprender**: Mi Ruta, Resúmenes, Labs, Glosario
  - **Practicar**: Quiz, Flashcards, Examen
  - **Progreso**: Dashboard, Mapa, Stats, Errores
  - **Personal**: Notas
- Usar dropdown menus o mega-menu para sub-opciones
- Breadcrumbs donde aplique (ej: Mi Ruta > Módulo 7 > Quiz)

**Tablet (768px-1024px):**
- Header con logo + hamburger
- Sidebar deslizable con las mismas agrupaciones

**Móvil (<768px):**
- Bottom navigation bar con 4-5 iconos principales (como las apps móviles nativas)
- Las secciones secundarias accesibles desde el menú hamburger o desde dentro de las principales
- Bottom bar items sugeridos: 🎓 Ruta | 🧠 Quiz | 💡 Flash | 📊 Progreso | ≡ Más

### 1B. Layout general
- Contenido principal: max-width 900px centrado (no 1400px — demasiado ancho para lectura)
- Sidebars opcionales solo cuando aportan (ej: quiz con mini-progreso lateral)
- Padding lateral adecuado en todas las resoluciones
- Scroll suave entre secciones con scroll-behavior: smooth

## FASE 2: Responsive completo

### 2A. Media queries mínimas
Implementar al menos 4 breakpoints:
```css
/* Mobile first */
@media (min-width: 480px) { /* Large phone */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large desktop */ }
```

### 2B. Componentes que DEBEN ser responsive
1. **Quiz/Examen**: preguntas legibles en móvil, opciones tocables (min 44px height), explicación expandible
2. **Flashcards**: swipeable en móvil, animación de volteo suave
3. **Dashboard**: stat cards en columna única en móvil, grid en desktop
4. **Tablas/grids**: scroll horizontal en móvil o reflow a lista
5. **Learning Path**: módulos en columna única en móvil
6. **Modal de onboarding**: full-screen en móvil, centrado en desktop

### 2C. Touch targets
- Mínimo 44×44px para todos los botones y links (Apple HIG + Google Material)
- Padding mínimo 12px en botones de acción
- Swipe gestures donde sea natural (flashcards, quiz siguiente/anterior)

## FASE 3: Visual polish

### 3A. Sistema de diseño coherente
Refactorizar las variables CSS para tener un sistema coherente:
```css
/* Spacing scale (4px base) */
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;
--space-4: 16px; --space-5: 20px; --space-6: 24px;
--space-8: 32px; --space-10: 40px; --space-12: 48px;

/* Typography scale */
--text-xs: 0.75rem;   /* 12px - captions */
--text-sm: 0.875rem;  /* 14px - secondary text */
--text-base: 1rem;    /* 16px - body */
--text-lg: 1.125rem;  /* 18px - emphasis */
--text-xl: 1.25rem;   /* 20px - section titles */
--text-2xl: 1.5rem;   /* 24px - page titles */
--text-3xl: 1.875rem; /* 30px - hero */

/* Consistent shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
--shadow-md: 0 4px 12px rgba(0,0,0,0.3);
--shadow-lg: 0 8px 32px rgba(0,0,0,0.4);

/* Consistent radius */
--radius-sm: 8px;   /* buttons, chips */
--radius-md: 12px;  /* cards */
--radius-lg: 16px;  /* modals */
--radius-full: 9999px; /* pills, avatars */
```

### 3B. Eliminar TODOS los estilos inline de index.html
Convertir cada `style="..."` en clases reutilizables. No debe quedar NI UN SOLO estilo inline.

### 3C. Micro-interacciones premium
- Hover states con transición suave en TODOS los elementos interactivos
- Active/pressed states con scale(0.98) para feedback táctil
- Focus states visibles con outline para accesibilidad (keyboard navigation)
- Toast notifications con animación slide-in para acciones completadas
- Progress bars con animación de llenado suave (no saltos)
- Skeleton loading screens para secciones pesadas

### 3D. Jerarquía visual en quiz
```
[Progreso: Pregunta 5 de 15  ████████░░ 33%]

Pregunta grande y clara (text-xl, font-weight 600)
con suficiente separación del resto

  ○ Opción A — tocable, padding generoso
  ○ Opción B — hover con fondo sutil  
  ● Opción C — seleccionada con borde y fondo accent
  ○ Opción D

[Comprobar Respuesta]    ← CTA primario, prominente
```

## FASE 4: Performance percibida

### 4A. Carga progresiva
- Mostrar el shell de la app (nav + sección activa) INMEDIATAMENTE
- Diferir el parsing de datos grandes (questions.js = 342KB) con `defer`
- Skeleton screens mientras se cargan los datos

### 4B. Optimización CSS
- Eliminar CSS no utilizado (2574 líneas es excesivo para esta app)
- Ordernar propiedades CSS consistentemente
- CSS crítico inline en `<head>` para primer paint

### 4C. Script loading
```html
<!-- Orden optimizado -->
<script src="data/curriculum.js" defer></script>
<script src="data/summaries.js" defer></script>
<script src="data/flashcards.js" defer></script>
<script src="data/glossary.js" defer></script>
<script src="data/labs.js" defer></script>
<script src="data/questions.js" defer></script>  <!-- el más pesado, último -->
<script src="app.js" defer></script>
```

## FASE 5: Accesibilidad (WCAG 2.1 AA mínimo)

### 5A. Contraste de colores
- Verificar y corregir que TODO el texto cumple ratio 4.5:1 contra su fondo
- `--text-secondary: #94a3b8` sobre `--bg-primary: #0a0e1a` → verificar ratio
- Botones con texto blanco sobre colores accent → verificar cada uno

### 5B. HTML semántico
- Usar `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` correctamente
- Añadir `aria-label` a botones con solo íconos
- Añadir `role="tablist"` al nav si funciona como tabs
- Añadir `aria-current="page"` a la sección activa

### 5C. Keyboard navigation
- Tab order lógico en todas las secciones
- Focus trap en modales
- Escape para cerrar modales
- Enter/Space para confirmar selección en quiz

---

# INSTRUCCIONES DE IMPLEMENTACIÓN

## Orden de ejecución obligatorio
1. **Primero: Lee TODO el CSS actual** (`styles.css`, 2574 líneas) para entender qué existe antes de modificar
2. **Segundo: Lee el HTML** (`index.html`, 583 líneas) para entender la estructura
3. **Tercero: Lee las primeras 200 líneas de app.js** para entender cómo se cambian secciones y se renderizan componentes
4. **Cuarto: Implementa los cambios en este orden:** CSS → HTML → JS (las dependencias van en esa dirección)

## Reglas inamovibles
1. **NO eliminar clases CSS que estén referenciadas en app.js** — busca cada clase antes de borrarla
2. **NO cambiar los `data-section` IDs** — app.js los usa para navegar
3. **NO cambiar las estructuras de datos ni los IDs de elementos** dinámicos que app.js genera
4. **NO añadir dependencias externas** (ni Tailwind, ni Bootstrap, ni nada). Todo vanilla.
5. **Mantener la fuente Google Fonts Inter** (la única dependencia externa permitida)
6. **Mantener el dark mode** como tema principal (no hace falta theme toggle)
7. **100% offline** salvo la fuente Inter (que ya se cachea)
8. **Todo en español**

## Qué SÍ puedes cambiar libremente
- Reorganizar CSS: orden, agrupación, naming conventions
- Cambiar valores de variables CSS: colores, tamaños, sombras, radios
- Reestructurar HTML: order de elementos, wrappers, clases
- Añadir media queries (actualmente hay CERO)
- Añadir animaciones CSS (keyframes, transitions)
- Añadir pseudo-elementos para decoración
- Cambiar el layout del nav completamente
- Eliminar estilos inline del HTML y reemplazar por clases

## Entrega esperada
1. **styles.css** completo y refactorizado (no solo diff — dame el archivo completo, puede ser largo)
2. **index.html** con cambios indicados (puedes dar solo los bloques modificados si prefieres)
3. **app.js** — SOLO los bloques que necesiten cambios (ej: si cambias cómo funciona el nav, muéstrame el bloque relevante de app.js que hay que actualizar)
4. **Resumen de cambios** con capturas conceptuales de cómo debería verse

## MÉTRICA DE ÉXITO
- ✅ La app se ve profesional y premium en desktop, tablet y móvil
- ✅ Un usuario nuevo entiende intuitivamente cómo navegar sin instrucciones
- ✅ El quiz se puede hacer cómodamente desde un iPhone SE (pantalla 375px)
- ✅ La carga percibida es <2 segundos
- ✅ No se ha roto ninguna funcionalidad existente
- ✅ El código CSS es mantenible: bien organizado, sin duplicación, sin inline styles
```
