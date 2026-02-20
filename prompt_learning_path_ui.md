# Prompt: Implementar UI y Lógica de "Mi Ruta de Aprendizaje"

```
# CONTEXTO

## Proyecto
SPA offline (HTML/CSS/JS vanilla, sin dependencias) para preparar la certificación DP-600 de Microsoft Fabric.
Ruta del proyecto: C:\work\Viscofan-V2_work\dp600-study\

## Estado Actual
El archivo `data/curriculum.js` YA EXISTE con 20 módulos organizados en 5 fases. Cada módulo tiene:
- summaryIds, flashcardIds, questionSubtopics, labIds, glossaryTerms
- Constantes: CURRICULUM (array de 20 módulos) y CURRICULUM_PHASES (5 fases)

Pero la funcionalidad NO está integrada en la app:
- index.html NO tiene sección "Mi Ruta" ni botón de navegación
- app.js NO referencia CURRICULUM ni tiene lógica de la ruta
- styles.css NO tiene estilos para la ruta
- NO hay onboarding modal

## Archivos relevantes
- index.html (25KB) — SPA con nav lateral + secciones
- app.js (107KB, ~2695 líneas) — toda la lógica dentro de un IIFE `(function() { 'use strict'; ... })()`
- styles.css (45KB) — dark mode, glassmorphism, variables CSS
- data/curriculum.js (13KB) — YA CREADO, no modificar

## Funciones y patrones existentes en app.js que DEBES reutilizar:
- `setActiveSection(sectionId)` — cambia de sección, hace scroll to top
- `goToFlashcard(id)`, `goToSummary(id)`, `goToLab(id)`, `goToGlossary(term)` — ya existen como window globals para navegación cross-content
- `startQuiz()` — inicia quiz usando state.quizDomain, state.quizDiff, state.quizSubtopic como filtros
- `initFlashcards()`, `renderFlashcard()` — sistema de flashcards existente con state.fcDomain y state.fcOrder
- `renderLabs()` — renderiza labs con state.labsDomain/labsDiff
- `state.stats` — objeto persistido en LocalStorage con todo el progreso del usuario
- `saveStats()` — guarda state.stats en LocalStorage
- `escapeHtml(str)` — sanitizador de HTML
- `getSubtopicAttemptStats()` — devuelve stats por subtopic
- Los datos globales son: ALL_QUESTIONS, FLASHCARDS, SUMMARIES, LABS, GLOSSARY, CURRICULUM, CURRICULUM_PHASES

## Estructura del nav en index.html (para saber dónde insertar):
Los botones de navegación están en un <nav> con clase "sidebar". Cada botón es:
<button class="nav-link" data-section="dashboard">📊 Dashboard</button>

## Estructura de secciones en index.html:
Cada sección principal es:
<section id="nombre-seccion" class="section">...</section>

---

# TAREA: Implementar las Partes 2, 3 y 4 del Learning Path

## PARTE 2: SECCIÓN "MI RUTA" EN LA APP

### 2A. index.html — Añadir botón de navegación
Insertar ANTES del botón de Dashboard, como PRIMER botón del nav:
```html
<button class="nav-link" data-section="learning-path">🎓 Mi Ruta</button>
```

### 2B. index.html — Añadir script tag
Insertar `<script src="data/curriculum.js"></script>` ANTES de `<script src="app.js"></script>` (después de los otros data scripts).

### 2C. index.html — Añadir sección HTML
Añadir una nueva sección dentro del main content area:
```html
<section id="learning-path" class="section">
  <h2>🎓 Mi Ruta de Aprendizaje</h2>
  <div class="lp-global-progress">
    <div class="lp-global-bar"><div class="lp-global-fill" id="lp-global-fill"></div></div>
    <span id="lp-global-text">0/20 módulos</span>
  </div>
  <div id="lp-phases-container"></div>
  <div id="lp-module-detail" class="lp-module-detail" style="display:none;"></div>
</section>
```

### 2D. app.js — Renderizar la vista general de la ruta
Dentro del IIFE existente, añadir función `renderLearningPath()` que:

1. Renderiza las 5 fases con sus módulos como cards:
```
Fase 1 — 🏗️ Fundamentos
┌───────────────────────────────┐  ┌───────────────────────────────┐
│ ✅ 1. Fabric y OneLake        │  │ 🔵 2. Lakehouse               │
│    25 min · Peso: alto        │  │    30 min · Peso: alto        │
│    ████████████ 100%          │  │    ██████░░░░░ 55%            │
└───────────────────────────────┘  └───────────────────────────────┘
```

2. Para cada módulo calcula progreso con `getModuleProgress(module)`:
   - **Summaries (15%):** % de summaryIds que el usuario ha marcado como leídos en `stats.curriculumProgress[moduleId].summariesRead`
   - **Flashcards (15%):** % de flashcardIds del módulo que aparecen en `stats.fcRatings` (ya se registran cuando el usuario valora una flashcard)
   - **Questions (50%):** De las preguntas con subtopics del módulo en `questionSubtopics`, calcula el % de acierto usando `stats.questionHistory`. Se necesita ≥70% acierto con al menos 5 preguntas respondidas para darlo por completado.
   - **Labs (20%):** % de labIds del módulo que están en `stats.labsCompleted`. Si el módulo NO tiene labs (labIds=[]), redistribuir el 20% entre los demás pasos proporcionalmente.

3. Estado visual del módulo:
   - ⬜ No iniciado (gris) — 0% progreso
   - 🔵 En progreso (azul/cian) — 1-99% progreso
   - ✅ Completado (verde) — 100% progreso

4. Click en un módulo → llama a `openModuleDetail(moduleId)`

5. La barra de progreso global (`lp-global-fill`) muestra % de módulos completados.

### 2E. app.js — Vista detallada del módulo
`openModuleDetail(moduleId)` oculta la lista de fases y muestra `lp-module-detail` con:

```html
<!-- Cabecera -->
<div class="lp-detail-header">
  <button class="btn btn-secondary" onclick="closeLearningPathDetail()">◀ Volver a Mi Ruta</button>
  <h3>⭐ Módulo 15: Modelos Semánticos y Star Schema</h3>
  <p>Dominio 3 · Peso: alto · ~30 min</p>
  <div class="lp-detail-bar"><div class="lp-detail-fill" style="width:65%"></div></div>
</div>

<!-- Paso 1: Resúmenes -->
<div class="lp-step card">
  <div class="lp-step-header">
    <span>📄 Paso 1: Lee los resúmenes</span>
    <span class="lp-step-status">✅ 2/2 leídos</span>
  </div>
  <div class="lp-step-content">
    <!-- Para cada summaryId del módulo, mostrar título con botón para ir al resumen -->
    <button class="btn btn-secondary" onclick="markSummaryRead(15, 10); goToSummary(10)">
      📄 Modelos Semánticos — Fundamentos  ✅
    </button>
    <button class="btn btn-secondary" onclick="markSummaryRead(15, 13); goToSummary(13)">
      📄 Star Schema y Diseño Dimensional  ✅
    </button>
  </div>
</div>

<!-- Paso 2: Flashcards -->
<div class="lp-step card">
  <div class="lp-step-header">
    <span>🃏 Paso 2: Repasa las flashcards</span>
    <span class="lp-step-status">🔵 5/7 revisadas</span>
  </div>
  <div class="lp-step-content">
    <button class="btn btn-primary" onclick="startModuleFlashcards(15)">
      Abrir Flashcards del Módulo
    </button>
  </div>
</div>

<!-- Paso 3: Quiz -->
<div class="lp-step card">
  <div class="lp-step-header">
    <span>❓ Paso 3: Pon a prueba tu conocimiento</span>
    <span class="lp-step-status">🔵 72% (12 respondidas)</span>
  </div>
  <div class="lp-step-content">
    <p>Responde preguntas de los subtopics: Star Schema, Storage Modes</p>
    <p>Umbral para completar: ≥70% acierto con al menos 5 preguntas</p>
    <button class="btn btn-primary" onclick="startModuleQuiz(15)">
      Iniciar Quiz del Módulo
    </button>
  </div>
</div>

<!-- Paso 4: Labs (solo si labIds.length > 0) -->
<div class="lp-step card">
  <div class="lp-step-header">
    <span>🔬 Paso 4: Práctica hands-on</span>
    <span class="lp-step-status">⬜ 0/1</span>
  </div>
  <div class="lp-step-content">
    <button class="btn btn-secondary" onclick="goToLab(13)">
      🔬 Lab: Crear modelo Star Schema completo
    </button>
  </div>
</div>

<!-- Bonus: Glosario -->
<div class="lp-step card lp-step-bonus">
  <div class="lp-step-header">
    <span>📖 Términos clave del glosario</span>
  </div>
  <div class="lp-step-content lp-glossary-chips">
    <button class="chip" onclick="goToGlossary('Star Schema')">Star Schema</button>
    <button class="chip" onclick="goToGlossary('Direct Lake')">Direct Lake</button>
    <!-- etc -->
  </div>
</div>

<!-- Navegación entre módulos -->
<div class="lp-nav-footer">
  <button class="btn btn-secondary" onclick="openModuleDetail(14)">◀ Anterior</button>
  <button class="btn btn-primary" onclick="openModuleDetail(16)">Siguiente ▶</button>
</div>
```

### 2F. app.js — Funciones de integración con quiz y flashcards desde módulo

**startModuleQuiz(moduleId):**
1. Obtener el módulo de CURRICULUM
2. Filtrar ALL_QUESTIONS por los subtopics del módulo (`module.questionSubtopics`)
3. Setear state para el quiz: `state.quizDomain = module.domain; state.quizSubtopic = '';`
4. Guardar en state un flag: `state.quizFromModule = moduleId`
5. Navegar a sección quiz con un subset filtrado de preguntas (overriding state.quizQuestions directamente con las preguntas filtradas por subtopic)
6. Mostrar un banner: "Quiz del Módulo X: [título]"

**startModuleFlashcards(moduleId):**
1. Obtener flashcardIds del módulo
2. Filtrar FLASHCARDS por esos IDs
3. Setear `state.fcOrder = flashcardsFiltradas; state.fcIndex = 0;`
4. Guardar flag: `state.fcFromModule = moduleId`
5. Navegar a sección flashcards y renderizar
6. Mostrar banner: "Flashcards del Módulo X"

**markSummaryRead(moduleId, summaryId):**
1. Inicializar `stats.curriculumProgress[moduleId]` si no existe
2. Añadir summaryId a `stats.curriculumProgress[moduleId].summariesRead` si no está ya
3. `saveStats()`

**closeLearningPathDetail():**
1. Ocultar `lp-module-detail`
2. Mostrar `lp-phases-container`
3. Re-renderizar progreso actualizado

### 2G. app.js — Persistencia del progreso curricular
Añadir al `defaultStats()`:
```javascript
curriculumProgress: {},   // { moduleId: { summariesRead: [] } }
curriculumStarted: false  // true después del onboarding
```
Añadir al `normalizeStats()` la normalización de estos campos.

### 2H. app.js — Registrar sección en navegación
En la función `setActiveSection(section)`, añadir:
```javascript
if (section === 'learning-path') renderLearningPath();
```

---

## PARTE 3: ONBOARDING MODAL

### 3A. Modal de bienvenida
Al final de la inicialización de la app (en el evento DOMContentLoaded o al final del IIFE), verificar:
```javascript
if (state.stats.answered === 0 && !state.stats.curriculumStarted) {
  showOnboardingModal();
}
```

**showOnboardingModal():**
Crear un modal overlay (div con position fixed, fondo oscuro semitransparente, card centrada) con:
```
🎓 ¡Bienvenido al DP-600 Study Companion!

Esta app te ayudará a preparar la certificación
Microsoft Fabric Analytics Engineer Associate.

El examen tiene 3 dominios:
📘 Preparar Datos (45-50%)
🔧 Mantener Soluciones (25-30%)
📐 Modelos Semánticos (25-30%)

Hemos preparado una ruta de 20 módulos que te
llevarán de cero a listo para el examen.

[🎓 Seguir la Ruta de Aprendizaje]  ← botón primario (grande)
[📊 Ir al Dashboard]                ← botón secundario (pequeño)
```

Al elegir "Seguir la Ruta":
- `state.stats.curriculumStarted = true; saveStats();`
- Cerrar modal
- `setActiveSection('learning-path')`
- `openModuleDetail(1)` — abrir directamente el módulo 1

Al elegir "Ir al Dashboard":
- `state.stats.curriculumStarted = true; saveStats();`
- Cerrar modal

### 3B. Card de continuación en Dashboard
En la función `updateDashboard()`, si `state.stats.curriculumStarted === true`, insertar un card destacado ANTES de las métricas:
```html
<div class="card lp-dashboard-card">
  <h4>🎓 Tu Ruta de Aprendizaje</h4>
  <p>Módulo actual: [nombre del primer módulo no completado]</p>
  <div class="lp-dash-bar"><div class="lp-dash-fill" style="width:35%"></div></div>
  <p>Progreso general: 35% · 7/20 módulos</p>
  <button class="btn btn-primary" onclick="setActiveSection('learning-path')">Continuar →</button>
</div>
```
El "módulo actual" es el primer módulo cuyo progreso < 100%.

---

## PARTE 4: ESTILOS CSS

Añadir al FINAL de styles.css (NO modificar clases existentes):

Necesitas estilos para:
- `.lp-global-progress` — contenedor barra global (flexbox, altura 8px)
- `.lp-global-bar`, `.lp-global-fill` — barra de progreso con gradiente cian/verde y animación de transición
- `.lp-phase` — encabezado de cada fase (título grande con icono)
- `.lp-modules-grid` — grid de módulos (auto-fill, min 280px, gap 16px)
- `.lp-module-card` — card de cada módulo con borde izquierdo coloreado según estado:
  - No iniciado: `border-left: 4px solid var(--glass-border)` (gris)
  - En progreso: `border-left: 4px solid var(--accent-cyan)` (cian)
  - Completado: `border-left: 4px solid #4CAF50` (verde)
  - Hover: elevar ligeramente (transform: translateY(-2px)), cursor pointer
- `.lp-module-card .lp-card-bar` — mini barra de progreso dentro de la card
- `.lp-module-detail` — contenedor del detalle del módulo
- `.lp-detail-header` — cabecera con glassmorphism (como las cards existentes)
- `.lp-step` — cada paso del módulo (ligeramente diferente del .card normal: padding mayor, icon a la izquierda)
- `.lp-step-header` — flexbox entre nombre del paso y status (justify-content: space-between)
- `.lp-step-status` — badge con color según estado
- `.lp-step-bonus` — estilo más sutil para la sección de glosario (opacidad menor, sin borde especial)
- `.lp-glossary-chips` — flex wrap, gap 8px
- `.chip` — botón pequeño redondeado (border-radius 16px), fondo glass, hover suave
- `.lp-nav-footer` — flex, justify-content space-between, margin top
- `.lp-dashboard-card` — card destacada para el dashboard con borde top gradiente cian→verde
- Modal onboarding:
  - `.onboarding-overlay` — position fixed, inset 0, background rgba(0,0,0,0.7), z-index 9999, flex center
  - `.onboarding-modal` — max-width 480px, padding 32px, glassmorphism, border-radius 16px, text-align center
  - Animación de entrada: fadeIn + scale from 0.9 to 1
- Responsive: en móvil (max-width 768px), los módulos van a 1 columna y la card del modal va full width con padding 16px.

**IMPORTANTE:** Usar las variables CSS existentes del proyecto:
- `var(--accent-cyan)`, `var(--accent-purple)`, `var(--glass-bg)`, `var(--glass-border)`, `var(--text-primary)`, `var(--text-secondary)`
- Usar `backdrop-filter: blur()` para glassmorphism, consistente con el diseño existente

---

## INSTRUCCIONES OBLIGATORIAS

1. **NO modificar `data/curriculum.js`** — ya está completo.
2. **NO romper funcionalidades existentes.** Las 12+ secciones actuales deben seguir funcionando.
3. **Añadir TODO el código nuevo dentro del IIFE existente en app.js** — `(function() { 'use strict'; ... })()`. No crear funciones globales excepto las que necesitan ser `onclick` desde HTML (usar `window.functionName = function() {...}`).
4. **Backward-compatibility de LocalStorage.** El nuevo campo `curriculumProgress` y `curriculumStarted` deben tener defaults seguros en `normalizeStats()`.
5. **100% offline, sin dependencias.**
6. **Todo en español** consistente con el resto de la app.
7. **Usar las funciones existentes** `goToFlashcard`, `goToSummary`, `goToLab`, `goToGlossary`, `setActiveSection`, `escapeHtml` — no reimplementar.
8. **El botón "Mi Ruta" debe ser el PRIMER botón** del nav (antes de Dashboard).

## ENTREGA
Dame el código completo de CADA cambio:
1. Cambios a `index.html` (nuevo nav button, nuevo script tag, nueva section)
2. Adiciones a `app.js` (todas las funciones nuevas, modificaciones a setActiveSection, defaultStats, normalizeStats, init)
3. Adiciones a `styles.css` (todos los estilos nuevos al final)

Indica claramente qué es nuevo y dónde se inserta en cada archivo existente.
```
