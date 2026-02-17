// DP-600 Labs — Guided practical exercises for Microsoft Fabric
const LABS = [
  {
    id: 1,
    domain: 1,
    difficulty: 1,
    title: "Crear un Lakehouse y cargar datos CSV/Parquet",
    duration: "30 min",
    prerequisites: [
      "Workspace de Fabric con capacidad asignada",
      "Permisos de Contributor o superior"
    ],
    objectives: [
      "Crear un Lakehouse en Fabric",
      "Cargar archivos CSV/Parquet en Files",
      "Crear una tabla Delta en Tables",
      "Consultar la tabla desde SQL Endpoint"
    ],
    steps: [
      {
        step: 1,
        title: "Crear el Lakehouse",
        instruction: "Entra en `app.fabric.microsoft.com`, abre tu workspace y selecciona `+ Nuevo > Lakehouse`. Nómbralo `LH_Demo_Ingesta`.",
        tip: "Si no ves Lakehouse, confirma que el workspace está en capacidad Fabric (F o P).",
        validation: "Debes ver las áreas `Files` y `Tables` en el panel del Lakehouse."
      },
      {
        step: 2,
        title: "Subir archivos fuente",
        instruction: "En `Files`, crea la carpeta `raw/sales` y sube un CSV y un Parquet de ejemplo.",
        tip: "Usa nombres de archivo estables (`sales_2026_01.csv`) para facilitar pipelines posteriores.",
        validation: "Los archivos deben verse en `Files/raw/sales` con tamaño y fecha correctos."
      },
      {
        step: 3,
        title: "Crear tabla Delta",
        instruction: "Desde `Files`, selecciona el CSV y usa `Load to Tables` o crea tabla desde Notebook con Spark SQL.",
        tip: "Define tipos correctos (fecha, decimal, entero) antes de guardar en `Tables`.",
        validation: "La tabla debe aparecer en `Tables` y mostrar un preview con filas."
      },
      {
        step: 4,
        title: "Consultar con SQL Endpoint",
        instruction: "Abre el `SQL analytics endpoint` del Lakehouse y ejecuta `SELECT TOP 100 * FROM dbo.<tu_tabla>`.",
        tip: "El endpoint es de solo lectura: úsalo para análisis y validación rápida.",
        validation: "La consulta devuelve datos sin error y con columnas esperadas."
      },
      {
        step: 5,
        title: "Verificar metadata",
        instruction: "Ejecuta una consulta de conteo y una agregación por fecha/categoría para confirmar calidad básica.",
        tip: "Guarda estas consultas como baseline para futuras validaciones.",
        validation: "Debes tener conteos coherentes y al menos una agregación útil para negocio."
      }
    ],
    validation: "Al finalizar, tienes un Lakehouse funcional con tabla Delta consultable por SQL Endpoint.",
    keyTakeaways: [
      "Lakehouse combina flexibilidad de data lake con acceso SQL",
      "Delta Lake habilita calidad y gobernanza desde el inicio"
    ]
  },
  {
    id: 2,
    domain: 1,
    difficulty: 3,
    title: "Implementar Medallion Architecture (Bronze→Silver→Gold) con Notebook",
    duration: "60 min",
    prerequisites: [
      "Conocimiento básico de Spark en Fabric",
      "Lakehouse creado y datos raw disponibles"
    ],
    objectives: [
      "Crear capas Bronze, Silver y Gold",
      "Aplicar limpieza y deduplicación en Silver",
      "Publicar tabla de negocio en Gold"
    ],
    steps: [
      {
        step: 1,
        title: "Preparar estructura de capas",
        instruction: "Crea tres carpetas o tres Lakehouses: `bronze`, `silver`, `gold`, según tu estándar del equipo.",
        tip: "Si trabajas en un solo Lakehouse, usa convenciones de nombres por capa.",
        validation: "Las tres capas existen y son distinguibles en navegación."
      },
      {
        step: 2,
        title: "Cargar Bronze",
        instruction: "Ingesta los datos raw sin transformar (append-only) en tablas Delta de Bronze.",
        tip: "Añade columnas técnicas como `ingestion_ts` y `source_file`.",
        validation: "Bronze contiene el dato original con trazabilidad."
      },
      {
        step: 3,
        title: "Transformar a Silver",
        instruction: "En Notebook, aplica cast de tipos, limpieza de nulos y deduplicación con `ROW_NUMBER()` o lógica equivalente.",
        tip: "Evita lógica de negocio pesada en Bronze; llévala a Silver/Gold.",
        validation: "La tabla Silver tiene tipos consistentes y sin duplicados clave."
      },
      {
        step: 4,
        title: "Construir Gold",
        instruction: "Genera una tabla agregada o un esquema estrella simplificado orientado a consumo BI.",
        tip: "Diseña Gold para consultas de negocio, no para ingesta técnica.",
        validation: "Gold responde consultas de KPIs con menor complejidad que Silver."
      },
      {
        step: 5,
        title: "Automatizar y validar",
        instruction: "Parametriza rutas y ejecuta Notebook completo; valida conteos entre capas y documenta reglas de transformación.",
        tip: "Guarda métricas por capa (filas de entrada/salida) para observabilidad.",
        validation: "La ejecución produce Bronze→Silver→Gold sin errores y con trazabilidad."
      }
    ],
    validation: "Dispones de una arquitectura medallion funcional, repetible y verificable.",
    keyTakeaways: [
      "Bronze conserva verdad de origen",
      "Silver estandariza calidad",
      "Gold optimiza consumo analítico"
    ]
  },
  {
    id: 3,
    domain: 1,
    difficulty: 2,
    title: "Crear un Data Warehouse y ejecutar MERGE INTO para carga incremental",
    duration: "45 min",
    prerequisites: [
      "Workspace con permisos de creación de Warehouse",
      "Dataset incremental disponible"
    ],
    objectives: [
      "Crear Warehouse en Fabric",
      "Diseñar tabla destino",
      "Implementar patrón upsert con MERGE"
    ],
    steps: [
      {
        step: 1,
        title: "Crear Warehouse",
        instruction: "En el workspace, selecciona `+ Nuevo > Warehouse` y nómbralo `WH_Sales_Incremental`.",
        tip: "Usa un naming con entorno (`dev/test/prod`) para evitar confusiones.",
        validation: "Warehouse creado y SQL editor disponible."
      },
      {
        step: 2,
        title: "Crear tablas stage y target",
        instruction: "Define `stg_sales` y `dim/fact` objetivo con claves y tipos adecuados en T-SQL.",
        tip: "Incluye columna `last_modified_utc` para control incremental.",
        validation: "Tablas creadas sin errores de schema."
      },
      {
        step: 3,
        title: "Cargar stage",
        instruction: "Inserta o copia lote incremental en `stg_sales` desde fuente o archivo.",
        tip: "Valida duplicados por clave de negocio antes de MERGE.",
        validation: "Stage contiene solo el lote esperado del periodo incremental."
      },
      {
        step: 4,
        title: "Ejecutar MERGE",
        instruction: "Aplica `MERGE target USING stg ... WHEN MATCHED THEN UPDATE WHEN NOT MATCHED THEN INSERT`.",
        tip: "Añade condiciones para evitar updates innecesarios cuando no hay cambio.",
        validation: "Filas nuevas insertadas y existentes actualizadas correctamente."
      },
      {
        step: 5,
        title: "Control y auditoría",
        instruction: "Registra métricas de la operación (inserted/updated) y limpia stage.",
        tip: "Guarda fecha de ejecución para troubleshooting posterior.",
        validation: "Dispones de evidencia de ejecución incremental y resultado correcto."
      }
    ],
    validation: "La carga incremental queda implementada y auditable con MERGE.",
    keyTakeaways: [
      "MERGE simplifica upsert en escenarios incrementales",
      "Stage + control de métricas mejora confiabilidad operacional"
    ]
  },
  {
    id: 4,
    domain: 1,
    difficulty: 2,
    title: "Configurar un Pipeline con Copy Data + Notebook + parámetros",
    duration: "45 min",
    prerequisites: [
      "Pipeline y Notebook habilitados en el workspace",
      "Conexión de origen configurada"
    ],
    objectives: [
      "Orquestar ingesta y transformación",
      "Parametrizar fechas/rutas",
      "Gestionar errores y reintentos"
    ],
    steps: [
      {
        step: 1,
        title: "Crear pipeline",
        instruction: "Abre Data Factory en Fabric y crea `PL_Ingest_Transform_Param`.",
        tip: "Define una convención de carpetas para pipelines productivas.",
        validation: "Pipeline creada y guardada sin errores."
      },
      {
        step: 2,
        title: "Añadir parámetros",
        instruction: "Crea parámetros como `p_date`, `p_source_path`, `p_target_table`.",
        tip: "Usa valores por defecto válidos para pruebas rápidas.",
        validation: "Los parámetros aparecen en configuración de pipeline."
      },
      {
        step: 3,
        title: "Agregar Copy Data",
        instruction: "Configura actividad `Copy Data` de origen a zona Bronze usando expresiones dinámicas con parámetros.",
        tip: "Valida mapeos de columna y comportamiento de append/overwrite.",
        validation: "La copia de prueba finaliza en estado `Succeeded`."
      },
      {
        step: 4,
        title: "Encadenar Notebook",
        instruction: "Añade `Notebook Activity` para transformar Bronze→Silver y pasa parámetros de la pipeline.",
        tip: "Marca dependencias por `Success` para controlar el flujo.",
        validation: "Notebook recibe parámetros y completa correctamente."
      },
      {
        step: 5,
        title: "Políticas de resiliencia",
        instruction: "Configura reintentos, timeout y una rama de fallo para logging/alerta.",
        tip: "Incluye una actividad final de `Completion` para cleanup.",
        validation: "Ante fallo simulado, la rama de error se ejecuta según diseño."
      }
    ],
    validation: "Pipeline parametrizada y robusta funcionando de extremo a extremo.",
    keyTakeaways: [
      "Pipelines coordinan actividades heterogéneas",
      "Parametrización reduce duplicación y facilita operación"
    ]
  },
  {
    id: 5,
    domain: 1,
    difficulty: 1,
    title: "Crear Shortcuts a otros Lakehouses y consultar desde SQL Endpoint",
    duration: "20 min",
    prerequisites: [
      "Al menos dos Lakehouses en el tenant",
      "Permisos de acceso al origen y destino"
    ],
    objectives: [
      "Crear shortcut interno de OneLake",
      "Evitar copia física de datos",
      "Consumir datos desde SQL Endpoint"
    ],
    steps: [
      {
        step: 1,
        title: "Identificar origen",
        instruction: "Selecciona una tabla Delta existente en un Lakehouse origen.",
        tip: "Confirma owner y política de gobierno antes de reutilizar.",
        validation: "La tabla origen existe y tiene permisos de lectura para ti."
      },
      {
        step: 2,
        title: "Crear shortcut",
        instruction: "En el Lakehouse destino, usa `New shortcut` y apunta al objeto del Lakehouse origen.",
        tip: "Nombrar shortcut igual que origen facilita trazabilidad.",
        validation: "El shortcut aparece en Tables o Files del destino."
      },
      {
        step: 3,
        title: "Validar acceso",
        instruction: "Abre preview del shortcut y verifica que los datos son visibles.",
        tip: "Si falla, revisa permisos de ambos lados (doble capa).",
        validation: "Preview o recuento básico responde sin error de permisos."
      },
      {
        step: 4,
        title: "Consultar vía SQL Endpoint",
        instruction: "Desde SQL Endpoint del destino, ejecuta `SELECT TOP 50 *` sobre la tabla shortcut.",
        tip: "Documenta dependencia para impacto de cambios en origen.",
        validation: "Consulta devuelve filas esperadas a través del shortcut."
      },
      {
        step: 5,
        title: "Comparar con copia física",
        instruction: "Compara coste/tiempo de shortcut frente a copiar la tabla.",
        tip: "Shortcut minimiza duplicación, pero depende del origen activo.",
        validation: "Conclusión documentada con ventajas y riesgos del enfoque shortcut."
      }
    ],
    validation: "Shortcut operativo y consultable sin duplicar almacenamiento.",
    keyTakeaways: [
      "Shortcuts permiten virtualización de datos en OneLake",
      "Seguridad y disponibilidad del origen siguen siendo críticas"
    ]
  },
  {
    id: 6,
    domain: 1,
    difficulty: 2,
    title: "Optimizar tablas Delta: OPTIMIZE, VACUUM y Z-ORDER",
    duration: "30 min",
    prerequisites: [
      "Tabla Delta con volumen suficiente",
      "Permisos para ejecutar mantenimiento"
    ],
    objectives: [
      "Reducir small files",
      "Mejorar lectura por filtros",
      "Aplicar housekeeping seguro"
    ],
    steps: [
      {
        step: 1,
        title: "Diagnóstico inicial",
        instruction: "Mide tiempos de consulta y revisa distribución de archivos de la tabla Delta.",
        tip: "Guarda baseline antes de optimizar para comparar resultados.",
        validation: "Tienes métricas iniciales (latencia y recuento de archivos)."
      },
      {
        step: 2,
        title: "Ejecutar OPTIMIZE",
        instruction: "Lanza `OPTIMIZE <tabla>` desde Notebook/SQL para compactar archivos pequeños.",
        tip: "Hazlo en ventana de baja carga para minimizar impacto.",
        validation: "Cantidad de archivos baja y consultas simples mejoran."
      },
      {
        step: 3,
        title: "Aplicar Z-ORDER",
        instruction: "Ejecuta `OPTIMIZE <tabla> ZORDER BY (col_filtro)` sobre columnas de filtrado frecuente.",
        tip: "Evita Z-ORDER en demasiadas columnas; prioriza 1-3 clave.",
        validation: "Consultas filtradas por esas columnas reducen tiempo."
      },
      {
        step: 4,
        title: "Configurar VACUUM",
        instruction: "Ejecuta `VACUUM <tabla> RETAIN <horas>` respetando política de retención.",
        tip: "No uses retención agresiva sin validar necesidades de time travel.",
        validation: "Archivos obsoletos se limpian sin comprometer políticas de recuperación."
      },
      {
        step: 5,
        title: "Comparar antes/después",
        instruction: "Repite consultas baseline y documenta mejora porcentual.",
        tip: "Integra mantenimiento en pipeline programada semanal.",
        validation: "Existe evidencia cuantitativa del beneficio de optimización."
      }
    ],
    validation: "Tabla Delta optimizada y con plan de mantenimiento repetible.",
    keyTakeaways: [
      "OPTIMIZE combate small file problem",
      "Z-ORDER acelera filtros selectivos",
      "VACUUM debe alinearse con retención y auditoría"
    ]
  },
  {
    id: 7,
    domain: 1,
    difficulty: 1,
    title: "Crear un Dataflow Gen2 con Power Query transformations",
    duration: "30 min",
    prerequisites: [
      "Acceso a Dataflow Gen2",
      "Fuente tabular simple (CSV/SQL)"
    ],
    objectives: [
      "Construir ETL visual",
      "Aplicar transformaciones comunes",
      "Publicar destino en Lakehouse"
    ],
    steps: [
      {
        step: 1,
        title: "Crear Dataflow Gen2",
        instruction: "Desde el workspace, crea `Dataflow Gen2` y conecta una fuente de datos.",
        tip: "Empieza con dataset pequeño para iterar rápido.",
        validation: "Se visualiza preview de la tabla origen."
      },
      {
        step: 2,
        title: "Transformaciones base",
        instruction: "Aplica filtros, tipado de columnas, renombrado y normalización de nulos.",
        tip: "Ordena pasos para maximizar query folding cuando aplique.",
        validation: "Los pasos se ejecutan y el preview refleja limpieza correcta."
      },
      {
        step: 3,
        title: "Agregar columnas derivadas",
        instruction: "Crea una columna calculada de negocio (por ejemplo, margen o categoría).",
        tip: "Prefiere expresiones simples y legibles para mantenimiento.",
        validation: "Nueva columna aparece con valores correctos en muestra."
      },
      {
        step: 4,
        title: "Configurar destino",
        instruction: "Selecciona Lakehouse como `Data destination` y define modo Replace/Append.",
        tip: "Para primeras cargas, Replace simplifica validación inicial.",
        validation: "Ejecución completa con estado `Succeeded` y tabla destino creada."
      },
      {
        step: 5,
        title: "Programar refresco",
        instruction: "Configura frecuencia diaria y revisa historial de ejecuciones.",
        tip: "Activa alertas básicas de fallo si el proceso es crítico.",
        validation: "Dataflow queda programado y la tabla se actualiza automáticamente."
      }
    ],
    validation: "Dataflow Gen2 productivo con transformación visual y refresco programado.",
    keyTakeaways: [
      "Dataflow acelera ETL sin código",
      "La calidad del diseño de pasos impacta rendimiento y mantenimiento"
    ]
  },
  {
    id: 8,
    domain: 2,
    difficulty: 2,
    title: "Configurar Deployment Pipeline (Dev → Test → Prod) con deployment rules",
    duration: "40 min",
    prerequisites: [
      "Tres workspaces (Dev/Test/Prod)",
      "Permisos Member o Admin en los workspaces"
    ],
    objectives: [
      "Crear pipeline de despliegue",
      "Asignar entornos",
      "Configurar reglas por entorno"
    ],
    steps: [
      {
        step: 1,
        title: "Crear Deployment Pipeline",
        instruction: "Abre `Deployment pipelines` y crea `DP600_ALM_Pipeline`.",
        tip: "Alinea nombres de etapas con estándar organizativo.",
        validation: "Pipeline creada con etapas visibles."
      },
      {
        step: 2,
        title: "Asignar workspaces",
        instruction: "Vincula cada etapa con su workspace: Dev, Test y Prod.",
        tip: "Evita reutilizar el mismo workspace en dos etapas.",
        validation: "Cada etapa muestra su workspace correctamente enlazado."
      },
      {
        step: 3,
        title: "Publicar contenido en Dev",
        instruction: "Carga un dataset/report/lakehouse en Dev que luego promoverás.",
        tip: "Incluye un parámetro de conexión para probar rules.",
        validation: "El contenido aparece en la vista de comparación Dev→Test."
      },
      {
        step: 4,
        title: "Configurar deployment rules",
        instruction: "Define reglas para reemplazar conexiones/parámetros entre etapas.",
        tip: "Documenta qué rule corresponde a cada entorno.",
        validation: "Rules activas y visibles antes de promover."
      },
      {
        step: 5,
        title: "Promover y validar",
        instruction: "Promueve Dev→Test y luego Test→Prod, validando funcionamiento en cada paso.",
        tip: "Incluye checklist de validación funcional en Test.",
        validation: "Contenido desplegado y funcionando con configuración del entorno destino."
      }
    ],
    validation: "Pipeline ALM funcionando con reglas de entorno correctamente aplicadas.",
    keyTakeaways: [
      "Deployment Pipeline reduce riesgo en promociones",
      "Deployment rules evitan cambios manuales post-deploy"
    ]
  },
  {
    id: 9,
    domain: 2,
    difficulty: 2,
    title: "Configurar Git Integration con Azure DevOps o GitHub",
    duration: "30 min",
    prerequisites: [
      "Repositorio existente en Azure DevOps o GitHub",
      "Permisos para conectar workspace con Git"
    ],
    objectives: [
      "Conectar workspace a repositorio",
      "Sincronizar cambios",
      "Aplicar flujo básico de ramas"
    ],
    steps: [
      {
        step: 1,
        title: "Preparar repositorio",
        instruction: "Crea rama `main` y una rama de trabajo `feature/lab-git`.",
        tip: "Protege `main` con PR obligatorio si tu política lo permite.",
        validation: "Repositorio listo con ramas visibles."
      },
      {
        step: 2,
        title: "Conectar workspace",
        instruction: "En Workspace settings, habilita `Git integration` y selecciona repo + branch.",
        tip: "Usa un workspace Dev para conexión inicial, no Prod.",
        validation: "Estado de sincronización aparece como conectado."
      },
      {
        step: 3,
        title: "Realizar cambio de prueba",
        instruction: "Modifica un item (ej. Notebook o Dataflow) y confirma cambios pendientes.",
        tip: "Escribe comentario claro para trazabilidad.",
        validation: "El diff del item aparece en panel de cambios Git."
      },
      {
        step: 4,
        title: "Commit y sync",
        instruction: "Haz commit desde Fabric y sincroniza con el repositorio remoto.",
        tip: "Mantén commits pequeños y temáticos.",
        validation: "Commit visible en el repo con los archivos esperados."
      },
      {
        step: 5,
        title: "Simular flujo PR",
        instruction: "Abre Pull Request de `feature` a `main` y completa revisión básica.",
        tip: "Combina este paso con Deployment Pipeline para CI/CD completo.",
        validation: "PR creada/mergeada y workspace sincronizado con `main`."
      }
    ],
    validation: "Workspace integrado con Git y flujo mínimo de colaboración validado.",
    keyTakeaways: [
      "Git mejora control de versiones y revisión",
      "Separar Dev/Test/Prod reduce riesgo operacional"
    ]
  },
  {
    id: 10,
    domain: 2,
    difficulty: 2,
    title: "Implementar RLS dinámico con USERPRINCIPALNAME()",
    duration: "35 min",
    prerequisites: [
      "Modelo semántico con tabla de seguridad",
      "Usuarios de prueba en tenant"
    ],
    objectives: [
      "Configurar rol dinámico",
      "Filtrar datos por usuario conectado",
      "Validar comportamiento con View As"
    ],
    steps: [
      {
        step: 1,
        title: "Preparar tabla de mapeo",
        instruction: "Crea una tabla con columnas `user_email` y `scope_key` (ej: región/equipo).",
        tip: "Normaliza emails en minúsculas para evitar mismatch.",
        validation: "Cada usuario de prueba tiene al menos un scope asignado."
      },
      {
        step: 2,
        title: "Crear rol RLS",
        instruction: "En el modelo, crea rol `RLS_Dinamico` y define filtro con `USERPRINCIPALNAME()`.",
        tip: "Evita hardcodear usuarios para mantener escalabilidad.",
        validation: "El rol queda guardado con expresión válida."
      },
      {
        step: 3,
        title: "Relacionar seguridad con hechos",
        instruction: "Asegura que la tabla de seguridad filtra correctamente la dimensión/hechos objetivo.",
        tip: "Revisa dirección de filtros y ambigüedades en relaciones.",
        validation: "Modelo aplica filtrado esperado al navegar visuales."
      },
      {
        step: 4,
        title: "Probar con View As",
        instruction: "Usa `View as` en Desktop/Service simulando usuarios distintos.",
        tip: "Prueba también usuario sin mapeo para validar comportamiento.",
        validation: "Cada usuario ve solo su subconjunto autorizado."
      },
      {
        step: 5,
        title: "Publicar y documentar",
        instruction: "Publica el modelo y documenta proceso para alta/baja de usuarios.",
        tip: "Automatiza carga de tabla de seguridad si el volumen crece.",
        validation: "RLS dinámico operativo en entorno publicado."
      }
    ],
    validation: "RLS dinámico desplegado y validado para múltiples usuarios.",
    keyTakeaways: [
      "USERPRINCIPALNAME() habilita seguridad escalable",
      "El modelo de relaciones impacta directamente la efectividad de RLS"
    ]
  },
  {
    id: 11,
    domain: 2,
    difficulty: 1,
    title: "Monitorizar carga con Capacity Metrics App",
    duration: "20 min",
    prerequisites: [
      "Capacity de Fabric activa",
      "Permisos para instalar/abrir Capacity Metrics App"
    ],
    objectives: [
      "Leer consumo de CU",
      "Detectar throttling",
      "Identificar workspaces costosos"
    ],
    steps: [
      {
        step: 1,
        title: "Instalar/abrir app",
        instruction: "Abre `Capacity Metrics App` desde Fabric o AppSource y conéctala a tu capacity.",
        tip: "Usa el rango temporal de los últimos 7 días para inicio.",
        validation: "Los paneles cargan datos de consumo sin error."
      },
      {
        step: 2,
        title: "Revisar uso por workload",
        instruction: "Analiza consumo de Spark, SQL, Dataflows y Refresh por porcentaje.",
        tip: "Busca picos por franja horaria para correlacionar jobs.",
        validation: "Identificas al menos la workload dominante de consumo."
      },
      {
        step: 3,
        title: "Detectar throttling",
        instruction: "Navega a secciones de `throttling` y revisa eventos recientes.",
        tip: "Documenta qué procesos coincidieron con eventos de saturación.",
        validation: "Tienes listado de eventos y posible causa principal."
      },
      {
        step: 4,
        title: "Localizar hotspots",
        instruction: "Filtra por workspace/item para ubicar operaciones más costosas.",
        tip: "Prioriza optimizar jobs repetitivos con alto costo acumulado.",
        validation: "Quedan identificados 1-3 candidatos claros de optimización."
      },
      {
        step: 5,
        title: "Plan de acción",
        instruction: "Define acciones: reprogramar cargas, optimizar consultas o ajustar SKU.",
        tip: "Aplica cambios pequeños y vuelve a medir en el siguiente ciclo.",
        validation: "Existe un plan concreto con métricas objetivo."
      }
    ],
    validation: "Capacidad monitorizada con hallazgos accionables.",
    keyTakeaways: [
      "Medir consumo real evita sobredimensionar",
      "Throttling visible permite priorizar tuning"
    ]
  },
  {
    id: 12,
    domain: 2,
    difficulty: 1,
    title: "Configurar Sensitivity Labels y Endorsement",
    duration: "20 min",
    prerequisites: [
      "Etiquetas disponibles en Purview",
      "Permisos para etiquetar y endorsar contenido"
    ],
    objectives: [
      "Etiquetar contenido sensible",
      "Aplicar endorsement",
      "Validar herencia básica"
    ],
    steps: [
      {
        step: 1,
        title: "Seleccionar artefacto",
        instruction: "Elige un dataset o informe con datos sensibles para etiquetar.",
        tip: "Empieza con un caso real de PII o financiero.",
        validation: "Artefacto identificado y abierto en configuración."
      },
      {
        step: 2,
        title: "Aplicar sensitivity label",
        instruction: "Asigna etiqueta (por ejemplo `Confidential`) desde propiedades del item.",
        tip: "Alinea etiqueta con la clasificación corporativa vigente.",
        validation: "La etiqueta aparece visible en el item."
      },
      {
        step: 3,
        title: "Aplicar endorsement",
        instruction: "Marca el contenido como `Promoted` o `Certified` según tu rol.",
        tip: "Usa `Certified` solo para contenido gobernado y validado.",
        validation: "El estado de endorsement se refleja en el catálogo."
      },
      {
        step: 4,
        title: "Verificar en Data Hub",
        instruction: "Busca el item en OneLake Data Hub y revisa badges de label/endorsement.",
        tip: "Comprueba que usuarios consumidores distinguen el contenido confiable.",
        validation: "Etiquetas y endorsement visibles en resultados de búsqueda."
      },
      {
        step: 5,
        title: "Documentar política",
        instruction: "Registra cuándo usar cada etiqueta y quién aprueba certificaciones.",
        tip: "Sin proceso operativo, la etiqueta pierde valor de gobierno.",
        validation: "Guía breve publicada para el equipo de datos/BI."
      }
    ],
    validation: "Gobernanza básica aplicada con labels y endorsement en producción.",
    keyTakeaways: [
      "Clasificación y certificación mejoran confianza del dato",
      "La disciplina operativa es tan importante como la configuración"
    ]
  },
  {
    id: 13,
    domain: 3,
    difficulty: 2,
    title: "Crear un modelo Star Schema completo en Power BI Desktop",
    duration: "50 min",
    prerequisites: [
      "Dataset con hechos y dimensiones",
      "Power BI Desktop instalado"
    ],
    objectives: [
      "Modelar hechos y dimensiones",
      "Crear relaciones 1:N correctas",
      "Publicar modelo semántico limpio"
    ],
    steps: [
      {
        step: 1,
        title: "Cargar tablas",
        instruction: "Importa tabla de hechos y dimensiones (fecha, producto, cliente, geografía).",
        tip: "Elimina columnas no usadas antes de modelar para reducir tamaño.",
        validation: "Todas las tablas necesarias aparecen en el modelo."
      },
      {
        step: 2,
        title: "Definir claves",
        instruction: "Identifica PK en dimensiones y FK en hechos; corrige tipos de datos.",
        tip: "Evita texto como clave de relación si puedes usar enteros surrogate.",
        validation: "PK/FK consistentes sin conflictos de tipo."
      },
      {
        step: 3,
        title: "Crear relaciones",
        instruction: "Configura relaciones 1:N, filtro cruzado single desde dimensión a hechos.",
        tip: "Evita bidireccional salvo necesidad muy justificada.",
        validation: "Modelo sin ambigüedades y navegación de filtros correcta."
      },
      {
        step: 4,
        title: "Agregar medidas base",
        instruction: "Crea medidas como Ventas, Coste, Margen y %Margen con DAX.",
        tip: "Usa `DIVIDE` y `VAR` para robustez y legibilidad.",
        validation: "Medidas responden correctamente en matriz de prueba."
      },
      {
        step: 5,
        title: "Publicar y validar",
        instruction: "Publica el modelo en Fabric y valida rendimiento inicial con visuals simples.",
        tip: "Añade descripciones de medidas para facilitar autoservicio.",
        validation: "Modelo publicado, usable y coherente con star schema."
      }
    ],
    validation: "Modelo estrella completo y apto para explotación analítica.",
    keyTakeaways: [
      "Star schema mejora rendimiento y mantenibilidad",
      "Relaciones limpias reducen errores analíticos"
    ]
  },
  {
    id: 14,
    domain: 3,
    difficulty: 3,
    title: "Configurar Direct Lake y analizar framing/fallback",
    duration: "45 min",
    prerequisites: [
      "Tabla Delta en Lakehouse",
      "Capacidad Fabric compatible con Direct Lake"
    ],
    objectives: [
      "Crear modelo Direct Lake",
      "Observar framing",
      "Detectar y mitigar fallback"
    ],
    steps: [
      {
        step: 1,
        title: "Crear modelo Direct Lake",
        instruction: "Desde Lakehouse/Warehouse, crea modelo semántico en modo Direct Lake.",
        tip: "Empieza con pocas tablas para validar comportamiento base.",
        validation: "Modelo creado y modo Direct Lake activo."
      },
      {
        step: 2,
        title: "Ejecutar consultas iniciales",
        instruction: "Abre un reporte simple y ejecuta visuals con filtros por fecha/producto.",
        tip: "Registra latencia inicial para comparar tras cambios.",
        validation: "Visuals cargan correctamente usando el modelo Direct Lake."
      },
      {
        step: 3,
        title: "Forzar nuevo framing",
        instruction: "Realiza refresh del modelo y vuelve a lanzar consultas.",
        tip: "Observa si cambia el comportamiento tras nuevas cargas de datos.",
        validation: "Se evidencia refresco de snapshot (framing actualizado)."
      },
      {
        step: 4,
        title: "Provocar/identificar fallback",
        instruction: "Introduce una condición conocida de fallback (por tamaño/feature) y revisa impacto.",
        tip: "Evita hacerlo en producción; usa dataset de prueba.",
        validation: "Detectas degradación y confirmas fallback en diagnósticos."
      },
      {
        step: 5,
        title: "Aplicar mitigación",
        instruction: "Reduce cardinalidad/columnas, optimiza Delta y repite medición.",
        tip: "Documenta límites del SKU y guardrails del modelo.",
        validation: "Mejora de latencia y menor riesgo de fallback recurrente."
      }
    ],
    validation: "Direct Lake validado con comprensión práctica de framing y fallback.",
    keyTakeaways: [
      "Direct Lake ofrece alto rendimiento con frescura",
      "Diseño del modelo y guardrails determinan estabilidad"
    ]
  },
  {
    id: 15,
    domain: 3,
    difficulty: 3,
    title: "Implementar Calculation Groups para Time Intelligence",
    duration: "40 min",
    prerequisites: [
      "Modelo semántico publicado",
      "Acceso a Tabular Editor/XMLA"
    ],
    objectives: [
      "Crear Calculation Group",
      "Definir items YTD/MTD/PY",
      "Aplicar formato dinámico"
    ],
    steps: [
      {
        step: 1,
        title: "Abrir modelo con Tabular Editor",
        instruction: "Conéctate al modelo vía XMLA endpoint desde Tabular Editor.",
        tip: "Trabaja sobre entorno Dev para evitar cambios directos en Prod.",
        validation: "Modelo cargado y editable en Tabular Editor."
      },
      {
        step: 2,
        title: "Crear Calculation Group",
        instruction: "Crea `CG_TimeIntelligence` con items `YTD`, `MTD`, `PY`.",
        tip: "Usa nombres funcionales entendibles para usuarios finales.",
        validation: "Calculation Group visible con items creados."
      },
      {
        step: 3,
        title: "Definir expresiones",
        instruction: "Configura expresiones con `SELECTEDMEASURE()` y funciones DAX temporales.",
        tip: "Asegura que la tabla de fechas esté marcada correctamente.",
        validation: "Cada item devuelve resultados coherentes en pruebas."
      },
      {
        step: 4,
        title: "Format String Expression",
        instruction: "Define formato dinámico (porcentaje para variaciones, número para valores absolutos).",
        tip: "Esto evita mantener medidas duplicadas solo por formato.",
        validation: "El formato cambia según item seleccionado."
      },
      {
        step: 5,
        title: "Consumir en reporte",
        instruction: "Publica cambios y usa el Calculation Group en slicer/matriz de reporte.",
        tip: "Valida con varias medidas para confirmar reutilización real.",
        validation: "Una misma medida responde a YTD/MTD/PY sin duplicación de medidas."
      }
    ],
    validation: "Calculation Groups operativos y reutilizables para time intelligence.",
    keyTakeaways: [
      "Calculation Groups reducen explosión de medidas",
      "SELECTEDMEASURE() habilita transformaciones dinámicas"
    ]
  },
  {
    id: 16,
    domain: 3,
    difficulty: 3,
    title: "Analizar rendimiento con DAX Studio (Server Timings + VertiPaq Analyzer)",
    duration: "40 min",
    prerequisites: [
      "Modelo con varias medidas",
      "DAX Studio instalado"
    ],
    objectives: [
      "Medir FE/SE timings",
      "Identificar cuellos de botella",
      "Optimizar medidas y modelo"
    ],
    steps: [
      {
        step: 1,
        title: "Conectar DAX Studio",
        instruction: "Abre DAX Studio y conéctate al modelo semántico objetivo.",
        tip: "Cierra visuales pesados durante pruebas para aislar resultados.",
        validation: "Conexión establecida y consulta de prueba ejecutada."
      },
      {
        step: 2,
        title: "Capturar Server Timings",
        instruction: "Activa `Server Timings` y ejecuta consultas DAX representativas.",
        tip: "Evalúa consultas de visuals más usados en negocio.",
        validation: "Dispones de métricas FE/SE por consulta."
      },
      {
        step: 3,
        title: "Analizar VertiPaq",
        instruction: "Abre VertiPaq Analyzer y revisa tamaño por tabla/columna y cardinalidad.",
        tip: "Las columnas texto de alta cardinalidad suelen ser candidatas a optimización.",
        validation: "Identificas columnas con mayor peso de memoria."
      },
      {
        step: 4,
        title: "Aplicar optimizaciones",
        instruction: "Refactoriza medidas (VAR, filtros directos), elimina columnas no usadas y repite pruebas.",
        tip: "Aplica cambios de uno en uno para medir impacto real.",
        validation: "Mejoran tiempos de consulta frente al baseline."
      },
      {
        step: 5,
        title: "Documentar findings",
        instruction: "Registra antes/después, consultas críticas y recomendaciones para el equipo.",
        tip: "Conserva scripts DAX usados para repetir diagnóstico.",
        validation: "Informe de performance listo para seguimiento continuo."
      }
    ],
    validation: "Diagnóstico y optimización de rendimiento completados con evidencia.",
    keyTakeaways: [
      "Medir FE/SE orienta la optimización correcta",
      "VertiPaq Analyzer revela costos ocultos de modelado"
    ]
  },
  {
    id: 17,
    domain: 3,
    difficulty: 2,
    title: "Crear un Composite Model con DirectQuery sobre otro modelo",
    duration: "35 min",
    prerequisites: [
      "Modelo base publicado",
      "Permiso Build sobre modelo origen"
    ],
    objectives: [
      "Conectar a modelo semántico existente",
      "Extender con tablas locales",
      "Validar impacto en rendimiento y seguridad"
    ],
    steps: [
      {
        step: 1,
        title: "Conectar a modelo base",
        instruction: "En Power BI Desktop, usa `Power BI semantic models` y selecciona un modelo corporativo existente.",
        tip: "Confirma permisos Build antes de comenzar.",
        validation: "Modelo remoto cargado en modo DirectQuery sobre semantic model."
      },
      {
        step: 2,
        title: "Añadir tabla local",
        instruction: "Importa una tabla adicional departamental y crea relaciones necesarias.",
        tip: "Evita relaciones ambiguas con múltiples caminos de filtro.",
        validation: "Relaciones válidas y sin advertencias críticas."
      },
      {
        step: 3,
        title: "Crear medidas específicas",
        instruction: "Define medidas nuevas de negocio que combinen datos del modelo base y tabla local.",
        tip: "Mantén naming claro para diferenciar medidas heredadas vs locales.",
        validation: "Medidas calculan correctamente en visuales de prueba."
      },
      {
        step: 4,
        title: "Probar seguridad",
        instruction: "Valida cómo se comporta el acceso (RLS del modelo base y permisos del modelo compuesto).",
        tip: "Documenta límites de seguridad en chained models.",
        validation: "Usuarios de prueba ven datos según reglas esperadas."
      },
      {
        step: 5,
        title: "Publicar y benchmark",
        instruction: "Publica el modelo compuesto y compara latencia con modelo base.",
        tip: "Si hay degradación, revisa visuals y cardinalidad de joins.",
        validation: "Modelo compuesto productivo con impacto de rendimiento conocido."
      }
    ],
    validation: "Composite model implementado y validado funcional/técnicamente.",
    keyTakeaways: [
      "Composite model permite extender sin duplicar datasets",
      "El diseño de relaciones determina estabilidad y rendimiento"
    ]
  }
];
