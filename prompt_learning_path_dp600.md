# Prompt: Ruta de Aprendizaje Guiada — DP-600 Study Companion

> [!TIP]
> Copia todo el contenido debajo de la línea `---` y pégalo como prompt a un agente con acceso completo al proyecto `C:\work\Viscofan-V2_work\dp600-study\`.

---

```
# CONTEXTO Y PROBLEMA

## Proyecto
SPA offline (HTML/CSS/JS vanilla, sin dependencias) para preparar la certificación DP-600 de Microsoft Fabric. La app ya tiene contenido extenso:
- ~350+ preguntas (single-choice + multi-select + ordering + case studies)
- ~165 flashcards
- ~40 summaries con links a MS Learn
- ~130 términos de glosario
- 17 laboratorios guiados
- Dashboard, quiz con filtros, flashcards con repaso espaciado, simulador de examen, mapa de conocimiento, analíticas, notas personales, badges

## El Problema
La app es excelente como **herramienta de práctica** para alguien que ya conoce los temas. Pero para alguien que **empieza de cero** a preparar la certificación, la experiencia es:
1. Abre la app → ve un dashboard vacío con 0 en todo
2. Tiene 10+ secciones disponibles → no sabe cuál elegir primero
3. Va al quiz → 350 preguntas sin orden → no sabe por dónde empezar
4. No hay concepto de "lección 1", ni de progresión lógica

**Lo que necesita:** una RUTA DE APRENDIZAJE estructurada que guíe al estudiante desde cero hasta estar listo para el examen, con módulos ordenados que combinan teoría → práctica → evaluación.

## Referencia de diseño
NO queremos un clon de Duolingo (repetición mecánica de micro-lecciones). El modelo es más parecido a un **curso estructurado tipo MS Learn / Coursera**, con estas características:
- Progresión lineal clara (módulo 1 → 2 → 3...)
- Cada módulo tiene un tema concreto
- Dentro de cada módulo: leer → repasar → practicar → (opcionalmente) hacer lab
- El siguiente módulo se "recomienda" cuando el anterior alcanza un umbral (pero no se bloquea)   
- Vista general de progreso clara

---

## Estructura de Archivos Actual
dp600-study/
├── index.html          (25KB)
├── styles.css          (45KB)
├── app.js              (107KB, ~2695 líneas)
└── data/
    ├── questions.js    (342KB — ~350+ preguntas con campo subtopic)
    ├── flashcards.js   (45KB — ~165 flashcards)
    ├── summaries.js    (47KB — ~40 summaries)
    ├── glossary.js     (35KB — ~130 términos)
    └── labs.js         (39KB — 17 labs)

## Stack (NO cambiar)
HTML5/CSS3/JS Vanilla, sin dependencias, LocalStorage, offline.

---

# OBJETIVO: IMPLEMENTAR RUTA DE APRENDIZAJE GUIADA

## PARTE 1: NUEVO ARCHIVO data/curriculum.js

Crear un archivo `data/curriculum.js` que defina la ruta de aprendizaje como un array de módulos. Cada módulo agrupa contenido EXISTENTE (summaries, flashcards, questions, labs) en una secuencia lógica.

### Formato del módulo:
```javascript
const CURRICULUM = [
  {
    id: 1,
    title: "Microsoft Fabric y OneLake",
    description: "Entiende qué es Fabric, su arquitectura SaaS y por qué OneLake es tan importante.",
    domain: 1,
    icon: "🏗️",
    estimatedMinutes: 25,
    // IDs de contenido EXISTENTE a incluir en este módulo:
    summaryIds: [1],          // Summaries a leer (siempre primero)
    flashcardIds: [1, 2, 3],  // Flashcards para repasar conceptos clave
    questionSubtopics: ["OneLake", "OneLake Catalog"],  // Filtra preguntas por estos subtopics
    labIds: [],               // Labs asociados (puede estar vacío)
    glossaryTerms: ["OneLake", "OneLake Catalog", "Delta Lake"],  // Términos relevantes del glosario
    prerequisites: [],        // IDs de módulos previos recomendados
    examWeight: "alto"        // alto, medio, bajo — importancia en el examen
  },
  // ... más módulos
];
```

### Orden de los módulos (20 módulos):
El orden sigue una progresión lógica: conceptos base → almacenamiento → preparación de datos → mantenimiento → modelos semánticos → optimización → examen.

**Fase 1 — Fundamentos (Módulos 1-3):**
1. **Microsoft Fabric y OneLake** — Qué es Fabric, arquitectura, OneLake, componentes principales
2. **Lakehouse: Tu Primer Almacén** — Crear un Lakehouse, estructura (Tables/Files), SQL Analytics Endpoint, Visual Query Editor
3. **Delta Lake Esencial** — Formato Delta, transacciones ACID, time travel, schema enforcement/evolution, OPTIMIZE/VACUUM/Z-ORDER

**Fase 2 — Preparación de Datos (Módulos 4-9), Dominio 1:**
4. **Data Warehouse en Fabric** — Diferencias con Lakehouse, T-SQL completo (DML/DDL), MERGE INTO, COPY INTO
5. **T-SQL Avanzado para Analistas** — CTEs, Window Functions, PIVOT/UNPIVOT, cross-database queries
6. **Notebooks y Spark** — PySpark/SparkSQL, DataFrames, operaciones Delta desde código, UDFs
7. **Pipelines y Dataflows Gen2** — Copy Data, Notebook Activity, parámetros dinámicos, ForEach, error handling; Power Query M, staging vs destination
8. **Shortcuts e Integración de Datos** — Tipos de shortcuts (OneLake, ADLS Gen2, S3, Dataverse), limitaciones, Medallion Architecture (Bronze→Silver→Gold)
9. **Real-Time Intelligence** — Eventstream, Eventhouse, KQL, Data Activator, Real-Time Hub, descubrimiento de streams

**Fase 3 — Mantenimiento de Soluciones (Módulos 10-14), Dominio 2:**
10. **Seguridad: Workspaces y Permisos** — Roles de workspace, RLS/CLS/OLS, file-level access, compartir informes, permisos Read vs Build
11. **Governance y Purview** — Sensitivity labels, endorsement (Promoted/Certified), data domains, lineage, impact analysis
12. **CI/CD: Git y Deployment Pipelines** — Git integration, .pbip, .pbit, .pbids, deployment rules, parameter rules, entornos Dev/Test/Prod
13. **Capacidad y Monitorización** — Capacity Units, throttling/smoothing/bursting, Capacity Metrics App, Activity Log, autoscale, SKUs
14. **Networking y Conectividad** — VNet Gateway, On-premises Data Gateway, Managed Private Endpoints, Trusted Workspace Access

**Fase 4 — Modelos Semánticos (Módulos 15-19), Dominio 3:**
15. **Modelos Semánticos y Star Schema** — Diseño de estrella, relaciones, roles de tablas, storage modes (Import/DirectQuery/Direct Lake/Dual)
16. **DAX Fundamental** — CALCULATE, filter context vs row context, iteradores (SUMX/AVERAGEX), variables, información
17. **DAX Avanzado** — Time Intelligence, TREATAS, USERELATIONSHIP, Calculation Groups, DAX Windowing (OFFSET/INDEX/WINDOW)
18. **Direct Lake en Profundidad** — Framing, fallback, guardrails por SKU, Direct Lake on OneLake vs SQL endpoint, Large Semantic Model Storage Format
19. **Composite Models y Rendimiento** — Composite models, chained models, DirectQuery sobre modelos, XMLA endpoint, Performance Analyzer, DAX Studio, Best Practices Analyzer

**Fase 5 — Examen (Módulo 20):**
20. **Preparación Final para el Examen** — Repaso de debilidades, simulacros cronometrados, case studies, estrategia de examen

### Mapeo de contenido existente
Cada módulo debe incluir los IDs reales de summaries, flashcards, labs y subtopics que ya existen en la app. Para hacer este mapeo:
1. Lee `data/summaries.js` y asigna cada summary (por su `title` y `domain`) al módulo más apropiado
2. Lee `data/flashcards.js` y asigna cada flashcard (por su `front` y `domain`) al módulo más apropiado
3. Lee `data/labs.js` y asigna cada lab al módulo correspondiente
4. Para las preguntas, usa el campo `subtopic` de cada pregunta para mapearlas — no asignes IDs individuales, sino subtopics (ej: "Delta Lake", "DAX Windowing")
5. Lee `data/glossary.js` y asigna los términos más relevantes a cada módulo (5-10 por módulo)

**IMPORTANTE:** No crear contenido nuevo. Solo organizar el contenido existente en la secuencia de módulos.

---

## PARTE 2: NUEVA SECCIÓN EN LA APP — "Mi Ruta" 🎓

### 2A. Botón en la navegación
Añadir un nuevo botón en el nav (el PRIMERO de la lista, antes de Dashboard):
```html
<button class="nav-link" data-section="learning-path">🎓 Mi Ruta</button>
```

### 2B. Sección HTML nueva en index.html
Añadir una nueva sección `<section id="learning-path" class="section">` con:

```
┌─────────────────────────────────────────────────┐
│  🎓 Mi Ruta de Aprendizaje                      │
│  Progreso general: ████████░░░░ 65%              │
│  Módulos completados: 13/20                      │
│                                                   │
│  Fase 1 — Fundamentos                            │
│  ┌──────────────────────────┐                    │
│  │ ✅ 1. Fabric y OneLake   │  100% completado   │
│  │    📄 1 resumen leído     │                    │
│  │    🃏 3/3 flashcards      │                    │
│  │    ✅ 5/5 preguntas       │                    │
│  └──────────────────────────┘                    │
│  ┌──────────────────────────┐                    │
│  │ 🔵 2. Lakehouse          │  60% completado    │
│  │    📄 1 resumen leído     │  ← ACTUAL         │
│  │    🃏 2/4 flashcards      │                    │
│  │    ❓ 0/8 preguntas       │                    │
│  │    🔬 0/1 lab             │                    │
│  │                           │                    │
│  │  [▶ Continuar Módulo]     │                    │
│  └──────────────────────────┘                    │
│  ┌──────────────────────────┐                    │
│  │ ⬜ 3. Delta Lake          │  No iniciado      │
│  └──────────────────────────┘                    │
│                                                   │
│  Fase 2 — Preparación de Datos                    │
│  ┌──────────────────────────┐                    │
│  │ ⬜ 4. Data Warehouse      │  No iniciado      │
│  └──────────────────────────┘                    │
│  ...                                              │
└─────────────────────────────────────────────────┘
```

### 2C. Vista del módulo individual
Al hacer click en un módulo (o en "Continuar Módulo"), se expande o abre una vista detallada con 4 pasos en orden:

```
┌─────────────────────────────────────────────────┐
│  📘 Módulo 2: Lakehouse — Tu Primer Almacén     │
│  Dominio 1 · Peso en examen: alto · ~30 min      │
│                                                   │
│  Paso 1: Lee el resumen  ────────────── ✅ hecho │
│  ┌─ "Lakehouse en Fabric" ──────────────────┐   │
│  │  (resumen completo inline)                │   │
│  │  📎 MS Learn →                            │   │
│  └──────────────────────────────────────────┘   │
│                                                   │
│  Paso 2: Repasa las flashcards ────────── 🔵 2/4 │
│  [Abrir flashcards del módulo]                    │
│                                                   │
│  Paso 3: Pon a prueba tu conocimiento ── ❓ 0/8  │
│  [Iniciar quiz del módulo]                        │
│    (solo preguntas de los subtopics del módulo)   │
│    Umbral de dominio: ≥70% para completar         │
│                                                   │
│  Paso 4: Práctica hands-on ─────────── ⬜ 0/1    │
│  [Abrir Lab: Crear un Lakehouse y cargar datos]   │
│                                                   │
│  Bonus: Términos del glosario                     │
│  OneLake · Delta Lake · SQL Analytics Endpoint    │
│  (click para ir al glosario)                      │
│                                                   │
│  ── Progreso del módulo: 40% ──                   │
│  ████░░░░░░                                       │
│  [◀ Anterior]              [▶ Siguiente módulo]   │
└─────────────────────────────────────────────────┘
```

### 2D. Lógica de progreso por módulo
```javascript
// Cómo se calcula el progreso de cada módulo:
function getModuleProgress(module) {
  const steps = {
    summaries: { weight: 0.15 },    // 15% — leer los resúmenes
    flashcards: { weight: 0.15 },   // 15% — repasar las flashcards
    questions: { weight: 0.50 },    // 50% — responder preguntas con ≥70% acierto
    labs: { weight: 0.20 }          // 20% — completar los labs (si hay; si no, redistribuir)
  };

  // Summaries: se marcan como "leídos" cuando el usuario los abre en el módulo
  // Flashcards: porcentaje de flashcards del módulo que han sido revisadas al menos 1 vez
  // Questions: respondidas correctamente / total de preguntas del módulo (mínimo 70% para completar)
  // Labs: pasos completados / total de pasos del lab
}
```

Reglas de progreso:
- Un módulo se marca como "completado" (✅) cuando alcanza 100% (todos los summaries leídos, todas las flashcards revisadas, ≥70% acierto en preguntas, labs terminados)
- No hay bloqueo: el usuario puede saltar a cualquier módulo, pero se muestra una recomendación clara de cuál debería hacer a continuación
- El progreso se guarda en `stats.curriculumProgress` dentro de LocalStorage
- Formato: `{ moduleId: { summariesRead: [1, 2], flashcardsReviewed: [5, 6], questionsAccuracy: 0.85, labsCompleted: true } }`

---

## PARTE 3: ONBOARDING PARA NUEVOS USUARIOS

### 3A. Modal de bienvenida (primera vez)
Cuando `stats.answered === 0` AND `stats.curriculumStarted !== true`, mostrar un modal de bienvenida:

```
┌─────────────────────────────────────────────────┐
│                                                   │
│          🎓 ¡Bienvenido al DP-600                │
│              Study Companion!                     │
│                                                   │
│  Esta app te va a ayudar a preparar la            │
│  certificación Microsoft Fabric Analytics         │
│  Engineer Associate (DP-600).                     │
│                                                   │
│  El examen tiene 3 dominios:                      │
│                                                   │
│  📘 Preparar Datos (45-50%)                       │
│  🔧 Mantener Soluciones (25-30%)                  │
│  📐 Modelos Semánticos (25-30%)                   │
│                                                   │
│  Hemos preparado una ruta de 20 módulos           │
│  que te llevarán de cero a listo para             │
│  el examen. ¿Cómo quieres empezar?               │
│                                                   │
│  [🎓 Seguir la Ruta de Aprendizaje]  ← principal │
│  [📊 Ir al Dashboard]     ← para usuarios avanzados │
│                                                   │
└─────────────────────────────────────────────────┘
```

Si elige "Seguir la Ruta", navegar directamente a la sección `learning-path` y abrir el Módulo 1.

### 3B. Recordatorio en el Dashboard
En el dashboard, cuando el usuario tiene una ruta activa, añadir un card destacado arriba de las métricas:

```
┌─────────────────────────────────────────────────┐
│  🎓 Tu Ruta de Aprendizaje                       │
│  Módulo actual: 7. Pipelines y Dataflows Gen2     │
│  Progreso general: 35%                            │
│  [Continuar →]                                    │
└─────────────────────────────────────────────────┘
```

---

## PARTE 4: INTEGRACIÓN CON QUIZ Y FLASHCARDS

### 4A. Quiz desde módulo
Cuando el usuario inicia un quiz desde un módulo, el quiz debe:
- Pre-configurar los filtros (dominio + subtopics del módulo)
- Mostrar un banner: "Quiz del Módulo 7: Pipelines y Dataflows Gen2"
- Al terminar, registrar el resultado en el progreso del módulo
- Ofrecer botón: "Volver al módulo" además de los botones normales

### 4B. Flashcards desde módulo
Cuando se abren flashcards desde un módulo:
- Filtrar solo las flashcards del módulo (por IDs)
- Mostrar un banner: "Flashcards del Módulo 7"
- Registrar revisión en el progreso del módulo
- Botón: "Volver al módulo"

### 4C. Summaries desde módulo
Cuando se abre un summary desde un módulo:
- Marcar como "leído" en el progreso del módulo
- No cambiar la funcionalidad del summary en sí

---

## INSTRUCCIONES DE IMPLEMENTACIÓN

### Reglas de integridad
1. **NO romper funcionalidades existentes.** Todo lo actual (quiz, flashcards, examen, labs, glosario, notas, analytics, badges, export/import) debe seguir funcionando idéntico.
2. **100% offline, sin dependencias externas.**
3. **Backward-compatibility de LocalStorage.** Si el usuario ya tiene progreso guardado, no debe perderse. El nuevo campo `curriculumProgress` se añade al objeto stats con un default vacío.
4. **Todo en español** consistente con el contenido existente.

### Reglas de diseño
5. **Usar el sistema de diseño existente.** Variables CSS, glassmorphism, dark mode, animaciones existentes. Extender, no reescribir.
6. **Cards del módulo:** Usar las clases existentes (`.card`, `.btn`, `.btn-primary`, `.badge`) y añadir nuevas clases solo para la ruta. Las cards deben tener:
   - Color de borde que indique estado: gris (no iniciado), azul/cian (en progreso), verde (completado)
   - Transición suave al expandir/contraer
   - Icono del módulo animado levemente
7. **La sección "Mi Ruta" debe ser la primera impresión visual** — diseñarla como la página más pulida, con progresión visual clara y satisfactoria.
8. **Fases como encabezados** — los 20 módulos se agrupan visualmente bajo las 5 fases. Cada fase tiene un titulo con icono.
9. **Progreso visual con barras** — usar barras de progreso animadas consistentes con las del dashboard.
10. **Responsive:** funcionar bien tanto en desktop como en móvil.

### Reglas de código
11. **Nuevo archivo:** `data/curriculum.js` — contiene solo la constante CURRICULUM con los 20 módulos.
12. **index.html:** Añadir `<script src="data/curriculum.js">` antes de `app.js`. Añadir el botón de navegación. Añadir la sección HTML.
13. **app.js:** Añadir las funciones de renderizado y lógica de la ruta. NO reescribir funciones existentes.
14. **styles.css:** Añadir nuevos estilos al final. NO modificar estilos existentes.

### Orden de ejecución
1. Primero: `data/curriculum.js` (definir los 20 módulos con mapeo a contenido real)
2. Segundo: `index.html` (nav + sección HTML + script tag)
3. Tercero: `app.js` (lógica de renderizado, progreso, onboarding modal, integración con quiz/flashcards)
4. Cuarto: `styles.css` (estilos de la ruta, modal, cards de módulos)

### Métrica de éxito
Tras implementar, un usuario que abra la app por primera vez debe:
- Ver el modal de bienvenida
- Poder elegir "Seguir la Ruta"
- Aterrizar en el Módulo 1 con un resumen para leer
- Poder progresivamente avanzar por los 20 módulos
- Ver su progreso global y por módulo en todo momento
- Poder saltar a cualquier módulo libremente (no hay bloqueo)

## ENTREGA ESPERADA
Dame el código completo de CADA archivo nuevo y modificado. Si un archivo es muy largo, usa múltiples bloques de código numerados. Indica claramente qué es nuevo y qué es modificado. Empieza por `data/curriculum.js`, luego las modificaciones a `index.html`, `app.js` y `styles.css`.
```
