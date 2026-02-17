// DP-600 Question Bank — Domain 1: Preparar Datos (45-50%)
const QUESTIONS_DOMAIN_1 = [
  {
    id: 1, domain: 1, difficulty: 1, subtopic: "Delta Lake",
    question: "¿Qué formato de almacenamiento se usa de forma nativa en un Lakehouse de Microsoft Fabric?",
    options: ["Parquet estándar", "Delta Lake (Parquet + logs)", "CSV comprimido", "Avro"],
    correct: 1,
    explanation: "Los Lakehouses en Fabric usan Delta Lake, que combina archivos Parquet con un log de transacciones que proporciona ACID, time travel y schema enforcement."
  },
  {
    id: 2, domain: 1, difficulty: 1, subtopic: "Lakehouse",
    question: "¿Cuál es la diferencia principal entre un Lakehouse y un Data Warehouse en Fabric?",
    options: [
      "El Lakehouse solo admite datos estructurados",
      "El Data Warehouse usa Delta Lake para almacenamiento",
      "El Lakehouse admite datos estructurados y no estructurados, el Warehouse solo estructurados",
      "No hay diferencia, son el mismo componente"
    ],
    correct: 2,
    explanation: "El Lakehouse combina la flexibilidad de un lago de datos (archivos no estructurados, semi-estructurados y estructurados) con capacidades analíticas. El Data Warehouse está optimizado exclusivamente para datos estructurados con T-SQL."
  },
  {
    id: 3, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "Al crear una vista en un Data Warehouse de Fabric, ¿qué lenguaje se utiliza?",
    options: ["DAX", "KQL", "T-SQL", "PySpark"],
    correct: 2,
    explanation: "El Data Warehouse de Fabric usa T-SQL para crear vistas, funciones y procedimientos almacenados, similar a Azure SQL o SQL Server."
  },
  {
    id: 4, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Qué componente de Fabric se usa para orquestar y programar tareas de ingesta de datos?",
    options: ["Flujos de datos Gen2", "Canalizaciones (Pipelines)", "Cuadernos Spark", "Eventhouse"],
    correct: 1,
    explanation: "Las canalizaciones (Pipelines) de Data Factory en Fabric permiten orquestar tareas de ingesta y transformación, programar ejecuciones y definir dependencias entre actividades."
  },
  {
    id: 5, domain: 1, difficulty: 1, subtopic: "Dataflows Gen2",
    question: "¿Qué son los flujos de datos Gen2 en Microsoft Fabric?",
    options: [
      "Scripts de Python para ETL",
      "Herramientas visuales basadas en Power Query Online para ingesta y transformación",
      "Conexiones directas a bases de datos externas",
      "Dashboards de monitorización de datos"
    ],
    correct: 1,
    explanation: "Los flujos de datos Gen2 usan Power Query Online para crear visualmente procesos de ingesta y transformación de datos en múltiples pasos, sin necesidad de código."
  },
  {
    id: 6, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "¿Qué comando SQL se usa para agregar datos de forma incremental a una tabla Delta en un Warehouse?",
    options: ["INSERT INTO ... SELECT", "MERGE INTO", "COPY INTO", "BULK INSERT"],
    correct: 1,
    explanation: "MERGE INTO permite realizar upserts (insert + update) de forma atómica, ideal para cargas incrementales donde necesitas actualizar registros existentes e insertar nuevos."
  },
  {
    id: 7, domain: 1, difficulty: 3, subtopic: "Shortcuts",
    question: "¿Cuál es la ventaja principal de usar shortcuts en un Lakehouse?",
    options: [
      "Mejoran la velocidad de las consultas automáticamente",
      "Permiten acceder a datos externos sin copiarlos ni moverlos",
      "Cifran los datos automáticamente",
      "Reducen el coste de almacenamiento comprimiendo archivos"
    ],
    correct: 1,
    explanation: "Los shortcuts permiten crear referencias a datos en ubicaciones externas (ADLS Gen2, S3, otros Lakehouses) sin duplicar los datos, reduciendo costes y manteniendo una sola fuente de verdad."
  },
  {
    id: 8, domain: 1, difficulty: 2, subtopic: "Lakehouse",
    question: "En Fabric, ¿dónde se procesan las consultas T-SQL sobre tablas Delta de un Lakehouse?",
    options: [
      "En un motor Spark dedicado",
      "En el SQL Analytics Endpoint del Lakehouse",
      "En Power BI directamente",
      "En Azure SQL Database"
    ],
    correct: 1,
    explanation: "Cada Lakehouse tiene un SQL Analytics Endpoint que permite ejecutar consultas T-SQL de solo lectura sobre las tablas Delta, sin necesidad de un Data Warehouse separado."
  },
  {
    id: 9, domain: 1, difficulty: 1, subtopic: "Lakehouse",
    question: "¿Qué tipo de datos puede almacenar la sección 'Files' de un Lakehouse?",
    options: [
      "Solo archivos Parquet",
      "Solo archivos CSV y JSON",
      "Cualquier tipo de archivo (imágenes, CSV, JSON, Parquet, etc.)",
      "Solo archivos de texto plano"
    ],
    correct: 2,
    explanation: "La sección Files del Lakehouse acepta cualquier tipo de archivo. Es un almacenamiento basado en OneLake que funciona como un data lake completo."
  },
  {
    id: 10, domain: 1, difficulty: 3, subtopic: "Delta Lake",
    question: "¿Qué operación de mantenimiento se recomienda ejecutar periódicamente en tablas Delta grandes?",
    options: ["TRUNCATE TABLE", "OPTIMIZE y VACUUM", "DROP y recrear la tabla", "REBUILD INDEX"],
    correct: 1,
    explanation: "OPTIMIZE compacta archivos pequeños en archivos más grandes para mejorar el rendimiento de lectura. VACUUM elimina archivos antiguos que ya no son referenciados por el log de transacciones."
  },
  {
    id: 11, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué es un Eventhouse en Microsoft Fabric?",
    options: [
      "Un almacén de eventos de seguridad",
      "Un componente de Real-Time Intelligence para datos de streaming con KQL",
      "Un servicio de mensajería como Event Hub",
      "Un tipo especial de Lakehouse para logs"
    ],
    correct: 1,
    explanation: "Eventhouse es el componente de Real-Time Intelligence en Fabric que permite ingerir, almacenar y consultar datos de streaming usando KQL (Kusto Query Language)."
  },
  {
    id: 12, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Cuál es el propósito de una KQL Queryset en Fabric?",
    options: [
      "Definir pipelines de datos",
      "Escribir y ejecutar consultas KQL contra bases de datos de Eventhouse",
      "Crear modelos semánticos",
      "Gestionar permisos de workspace"
    ],
    correct: 1,
    explanation: "Una KQL Queryset es un artefacto donde puedes escribir, guardar y ejecutar consultas KQL contra las bases de datos dentro de un Eventhouse para análisis de datos en tiempo real."
  },
  {
    id: 13, domain: 1, difficulty: 1, subtopic: "Dataflows Gen2",
    question: "¿Qué conector se usa en flujos de datos Gen2 para conectarse a una base de datos SQL Server on-premises?",
    options: [
      "Conector web",
      "On-premises data gateway + conector SQL Server",
      "Conector REST API",
      "Conector ODBC genérico únicamente"
    ],
    correct: 1,
    explanation: "Para acceder a fuentes on-premises desde Fabric se necesita un On-premises data gateway que actúe como puente entre la nube y la red local."
  },
  {
    id: 14, domain: 1, difficulty: 3, subtopic: "Pipelines",
    question: "Al diseñar un ETL en Fabric, ¿cuándo es preferible usar una canalización sobre un flujo de datos Gen2?",
    options: [
      "Siempre, las canalizaciones son superiores",
      "Cuando se necesita orquestación compleja con dependencias, reintentos y paralelismo",
      "Solo cuando se procesan archivos CSV",
      "Cuando los datos son menores a 1 GB"
    ],
    correct: 1,
    explanation: "Las canalizaciones son mejores para orquestación compleja: ejecutar múltiples actividades en paralelo o secuencia, manejar errores/reintentos, y coordinar diferentes tipos de procesamiento (Spark, dataflows, stored procedures)."
  },
  {
    id: 15, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Qué función tiene la actividad 'Copy Data' en una canalización de Fabric?",
    options: [
      "Transforma datos usando Power Query",
      "Copia datos entre almacenes de datos origen y destino",
      "Crea copias de seguridad automáticas",
      "Duplica pipelines existentes"
    ],
    correct: 1,
    explanation: "La actividad Copy Data mueve datos de un origen (SQL, archivos, APIs) a un destino (Lakehouse, Warehouse) con soporte para mapeo de columnas y transformaciones básicas."
  },
  {
    id: 16, domain: 1, difficulty: 3, subtopic: "Delta Lake",
    question: "¿Cuál es la diferencia entre V-Order y Z-Order en la optimización de tablas Delta?",
    options: [
      "Son lo mismo con nombres diferentes",
      "V-Order optimiza compresión Parquet automáticamente; Z-Order optimiza para filtros en columnas específicas",
      "V-Order es para tablas pequeñas y Z-Order para grandes",
      "V-Order solo funciona en Warehouses y Z-Order solo en Lakehouses"
    ],
    correct: 1,
    explanation: "V-Order es una optimización automática de Fabric que mejora la compresión y lectura de archivos Parquet. Z-Order (OPTIMIZE ... ZORDER BY) reorganiza datos físicamente para acelerar consultas que filtran por columnas específicas."
  },
  {
    id: 17, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué operador KQL se usa para filtrar filas en una consulta?",
    options: ["SELECT", "where", "FILTER", "HAVING"],
    correct: 1,
    explanation: "En KQL, el operador 'where' filtra filas según una condición. KQL usa una sintaxis de pipe (|) diferente a SQL: Tabla | where columna == 'valor'."
  },
  {
    id: 18, domain: 1, difficulty: 1, subtopic: "OneLake",
    question: "¿Cuál es el rol de OneLake en Microsoft Fabric?",
    options: [
      "Es el motor de procesamiento de consultas",
      "Es la capa de almacenamiento unificada para toda la plataforma",
      "Es el servicio de autenticación",
      "Es la interfaz de administración"
    ],
    correct: 1,
    explanation: "OneLake es la capa de almacenamiento unificada de Fabric. Todos los datos (Lakehouses, Warehouses, etc.) se almacenan en OneLake, facilitando compartir datos entre diferentes cargas de trabajo sin duplicación."
  },
  {
    id: 19, domain: 1, difficulty: 3, subtopic: "Delta Lake",
    question: "¿Cómo se manejan los esquemas evolutivos (schema evolution) en tablas Delta del Lakehouse?",
    options: [
      "No es posible, se debe recrear la tabla",
      "Usando mergeSchema o overwriteSchema en las opciones de escritura",
      "Modificando manualmente los archivos Parquet",
      "Solo a través de la interfaz gráfica de Fabric"
    ],
    correct: 1,
    explanation: "Delta Lake soporta schema evolution con las opciones mergeSchema (añade nuevas columnas) y overwriteSchema (reemplaza el esquema completo) en operaciones de escritura."
  },
  {
    id: 20, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "En una canalización de Fabric, ¿qué actividad se usa para ejecutar un cuaderno Spark?",
    options: ["Script Activity", "Notebook Activity", "Spark Job Activity", "Web Activity"],
    correct: 1,
    explanation: "La Notebook Activity permite ejecutar cuadernos de Spark como paso de una canalización, pasando parámetros y capturando resultados para orquestación."
  },
  {
    id: 21, domain: 1, difficulty: 2, subtopic: "Lakehouse",
    question: "¿Qué tipo de tabla se crea al arrastrar un archivo CSV a la sección Tables de un Lakehouse?",
    options: ["Tabla temporal", "Tabla externa", "Tabla Delta gestionada (managed)", "Vista materializada"],
    correct: 2,
    explanation: "Al cargar archivos en la sección Tables, Fabric crea automáticamente tablas Delta gestionadas, convirtiendo los datos a formato Delta Lake."
  },
  {
    id: 22, domain: 1, difficulty: 3, subtopic: "Medallion Architecture",
    question: "¿Qué patrón de arquitectura de datos implementa Microsoft Fabric de forma nativa?",
    options: ["Lambda Architecture", "Kappa Architecture", "Medallion Architecture (Bronze/Silver/Gold)", "Todas las anteriores son posibles"],
    correct: 3,
    explanation: "Fabric soporta cualquier arquitectura, pero promueve especialmente la Medallion Architecture (Bronze=raw, Silver=cleansed, Gold=curated) usando múltiples Lakehouses organizados por nivel de refinamiento."
  },
  {
    id: 23, domain: 1, difficulty: 1, subtopic: "Notebooks/Spark",
    question: "¿Qué lenguaje usan los cuadernos de Fabric para procesar datos a gran escala?",
    options: ["Solo T-SQL", "Solo DAX", "PySpark, Scala, SQL Spark y R", "Solo Python estándar"],
    correct: 2,
    explanation: "Los cuadernos de Fabric soportan múltiples lenguajes: PySpark (Python + Spark), Scala, SparkSQL y R. Nota: PySpark se ha movido al DP-700 en 2026, pero SQL Spark y los conceptos siguen en DP-600."
  },
  {
    id: 24, domain: 1, difficulty: 2, subtopic: "OneLake",
    question: "¿Qué significa que OneLake tenga un 'espacio de nombres jerárquico'?",
    options: [
      "Los datos se organizan numéricamente",
      "Los datos se organizan en una estructura de carpetas similar a un sistema de archivos",
      "Los permisos se heredan de arriba a abajo sin excepción",
      "Solo los administradores pueden crear carpetas"
    ],
    correct: 1,
    explanation: "OneLake usa un espacio de nombres jerárquico (HNS) que organiza los datos como un sistema de archivos con carpetas y subcarpetas, permitiendo navegación intuitiva y permisos granulares."
  },
  {
    id: 25, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "Al usar COPY INTO en un Data Warehouse de Fabric, ¿cuál es su ventaja sobre INSERT INTO?",
    options: [
      "Soporta más tipos de datos",
      "Permite carga masiva de alto rendimiento desde archivos externos",
      "Es más fácil de escribir",
      "Permite actualizaciones in-place"
    ],
    correct: 1,
    explanation: "COPY INTO está optimizado para cargas masivas (bulk load) desde archivos en almacenamiento externo, ofreciendo un rendimiento significativamente mejor que INSERT INTO para volúmenes grandes de datos."
  },
  {
    id: 26, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué es un Eventstream en Fabric?",
    options: [
      "Un log de auditoría del workspace",
      "Una herramienta visual para capturar, transformar y enrutar datos de streaming en tiempo real",
      "Un tipo de canalización para datos batch",
      "Un servicio de notificaciones por email"
    ],
    correct: 1,
    explanation: "Eventstream permite capturar datos de streaming de fuentes como Azure Event Hubs, IoT Hub o cambios de base de datos, transformarlos y enrutarlos a destinos como Eventhouse o Lakehouse."
  },
  {
    id: 27, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "¿Para qué sirve la función UNPIVOT en T-SQL dentro de un Warehouse de Fabric?",
    options: [
      "Convierte filas en columnas",
      "Convierte columnas en filas (normaliza datos anchos a formato largo)",
      "Elimina filas duplicadas",
      "Ordena los resultados de forma descendente"
    ],
    correct: 1,
    explanation: "UNPIVOT transforma columnas en filas, útil cuando datos fuente tienen valores en columnas separadas (ej: Ene, Feb, Mar) y necesitas normalizarlos en una columna Mes + Valor."
  },
  {
    id: 28, domain: 1, difficulty: 1, subtopic: "OneLake",
    question: "¿Cuántos OneLakes existen por tenant de Microsoft Fabric?",
    options: ["Uno por workspace", "Uno por usuario", "Uno por tenant (organización)", "Ilimitados"],
    correct: 2,
    explanation: "Existe un único OneLake por tenant. Todos los workspaces y sus datos comparten este almacenamiento unificado, similar al concepto de un 'OneDrive para datos organizacionales'."
  },
  {
    id: 29, domain: 1, difficulty: 3, subtopic: "Real-Time Intelligence",
    question: "¿Qué estrategia se recomienda para manejar datos tardíos (late arriving data) en un pipeline de streaming?",
    options: [
      "Ignorar los datos tardíos",
      "Usar ventanas de tiempo (windowing) con watermarks que definan un margen de tolerancia",
      "Reprocesar todo el dataset cada vez",
      "Almacenarlos en una tabla separada permanentemente"
    ],
    correct: 1,
    explanation: "Los watermarks definen cuánto tiempo esperar por datos tardíos antes de cerrar una ventana temporal. Esto permite manejar datos que llegan fuera de orden sin reprocesar todo ni perder información."
  },
  {
    id: 30, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "¿Qué tipo de transformación realiza la función PIVOT en T-SQL?",
    options: [
      "Convierte filas en columnas (desnormaliza datos largos a formato ancho)",
      "Rota las filas 90 grados",
      "Une dos tablas por una clave",
      "Agrega una nueva columna calculada"
    ],
    correct: 0,
    explanation: "PIVOT convierte valores únicos de una columna en múltiples columnas, creando una tabla cruzada. Es el inverso de UNPIVOT y útil para crear reportes con categorías como columnas."
  },
  {
    id: 31, domain: 1, difficulty: 2, subtopic: "OneLake",
    question: "¿Qué protocolo usa OneLake para acceder a datos de forma compatible con herramientas existentes?",
    options: ["FTP", "ABFS (Azure Blob File System)", "SMB", "NFS"],
    correct: 1,
    explanation: "OneLake es compatible con ABFS, el mismo protocolo usado por Azure Data Lake Storage Gen2, lo que permite que herramientas existentes se conecten sin modificaciones."
  },
  {
    id: 32, domain: 1, difficulty: 3, subtopic: "Lakehouse",
    question: "¿Cuál es el beneficio de usar tablas particionadas en un Lakehouse de Fabric?",
    options: [
      "Simplifica las consultas SQL",
      "Permite leer solo las particiones relevantes (partition pruning) mejorando el rendimiento",
      "Reduce el número de archivos automáticamente",
      "Permite aplicar diferentes permisos por partición"
    ],
    correct: 1,
    explanation: "El particionamiento organiza datos en subcarpetas por valores de columna (ej: por fecha). Las consultas que filtran por la columna de partición leen solo los archivos relevantes, reduciendo drásticamente el tiempo y coste."
  },
  {
    id: 33, domain: 1, difficulty: 1, subtopic: "Dataflows Gen2",
    question: "¿Qué destino NO es válido para un flujo de datos Gen2 en Fabric?",
    options: ["Lakehouse", "Data Warehouse", "Azure SQL Database externo directamente", "KQL Database"],
    correct: 2,
    explanation: "Los flujos de datos Gen2 pueden enviar datos a destinos dentro de Fabric como Lakehouses y Warehouses. Para cargar a Azure SQL externo necesitarías una canalización con actividad Copy Data."
  },
  {
    id: 34, domain: 1, difficulty: 2, subtopic: "Delta Lake",
    question: "¿Qué función tiene el Time Travel en Delta Lake?",
    options: [
      "Permite consultar versiones históricas de los datos en un punto específico del tiempo",
      "Optimiza el rendimiento de consultas futuras",
      "Programa ejecuciones de pipelines en el futuro",
      "Sincroniza la hora entre diferentes regiones"
    ],
    correct: 0,
    explanation: "Time Travel permite consultar datos tal como estaban en un momento anterior usando VERSION AS OF o TIMESTAMP AS OF, útil para auditoría, debugging y recuperación de datos."
  },
  {
    id: 35, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué operador KQL se usa para agrupar y agregar datos?",
    options: ["group by", "summarize", "aggregate", "collect"],
    correct: 1,
    explanation: "En KQL, 'summarize' es el operador que agrupa y agrega datos: Tabla | summarize count() by columna. Es el equivalente al GROUP BY de SQL pero con sintaxis KQL."
  }
];

// Domain 2: Mantener Solución de Análisis (25-30%)
const QUESTIONS_DOMAIN_2 = [
  {
    id: 36, domain: 2, difficulty: 1, subtopic: "Workspace Security",
    question: "¿Qué nivel de seguridad controla quién puede acceder a un workspace en Fabric?",
    options: ["Row-Level Security", "Workspace roles (Admin, Member, Contributor, Viewer)", "Object-Level Security", "Sensitivity labels"],
    correct: 1,
    explanation: "Los roles de workspace (Admin, Member, Contributor, Viewer) controlan el acceso y las acciones que los usuarios pueden realizar dentro de un workspace."
  },
  {
    id: 37, domain: 2, difficulty: 2, subtopic: "RLS/CLS/OLS",
    question: "¿Qué implementa Row-Level Security (RLS) en un modelo semántico?",
    options: [
      "Oculta columnas específicas a ciertos usuarios",
      "Filtra filas de datos según la identidad del usuario conectado",
      "Cifra las filas sensibles",
      "Limita el número de filas que se pueden consultar"
    ],
    correct: 1,
    explanation: "RLS aplica filtros DAX basados en la identidad del usuario, asegurando que cada persona solo vea las filas de datos que le corresponden (ej: un vendedor solo ve sus propias ventas)."
  },
  {
    id: 38, domain: 2, difficulty: 2, subtopic: "Deployment Pipelines",
    question: "¿Qué son los Deployment Pipelines en Fabric?",
    options: [
      "Pipelines ETL para mover datos",
      "Pipelines CI/CD para promover contenido entre entornos (Dev → Test → Prod)",
      "Pipelines de Machine Learning",
      "Pipelines de notificaciones"
    ],
    correct: 1,
    explanation: "Los Deployment Pipelines permiten gestionar el ciclo de vida del contenido de Fabric (informes, modelos, etc.) promoviendo cambios desde Desarrollo a Pruebas y Producción de forma controlada."
  },
  {
    id: 39, domain: 2, difficulty: 1, subtopic: "Workspace Security",
    question: "¿Qué rol de workspace permite publicar contenido pero NO gestionar accesos?",
    options: ["Admin", "Member", "Contributor", "Viewer"],
    correct: 2,
    explanation: "El rol Contributor puede crear, editar y eliminar contenido en el workspace, pero no puede gestionar permisos ni añadir otros usuarios. Admin y Member sí pueden gestionar accesos."
  },
  {
    id: 40, domain: 2, difficulty: 3, subtopic: "RLS/CLS/OLS",
    question: "¿Qué es Object-Level Security (OLS) en un modelo semántico?",
    options: [
      "Seguridad a nivel de fila",
      "Seguridad que oculta tablas o columnas completas a ciertos roles",
      "Seguridad a nivel de archivo",
      "Permisos de escritura en tablas"
    ],
    correct: 1,
    explanation: "OLS permite ocultar tablas o columnas enteras en un modelo semántico para roles específicos. A diferencia de RLS (que filtra filas), OLS hace que ciertos objetos sean completamente invisibles."
  },
  {
    id: 41, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Para qué sirven las etiquetas de sensibilidad (sensitivity labels) en Fabric?",
    options: [
      "Para clasificar y proteger datos según su nivel de confidencialidad",
      "Para etiquetar visualmente los dashboards",
      "Para organizar workspaces por tema",
      "Para priorizar el procesamiento de consultas"
    ],
    correct: 0,
    explanation: "Las etiquetas de sensibilidad de Microsoft Purview clasifican el contenido (Público, Confidencial, Altamente Confidencial) y pueden aplicar protección como cifrado y restricciones de exportación."
  },
  {
    id: 42, domain: 2, difficulty: 2, subtopic: "Deployment Pipelines",
    question: "¿Cuántas etapas tiene un Deployment Pipeline en Fabric por defecto?",
    options: ["2 (Dev, Prod)", "3 (Development, Test, Production)", "4 (Dev, QA, Staging, Prod)", "Configurable sin límite"],
    correct: 1,
    explanation: "Por defecto, un Deployment Pipeline tiene 3 etapas: Development, Test y Production. Cada etapa se asocia a un workspace diferente."
  },
  {
    id: 43, domain: 2, difficulty: 1, subtopic: "Monitoring",
    question: "¿Qué herramienta de Fabric permite monitorizar el uso y rendimiento de un workspace?",
    options: ["Admin Portal", "Monitoring Hub", "Capacity Metrics App", "Todas las anteriores"],
    correct: 3,
    explanation: "Fabric ofrece múltiples herramientas: el Admin Portal para configuración, el Monitoring Hub para ver actividades en curso, y la Capacity Metrics App para analizar el consumo de recursos."
  },
  {
    id: 44, domain: 2, difficulty: 3, subtopic: "Workspace Security",
    question: "¿Qué diferencia hay entre permisos de workspace y permisos de item en Fabric?",
    options: [
      "No hay diferencia, son lo mismo",
      "Los permisos de workspace se heredan a todos los items; los permisos de item permiten compartir items individuales fuera del workspace",
      "Los permisos de item son más restrictivos que los de workspace",
      "Solo los admins pueden usar permisos de item"
    ],
    correct: 1,
    explanation: "Los permisos de workspace aplican a todo su contenido. Los permisos de item permiten compartir elementos específicos (un informe, un modelo) con usuarios que no tienen acceso al workspace completo."
  },
  {
    id: 45, domain: 2, difficulty: 2, subtopic: "Capacity Management",
    question: "¿Qué es una Capacity en Microsoft Fabric?",
    options: [
      "El número máximo de usuarios",
      "Un pool de recursos computacionales (CPU, memoria) asignados a workspaces",
      "El espacio de almacenamiento disponible",
      "El número de workspaces permitidos"
    ],
    correct: 1,
    explanation: "Una Capacity es un conjunto de recursos computacionales con un tamaño específico (F2, F4, F64, etc.) que se asigna a workspaces. Define la potencia de procesamiento disponible para todas las cargas de trabajo."
  },
  {
    id: 46, domain: 2, difficulty: 2, subtopic: "Git Integration",
    question: "¿Qué mecanismo permite integrar Fabric con Git para control de versiones?",
    options: [
      "Export/Import manual de archivos",
      "Git Integration nativa que conecta workspaces con repos Azure DevOps o GitHub",
      "Solo mediante APIs REST externas",
      "No es posible, Fabric no soporta Git"
    ],
    correct: 1,
    explanation: "Fabric tiene integración Git nativa que permite conectar un workspace a un repositorio en Azure DevOps o GitHub, habilitando control de versiones, branching y colaboración."
  },
  {
    id: 47, domain: 2, difficulty: 1, subtopic: "Workspace Security",
    question: "¿Qué rol de workspace tiene permisos completos incluyendo eliminar el workspace?",
    options: ["Viewer", "Contributor", "Member", "Admin"],
    correct: 3,
    explanation: "Solo el rol Admin puede eliminar el workspace, gestionar todos los permisos y configurar la integración con git y deployment pipelines."
  },
  {
    id: 48, domain: 2, difficulty: 3, subtopic: "Governance",
    question: "¿Qué estrategia se recomienda para organizar workspaces en un escenario empresarial?",
    options: [
      "Un solo workspace para todo",
      "Separar por dominio/equipo de negocio y por entorno (dev/test/prod)",
      "Un workspace por cada informe",
      "Organizar por tipo de dato únicamente"
    ],
    correct: 1,
    explanation: "La práctica recomendada es organizar workspaces por dominio de negocio (Ventas, RRHH, Finanzas) y por entorno (Dev, Test, Prod), facilitando governance, seguridad y deployment pipelines."
  },
  {
    id: 49, domain: 2, difficulty: 2, subtopic: "RLS/CLS/OLS",
    question: "¿Qué es Column-Level Security (CLS) en un Data Warehouse de Fabric?",
    options: [
      "Seguridad que filtra filas según el usuario",
      "Seguridad que restringe el acceso de lectura a columnas específicas mediante GRANT/DENY",
      "Cifrado de columnas individuales",
      "Compresión de columnas para seguridad"
    ],
    correct: 1,
    explanation: "CLS usa sentencias T-SQL GRANT y DENY para controlar qué usuarios pueden leer columnas específicas de una tabla en el Data Warehouse. Ejemplo: DENY SELECT ON tabla(columna_salario) TO rol_basico."
  },
  {
    id: 50, domain: 2, difficulty: 2, subtopic: "Capacity Management",
    question: "¿Qué sucede si se revoca la licencia de Fabric de un tenant?",
    options: [
      "Los datos se eliminan inmediatamente",
      "Los workspaces entran en un periodo de retención y se puede acceder en modo de solo lectura",
      "Todo sigue funcionando sin cambios",
      "Los datos se mueven automáticamente a Azure Storage"
    ],
    correct: 1,
    explanation: "Al expirar la licencia hay un periodo de retención durante el cual los datos se mantienen pero con funcionalidad limitada (solo lectura). Pasado ese periodo, los datos pueden eliminarse."
  },
  {
    id: 51, domain: 2, difficulty: 3, subtopic: "RLS/CLS/OLS",
    question: "¿Cómo se implementa Dynamic Row-Level Security para que cada vendedor vea solo sus datos?",
    options: [
      "Creando un informe separado para cada vendedor",
      "Usando USERPRINCIPALNAME() en el filtro DAX del rol RLS para comparar con una tabla de permisos",
      "Configurando filtros de página en cada informe",
      "Usando OLS para ocultar filas"
    ],
    correct: 1,
    explanation: "Dynamic RLS usa la función DAX USERPRINCIPALNAME() para capturar el email del usuario actual y filtrarlo contra una tabla de mapeo usuario→datos, eliminando la necesidad de crear un rol por persona."
  },
  {
    id: 52, domain: 2, difficulty: 1, subtopic: "Deployment Pipelines",
    question: "¿Dónde se configuran los Deployment Pipelines en Fabric?",
    options: [
      "En Azure DevOps exclusivamente",
      "Desde el portal de Fabric, en la sección Deployment Pipelines",
      "En PowerShell únicamente",
      "En el Admin Portal de Microsoft 365"
    ],
    correct: 1,
    explanation: "Los Deployment Pipelines se crean y gestionan directamente desde el portal web de Fabric, donde puedes asignar workspaces a cada etapa y comparar cambios entre etapas."
  },
  {
    id: 53, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Qué permite la función de 'Endorsement' en Fabric?",
    options: [
      "Firmar digitalmente los informes",
      "Certificar o promover contenido para indicar que es confiable y aprobado",
      "Bloquear la edición de un item",
      "Asignar un SLA a un dataset"
    ],
    correct: 1,
    explanation: "Endorsement permite marcar items como 'Promoted' (promovido por el autor) o 'Certified' (certificado por un administrador), ayudando a los usuarios a encontrar contenido confiable y de calidad."
  },
  {
    id: 54, domain: 2, difficulty: 3, subtopic: "Networking",
    question: "¿Qué son las Managed Private Endpoints en Fabric?",
    options: [
      "URLs privadas para informes",
      "Conexiones seguras desde Fabric a fuentes de datos a través de redes privadas de Azure",
      "Endpoints de API para automatización",
      "Puntos de acceso VPN para usuarios"
    ],
    correct: 1,
    explanation: "Las Managed Private Endpoints permiten que Fabric se conecte a fuentes de datos en Azure (SQL, Storage, etc.) a través del backbone privado de Azure, sin exponer tráfico a internet público."
  },
  {
    id: 55, domain: 2, difficulty: 1, subtopic: "Governance",
    question: "¿Qué es el Admin Portal de Microsoft Fabric?",
    options: [
      "El portal para desarrollar informes",
      "La interfaz central para administrar la configuración del tenant, capacidades y governance",
      "El marketplace de aplicaciones",
      "El portal para crear pipelines"
    ],
    correct: 1,
    explanation: "El Admin Portal es la interfaz de administración centralizada donde se configuran tenant settings, capacidades, dominios, auditoría y todas las políticas de governance de Fabric."
  }
];

// Domain 3: Implementar y Gestionar Modelos Semánticos (25-30%)
const QUESTIONS_DOMAIN_3 = [
  {
    id: 56, domain: 3, difficulty: 1, subtopic: "Storage Modes",
    question: "¿Qué es un modelo semántico en Microsoft Fabric/Power BI?",
    options: [
      "Una base de datos relacional",
      "Una capa de definición de datos que incluye tablas, relaciones, medidas y jerarquías para análisis",
      "Un archivo CSV con metadatos",
      "Un tipo de visualización"
    ],
    correct: 1,
    explanation: "Un modelo semántico (antes 'dataset') define las tablas, relaciones, medidas DAX y jerarquías que Power BI usa para responder preguntas de negocio. Es la capa lógica entre los datos y los informes."
  },
  {
    id: 57, domain: 3, difficulty: 2, subtopic: "Storage Modes",
    question: "¿Qué modo de almacenamiento carga todos los datos en memoria para máximo rendimiento?",
    options: ["DirectQuery", "Import", "Dual", "Direct Lake"],
    correct: 1,
    explanation: "El modo Import carga todos los datos en la memoria del motor VertiPaq, proporcionando el rendimiento más rápido para consultas pero requiriendo refresco periódico para actualizar datos."
  },
  {
    id: 58, domain: 3, difficulty: 2, subtopic: "Storage Modes",
    question: "¿Qué es Direct Lake y cuál es su ventaja principal?",
    options: [
      "Un tipo de lago de datos",
      "Un modo de almacenamiento que lee directamente de archivos Delta en OneLake sin importar ni crear consultas",
      "Una conexión directa a Azure SQL",
      "Un tipo de cache para mejorar DirectQuery"
    ],
    correct: 1,
    explanation: "Direct Lake es un modo exclusivo de Fabric que lee datos directamente de archivos Delta/Parquet en OneLake. Combina el rendimiento cercano a Import con la frescura de DirectQuery, sin proceso de importación."
  },
  {
    id: 59, domain: 3, difficulty: 1, subtopic: "Star Schema",
    question: "¿Qué patrón de modelado de datos se recomienda para modelos semánticos analíticos?",
    options: ["Modelo normalizado (3NF)", "Esquema en estrella (Star Schema)", "Modelo en red (Network)", "Modelo jerárquico"],
    correct: 1,
    explanation: "El esquema en estrella, con tablas de hechos centrales rodeadas de tablas de dimensión, es el patrón recomendado porque optimiza tanto el rendimiento de VertiPaq como la usabilidad para los usuarios."
  },
  {
    id: 60, domain: 3, difficulty: 2, subtopic: "DAX Core",
    question: "¿Qué función DAX calcula un total acumulado (running total)?",
    options: [
      "TOTALYTD()",
      "Una combinación de CALCULATE() con filtros de fecha acumulados",
      "RUNNINGTOTAL() nativa",
      "CUMULATE()"
    ],
    correct: 1,
    explanation: "No existe RUNNINGTOTAL() nativo en DAX. Se construye combinando CALCULATE() con funciones de filtro como FILTER(ALL(Dates), Dates[Date] <= MAX(Dates[Date])) para acumular valores."
  },
  {
    id: 61, domain: 3, difficulty: 3, subtopic: "Calculation Groups",
    question: "¿Qué son los Calculation Groups en un modelo semántico?",
    options: [
      "Grupos de columnas calculadas",
      "Objetos que aplican modificaciones de cálculo reutilizables a medidas existentes (ej: YTD, MTD, vs PY)",
      "Agrupaciones de tablas relacionadas",
      "Conjuntos de parámetros de consulta"
    ],
    correct: 1,
    explanation: "Los Calculation Groups permiten definir 'items de cálculo' reutilizables (como YTD, Prior Year, Moving Average) que se aplican dinámicamente a cualquier medida, evitando duplicar medidas con variaciones temporales."
  },
  {
    id: 62, domain: 3, difficulty: 2, subtopic: "Performance Optimization",
    question: "¿Qué es el Incremental Refresh y para qué sirve?",
    options: [
      "Refrescar el modelo cada hora automáticamente",
      "Refrescar solo los datos nuevos o modificados en lugar de recargar toda la tabla",
      "Incrementar gradualmente el tamaño del modelo",
      "Actualizar las medidas DAX de forma incremental"
    ],
    correct: 1,
    explanation: "Incremental Refresh configura políticas para refrescar solo las particiones con datos nuevos/modificados, reduciendo drásticamente el tiempo de refresco y la carga en el origen de datos."
  },
  {
    id: 63, domain: 3, difficulty: 2, subtopic: "DAX Core",
    question: "¿Qué función DAX devuelve el contexto de filtro actual para una columna?",
    options: ["FILTER()", "HASONEVALUE()", "VALUES()", "SELECTEDVALUE()"],
    correct: 2,
    explanation: "VALUES() devuelve una tabla con los valores distintos visibles en el contexto de filtro actual. SELECTEDVALUE() devuelve un único valor si hay exactamente uno seleccionado."
  },
  {
    id: 64, domain: 3, difficulty: 3, subtopic: "DAX Core",
    question: "¿Qué hace la función CALCULATE en DAX?",
    options: [
      "Realiza cálculos matemáticos básicos",
      "Evalúa una expresión en un contexto de filtro modificado",
      "Crea columnas calculadas",
      "Calcula el rendimiento de las consultas"
    ],
    correct: 1,
    explanation: "CALCULATE es la función más importante de DAX. Toma una expresión (medida) y uno o más filtros que modifican el contexto de evaluación. Permite calcular valores en contextos diferentes al actual."
  },
  {
    id: 65, domain: 3, difficulty: 1, subtopic: "DAX Core",
    question: "¿Cuál es la diferencia entre una medida y una columna calculada en DAX?",
    options: [
      "No hay diferencia práctica",
      "Las medidas se calculan en tiempo de consulta; las columnas calculadas se calculan al refrescar y ocupan memoria",
      "Las columnas calculadas son más rápidas",
      "Las medidas solo funcionan en tablas de hechos"
    ],
    correct: 1,
    explanation: "Las columnas calculadas se evalúan fila por fila durante el refresco y se almacenan en memoria. Las medidas se calculan dinámicamente al consultar según el contexto de filtro. Medidas son preferibles cuando es posible."
  },
  {
    id: 66, domain: 3, difficulty: 2, subtopic: "Performance Optimization",
    question: "¿Qué herramienta permite analizar el rendimiento de consultas DAX?",
    options: ["Power Query Editor", "DAX Studio y Performance Analyzer de Power BI", "SQL Server Profiler", "Azure Monitor"],
    correct: 1,
    explanation: "DAX Studio permite analizar y optimizar consultas DAX en detalle. Power BI Desktop incluye Performance Analyzer para ver el tiempo de cada visual. Ambos son esenciales para optimización."
  },
  {
    id: 67, domain: 3, difficulty: 3, subtopic: "Star Schema",
    question: "¿Qué es la cardinalidad en una relación de modelo semántico y cuál es la más común?",
    options: [
      "El número de tablas; many-to-many",
      "El tipo de asociación entre tablas; one-to-many (1:N) es la más común y recomendada",
      "La cantidad de datos; one-to-one",
      "El tipo de filtro; bidireccional"
    ],
    correct: 1,
    explanation: "La cardinalidad define cómo se relacionan las tablas. One-to-many (1:N) es la más común: una dimensión (1) conecta a una tabla de hechos (N). Many-to-many debe evitarse cuando sea posible."
  },
  {
    id: 68, domain: 3, difficulty: 2, subtopic: "DAX Time Intelligence",
    question: "¿Qué función DAX se usa para calcular el total del año hasta la fecha (YTD)?",
    options: ["SUMYTD()", "TOTALYTD()", "DATESYTD()", "Tanto TOTALYTD() como DATESYTD() con CALCULATE()"],
    correct: 3,
    explanation: "TOTALYTD(expresion, columna_fecha) es un atajo que calcula directamente el YTD. Alternativamente, CALCULATE(medida, DATESYTD(columna_fecha)) logra lo mismo con más flexibilidad."
  },
  {
    id: 69, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Cuándo conviene usar DirectQuery en lugar de Import?",
    options: [
      "Siempre, es superior en todo",
      "Cuando se necesitan datos en tiempo real o el volumen es demasiado grande para importar en memoria",
      "Cuando hay menos de 1000 filas",
      "Solo cuando no hay licencia Premium"
    ],
    correct: 1,
    explanation: "DirectQuery es apropiado cuando: los datos cambian frecuentemente y se necesita información en tiempo real, el volumen excede los límites de Import, o existen requisitos de seguridad que impiden copiar datos."
  },
  {
    id: 70, domain: 3, difficulty: 2, subtopic: "DAX Time Intelligence",
    question: "¿Qué es una tabla de fecha (Date table) y por qué es importante en un modelo semántico?",
    options: [
      "Cualquier tabla con una columna de tipo fecha",
      "Una tabla de dimensión dedicada con una fila por cada día, marcada como tabla de fechas, necesaria para Time Intelligence",
      "Una tabla que registra las fechas de refresco",
      "Una tabla de auditoría de cambios"
    ],
    correct: 1,
    explanation: "Una tabla de fecha es una dimensión con una fila por día (sin gaps), marcada como Date Table en el modelo. Es requisito para que las funciones de Time Intelligence DAX (YTD, MTD, SAMEPERIODLASTYEAR) funcionen correctamente."
  },
  {
    id: 71, domain: 3, difficulty: 2, subtopic: "DAX Core",
    question: "¿Qué hace la función REMOVEFILTERS() en DAX?",
    options: [
      "Elimina filas de una tabla",
      "Quita filtros del contexto de evaluación actual (equivale a ALL() como filtro)",
      "Elimina columnas del modelo",
      "Desconecta relaciones"
    ],
    correct: 1,
    explanation: "REMOVEFILTERS() limpia filtros del contexto de evaluación. Usada dentro de CALCULATE, permite ignorar filtros de slicers o visuales para calcular totales generales o porcentajes del total."
  },
  {
    id: 72, domain: 3, difficulty: 1, subtopic: "Star Schema",
    question: "¿Qué es una jerarquía en un modelo semántico?",
    options: [
      "El orden de las tablas",
      "Una estructura de niveles de drill-down en una dimensión (ej: País → Región → Ciudad)",
      "La prioridad de las medidas",
      "El orden de las relaciones"
    ],
    correct: 1,
    explanation: "Una jerarquía define niveles anidados en una dimensión (como Año → Trimestre → Mes → Día en fechas, o País → Región → Ciudad en geografía), permitiendo drill-down/up en visuales."
  },
  {
    id: 73, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Qué optimización ofrece VertiPaq para columnas con pocos valores distintos?",
    options: [
      "Las ignora para ahorrar espacio",
      "Usa codificación de diccionario y compresión de ejecución (run-length encoding) para alta eficiencia",
      "Las convierte automáticamente a texto",
      "Las almacena en disco en lugar de memoria"
    ],
    correct: 1,
    explanation: "VertiPaq usa Value Encoding y Dictionary Encoding para comprimir datos eficientemente. Columnas con baja cardinalidad (pocos valores distintos) se comprimen extremadamente bien con run-length encoding."
  },
  {
    id: 74, domain: 3, difficulty: 2, subtopic: "Storage Modes",
    question: "¿Qué sucede cuando un modelo Direct Lake hace 'fallback' a DirectQuery?",
    options: [
      "El modelo deja de funcionar",
      "Las consultas se redirigen al SQL endpoint del Lakehouse, perdiendo rendimiento de Import",
      "Los datos se importan automáticamente",
      "Se muestra un error al usuario"
    ],
    correct: 1,
    explanation: "Cuando Direct Lake no puede servir una consulta desde el cache en memoria (ej: excede límites de memoria, datos no en caché), hace fallback a DirectQuery contra el SQL endpoint, con rendimiento menor."
  },
  {
    id: 75, domain: 3, difficulty: 2, subtopic: "Composite Models",
    question: "¿Cómo se crea un modelo semántico compuesto (composite model)?",
    options: [
      "Combinando solo tablas Import",
      "Combinando tablas en diferentes modos de almacenamiento (Import + DirectQuery) en el mismo modelo",
      "Uniendo dos modelos semánticos existentes",
      "Usando solo tablas Direct Lake"
    ],
    correct: 1,
    explanation: "Un modelo compuesto permite mezclar tablas Import (alto rendimiento) con tablas DirectQuery (datos en tiempo real) en el mismo modelo, optimizando el balance entre rendimiento y frescura."
  },
  {
    id: 76, domain: 3, difficulty: 1, subtopic: "Star Schema",
    question: "¿Qué dirección de filtro cruzado se recomienda para la mayoría de las relaciones?",
    options: ["Bidireccional siempre", "Single (unidireccional) de dimensión a hechos", "No usar filtros cruzados", "Depende del tipo de dato"],
    correct: 1,
    explanation: "La dirección Single (unidireccional) desde la tabla de dimensión hacia la tabla de hechos es la recomendada. Las relaciones bidireccionales pueden causar ambigüedad y problemas de rendimiento."
  },
  {
    id: 77, domain: 3, difficulty: 3, subtopic: "DAX Time Intelligence",
    question: "¿Qué función DAX se usa para comparar un valor con el mismo periodo del año anterior?",
    options: ["PREVIOUSYEAR()", "SAMEPERIODLASTYEAR()", "DATEADD(dates, -1, YEAR)", "Tanto B como C son válidas"],
    correct: 3,
    explanation: "SAMEPERIODLASTYEAR(dates) desplaza un periodo un año atrás. DATEADD(dates, -1, YEAR) logra lo mismo con más flexibilidad (permite especificar el número de periodos y la unidad)."
  },
  {
    id: 78, domain: 3, difficulty: 2, subtopic: "XMLA/Tabular Model",
    question: "¿Qué comando de XMLA endpoint permite administrar modelos semánticos programáticamente?",
    options: ["Solo PowerShell", "TMSL (Tabular Model Scripting Language) y TOM (Tabular Object Model)", "Solo T-SQL", "Solo REST API"],
    correct: 1,
    explanation: "El XMLA endpoint permite usar TMSL (scripts JSON) y TOM (.NET) para gestionar modelos semánticos programáticamente: crear particiones, refrescar datos, modificar medidas, etc."
  },
  {
    id: 79, domain: 3, difficulty: 2, subtopic: "DAX Core",
    question: "¿Qué función DAX es más apropiada para contar filas distintas?",
    options: ["COUNT()", "COUNTA()", "DISTINCTCOUNT()", "COUNTROWS()"],
    correct: 2,
    explanation: "DISTINCTCOUNT(columna) cuenta el número de valores únicos en una columna. COUNT() cuenta valores no vacíos, COUNTA() cuenta no blancos, y COUNTROWS() cuenta filas de una tabla."
  },
  {
    id: 80, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Qué es el 'framing' en Direct Lake y cómo afecta a la frescura de datos?",
    options: [
      "Un tipo de visualización",
      "El proceso de tomar una instantánea de los archivos Delta para que el modelo los cargue en memoria",
      "El tamaño del marco de datos en pantalla",
      "La configuración de la ventana de tiempo de análisis"
    ],
    correct: 1,
    explanation: "Framing es el proceso por el cual Direct Lake toma una instantánea (snapshot) de qué archivos Parquet/Delta debe leer. Hasta que ocurra un nuevo framing, el modelo ve los datos del snapshot anterior."
  }
];

// ─── Domain 1 — Hard: T-SQL Optimization (IDs 81-90) ───
const QUESTIONS_TSQL_HARD = [
  {
    id: 81, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "En un Data Warehouse de Fabric, ¿qué vista del sistema debes consultar para obtener el plan de ejecución de una query T-SQL reciente?",
    options: [
      "sys.dm_exec_requests",
      "queryinsights.exec_requests_history y queryinsights.frequently_run_queries",
      "sys.query_store_plan",
      "INFORMATION_SCHEMA.ROUTINES"
    ],
    correct: 1,
    explanation: "Fabric Warehouse expone las vistas queryinsights.exec_requests_history (historial de queries) y queryinsights.frequently_run_queries (queries frecuentes). Estas son la forma correcta de monitorizar y optimizar el rendimiento en Fabric, en lugar de sys.dm_exec_requests que pertenece a SQL Server."
  },
  {
    id: 82, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "¿Cuál es el efecto de ejecutar CREATE STATISTICS manualmente en una tabla de Fabric Warehouse?",
    options: [
      "Crea un índice columnstore adicional",
      "No tiene efecto porque Fabric crea estadísticas automáticamente",
      "Actualiza los histogramas que usa el optimizador para estimar cardinalidades y elegir mejores planes",
      "Compacta archivos Delta (equivalente a OPTIMIZE)"
    ],
    correct: 2,
    explanation: "CREATE STATISTICS actualiza los histogramas del optimizador de consultas. Aunque Fabric crea estadísticas automáticas, crearlas manualmente sobre columnas con sesgos de datos o joins frecuentes puede mejorar significativamente los planes de ejecución."
  },
  {
    id: 83, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "Al escribir una query con múltiples JOINs en Fabric Warehouse, ¿cuál de las siguientes estrategias tiene mayor impacto en el rendimiento?",
    options: [
      "Usar NOLOCK en todas las tablas",
      "Ordenar los JOINs de menor a mayor tabla",
      "Filtrar con WHERE lo antes posible para reducir el conjunto de datos antes de los JOINs",
      "Usar DISTINCT en lugar de GROUP BY"
    ],
    correct: 2,
    explanation: "Filtrar pronto reduce la cardinalidad de los conjuntos intermedios. El optimizador distribuido de Fabric se beneficia enormemente de predicados tempranos, ya que minimizan el movimiento de datos entre nodos en operaciones de JOIN. Fabric redistribuye datos (shuffle) para JOINs, y menos filas = menos shuffle."
  },
  {
    id: 84, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "¿Qué hace la instrucción TRUNCATE TABLE vs DELETE FROM en términos de rendimiento en Fabric Warehouse?",
    options: [
      "Son equivalentes en rendimiento",
      "TRUNCATE es DDL, no se puede deshacer, pero elimina todos los datos instantáneamente sin log de transacciones por fila",
      "DELETE es más rápido porque usa operaciones vectorizadas",
      "TRUNCATE no está disponible en Fabric Warehouse"
    ],
    correct: 1,
    explanation: "TRUNCATE TABLE es una operación DDL que elimina todos los datos de una tabla de forma masiva sin generar un log de transacciones por cada fila eliminada, siendo órdenes de magnitud más rápida que DELETE FROM para vaciar tablas completas."
  },
  {
    id: 85, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "En Fabric Warehouse, ¿cómo se pueden materializar resultados intermedios costosos para reutilizarlos en múltiples partes de una query compleja?",
    options: [
      "Con índices secundarios sobre las columnas de JOIN",
      "Con CTEs (WITH ... AS) que Fabric siempre materializa en disco",
      "Usando tablas temporales (#temp) o tablas de staging en el propio Warehouse",
      "No es posible, cada subquery se recalcula siempre"
    ],
    correct: 2,
    explanation: "En Fabric Warehouse, las tablas de staging (tablas reales o CTAS — CREATE TABLE AS SELECT) materializan resultados intermedios. Las CTEs son lógicas y el optimizador puede o no materializarlas. Para resultados costosos reutilizados múltiples veces, CTAS en una tabla temporal o de staging ofrece la mejor garantía de rendimiento."
  },
  {
    id: 86, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "¿Qué tipo de columnar format utiliza internamente Fabric Warehouse y qué ventaja de rendimiento ofrece para cargas analíticas?",
    options: [
      "Row-store con índices B-tree: óptimo para OLTP",
      "Columnstore index automático: comprime columnas individualmente y permite omitir grupos de filas no relevantes (segment elimination)",
      "Heap con páginas fijas de 8KB como SQL Server tradicional",
      "Formato JSON comprimido con índices hash"
    ],
    correct: 1,
    explanation: "Fabric Warehouse usa columnstore como formato subyacente. Los columnstore indexes comprimen columnas individualmente y el motor puede saltar rowgroups enteros que no cumplen predicados (segment/partition elimination), lo que reduce drásticamente el I/O en queries analíticas que sólo necesitan pocas columnas de tablas grandes."
  },
  {
    id: 87, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "¿Cuándo es recomendable usar CTAS (CREATE TABLE AS SELECT) en lugar de INSERT INTO ... SELECT en Fabric Warehouse?",
    options: [
      "Cuando se quieren añadir filas a una tabla existente sin perder los datos previos",
      "Para cargas masivas iniciales o reconstrucción completa de tablas, ya que es una operación paralela y más eficiente",
      "Solo cuando la tabla destino no tiene estadísticas definidas",
      "CTAS no está disponible en Fabric Warehouse, solo en Spark"
    ],
    correct: 1,
    explanation: "CTAS crea la tabla y carga los datos en una sola operación paralela optimizada, aprovechando al máximo la arquitectura distribuida de Fabric. Es la forma más eficiente de crear tablas derivadas o transformadas. INSERT INTO ... SELECT es mejor cuando necesitas añadir datos incrementalmente a una tabla ya existente."
  },
  {
    id: 88, domain: 1, difficulty: 3, subtopic: "Pipelines",
    question: "En una pipeline de Fabric, tienes una actividad Copy Data que carga 100 millones de filas en una tabla Lakehouse. ¿Qué configuración mejora más el rendimiento?",
    options: [
      "Reducir el batch size a 100 filas para menor presión de memoria",
      "Activar staging en Blob Storage y usar formato Parquet en la actividad Copy",
      "Usar formato CSV sin compresión para máxima velocidad de escritura",
      "Desactivar la validación de esquema (schema drift)"
    ],
    correct: 1,
    explanation: "Usar PolyBase staging + formato Parquet o staging en Blob es una práctica estándar para cargas masivas. El formato Parquet ofrece compresión columnar y es el formato nativo de Delta Lake. El staging descompone la carga en lectura paralela + escritura masiva, evitando inserciones fila a fila."
  },
  {
    id: 89, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "¿Qué consulta T-SQL permite ver el tiempo de ejecución promedio y número de ejecuciones de las queries más frecuentes en Fabric Warehouse?",
    options: [
      "SELECT * FROM sys.dm_exec_query_stats ORDER BY total_elapsed_time DESC",
      "SELECT * FROM queryinsights.frequently_run_queries ORDER BY run_count DESC",
      "EXEC sp_monitor",
      "SELECT * FROM sys.query_store_query_text"
    ],
    correct: 1,
    explanation: "En Fabric Warehouse, la vista queryinsights.frequently_run_queries muestra las queries ejecutadas con mayor frecuencia junto con métricas de rendimiento agregadas. Es la herramienta correcta para Fabric, a diferencia de sys.dm_exec_query_stats que es específica de SQL Server/Azure SQL."
  },
  {
    id: 90, domain: 1, difficulty: 3, subtopic: "Dataflows Gen2",
    question: "¿Qué es el 'query folding' en el contexto de Flujos de Datos Gen2 (Power Query) en Fabric y por qué es crucial para el rendimiento?",
    options: [
      "La capacidad de combinar múltiples consultas en un solo archivo de configuración",
      "La traducción de pasos de Power Query a consultas nativas del origen (SQL, OData...) para que el procesamiento ocurra en el servidor origen",
      "La optimización del ancho de banda de red comprimiendo los datos antes de la transferencia",
      "El proceso de eliminar columnas duplicadas automáticamente"
    ],
    correct: 1,
    explanation: "Query folding es el proceso por el cual Power Query traduce sus pasos (filtros, agrupaciones, joins) a consultas nativas del origen de datos (T-SQL para SQL Server, OData para APIs, etc.), permitiendo que el servidor origen procese los datos. Sin folding, Fabric descarga TODOS los datos y los procesa localmente, lo que es mucho más lento y costoso para orígenes grandes."
  }
];

// ─── Domain 3 — Hard: Direct Lake (IDs 91-100) ───
const QUESTIONS_DIRECT_LAKE_HARD = [
  {
    id: 91, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Cuál es la diferencia fundamental entre Direct Lake mode e Import mode en un modelo semántico de Fabric?",
    options: [
      "Import carga datos en memoria una sola vez; Direct Lake lee archivos Delta directamente sin importar, con rendimiento in-memory bajo demanda",
      "Direct Lake es más lento pero más seguro porque no guarda datos en memoria",
      "Import mode es exclusivo de Power BI Premium; Direct Lake solo está disponible en Fabric Free",
      "No hay diferencia práctica, son sinónimos en el contexto de Fabric"
    ],
    correct: 0,
    explanation: "Import mode copia los datos en la caché in-memory del modelo semántico (Vertipaq). Direct Lake lee los archivos Parquet/Delta de OneLake directamente, cargando columnas en memoria solo cuando son necesarias (transcoding), ofreciendo la velocidad de Import sin necesidad de un proceso de actualización y con datos siempre frescos."
  },
  {
    id: 92, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿En qué situación un modelo Direct Lake realiza un 'fallback' automático a DirectQuery?",
    options: [
      "Cuando el usuario no tiene permisos de Workspace Contributor",
      "Cuando se supera el número máximo de filas de la capacidad, cuando se usan características incompatibles (calculated tables, algunas funciones DAX), o cuando los datos están en shortcuts de S3",
      "Cuando se accede al modelo desde Power BI Desktop",
      "Siempre que se actualiza el modelo semántico"
    ],
    correct: 1,
    explanation: "Direct Lake hace fallback a DirectQuery cuando: (1) los datos superan los límites de la capacidad de Fabric, (2) se usan features incompatibles como calculated tables nativas o certain DAX functions, (3) los datos vienen de shortcuts no compatibles. El fallback es automático y transparente pero impacta el rendimiento."
  },
  {
    id: 93, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "Para un modelo Direct Lake, ¿cuál es el origen de datos compatible?",
    options: [
      "Cualquier fuente que se pueda conectar desde Power BI Desktop",
      "Solo tablas Delta en un Lakehouse o Warehouse dentro del mismo workspace de Fabric",
      "Tablas Delta en OneLake, incluyendo Lakehouses y Warehouses en el mismo tenant de Fabric",
      "Solo tablas en un Azure Synapse Analytics externo"
    ],
    correct: 2,
    explanation: "Direct Lake requiere tablas Delta almacenadas en OneLake. Pueden estar en cualquier Lakehouse o Warehouse del mismo tenant de Fabric, no necesariamente del mismo workspace. No puede conectarse a fuentes externas como Azure SQL, ni a archivos CSV/JSON directamente."
  },
  {
    id: 94, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Qué es el proceso de 'framing' en Direct Lake y cuándo se produce?",
    options: [
      "La visualización del modelo en pantalla completa",
      "La creación de un snapshot consistente de los archivos Delta que el modelo leerá; ocurre al inicio de cada sesión o query batch",
      "La compresión de archivos Parquet para reducir el tamaño en OneLake",
      "El proceso de traducir DAX a SQL para enviar al Lakehouse"
    ],
    correct: 1,
    explanation: "Framing es el proceso por el cual Direct Lake identifica y 'bloquea' el snapshot de los archivos Delta del momento actual (similar al mecanismo de snapshot isolation de Delta). Hasta que ocurra un nuevo framing, el modelo ve los mismos datos. El framing ocurre automáticamente en ciertos eventos y se puede forzar con el comando de actualización del modelo."
  },
  {
    id: 95, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "En un modelo Direct Lake, ¿cómo se implementa Row-Level Security (RLS)?",
    options: [
      "No es posible usar RLS en Direct Lake, hay que migrar a Import",
      "Con roles DAX igual que en Import mode; Direct Lake respeta los roles definidos en el modelo semántico",
      "Solo mediante Column-Level Security (CLS) en el Lakehouse subyacente",
      "Mediante filtros de URL en el Power BI Service"
    ],
    correct: 1,
    explanation: "Direct Lake soporta RLS estándar con roles definidos en DAX, igual que Import mode. Los filtros DAX se aplican sobre las columnas cargadas en memoria. Sin embargo, si el modelo hace fallback a DirectQuery por algún motivo, el RLS del modelo semántico sigue funcionando."
  },
  {
    id: 96, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Qué impacto tiene la ejecución de OPTIMIZE en las tablas Delta del Lakehouse sobre un modelo Direct Lake que apunta a esas tablas?",
    options: [
      "Ninguno; Direct Lake solo lee datos, no se ve afectado por operaciones de mantenimiento",
      "OPTIMIZE puede invalidar el framing actual del modelo, causando que la próxima query realice un nuevo framing con los archivos compactados",
      "OPTIMIZE elimina los datos del modelo Direct Lake en memoria, requiriendo una actualización completa",
      "OPTIMIZE convierte automáticamente el modelo a Import mode"
    ],
    correct: 1,
    explanation: "Cuando OPTIMIZE compacta los archivos Delta, los archivos físicos cambian. El modelo Direct Lake tiene un framing que apunta a los archivos anteriores. Al detectar que los archivos han cambiado en el próximo framing, recarga las columnas necesarias. Esto es controlado y esperado, pero puede causar una breve latencia en la primera query post-optimización."
  },
  {
    id: 97, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Cuál es el límite de tamaño de tabla en Direct Lake según la capacidad de Fabric?",
    options: [
      "1 GB por tabla independientemente de la capacidad",
      "El límite varía según el SKU de la capacidad de Fabric (por ejemplo F64 soporta tablas más grandes que F2)",
      "No hay límite de tamaño; Direct Lake escala horizontalmente sin restricciones",
      "El límite es siempre 300 millones de filas independientemente del SKU"
    ],
    correct: 1,
    explanation: "Los límites de Direct Lake escalan con el SKU de la capacidad de Fabric. Capacidades más pequeñas (F2, F4) tienen límites inferiores de filas por tabla y de cardinality. Capacidades premium (F64+) permiten tablas mucho más grandes. Cuando se superan los límites del SKU, el modelo hace fallback automático a DirectQuery."
  },
  {
    id: 98, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Cómo afecta la partición de tablas Delta al rendimiento de un modelo Direct Lake?",
    options: [
      "Las particiones siempre degradan el rendimiento de Direct Lake",
      "Direct Lake no puede leer tablas Delta particionadas",
      "Particionar por una columna de fecha/tiempo permite que Direct Lake cargue solo las particiones relevantes (partition pruning), mejorando el rendimiento de queries temporales",
      "Las particiones son ignoradas por Direct Lake; siempre lee todos los archivos"
    ],
    correct: 2,
    explanation: "La partición de tablas Delta es beneficiosa para Direct Lake cuando los reports filtran por la columna de partición (típicamente fecha). Direct Lake aplica partition pruning: solo transcoda (carga en memoria) los archivos de las particiones que contienen datos relevantes para la query, reduciendo la memoria necesaria y acelerando la respuesta."
  },
  {
    id: 99, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "Un modelo Direct Lake experimenta lentitud progresiva durante el día aunque los datos del Lakehouse no cambien. ¿Cuál es la causa más probable?",
    options: [
      "Los archivos Delta se corrompen durante el día",
      "La caché del motor VertiPaq se va llenando con columnas de queries anteriores y hay eviction (expulsión) de columnas menos usadas",
      "Direct Lake no tiene caché; re-lee los archivos en cada query",
      "La capacidad de Fabric se degrada automáticamente por el uso"
    ],
    correct: 1,
    explanation: "Direct Lake usa VertiPaq en memoria como caché. A medida que se ejecutan queries con distintas columnas, la caché se llena. Cuando la capacidad de la caché se agota, el motor expulsa (evict) columnas menos usadas. Las queries que necesitan esas columnas expulsadas deben re-transcodarlas desde los archivos Delta, causando latencia variable. Esto se gestiona con la configuración de la capacidad y el tamaño del modelo."
  },
  {
    id: 100, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Cuál es la diferencia entre 'Keep current data' y 'Drop and recreate' al actualizar un modelo semántico Direct Lake en Fabric?",
    options: [
      "Son opciones de compresión de archivos en el Lakehouse",
      "Opciones del Deployment Pipeline para promover el modelo entre entornos",
      "Modos de actualización del modelo semántico: 'Keep current' realiza un nuevo framing manteniendo la caché válida; 'Drop and recreate' borra toda la caché y recarga desde cero",
      "Direct Lake no tiene opciones de actualización porque siempre está en tiempo real"
    ],
    correct: 2,
    explanation: "'Keep current data' (framing incremental): actualiza el snapshot de qué archivos debe leer el modelo sin descartar la caché en memoria. Las columnas ya cargadas se mantienen si los datos no cambiaron. 'Drop and recreate': invalida toda la caché y el modelo recarga todo desde los archivos Delta. El primero es más eficiente para actualizaciones frecuentes con cambios parciales."
  }
];

// ─── NEW Questions (IDs 101-300) ───

const NEW_QUESTIONS_D1 = [
  // === Direct Lake in D1 context (101-110) ===
  {
    id: 101, domain: 1, difficulty: 2, subtopic: "Delta Lake",
    question: "¿Qué comando se usa para consultar una versión anterior de una tabla Delta en un Lakehouse?",
    options: [
      "SELECT * FROM tabla WHERE version = 5",
      "SELECT * FROM tabla VERSION AS OF 5",
      "SELECT * FROM tabla ROLLBACK TO 5",
      "SELECT * FROM tabla HISTORY 5"
    ],
    correct: 1,
    explanation: "Delta Lake soporta time travel con la sintaxis VERSION AS OF N o TIMESTAMP AS OF 'fecha'. Esto permite consultar un snapshot histórico sin modificar los datos actuales. Es útil para auditoría y recuperación."
  },
  {
    id: 102, domain: 1, difficulty: 3, subtopic: "Delta Lake",
    question: "¿Cuál es la diferencia entre schema enforcement y schema evolution en Delta Lake?",
    options: [
      "Son sinónimos del mismo concepto",
      "Schema enforcement rechaza escrituras con esquema diferente; schema evolution permite añadir o modificar columnas al escribir",
      "Schema enforcement solo aplica en lectura; schema evolution solo en escritura",
      "Schema enforcement es automático; schema evolution requiere recrear la tabla"
    ],
    correct: 1,
    explanation: "Schema enforcement (por defecto) rechaza escrituras que no coincidan con el esquema de la tabla, protegiendo la integridad. Schema evolution (habilitada con mergeSchema=true) permite que nuevas columnas se añadan automáticamente durante la escritura. Ambos mecanismos coexisten según la configuración."
  },
  {
    id: 103, domain: 1, difficulty: 2, subtopic: "Delta Lake",
    question: "¿Qué sucede si ejecutas VACUUM con un umbral de retención de 0 horas en una tabla Delta?",
    options: [
      "No tiene efecto",
      "Elimina TODOS los archivos no referenciados por la versión actual, incluyendo los necesarios para time travel",
      "Solo elimina archivos de más de 7 días",
      "Compacta los archivos en uno solo"
    ],
    correct: 1,
    explanation: "VACUUM con retención 0 elimina todos los archivos que no son parte del snapshot actual, destruyendo la capacidad de time travel. Por defecto Delta Lake requiere un mínimo de 168 horas (7 días) de retención. Para usar 0 hay que desactivar la comprobación con delta.retentionDurationCheck.enabled = false."
  },
  {
    id: 104, domain: 1, difficulty: 3, subtopic: "Delta Lake",
    question: "¿Qué patrón MERGE se usa para implementar un Slowly Changing Dimension Type 2 (SCD2) en Delta Lake?",
    options: [
      "MERGE con solo UPDATE SET",
      "MERGE con WHEN MATCHED AND condición_cambio THEN UPDATE para cerrar registro viejo + WHEN NOT MATCHED THEN INSERT para nuevo registro",
      "DELETE + INSERT para cada registro modificado",
      "ALTER TABLE ADD COLUMN para cada versión"
    ],
    correct: 1,
    explanation: "SCD Type 2 mantiene historial de cambios. Con MERGE: cuando un registro coincide por clave pero tiene atributos diferentes, se actualiza el registro existente (cerrando su fecha de fin) y se inserta una nueva fila con los datos actualizados y fecha de inicio actual. MERGE permite expresar ambas operaciones atómicamente."
  },
  {
    id: 105, domain: 1, difficulty: 1, subtopic: "Delta Lake",
    question: "¿Qué archivo especial mantiene Delta Lake para gestionar las transacciones?",
    options: [
      "Un archivo .metadata en cada carpeta",
      "El _delta_log con archivos JSON y checkpoints Parquet",
      "Un archivo .lock en la raíz de la tabla",
      "Un registro en el catálogo de Hive"
    ],
    correct: 1,
    explanation: "Delta Lake mantiene un directorio _delta_log con archivos JSON numerados secuencialmente que registran cada transacción (add/remove files, metadata changes). Cada 10 transacciones se crea un checkpoint en formato Parquet para acelerar la lectura del log."
  },
  {
    id: 106, domain: 1, difficulty: 2, subtopic: "Delta Lake",
    question: "¿Cuál es la estrategia recomendada de particionamiento para tablas Delta en un Lakehouse de Fabric?",
    options: [
      "Particionar por todas las columnas de la tabla",
      "Particionar por columnas de baja cardinalidad usadas frecuentemente como filtro (ej: año, mes, región)",
      "No particionar nunca, OPTIMIZE es suficiente",
      "Particionar por la clave primaria de la tabla"
    ],
    correct: 1,
    explanation: "El particionamiento funciona mejor con columnas de baja cardinalidad (pocos valores distintos) que se usan frecuentemente como filtro. Particionar por columnas de alta cardinalidad (como un ID) crea demasiados archivos pequeños. Columnas como año, mes, país o región son candidatas ideales."
  },
  {
    id: 107, domain: 1, difficulty: 3, subtopic: "Delta Lake",
    question: "En un Notebook de Fabric, ¿qué configuración de Spark permite habilitar schema evolution al escribir en una tabla Delta?",
    options: [
      "spark.conf.set('delta.schemaEvolution', 'true')",
      "Usar .option('mergeSchema', 'true') en la operación de escritura del DataFrame",
      "ALTER TABLE tabla ENABLE SCHEMA_EVOLUTION",
      "Configurar el Lakehouse con la opción enableSchemaEvolution en el portal"
    ],
    correct: 1,
    explanation: "En PySpark/Spark se usa .option('mergeSchema', 'true') al escribir un DataFrame para permitir que nuevas columnas se añadan automáticamente al esquema de la tabla Delta existente. También se puede configurar globalmente con spark.databricks.delta.schema.autoMerge.enabled."
  },
  {
    id: 108, domain: 1, difficulty: 2, subtopic: "Delta Lake",
    question: "¿Qué ventaja ofrece el comando OPTIMIZE ... ZORDER BY sobre un OPTIMIZE simple en tablas Delta?",
    options: [
      "ZORDER solo compacta archivos, igual que OPTIMIZE",
      "ZORDER reorganiza los datos físicamente para colocar valores similares de las columnas especificadas juntos, acelerando filtros en esas columnas",
      "ZORDER crea índices B-tree sobre las columnas",
      "ZORDER reduce el número de particiones automáticamente"
    ],
    correct: 1,
    explanation: "Z-Order es una técnica de co-localidad de datos multidimensional. Organiza físicamente los datos para que valores similares de las columnas ZORDER BY estén agrupados en los mismos archivos. Esto permite data skipping eficiente: al filtrar por esas columnas, el motor puede saltar archivos enteros que no contienen datos relevantes."
  },
  // === T-SQL avanzado en Warehouse (111-122) ===
  {
    id: 109, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "¿Qué cláusula T-SQL permite realizar un UPSERT (actualizar si existe, insertar si no) en Fabric Warehouse?",
    options: [
      "INSERT OR UPDATE",
      "MERGE INTO ... USING ... WHEN MATCHED THEN UPDATE WHEN NOT MATCHED THEN INSERT",
      "UPSERT INTO",
      "INSERT ON DUPLICATE KEY UPDATE"
    ],
    correct: 1,
    explanation: "MERGE INTO es la instrucción T-SQL estándar para upserts. Permite definir una condición de coincidencia (ON) y acciones diferenciadas para filas que coinciden (UPDATE/DELETE) y las que no (INSERT). Es fundamental para cargas incrementales en el Data Warehouse."
  },
  {
    id: 110, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "¿Qué función de ventana (window function) T-SQL se usa para asignar un número secuencial a cada fila dentro de una partición?",
    options: [
      "RANK()",
      "ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)",
      "DENSE_RANK()",
      "SEQUENCE()"
    ],
    correct: 1,
    explanation: "ROW_NUMBER() asigna un número único y secuencial a cada fila dentro de su partición, sin gaps ni repeticiones. RANK() deja gaps en caso de empates, y DENSE_RANK() no deja gaps pero puede repetir números. ROW_NUMBER es ideal para deduplicación: WHERE rn = 1."
  },
  {
    id: 111, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "En Fabric Warehouse, ¿cuál es la sintaxis correcta para crear un stored procedure?",
    options: [
      "CREATE FUNCTION dbo.MiProceso AS BEGIN ... END",
      "CREATE PROCEDURE dbo.MiProceso AS BEGIN ... END",
      "CREATE PROC dbo.MiProceso WITH RETURNS TABLE",
      "Los stored procedures no están disponibles en Fabric Warehouse"
    ],
    correct: 1,
    explanation: "Fabric Warehouse soporta stored procedures T-SQL con la sintaxis estándar CREATE PROCEDURE. Pueden contener lógica condicional, bucles, tablas temporales y múltiples sentencias SQL. Son útiles para encapsular lógica de transformación compleja."
  },
  {
    id: 112, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "¿Cómo se implementa una deduplicación de datos usando Window Functions en T-SQL?",
    options: [
      "SELECT DISTINCT * FROM tabla",
      "Usar ROW_NUMBER() OVER(PARTITION BY clave ORDER BY fecha DESC) y filtrar WHERE rn = 1 para quedarse con el registro más reciente por clave",
      "DELETE FROM tabla WHERE duplicado = 1",
      "GROUP BY todas las columnas"
    ],
    correct: 1,
    explanation: "El patrón CTE + ROW_NUMBER es estándar para deduplicación: WITH cte AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY clave ORDER BY fecha DESC) AS rn FROM tabla) SELECT * FROM cte WHERE rn = 1. Esto selecciona el registro más reciente para cada clave, eliminando duplicados."
  },
  {
    id: 113, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "¿Qué tipo de vista en Fabric Warehouse permite encapsular lógica compleja de transformación sin materializar datos?",
    options: [
      "Vista materializada (indexed view)",
      "Vista estándar (CREATE VIEW) que se ejecuta dinámicamente en cada consulta",
      "Vista temporal (CREATE TEMP VIEW)",
      "Vista particionada"
    ],
    correct: 1,
    explanation: "Las vistas estándar en Fabric Warehouse no materializan datos — la consulta subyacente se ejecuta cada vez que se consulta la vista. Son ideales para encapsular transformaciones, joins complejos y lógica de negocio reutilizable sin consumir almacenamiento adicional."
  },
  {
    id: 114, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "¿Cuál es el propósito de la cláusula CROSS APPLY en T-SQL y cuándo se usa?",
    options: [
      "Es equivalente a un INNER JOIN estándar",
      "Permite aplicar una función con valores de tabla (TVF) o subconsulta correlacionada a cada fila de la tabla exterior",
      "Realiza un producto cartesiano completo",
      "Solo funciona con tablas temporales"
    ],
    correct: 1,
    explanation: "CROSS APPLY evalúa la expresión de la derecha para cada fila de la izquierda, permitiendo usar valores de la fila actual como parámetros. Es como un JOIN lateral. OUTER APPLY es la variante que incluye filas sin coincidencia (como LEFT JOIN). Útil para desanidar JSON, split de strings, o TVFs parametrizadas."
  },
  {
    id: 115, domain: 1, difficulty: 1, subtopic: "Data Warehouse",
    question: "¿Qué tipo de tabla se crea con CREATE TABLE en un Data Warehouse de Fabric?",
    options: [
      "Tabla temporal que se elimina al cerrar la sesión",
      "Tabla externa apuntando a archivos en S3",
      "Tabla gestionada (managed) persistente con datos almacenados en OneLake en formato Delta",
      "Tabla en memoria que se pierde al apagar"
    ],
    correct: 2,
    explanation: "CREATE TABLE en Fabric Warehouse crea una tabla gestionada persistente. Los datos se almacenan automáticamente en OneLake en formato Delta/Parquet, con todas las ventajas de Delta Lake (ACID, versionado). La tabla persiste hasta que se elimina explícitamente."
  },
  {
    id: 116, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "¿Qué permite hacer un cross-database query en Fabric?",
    options: [
      "Consultar bases de datos en Azure SQL externo",
      "Unir datos de diferentes Warehouses y Lakehouses dentro del mismo workspace usando nombres de tres partes (database.schema.table)",
      "Consultar datos de otros tenants de Fabric",
      "Replicar tablas entre bases de datos automáticamente"
    ],
    correct: 1,
    explanation: "Cross-database queries permiten hacer JOINs entre tablas de diferentes Warehouses y SQL Endpoints de Lakehouses dentro del mismo workspace usando la notación de tres partes: NombreDB.esquema.tabla. Esto facilita consultas federadas sin mover datos."
  },
  {
    id: 117, domain: 1, difficulty: 3, subtopic: "Data Warehouse",
    question: "En un Warehouse de Fabric, ¿cómo se gestiona la seguridad a nivel de columna (CLS)?",
    options: [
      "Usando RLS con filtros DAX",
      "Con sentencias GRANT SELECT ON tabla(columna) y DENY SELECT ON tabla(columna) en T-SQL",
      "Configurando OLS en el modelo semántico",
      "Mediante sensitivity labels de Purview"
    ],
    correct: 1,
    explanation: "CLS en Fabric Warehouse usa el mecanismo estándar T-SQL de permisos granulares: DENY SELECT ON dbo.Empleados(Salario) TO rol_basico. Esto impide que los usuarios del rol vean los valores de esa columna específica, devolviendo NULL o error según la configuración."
  },
  {
    id: 118, domain: 1, difficulty: 2, subtopic: "Data Warehouse",
    question: "¿Para qué se usa la expresión de tabla común (CTE - Common Table Expression) en T-SQL?",
    options: [
      "Para crear tablas permanentes con nombre",
      "Para definir un resultado temporal con nombre reutilizable dentro de la misma sentencia, mejorando la legibilidad de queries complejas",
      "Para crear índices temporales",
      "Para ejecutar procedimientos almacenados"
    ],
    correct: 1,
    explanation: "Una CTE (WITH nombre AS (SELECT ...)) define un resultado temporal con nombre que existe solo durante la ejecución de la sentencia. Mejora la legibilidad de queries complejas, permite recursividad y se puede referenciar múltiples veces en la query principal. No materializa datos — es lógica."
  },
  // === PySpark/SparkSQL en notebooks (119-128) ===
  {
    id: 119, domain: 1, difficulty: 1, subtopic: "Notebooks/Spark",
    question: "¿Qué comando PySpark se usa para leer una tabla Delta de un Lakehouse en un notebook de Fabric?",
    options: [
      "pd.read_csv('tabla')",
      "spark.read.format('delta').load('Tables/tabla') o spark.sql('SELECT * FROM lakehouse.tabla')",
      "import delta; delta.read('tabla')",
      "fabric.load_table('tabla')"
    ],
    correct: 1,
    explanation: "En notebooks de Fabric, las tablas Delta del Lakehouse se leen con spark.read.format('delta').load() indicando la ruta, o directamente con spark.sql() usando SparkSQL. Las tablas del Lakehouse montado están disponibles automáticamente en el catálogo."
  },
  {
    id: 120, domain: 1, difficulty: 2, subtopic: "Notebooks/Spark",
    question: "¿Qué magic command se usa en un notebook de Fabric para cambiar el lenguaje de una celda a SQL?",
    options: [
      "%python",
      "%%sql",
      "#sql",
      "LANGUAGE SQL"
    ],
    correct: 1,
    explanation: "Los notebooks de Fabric soportan magic commands para cambiar el lenguaje de celdas individuales: %%sql para SparkSQL, %%pyspark para Python, %%scala para Scala, %%r para R. El lenguaje por defecto del notebook se define al crearlo."
  },
  {
    id: 121, domain: 1, difficulty: 2, subtopic: "Notebooks/Spark",
    question: "¿Cómo se escribe un DataFrame de PySpark como tabla Delta en un Lakehouse de Fabric?",
    options: [
      "df.to_csv('tabla.csv')",
      "df.write.format('delta').mode('overwrite').saveAsTable('nombre_tabla')",
      "df.save('Tables/tabla')",
      "spark.create_table(df, 'tabla')"
    ],
    correct: 1,
    explanation: "saveAsTable() registra la tabla en el catálogo del Lakehouse además de escribir los datos en formato Delta. .mode() controla el comportamiento: 'overwrite' reemplaza datos, 'append' añade filas, 'errorifexists' falla si la tabla ya existe."
  },
  {
    id: 122, domain: 1, difficulty: 3, subtopic: "Notebooks/Spark",
    question: "¿Qué hace el método .groupBy().agg() en PySpark y cuándo se usa?",
    options: [
      "Solo cuenta filas por grupo",
      "Agrupa filas por una o más columnas y aplica múltiples funciones de agregación (sum, avg, count, max, min) en una sola operación",
      "Ordena los datos por grupo",
      "Filtra filas que pertenecen a un grupo"
    ],
    correct: 1,
    explanation: "groupBy().agg() es el equivalente PySpark de GROUP BY con múltiples agregaciones: df.groupBy('region').agg(F.sum('ventas').alias('total'), F.avg('precio').alias('precio_medio'), F.count('id').alias('num_transacciones')). Es más flexible que groupBy().sum() porque permite múltiples agregaciones con alias."
  },
  {
    id: 123, domain: 1, difficulty: 2, subtopic: "Notebooks/Spark",
    question: "En un notebook de Fabric, ¿cómo se realiza un JOIN entre dos DataFrames de PySpark?",
    options: [
      "df1.merge(df2, on='id')",
      "df1.join(df2, df1.id == df2.id, 'inner')",
      "spark.join(df1, df2, 'id')",
      "SELECT * FROM df1 JOIN df2"
    ],
    correct: 1,
    explanation: "PySpark usa .join() con tres argumentos: el DataFrame derecho, la condición de join, y el tipo ('inner', 'left', 'right', 'full', 'cross', 'semi', 'anti'). También se puede usar SparkSQL con spark.sql() después de registrar los DataFrames como vistas temporales."
  },
  {
    id: 124, domain: 1, difficulty: 3, subtopic: "Notebooks/Spark",
    question: "¿Qué es una UDF (User Defined Function) en PySpark y cuándo se recomienda evitarla?",
    options: [
      "Una función integrada de Spark que siempre es eficiente",
      "Una función personalizada de Python que se aplica fila a fila; se recomienda evitarla por su bajo rendimiento ya que inhibe las optimizaciones de Catalyst",
      "Un tipo de procedimiento almacenado de Spark",
      "Una función que solo funciona con datos estructurados"
    ],
    correct: 1,
    explanation: "Las UDFs de PySpark ejecutan código Python fila a fila, requiriendo serialización/deserialización entre la JVM de Spark y el intérprete de Python. Esto elimina las optimizaciones del motor Catalyst y Tungsten. Siempre que sea posible, usar funciones integradas de pyspark.sql.functions que se ejecutan nativamente en la JVM."
  },
  {
    id: 125, domain: 1, difficulty: 1, subtopic: "Notebooks/Spark",
    question: "¿Qué hace el método .display() en un notebook de Fabric?",
    options: [
      "Exporta datos a un archivo PDF",
      "Muestra el DataFrame como una tabla visual interactiva con capacidades de gráfico integradas",
      "Envía los datos a Power BI automáticamente",
      "Imprime el esquema del DataFrame"
    ],
    correct: 1,
    explanation: "display() es un método especial de Fabric/Databricks que renderiza DataFrames como tablas interactivas con opciones de visualización integradas (gráficos de barras, líneas, etc.). Es más rico que .show() que solo muestra texto plano en la salida."
  },
  {
    id: 126, domain: 1, difficulty: 2, subtopic: "Notebooks/Spark",
    question: "¿Cómo se ejecuta una operación MERGE en una tabla Delta desde un notebook PySpark?",
    options: [
      "df.merge(tabla_delta)",
      "Usando DeltaTable.forPath() o forName() y luego .merge().whenMatchedUpdate().whenNotMatchedInsert().execute()",
      "spark.sql('MERGE') no está soportado en notebooks",
      "df.write.mode('merge')"
    ],
    correct: 1,
    explanation: "En PySpark se usa la API de DeltaTable: from delta.tables import DeltaTable; dt = DeltaTable.forName(spark, 'tabla'); dt.alias('t').merge(source.alias('s'), 't.id = s.id').whenMatchedUpdate(...).whenNotMatchedInsert(...).execute(). También se puede usar %%sql con MERGE INTO directamente."
  },
  {
    id: 127, domain: 1, difficulty: 3, subtopic: "Notebooks/Spark",
    question: "¿Qué diferencia hay entre una transformación y una acción en PySpark?",
    options: [
      "Son lo mismo, ambas ejecutan operaciones inmediatamente",
      "Las transformaciones son lazy (no se ejecutan hasta una acción); las acciones (collect, count, write, show) desencadenan la ejecución del plan",
      "Las transformaciones modifican datos; las acciones solo los leen",
      "Las acciones son más lentas que las transformaciones"
    ],
    correct: 1,
    explanation: "PySpark usa evaluación lazy: las transformaciones (filter, select, groupBy, join) construyen un plan lógico sin ejecutar nada. Solo cuando se invoca una acción (collect, count, show, write, display) se ejecuta todo el plan. Esto permite al optimizador Catalyst reorganizar y optimizar las operaciones."
  },
  {
    id: 128, domain: 1, difficulty: 2, subtopic: "Notebooks/Spark",
    question: "¿Cómo se pasan parámetros a un notebook cuando se ejecuta desde una Pipeline de Fabric?",
    options: [
      "No es posible pasar parámetros a notebooks",
      "Definiendo celdas de parámetros con la etiqueta 'parameters' en el notebook y configurando los valores en la actividad Notebook de la pipeline",
      "Usando variables de entorno del sistema operativo",
      "Escribiendo los parámetros en un archivo JSON"
    ],
    correct: 1,
    explanation: "Los notebooks de Fabric soportan parametrización: se crea una celda marcada como 'parameters' con variables con valores por defecto. Al invocar el notebook desde una pipeline, la actividad Notebook permite especificar valores que sobrescriben los valores por defecto. Esto permite reutilizar notebooks con diferentes configuraciones."
  },
  // === Pipelines avanzados (129-138) ===
  {
    id: 129, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Qué actividad de una Pipeline de Fabric permite ejecutar una acción para cada elemento de una lista?",
    options: [
      "Loop Activity",
      "ForEach Activity",
      "While Activity",
      "Iterator Activity"
    ],
    correct: 1,
    explanation: "ForEach Activity itera sobre una colección (array) y ejecuta las actividades internas una vez por cada elemento. Soporta ejecución secuencial o paralela (batch count configurable). Es ideal para procesar múltiples archivos, tablas o particiones."
  },
  {
    id: 130, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Cómo se implementa lógica condicional (si/entonces) en una Pipeline de Fabric?",
    options: [
      "Con un Switch Activity que evalúa expresiones",
      "Con If Condition Activity que evalúa una expresión booleana y ejecuta ramas True/False",
      "Con un Script Activity con código Python",
      "No es posible, las pipelines son siempre lineales"
    ],
    correct: 1,
    explanation: "If Condition Activity evalúa una expresión booleana (usando expression language de pipelines) y ejecuta diferentes actividades según el resultado: rama 'True' si la condición se cumple, rama 'False' si no. También existe Switch Activity para múltiples opciones basadas en un valor."
  },
  {
    id: 131, domain: 1, difficulty: 3, subtopic: "Pipelines",
    question: "¿Qué son las expresiones dinámicas en Pipelines de Fabric y qué formato usan?",
    options: [
      "Consultas SQL embebidas en la pipeline",
      "Expresiones entre @{...} que se evalúan en tiempo de ejecución, soportando funciones, parámetros, variables y resultados de actividades anteriores",
      "Scripts de PowerShell para personalización",
      "Plantillas YAML para configuración"
    ],
    correct: 1,
    explanation: "Las expresiones dinámicas usan la sintaxis @{expresion} y permiten construir valores en tiempo de ejecución: @pipeline().parameters.nombre, @activity('CopyData').output.rowsCopied, @utcnow(), @concat(), etc. Permiten pipelines paramétricos y reutilizables."
  },
  {
    id: 132, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Cómo se configura el manejo de errores en una Pipeline de Fabric?",
    options: [
      "No hay manejo de errores, la pipeline siempre se detiene",
      "Usando las conexiones de dependencia entre actividades: Success (éxito), Failure (fallo), Completion (siempre), y Skip",
      "Solo mediante try/catch en código Python",
      "Configurando alerts en Azure Monitor"
    ],
    correct: 1,
    explanation: "Las pipelines permiten definir el flujo de control con 4 tipos de dependencia: Success (ejecutar si éxito), Failure (ejecutar si fallo — ideal para logging/alertas), Completion (ejecutar siempre — para cleanup), Skip (si se saltó). Cada actividad también tiene reintentos configurables."
  },
  {
    id: 133, domain: 1, difficulty: 1, subtopic: "Pipelines",
    question: "¿Qué actividad de Pipeline se usa para copiar datos de una fuente externa a un Lakehouse?",
    options: [
      "Dataflow Activity",
      "Copy Data Activity",
      "Script Activity",
      "Web Activity"
    ],
    correct: 1,
    explanation: "Copy Data Activity mueve datos de un origen a un destino con configuración visual de mapeo de columnas, formato de archivo y comportamiento de escritura. Soporta 80+ conectores incluyendo bases de datos, APIs, archivos y servicios cloud."
  },
  {
    id: 134, domain: 1, difficulty: 3, subtopic: "Pipelines",
    question: "¿Cómo se parametriza una Pipeline para ejecutarla con diferentes configuraciones sin duplicarla?",
    options: [
      "Creando una pipeline diferente para cada configuración",
      "Definiendo parámetros de pipeline (con tipo y valor por defecto) y referenciándolos con @pipeline().parameters.NombreParametro",
      "Usando variables globales del tenant",
      "Editando el JSON de la pipeline antes de cada ejecución"
    ],
    correct: 1,
    explanation: "Los parámetros de pipeline se definen con nombre, tipo (String, Int, Bool, etc.) y valor por defecto. Se referencian en cualquier campo con @pipeline().parameters.NombreParametro. Permiten reutilizar la misma pipeline con diferentes tablas, fechas, rutas, etc. Los valores se pasan al disparar la ejecución."
  },
  {
    id: 135, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Para qué sirve la actividad 'Set Variable' en una Pipeline de Fabric?",
    options: [
      "Para crear nuevas tablas en el Warehouse",
      "Para asignar valores a variables de pipeline que pueden usarse en actividades posteriores",
      "Para configurar la conexión a la fuente de datos",
      "Para establecer el nivel de logging"
    ],
    correct: 1,
    explanation: "Set Variable asigna un valor (estático o dinámico mediante expresiones) a una variable de pipeline previamente declarada. Las variables mantienen estado entre actividades, útil para acumular contadores, almacenar resultados intermedios o construir valores dinámicos a lo largo del pipeline."
  },
  {
    id: 136, domain: 1, difficulty: 3, subtopic: "Pipelines",
    question: "¿Qué actividad permite invocar una pipeline desde otra pipeline (composición)?",
    options: [
      "No es posible, cada pipeline es independiente",
      "Execute Pipeline Activity, que invoca otra pipeline pasándole parámetros",
      "Import Pipeline Activity",
      "Link Pipeline Activity"
    ],
    correct: 1,
    explanation: "Execute Pipeline Activity permite invocar una pipeline hijo desde una pipeline padre, pasando parámetros. Soporta ejecución síncrona (wait: true — espera a que termine) o asíncrona (wait: false — continúa sin esperar). Facilita la modularización y reutilización de lógica de orquestación."
  },
  {
    id: 137, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Cómo se programa la ejecución automática de una Pipeline de Fabric?",
    options: [
      "Solo mediante ejecución manual desde el portal",
      "Con triggers de programación (Schedule) que definen la frecuencia, hora y zona horaria de ejecución",
      "Solo mediante Azure Functions externas",
      "Las pipelines se ejecutan automáticamente cada hora"
    ],
    correct: 1,
    explanation: "Las pipelines soportan triggers de programación donde se configura: frecuencia (cada N minutos/horas/días/semanas), hora de inicio, zona horaria y ventana de actividad. También pueden dispararse manualmente o invocarse desde otras pipelines o APIs REST."
  },
  // === Dataflows Gen2 (138-145) ===
  {
    id: 138, domain: 1, difficulty: 1, subtopic: "Dataflows Gen2",
    question: "¿En qué lenguaje se basan las transformaciones de los Dataflows Gen2 en Fabric?",
    options: [
      "Python",
      "Power Query M (Mashup language)",
      "T-SQL",
      "DAX"
    ],
    correct: 1,
    explanation: "Los Dataflows Gen2 usan Power Query M como lenguaje subyacente. La interfaz visual genera código M automáticamente, pero también se puede editar manualmente para transformaciones avanzadas. M es un lenguaje funcional orientado a transformación de datos."
  },
  {
    id: 139, domain: 1, difficulty: 2, subtopic: "Dataflows Gen2",
    question: "¿Cuál es la diferencia entre staging y destino (destination) en un Dataflow Gen2?",
    options: [
      "Son lo mismo, ambos almacenan el resultado final",
      "El staging carga temporalmente en el Lakehouse del workspace para procesamiento; el destino es donde se escriben los datos transformados finales",
      "El staging es más rápido porque no procesa datos",
      "El destino es automático; el staging se debe configurar manualmente"
    ],
    correct: 1,
    explanation: "En Dataflows Gen2, el staging es un área temporal en el Lakehouse del workspace donde se cargan los datos antes de procesarlos (habilitando escalado con Spark). El destino (data destination) es donde se escriben los datos finales: un Lakehouse, Warehouse, u otro almacén de Fabric."
  },
  {
    id: 140, domain: 1, difficulty: 2, subtopic: "Dataflows Gen2",
    question: "¿Qué indica el icono de 'query folding' verde en el editor de Power Query de un Dataflow Gen2?",
    options: [
      "Que la consulta ha finalizado correctamente",
      "Que el paso se traduce a una consulta nativa del origen, ejecutándose en el servidor fuente y no en Fabric",
      "Que el dato es de tipo texto",
      "Que la transformación es reversible"
    ],
    correct: 1,
    explanation: "El indicador verde de query folding significa que ese paso de Power Query se 'pliega' al origen: se traduce a SQL nativo (u otro lenguaje del origen) y se ejecuta en el servidor fuente. Esto es mucho más eficiente que descargar todos los datos y procesarlos en Fabric. Los pasos que rompen el folding se procesan localmente."
  },
  {
    id: 141, domain: 1, difficulty: 3, subtopic: "Dataflows Gen2",
    question: "¿Qué transformación de Power Query M se usa para 'despivotar' columnas en un Dataflow Gen2?",
    options: [
      "Table.Transpose",
      "Table.UnpivotOtherColumns o Table.Unpivot",
      "Table.Flatten",
      "Table.Normalize"
    ],
    correct: 1,
    explanation: "Table.UnpivotOtherColumns(tabla, columnasFijas, nombreAtributo, nombreValor) convierte columnas de datos en filas, normalizando tablas anchas. Es el equivalente M de UNPIVOT en T-SQL. En la interfaz visual se accede desde 'Transform > Unpivot Columns'."
  },
  {
    id: 142, domain: 1, difficulty: 2, subtopic: "Dataflows Gen2",
    question: "¿Cuál es el destino de datos más común para un Dataflow Gen2 en Fabric?",
    options: [
      "Azure SQL Database externo",
      "Una tabla Delta en un Lakehouse de Fabric",
      "Un archivo CSV en OneLake",
      "Un Eventhouse KQL"
    ],
    correct: 1,
    explanation: "El destino más común es una tabla Delta en un Lakehouse. Los Dataflows Gen2 también pueden escribir en tablas de Warehouse de Fabric. La escritura en Lakehouse es directa y los datos quedan disponibles inmediatamente para Spark, SQL y modelos semánticos."
  },
  {
    id: 143, domain: 1, difficulty: 3, subtopic: "Dataflows Gen2",
    question: "¿Cómo se configura la actualización incremental (incremental refresh) en un Dataflow Gen2?",
    options: [
      "Se activa automáticamente sin configuración",
      "Filtrando el Dataflow por una columna de fecha/hora con los parámetros RangeStart y RangeEnd de Power Query",
      "Configurando particiones manualmente en T-SQL",
      "No es posible, los Dataflows Gen2 siempre recargan todos los datos"
    ],
    correct: 1,
    explanation: "Para incremental refresh en Dataflows Gen2, se filtran los datos origen usando los parámetros especiales RangeStart y RangeEnd que Power Query reconoce. Fabric automatiza la creación de particiones y solo refresca los datos dentro del rango de tiempo actual, reduciendo drásticamente el procesamiento."
  },
  {
    id: 144, domain: 1, difficulty: 1, subtopic: "Dataflows Gen2",
    question: "¿Qué ventaja ofrece un Dataflow Gen2 sobre un notebook Spark para transformaciones simples?",
    options: [
      "Mayor rendimiento con datos grandes",
      "Interfaz visual sin código con Power Query, accesible para usuarios de negocio sin experiencia en programación",
      "Soporta más lenguajes de programación",
      "Puede conectarse a más fuentes de datos"
    ],
    correct: 1,
    explanation: "Los Dataflows Gen2 ofrecen una experiencia visual sin código basada en Power Query, ideal para analistas y usuarios de negocio. Los notebooks requieren conocimiento de PySpark/SQL y son más apropiados para transformaciones complejas, ML, o procesamiento de datos a escala masiva."
  },
  // === Real-Time Intelligence (145-154) ===
  {
    id: 145, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué fuentes de datos puede capturar un Eventstream en Fabric?",
    options: [
      "Solo bases de datos SQL",
      "Azure Event Hubs, IoT Hub, Custom App (SDK), cambios de bases de datos (CDC), y Sample Data para pruebas",
      "Solo archivos CSV subidos manualmente",
      "Solo APIs REST"
    ],
    correct: 1,
    explanation: "Eventstream soporta múltiples fuentes de streaming: Azure Event Hubs (eventos), IoT Hub (dispositivos IoT), Custom App (SDK de Fabric para aplicaciones propias), Database CDC (captura de cambios), y datos de ejemplo para desarrollo. Permite transformar y enrutar los datos visualmente."
  },
  {
    id: 146, domain: 1, difficulty: 3, subtopic: "Real-Time Intelligence",
    question: "¿Qué función de windowing en KQL agrupa eventos en ventanas de tiempo de 5 minutos?",
    options: [
      "GROUP BY bin(timestamp, 5m)",
      "summarize count() by bin(Timestamp, 5m)",
      "WHERE timestamp BETWEEN -5m AND now()",
      "WINDOW(5m)"
    ],
    correct: 1,
    explanation: "En KQL, bin() redondea valores a intervalos. Combinado con summarize, agrupa eventos en ventanas temporales: Tabla | summarize count() by bin(Timestamp, 5m) cuenta eventos por intervalos de 5 minutos. Esto es esencial para análisis de series temporales y detección de patrones."
  },
  {
    id: 147, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué es Data Activator (Reflex) en Fabric?",
    options: [
      "Un motor de procesamiento de datos batch",
      "Una herramienta que monitoriza datos en tiempo real y dispara acciones automáticas (alertas, emails, Power Automate) cuando se detectan condiciones específicas",
      "Un activador de pipelines de datos",
      "Un servicio de backup automático"
    ],
    correct: 1,
    explanation: "Data Activator (Reflex) permite definir reglas sobre datos en tiempo real: si la temperatura supera 80°C, si las ventas caen un 20%, etc. Cuando se detecta la condición, dispara acciones automáticas como enviar emails, mensajes de Teams, o ejecutar flujos de Power Automate."
  },
  {
    id: 148, domain: 1, difficulty: 3, subtopic: "Real-Time Intelligence",
    question: "¿Qué consulta KQL busca anomalías en una serie temporal de datos de sensores?",
    options: [
      "Tabla | where valor > promedio",
      "Tabla | make-series avg(valor) on Timestamp step 1h | extend anomalies = series_decompose_anomalies(avg_valor)",
      "Tabla | summarize anomaly = stdev(valor)",
      "Tabla | detect_anomaly(valor)"
    ],
    correct: 1,
    explanation: "KQL tiene funciones integradas de análisis de series temporales: make-series crea series regulares, y series_decompose_anomalies() detecta puntos anómalos usando descomposición estacional. Es una capacidad avanzada de Eventhouse para monitorización y detección de outliers."
  },
  {
    id: 149, domain: 1, difficulty: 1, subtopic: "Real-Time Intelligence",
    question: "¿A qué destinos puede enviar datos un Eventstream?",
    options: [
      "Solo a Eventhouse",
      "Eventhouse (KQL Database), Lakehouse, Reflex (Data Activator), y Custom App",
      "Solo a Power BI en tiempo real",
      "Solo a archivos en OneLake"
    ],
    correct: 1,
    explanation: "Eventstream enruta datos procesados a múltiples destinos: Eventhouse/KQL Database para análisis de streaming, Lakehouse para persistencia en Delta, Reflex/Data Activator para alertas automáticas, y Custom App para aplicaciones propias vía SDK."
  },
  {
    id: 150, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué operador KQL se usa para añadir una columna calculada a la consulta sin modificar la tabla original?",
    options: [
      "ALTER TABLE ADD",
      "extend NuevaColumna = expresion",
      "project NuevaColumna = expresion",
      "add_column(expresion)"
    ],
    correct: 1,
    explanation: "El operador 'extend' añade columnas calculadas al resultado: Tabla | extend DuracionMinutos = Duracion / 60. A diferencia de 'project', extend mantiene todas las columnas existentes y añade las nuevas. 'project' selecciona solo las columnas especificadas."
  },
  {
    id: 151, domain: 1, difficulty: 3, subtopic: "Real-Time Intelligence",
    question: "¿Cómo se implementa un JOIN temporal entre dos tablas en KQL?",
    options: [
      "JOIN ... ON columna = columna (igual que SQL)",
      "Tabla1 | join kind=inner Tabla2 on $left.clave == $right.clave, $left.Timestamp between ($right.Timestamp - 5m .. $right.Timestamp + 5m)",
      "MERGE Tabla1 WITH Tabla2",
      "Los JOINs no están disponibles en KQL"
    ],
    correct: 1,
    explanation: "KQL soporta JOINs temporales usando la función between en la condición de join para correlacionar eventos dentro de una ventana de tiempo. Esto es esencial para IoT y telemetría: correlacionar lecturas de diferentes sensores que ocurren dentro de un margen temporal."
  },
  {
    id: 152, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué política de retención se puede configurar en una base de datos KQL de Eventhouse?",
    options: [
      "No hay políticas de retención, los datos se mantienen indefinidamente",
      "HotCachePeriod (datos en caché para consultas rápidas) y SoftDeletePeriod (periodo total de retención antes de eliminar)",
      "Solo retención por número de filas",
      "Solo retención por tamaño en GB"
    ],
    correct: 1,
    explanation: "Eventhouse permite configurar: HotCachePeriod (tiempo que los datos permanecen en caché SSD para consultas rápidas, ej: 30 días) y SoftDeletePeriod (periodo total de retención, ej: 365 días). Los datos fuera del hot cache se mueven a almacenamiento frío pero siguen siendo consultables con mayor latencia."
  },
  // === Medallion Architecture (153-160) ===
  {
    id: 153, domain: 1, difficulty: 1, subtopic: "Medallion Architecture",
    question: "¿Qué tipo de datos se almacenan en la capa Bronze de la Medallion Architecture?",
    options: [
      "Datos completamente transformados y listos para reportes",
      "Datos en crudo (raw) tal como llegan de las fuentes, sin transformar",
      "Solo metadatos y catálogos",
      "Datos agregados para dashboards"
    ],
    correct: 1,
    explanation: "La capa Bronze almacena datos raw exactamente como llegan de las fuentes origen: sin limpieza, sin transformaciones, preservando el formato original. Sirve como 'zona de landing' y fuente de verdad para reprocesamiento. Se implementa típicamente como un Lakehouse dedicado."
  },
  {
    id: 154, domain: 1, difficulty: 2, subtopic: "Medallion Architecture",
    question: "¿Qué transformaciones se realizan típicamente en la capa Silver?",
    options: [
      "Solo carga de datos sin transformación",
      "Limpieza, validación, deduplicación, estandarización de tipos y conformado de dimensiones",
      "Agregación para dashboards ejecutivos",
      "Entrenamiento de modelos de machine learning"
    ],
    correct: 1,
    explanation: "La capa Silver contiene datos limpios, validados y conformados: tipos correctos, NULLs tratados, duplicados eliminados, formatos estandarizados. Es la capa 'enterprise-grade' que conforma las dimensiones y hechos. Los datos de Silver ya son confiables para análisis, pero pueden necesitar agregación para casos específicos."
  },
  {
    id: 155, domain: 1, difficulty: 2, subtopic: "Medallion Architecture",
    question: "¿Qué contiene la capa Gold de la Medallion Architecture?",
    options: [
      "Datos sin procesar en formato original",
      "Copias de seguridad de todas las capas",
      "Datos curados, modelados y optimizados para consumo de negocio: star schemas, agregaciones, métricas",
      "Solo logs de auditoría"
    ],
    correct: 2,
    explanation: "La capa Gold contiene datos modelados para consumo final: star schemas para Power BI, tablas agregadas para dashboards, métricas de negocio precalculadas. Es la capa que consume directamente el modelo semántico (Direct Lake o Import) y los usuarios de negocio."
  },
  {
    id: 156, domain: 1, difficulty: 3, subtopic: "Medallion Architecture",
    question: "¿Cómo se implementa la Medallion Architecture en Fabric usando múltiples Lakehouses?",
    options: [
      "Todo en un solo Lakehouse con carpetas diferentes",
      "Un Lakehouse por capa (Bronze, Silver, Gold), conectados mediante shortcuts o pipelines, cada uno con su propio SQL endpoint",
      "Un Warehouse para cada capa",
      "Solo es posible con un lakehouse Bronze y un Warehouse Gold"
    ],
    correct: 1,
    explanation: "La práctica recomendada es usar un Lakehouse por capa: LH_Bronze (datos raw), LH_Silver (datos limpios), LH_Gold (datos curados). Las pipelines y notebooks mueven datos entre capas. Shortcuts pueden dar visibilidad cross-lakehouse. Cada uno tiene su SQL endpoint para consultas."
  },
  {
    id: 157, domain: 1, difficulty: 2, subtopic: "Medallion Architecture",
    question: "¿Qué estrategia de calidad de datos se aplica en la transición de Bronze a Silver?",
    options: [
      "No se valida nada, solo se cambia el formato",
      "Validación de schema, detección y manejo de NULLs, deduplicación, type casting, y cuarentena de filas inválidas",
      "Solo se eliminan columnas innecesarias",
      "Se comprime la información para ahorrar espacio"
    ],
    correct: 1,
    explanation: "La transición Bronze→Silver incluye: validación de esquema (reject o quarantine filas con formato incorrecto), manejo de NULLs (fill, drop, o flag), deduplicación (con ROW_NUMBER o MERGE), casting a tipos correctos, y separación de filas que no pasan validación en una tabla de cuarentena para revisión."
  },
  {
    id: 158, domain: 1, difficulty: 3, subtopic: "Medallion Architecture",
    question: "¿Cuál es el patrón recomendado para la carga incremental de datos en cada capa de la Medallion Architecture?",
    options: [
      "Full refresh diario de todas las capas",
      "Bronze: append incremental con timestamp; Silver: MERGE/upsert para deduplicar; Gold: reconstruir tablas agregadas solo si hubo cambios",
      "Todas las capas usan INSERT INTO sin verificación",
      "Solo Bronze es incremental; Silver y Gold siempre se reconstruyen"
    ],
    correct: 1,
    explanation: "El patrón eficiente: Bronze append-only (nuevos datos se añaden con marca temporal de ingesta), Silver usa MERGE para upsert (actualiza existentes, inserta nuevos, evita duplicados), Gold se reconstruye o actualiza incrementalmente según el tipo de tabla (agregaciones pueden requerir recálculo completo, dimensiones SCD son incrementales)."
  },
  // === Shortcuts (159-164) ===
  {
    id: 159, domain: 1, difficulty: 1, subtopic: "Shortcuts",
    question: "¿Qué tipos de shortcuts se pueden crear en un Lakehouse de Fabric?",
    options: [
      "Solo shortcuts a otros Lakehouses",
      "Shortcuts internos (OneLake: otros Lakehouses/Warehouses) y externos (ADLS Gen2, Amazon S3, Google Cloud Storage, Dataverse)",
      "Solo shortcuts a Azure Blob Storage",
      "Solo shortcuts a bases de datos SQL"
    ],
    correct: 1,
    explanation: "Los shortcuts soportan destinos internos (otros items de OneLake como Lakehouses y Warehouses en el mismo o diferente workspace) y externos (ADLS Gen2, Amazon S3, Google Cloud Storage, Dataverse). Los datos permanecen en el origen y se acceden a través del shortcut como si fueran locales."
  },
  {
    id: 160, domain: 1, difficulty: 2, subtopic: "Shortcuts",
    question: "¿Qué limitación importante tienen los shortcuts en relación con los modelos Direct Lake?",
    options: [
      "Los shortcuts no se pueden usar con modelos semánticos",
      "Los shortcuts a fuentes externas (S3, ADLS Gen2) pueden causar fallback a DirectQuery en modelos Direct Lake si los datos no están en formato Delta nativo",
      "Los shortcuts duplican los datos automáticamente",
      "Los shortcuts solo funcionan con datos menores a 1 GB"
    ],
    correct: 1,
    explanation: "Direct Lake necesita leer archivos Delta/Parquet nativos de OneLake. Los shortcuts a fuentes externas pueden provocar que Direct Lake haga fallback a DirectQuery si los archivos no están en formato compatible o si hay latencia de acceso. Los shortcuts internos (OneLake a OneLake) generalmente funcionan bien con Direct Lake."
  },
  {
    id: 161, domain: 1, difficulty: 2, subtopic: "Shortcuts",
    question: "¿En qué sección de un Lakehouse se pueden crear shortcuts?",
    options: [
      "Solo en la sección Tables",
      "Solo en la sección Files",
      "Tanto en Tables como en Files, dependiendo del tipo de datos referenciados",
      "Solo en la raíz del Lakehouse"
    ],
    correct: 2,
    explanation: "Los shortcuts se pueden crear en ambas secciones: en Tables para referenciar tablas Delta de otros Lakehouses/Warehouses, y en Files para referenciar carpetas de archivos de cualquier tipo. Esto permite componer un Lakehouse virtual con datos distribuidos en múltiples ubicaciones."
  },
  {
    id: 162, domain: 1, difficulty: 3, subtopic: "Shortcuts",
    question: "¿Cómo se gestionan los permisos de acceso a datos referenciados mediante shortcuts?",
    options: [
      "El shortcut hereda los permisos del Lakehouse donde se crea",
      "Se necesitan permisos tanto en el Lakehouse origen del shortcut como en el recurso de datos al que apunta; la seguridad es de doble capa",
      "No hay control de permisos en shortcuts",
      "Solo el Admin del workspace puede acceder a shortcuts"
    ],
    correct: 1,
    explanation: "Los shortcuts requieren autorización en dos niveles: (1) permiso para acceder al Lakehouse que contiene el shortcut, y (2) permisos en el recurso de destino (credenciales ADLS Gen2, IAM de S3, o permisos de workspace de OneLake). Si falta alguno, el shortcut muestra error de acceso."
  },
  // === OneLake y Cross-queries (163-170) ===
  {
    id: 163, domain: 1, difficulty: 1, subtopic: "OneLake",
    question: "¿Qué herramienta permite explorar y gestionar archivos de OneLake desde un PC con Windows?",
    options: [
      "Power BI Desktop",
      "OneLake File Explorer, que se integra con el Explorador de Windows",
      "Azure Storage Explorer exclusivamente",
      "FTP Client"
    ],
    correct: 1,
    explanation: "OneLake File Explorer es una aplicación que se integra con el Explorador de archivos de Windows, sincronizando archivos de OneLake como si fueran una carpeta local. Permite arrastrar y soltar archivos, navegar por workspaces y Lakehouses, todo desde el explorador de Windows."
  },
  {
    id: 164, domain: 1, difficulty: 2, subtopic: "OneLake",
    question: "¿Qué es 'Mirroring' en Microsoft Fabric?",
    options: [
      "Crear copias de seguridad manuales",
      "Replicación continua y automática de datos desde fuentes externas (Azure SQL, Cosmos DB, Snowflake) a OneLake en formato Delta",
      "Duplicar un workspace completo para tener un entorno de desarrollo",
      "Sincronizar datos entre dos Lakehouses"
    ],
    correct: 1,
    explanation: "Mirroring replica datos de fuentes externas (Azure SQL Database, Azure Cosmos DB, Snowflake, etc.) a OneLake en formato Delta de forma continua y casi en tiempo real. Los datos replicados se pueden consultar con SQL endpoint, Spark, o usar en modelos Direct Lake sin crear pipelines manuales."
  },
  {
    id: 165, domain: 1, difficulty: 3, subtopic: "OneLake",
    question: "¿Qué son los Data Domains de OneLake y para qué se usan?",
    options: [
      "Los nombres DNS de los endpoints de Fabric",
      "Agrupaciones lógicas de workspaces por dominio de negocio (Ventas, RRHH, Finanzas) para governance descentralizada y descubrimiento de datos",
      "Los tipos de datos soportados (int, string, date)",
      "Las regiones geográficas donde se almacenan los datos"
    ],
    correct: 1,
    explanation: "Los Domains en Fabric permiten agrupar workspaces por área de negocio, facilitando la governance descentralizada (cada dominio puede tener sus propias políticas) y el descubrimiento de datos (los usuarios pueden navegar por dominio para encontrar datos relevantes). Es una implementación del concepto de Data Mesh."
  },
  {
    id: 166, domain: 1, difficulty: 2, subtopic: "OneLake",
    question: "¿Qué protocolo de acceso permite que herramientas como Azure Databricks o Apache Spark accedan directamente a datos en OneLake?",
    options: [
      "HTTP/HTTPS estándar",
      "ABFS (Azure Blob File System) — abfss://workspace@onelake.dfs.fabric.microsoft.com/...",
      "JDBC/ODBC",
      "gRPC"
    ],
    correct: 1,
    explanation: "OneLake usa el protocolo ABFS (Azure Blob File System), el mismo que ADLS Gen2. La URL sigue el formato abfss://workspace@onelake.dfs.fabric.microsoft.com/item/path. Esto permite que cualquier herramienta compatible con ADLS Gen2 (Databricks, HDInsight, etc.) acceda a datos de OneLake directamente."
  },
  {
    id: 167, domain: 1, difficulty: 2, subtopic: "OneLake",
    question: "¿Qué es OneLake Data Hub en el portal de Fabric?",
    options: [
      "El dashboard de administración de storage",
      "Una interfaz centralizada para descubrir, explorar y acceder a todos los datos de OneLake del tenant, con búsqueda, filtros y vista de linaje",
      "Una herramienta de migración de datos",
      "El marketplace de datasets compartidos"
    ],
    correct: 1,
    explanation: "OneLake Data Hub es el catálogo de datos de Fabric: permite buscar datasets, ver metadatos, explorar tablas, ver endorsement y sensitivity labels, consultar linaje (de dónde vienen los datos) y crear shortcuts a datos descubiertos. Es el punto central de descubrimiento de datos."
  },
  {
    id: 168, domain: 1, difficulty: 3, subtopic: "OneLake",
    question: "¿Cómo se pueden consultar datos de un Lakehouse Y un Warehouse en la misma query T-SQL?",
    options: [
      "No es posible combinar datos de Lakehouse y Warehouse",
      "Usando cross-database queries con notación de tres partes: SELECT * FROM Lakehouse_SQLEndpoint.dbo.tabla1 JOIN Warehouse.dbo.tabla2",
      "Creando un shortcut del Warehouse en el Lakehouse",
      "Exportando ambos a CSV y uniéndolos manualmente"
    ],
    correct: 1,
    explanation: "Cross-database queries en Fabric permiten hacer JOINs entre el SQL endpoint de un Lakehouse y un Data Warehouse usando la notación de tres partes (database.schema.table). Ambos deben estar en el mismo workspace. Esto facilita consultas federadas sin mover datos entre almacenes."
  },
  {
    id: 169, domain: 1, difficulty: 1, subtopic: "OneLake",
    question: "¿Cuál es la unidad mínima de almacenamiento en la estructura de OneLake?",
    options: [
      "Tenant",
      "Workspace",
      "Item (Lakehouse, Warehouse, etc.)",
      "Tabla"
    ],
    correct: 2,
    explanation: "La jerarquía de OneLake es: Tenant → Workspace → Item. Cada item (Lakehouse, Warehouse, Eventhouse, etc.) tiene su propio espacio en OneLake con una estructura de carpetas definida. Los workspaces contienen items, y un tenant tiene un único OneLake."
  },
  {
    id: 170, domain: 1, difficulty: 2, subtopic: "OneLake",
    question: "¿Qué ventaja ofrece Mirroring sobre una Pipeline con Copy Data para replicar datos de Azure SQL?",
    options: [
      "Mirroring es más barato porque no consume capacity",
      "Mirroring ofrece replicación continua casi en tiempo real sin necesidad de programar pipelines ni definir frecuencias de actualización",
      "Mirroring permite transformar datos durante la copia",
      "No hay ventaja, ambos hacen lo mismo"
    ],
    correct: 1,
    explanation: "Mirroring proporciona replicación continua y automática usando Change Data Capture (CDC) del origen. Los cambios se propagan a OneLake casi en tiempo real, sin intervención. Las Pipelines con Copy Data requieren programación (cada X minutos/horas) y siempre hay un gap entre actualizaciones."
  }
];


const NEW_QUESTIONS_D1_PART2 = [
  // === Lakehouse advanced (171-175) ===
  {
    id: 171, domain: 1, difficulty: 2, subtopic: "Lakehouse",
    question: "¿Qué sucede cuando se elimina un archivo de la sección Files de un Lakehouse?",
    options: [
      "Se mueve a una papelera de reciclaje de OneLake",
      "Se elimina permanentemente de OneLake sin posibilidad de recuperación desde la UI",
      "Se mantiene una versión en el historial durante 30 días",
      "Se archiva automáticamente en Azure Blob Storage"
    ],
    correct: 1,
    explanation: "Al eliminar archivos de la sección Files del Lakehouse, se eliminan permanentemente de OneLake. No hay papelera de reciclaje. Para tablas Delta, las versiones anteriores pueden recuperarse con time travel (si no se ha ejecutado VACUUM), pero los archivos en Files no tienen versionado automático."
  },
  {
    id: 172, domain: 1, difficulty: 3, subtopic: "Lakehouse",
    question: "¿Cuál es la diferencia entre tablas managed y external (unmanaged) en un Lakehouse?",
    options: [
      "No hay tablas external en Fabric",
      "Las tablas managed tienen datos y metadatos gestionados por Fabric; las tablas external solo registran metadatos y los datos residen en una ubicación externa (shortcuts)",
      "Las tablas external son más rápidas que las managed",
      "Las tablas managed solo aceptan formato Parquet"
    ],
    correct: 1,
    explanation: "Las tablas managed (gestionadas) almacenan datos dentro del Lakehouse en OneLake — Fabric gestiona su ciclo de vida completo. Las tablas external (no gestionadas) se crean sobre datos que residen fuera del Lakehouse (via shortcuts o rutas externas) — solo los metadatos se registran, los datos no se mueven."
  },
  {
    id: 173, domain: 1, difficulty: 1, subtopic: "Lakehouse",
    question: "¿Cómo se carga un archivo CSV manualmente a un Lakehouse desde el portal de Fabric?",
    options: [
      "Solo mediante pipelines",
      "Arrastrando el archivo al Lakehouse o usando la opción Upload en la sección Files o Tables",
      "Solo mediante notebooks PySpark",
      "Importándolo desde Power BI Desktop"
    ],
    correct: 1,
    explanation: "El portal de Fabric permite subir archivos directamente al Lakehouse: Upload en Files (mantiene el formato original) o Upload en Tables (convierte automáticamente a tabla Delta). También se puede arrastrar y soltar archivos. Para cargas programáticas, se usan pipelines, notebooks o dataflows."
  },
  {
    id: 174, domain: 1, difficulty: 2, subtopic: "Lakehouse",
    question: "¿Qué lenguajes de consulta están disponibles en el SQL Analytics Endpoint de un Lakehouse?",
    options: [
      "T-SQL completo con escritura (INSERT, UPDATE, DELETE)",
      "T-SQL de solo lectura: SELECT, CREATE VIEW, CREATE FUNCTION, pero NO INSERT/UPDATE/DELETE directos",
      "Solo KQL",
      "Solo SparkSQL"
    ],
    correct: 1,
    explanation: "El SQL Analytics Endpoint es de solo lectura para datos: permite SELECT, CREATE VIEW, CREATE FUNCTION y consultas cross-database. NO permite INSERT, UPDATE, DELETE ni CREATE TABLE directos. Para escritura en tablas Lakehouse se usan notebooks Spark, pipelines o dataflows."
  },
  // === Notebooks avanzados (175-178) ===
  {
    id: 175, domain: 1, difficulty: 3, subtopic: "Notebooks/Spark",
    question: "¿Qué son los Spark pools en Fabric y cómo se gestionan?",
    options: [
      "Clusters de Spark que debes crear y gestionar manualmente",
      "Pools de computación gestionados automáticamente por Fabric: se inician al ejecutar un notebook y se escalan dinámicamente según la carga",
      "Máquinas virtuales dedicadas que corren 24/7",
      "Clusters de Kubernetes para contenedores Spark"
    ],
    correct: 1,
    explanation: "Fabric gestiona los Spark pools automáticamente: no hay aprovisionamiento manual de clusters. Al ejecutar un notebook, Fabric asigna recursos de la capacity del workspace. Los pools escalan dinámicamente y se liberan cuando no se usan, optimizando costes. Se puede configurar el tamaño (nodos, cores) pero no se gestiona infraestructura."
  },
  {
    id: 176, domain: 1, difficulty: 2, subtopic: "Notebooks/Spark",
    question: "¿Cómo se instalan librerías Python adicionales en un notebook de Fabric?",
    options: [
      "Solo mediante solicitud al administrador del tenant",
      "Usando %pip install libreria o configurando un Environment de Fabric con las dependencias",
      "No es posible instalar librerías adicionales",
      "Descargando el .whl y subiéndolo al Lakehouse"
    ],
    correct: 1,
    explanation: "En notebooks de Fabric se puede usar %pip install para instalar librerías en la sesión actual. Para persistir dependencias entre sesiones, se crea un Environment de Fabric que define las librerías requeridas y se asocia al workspace. Los Environments garantizan reproducibilidad."
  },
  // === Dataflows Gen2 avanzados (177-180) ===
  {
    id: 177, domain: 1, difficulty: 3, subtopic: "Dataflows Gen2",
    question: "¿Qué sucede con los pasos de Power Query que 'rompen' el query folding en un Dataflow Gen2?",
    options: [
      "El Dataflow muestra un error y no permite continuar",
      "A partir del paso que rompe el folding, Fabric descarga TODOS los datos y ejecuta las transformaciones localmente en el motor de mashup",
      "Los pasos se ignoran automáticamente",
      "Se envían al Lakehouse para procesamiento con Spark"
    ],
    correct: 1,
    explanation: "Cuando un paso rompe el query folding (por ejemplo, una función M sin equivalente SQL nativo), Fabric ejecuta el folding hasta el último paso soportado, descarga esos datos parcialmente filtrados, y procesa los pasos restantes localmente. Esto puede ser significativamente más lento para orígenes grandes. Por eso es importante ordenar los pasos para maximizar el folding."
  },
  {
    id: 178, domain: 1, difficulty: 2, subtopic: "Dataflows Gen2",
    question: "¿Qué modos de actualización soporta el destino de datos (data destination) de un Dataflow Gen2?",
    options: [
      "Solo Replace completo (full refresh)",
      "Replace (reemplaza todos los datos) y Append (añade filas nuevas sin eliminar las existentes)",
      "Solo Append (añadir)",
      "Merge (upsert) automático"
    ],
    correct: 1,
    explanation: "El destino de datos de un Dataflow Gen2 soporta dos modos: Replace (elimina todos los datos existentes y escribe los nuevos — full refresh) y Append (añade filas al final sin tocar las existentes — incremental). Para lógica de upsert/merge se necesita una Pipeline o Notebook adicional."
  },
  // === Pipelines y orquestación avanzada (179-182) ===
  {
    id: 179, domain: 1, difficulty: 3, subtopic: "Pipelines",
    question: "¿Cómo se implementa un patrón de retry con backoff exponencial en una Pipeline de Fabric?",
    options: [
      "No es posible implementar retry en pipelines",
      "Configurando la política de reintentos de cada actividad: número de reintentos, intervalo entre reintentos (que puede ser exponencial), y timeout",
      "Usando un bucle While con una variable contador",
      "Solo mediante código Python en un notebook"
    ],
    correct: 1,
    explanation: "Cada actividad de pipeline tiene configuración de reintentos integrada: Retry (número de intentos), Retry Interval (segundos entre intentos). Fabric soporta hasta 3 reintentos con intervalos configurables. Para backoff exponencial manual, se puede combinar con variables y expresiones dinámicas."
  },
  {
    id: 180, domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Qué actividad de Pipeline se usa para invocar un Dataflow Gen2?",
    options: [
      "Copy Data Activity",
      "Dataflow Activity que referencia el Dataflow Gen2 por nombre",
      "Power Query Activity",
      "Transform Activity"
    ],
    correct: 1,
    explanation: "La Dataflow Activity dentro de una Pipeline invoca un Dataflow Gen2 existente como paso de la orquestación. La pipeline espera a que el Dataflow complete su ejecución antes de continuar con la siguiente actividad. Esto permite combinar Dataflows con otras actividades (Copy, Notebook, Script)."
  },
  // === Delta Lake y mantenimiento avanzado (181-184) ===
  {
    id: 181, domain: 1, difficulty: 3, subtopic: "Delta Lake",
    question: "¿Qué es el 'small file problem' en Delta Lake y cómo se resuelve?",
    options: [
      "Es cuando los archivos son demasiado grandes para procesarse",
      "Se produce cuando muchas escrituras pequeñas generan miles de archivos Parquet diminutos, degradando el rendimiento de lectura. Se resuelve con OPTIMIZE que los compacta",
      "Es un problema de permisos con archivos pequeños",
      "No existe tal problema en Delta Lake"
    ],
    correct: 1,
    explanation: "Las operaciones de streaming, INSERT frecuentes, o pipelines con muchas particiones generan archivos Parquet muy pequeños (< 128MB). Leer miles de archivos pequeños es ineficiente (overhead de I/O y metadata). OPTIMIZE compacta estos archivos en archivos más grandes (~1GB), restaurando el rendimiento de lectura."
  },
  {
    id: 182, domain: 1, difficulty: 2, subtopic: "Delta Lake",
    question: "¿Qué información almacena el transaction log (_delta_log) de una tabla Delta?",
    options: [
      "Solo los datos de la tabla en formato JSON",
      "Cada transacción (add/remove files), metadata de la tabla, schema, estadísticas de columnas (min/max), y configuración",
      "Solo las consultas ejecutadas contra la tabla",
      "El historial de acceso de usuarios"
    ],
    correct: 1,
    explanation: "El _delta_log registra cada transacción como archivos JSON secuenciales: qué archivos Parquet se añadieron/eliminaron, metadatos de la tabla, cambios de schema, estadísticas de columnas por archivo (min, max, nullCount — usadas para data skipping), y configuración (retention, checkpoints). Es la base de todas las features ACID de Delta."
  },
  // === Real-Time avanzado (183-186) ===
  {
    id: 183, domain: 1, difficulty: 2, subtopic: "Real-Time Intelligence",
    question: "¿Qué operador KQL se usa para seleccionar solo columnas específicas del resultado?",
    options: [
      "select",
      "project",
      "columns",
      "pick"
    ],
    correct: 1,
    explanation: "El operador 'project' en KQL selecciona, renombra y calcula columnas: Tabla | project NombreColumna, NuevoNombre = ColumnaOriginal, Calculada = col1 + col2. Es el equivalente de SELECT en SQL pero con la sintaxis de pipe de KQL."
  },
  {
    id: 184, domain: 1, difficulty: 3, subtopic: "Real-Time Intelligence",
    question: "¿Qué función KQL permite contar valores distintos de forma aproximada con alto rendimiento?",
    options: [
      "count_distinct()",
      "dcount() — distinct count aproximado usando HyperLogLog",
      "countif(distinct)",
      "unique_count()"
    ],
    correct: 1,
    explanation: "dcount() es la función KQL para conteo de valores distintos aproximado, usando el algoritmo HyperLogLog. Es mucho más rápido que un conteo exacto para grandes volúmenes. Acepta un parámetro de precisión (0-4). Para conteo exacto se usa count_distinct() pero con mayor consumo de recursos."
  },
  // === Medallion y Shortcuts final (185-190) ===
  {
    id: 185, domain: 1, difficulty: 1, subtopic: "Medallion Architecture",
    question: "¿Por qué se recomienda no transformar los datos en la capa Bronze?",
    options: [
      "Porque la capa Bronze no tiene capacidad de procesamiento",
      "Para preservar los datos originales como fuente de verdad inmutable, permitiendo reprocesamiento futuro si cambian las reglas de transformación",
      "Porque las transformaciones son más baratas en Silver",
      "Porque Bronze solo admite formato CSV"
    ],
    correct: 1,
    explanation: "Bronze como fuente de verdad inmutable es un principio clave: si descubres un bug en la transformación Silver, puedes reprocesar desde Bronze. Si los requisitos de negocio cambian, puedes re-transformar los datos raw. Eliminar o modificar datos en Bronze elimina esta capacidad de recuperación."
  },
  {
    id: 186, domain: 1, difficulty: 3, subtopic: "Medallion Architecture",
    question: "¿Cómo se implementa la deduplicación en la capa Silver cuando los datos pueden llegar duplicados desde Bronze?",
    options: [
      "Simplemente usando SELECT DISTINCT en las vistas",
      "Usando MERGE con una clave de negocio que solo inserta filas nuevas y actualiza existentes, combinado con ROW_NUMBER para identificar la última versión",
      "Eliminando manualmente los duplicados cada semana",
      "Los datos nunca llegan duplicados en Fabric"
    ],
    correct: 1,
    explanation: "El patrón estándar: (1) En el notebook/pipeline Silver, usar ROW_NUMBER() OVER(PARTITION BY clave_negocio ORDER BY timestamp_ingesta DESC) para identificar la versión más reciente de cada registro. (2) Usar MERGE contra la tabla Silver destino para upsert: actualizar existentes e insertar nuevos. Esto garantiza que Silver siempre tenga una sola versión actualizada por clave."
  },
  {
    id: 187, domain: 1, difficulty: 2, subtopic: "Shortcuts",
    question: "¿Qué sucede con un shortcut si el dato de origen se elimina o la conexión se pierde?",
    options: [
      "El shortcut sigue mostrando los datos antiguos en caché",
      "Las consultas al shortcut fallan con error de acceso o de archivo no encontrado, ya que el shortcut es solo una referencia",
      "El shortcut se elimina automáticamente",
      "Fabric copia automáticamente los datos antes de la eliminación"
    ],
    correct: 1,
    explanation: "Los shortcuts son referencias virtuales, no copias. Si los datos de origen se eliminan, se mueven, o la conexión se pierde (credenciales expiradas, permisos revocados), las consultas al shortcut fallarán. No hay caché ni copia local — la dependencia del origen es directa."
  },
  {
    id: 188, domain: 1, difficulty: 2, subtopic: "OneLake",
    question: "¿Qué formato de archivo usan internamente tanto el Lakehouse como el Data Warehouse de Fabric en OneLake?",
    options: [
      "CSV comprimido con gzip",
      "Parquet con protocolo Delta Lake para ambos",
      "El Lakehouse usa Delta y el Warehouse usa un formato propietario",
      "JSON lines (JSONL)"
    ],
    correct: 1,
    explanation: "Tanto el Lakehouse como el Data Warehouse almacenan datos en OneLake usando archivos Parquet con el protocolo Delta Lake. Esta uniformidad permite cross-database queries entre ambos, shortcuts entre ellos, y que ambos sean accesibles desde Spark, SQL y modelos semánticos."
  },
  {
    id: 189, domain: 1, difficulty: 1, subtopic: "Pipelines",
    question: "¿Qué actividad de Pipeline permite ejecutar sentencias T-SQL directamente en un Data Warehouse?",
    options: [
      "Notebook Activity",
      "Script Activity que ejecuta scripts T-SQL contra un Warehouse",
      "SQL Activity (no existe en Fabric)",
      "Query Activity"
    ],
    correct: 1,
    explanation: "La Script Activity ejecuta sentencias T-SQL contra un Data Warehouse de Fabric como parte de una Pipeline. Permite ejecutar stored procedures, sentencias DDL/DML, o scripts complejos. Es ideal para transformaciones SQL que complementan las actividades Copy Data y Dataflow."
  },
  {
    id: 190, domain: 1, difficulty: 3, subtopic: "OneLake",
    question: "¿Cómo funciona la facturación de almacenamiento en OneLake?",
    options: [
      "Se factura por workspace, independientemente del uso",
      "OneLake factura por GB almacenado (similar a Azure Storage), separado de la facturación de Capacity para computación. Los shortcuts no generan coste de almacenamiento adicional",
      "El almacenamiento es ilimitado y gratuito con cualquier Capacity",
      "Se factura por número de archivos"
    ],
    correct: 1,
    explanation: "OneLake factura almacenamiento por GB usado (precio similar a ADLS Gen2), separado de la Capacity (computación). Los shortcuts no duplican datos, por lo que no generan coste de almacenamiento adicional en OneLake. Cada workspace ve su consumo de storage. Las funciones Delta como time travel incrementan storage al mantener versiones anteriores."
  }
];


const NEW_QUESTIONS_D2 = [
  // === Governance avanzada (191-198) ===
  {
    id: 191, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Qué es Microsoft Purview Hub en Fabric y qué información proporciona?",
    options: [
      "Un marketplace de datasets públicos",
      "Un panel dentro de Fabric que muestra datos sobre sensitivity labels, endorsement y items sin protección en el tenant",
      "Una herramienta de desarrollo de modelos ML",
      "El portal de compras de licencias"
    ],
    correct: 1,
    explanation: "Purview Hub en Fabric muestra métricas de governance: cuántos items tienen sensitivity labels, cuántos están endorsed (certified/promoted), items con datos sensibles sin protección, y compliance status. Ayuda a los administradores a evaluar el estado de governance del tenant."
  },
  {
    id: 192, domain: 2, difficulty: 3, subtopic: "Governance",
    question: "¿Qué es el Data Lineage (linaje de datos) en Fabric y dónde se visualiza?",
    options: [
      "El historial de modificaciones de un archivo",
      "La vista de extremo a extremo que muestra el flujo de datos desde el origen hasta los informes: fuentes → pipelines → Lakehouse → modelo → informe",
      "El historial de versiones de un modelo semántico",
      "El log de auditoría de accesos"
    ],
    correct: 1,
    explanation: "Lineage View en Fabric muestra visualmente cómo fluyen los datos: desde la fuente origen, pasando por pipelines/dataflows, almacenamiento (Lakehouse/Warehouse), modelos semánticos, hasta los informes finales. Permite Impact Analysis: antes de modificar una tabla, ver qué informes se verán afectados."
  },
  {
    id: 193, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Qué es Impact Analysis en Fabric?",
    options: [
      "Un test de rendimiento de queries",
      "Una herramienta que muestra qué items downstream se verán afectados si modificas o eliminas un item (tabla, modelo, dataflow)",
      "Un análisis de costes de capacity",
      "Una evaluación de seguridad del workspace"
    ],
    correct: 1,
    explanation: "Impact Analysis muestra las dependencias downstream de un item: si cambias una tabla de Lakehouse, Impact Analysis muestra qué dataflows, modelos semánticos e informes dependen de ella. Es esencial para evaluar el riesgo de cambios y planificar migraciones."
  },
  {
    id: 194, domain: 2, difficulty: 1, subtopic: "Governance",
    question: "¿Qué significa que un item esté 'Certified' en Fabric?",
    options: [
      "Que tiene una licencia premium",
      "Que un administrador autorizado ha verificado y certificado que el contenido cumple los estándares de calidad de la organización",
      "Que está cifrado con AES-256",
      "Que fue creado por Microsoft"
    ],
    correct: 1,
    explanation: "Certified es un nivel de endorsement que solo pueden otorgar usuarios autorizados por el admin del tenant. Indica que el contenido ha sido revisado y cumple los estándares de calidad. Los items certified aparecen destacados en búsquedas y OneLake Data Hub, facilitando que los usuarios encuentren datos confiables."
  },
  {
    id: 195, domain: 2, difficulty: 3, subtopic: "Governance",
    question: "¿Cómo se configuran las políticas de sensitivity labels para que se apliquen automáticamente al contenido de Fabric?",
    options: [
      "Manualmente item por item desde el portal de Fabric",
      "Desde Microsoft Purview compliance portal, creando auto-labeling policies que detectan datos sensibles (números de tarjeta, DNIs) y aplican etiquetas automáticamente",
      "No es posible aplicar labels automáticamente",
      "Solo mediante PowerShell scripts"
    ],
    correct: 1,
    explanation: "Microsoft Purview permite crear políticas de auto-labeling que escanean contenido en Fabric, detectan información sensible usando sensitive information types (regex, ML, diccionarios) y aplican la etiqueta correspondiente automáticamente. Esto escala la protección de datos sin depender de que cada usuario etiquete manualmente."
  },
  {
    id: 196, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Qué son los Domains en la administración de Fabric?",
    options: [
      "Los nombres DNS de los endpoints",
      "Agrupaciones lógicas de workspaces que permiten delegar governance a equipos de negocio específicos",
      "Las regiones geográficas de Azure donde se despliega Fabric",
      "Los tipos de cargas de trabajo (Data Engineering, BI, etc.)"
    ],
    correct: 1,
    explanation: "Los Domains permiten agrupar workspaces por área de negocio (Ventas, RRHH, Finanzas) y delegar la governance a los propietarios de cada dominio. Cada dominio puede tener sus propias reglas de endorsement, naming conventions y políticas. Implementa el concepto de Data Mesh con ownership distribuido."
  },
  {
    id: 197, domain: 2, difficulty: 3, subtopic: "Governance",
    question: "¿Cómo se aplica la herencia de sensitivity labels en Fabric?",
    options: [
      "Las labels se aplican solo al item donde se configuran",
      "Las labels se heredan downstream: si un Lakehouse tiene label 'Confidencial', los modelos semánticos e informes que consumen esos datos heredan la misma label o una más restrictiva",
      "Las labels se heredan upstream: del informe a la fuente",
      "No hay herencia, cada item se etiqueta independientemente"
    ],
    correct: 1,
    explanation: "Las sensitivity labels en Fabric se heredan automáticamente en dirección downstream (de los datos hacia los informes). Si una tabla tiene label 'Highly Confidential', los modelos y reports que la consumen heredan al menos ese nivel. Esto garantiza que la protección siga a los datos a lo largo del pipeline."
  },
  {
    id: 198, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Qué información proporciona la vista de Lineage en un workspace de Fabric?",
    options: [
      "Solo las relaciones entre tablas dentro de un modelo",
      "Un diagrama visual de dependencias entre TODOS los items del workspace: fuentes, dataflows, lakehouses, modelos, informes y sus conexiones",
      "El historial de commits de Git",
      "Las métricas de rendimiento de cada item"
    ],
    correct: 1,
    explanation: "La vista Lineage del workspace muestra un grafo de dependencias entre todos los items: qué fuentes alimentan qué dataflows, qué lakehouses alimentan qué modelos, y qué modelos alimentan qué informes. Permite entender el flujo completo de datos y las dependencias para planificar cambios."
  },
  // === Capacity management (199-206) ===
  {
    id: 199, domain: 2, difficulty: 2, subtopic: "Capacity Management",
    question: "¿Qué sucede cuando un workspace consume más recursos de los que su Capacity puede proporcionar?",
    options: [
      "La Capacity se expande automáticamente sin límite",
      "Se produce throttling: las operaciones se ralentizan o se rechazan temporalmente hasta que el consumo baje",
      "Los datos se eliminan automáticamente",
      "El workspace se cierra"
    ],
    correct: 1,
    explanation: "Cuando el consumo excede la Capacity asignada, Fabric aplica throttling progresivo: primero ralentiza las operaciones (smoothing), luego encola requests (queuing), y finalmente puede rechazar operaciones. El admin puede monitorizar con la Capacity Metrics App y ajustar la Capacity o redistribuir workspaces."
  },
  {
    id: 200, domain: 2, difficulty: 3, subtopic: "Capacity Management",
    question: "¿Qué es 'smoothing' en el contexto de capacity management de Fabric?",
    options: [
      "Una técnica de limpieza de datos",
      "El mecanismo que distribuye picos de consumo de recursos a lo largo del tiempo, permitiendo operaciones que exceden momentáneamente la capacity si hay crédito disponible",
      "Una configuración de red para balanceo de carga",
      "Un tipo de compresión de datos"
    ],
    correct: 1,
    explanation: "Smoothing permite que las cargas de trabajo consuman más recursos de los nominales durante periodos cortos, 'pidiendo prestado' del crédito acumulado durante periodos de baja actividad. Fabric evalúa el consumo en ventanas de tiempo (24 horas) y suaviza los picos para evitar throttling innecesario. Es un mecanismo de burstability."
  },
  {
    id: 201, domain: 2, difficulty: 2, subtopic: "Capacity Management",
    question: "¿Qué herramienta se usa para monitorizar el consumo de recursos de una Capacity de Fabric en detalle?",
    options: [
      "Azure Cost Management",
      "Microsoft Fabric Capacity Metrics App, una aplicación de Power BI que muestra métricas detalladas de consumo por workspace y tipo de carga",
      "System Monitor (perfmon)",
      "Admin Portal solamente"
    ],
    correct: 1,
    explanation: "La Capacity Metrics App es una app de Power BI que se instala desde AppSource. Muestra: consumo de CU (Capacity Units) por workspace, por tipo de operación (Spark, SQL, Dataflow), tendencias temporales, y alertas de throttling. Es la herramienta principal para sizing y optimización de capacidad."
  },
  {
    id: 202, domain: 2, difficulty: 1, subtopic: "Capacity Management",
    question: "¿Qué unidad mide el consumo de recursos en una Capacity de Fabric?",
    options: [
      "GB de memoria",
      "CU (Capacity Units) — una medida normalizada de consumo computacional",
      "vCores",
      "DTU (Database Transaction Units)"
    ],
    correct: 1,
    explanation: "Fabric mide el consumo en CU (Capacity Units), que normalizan el uso de CPU, memoria e I/O en una única métrica. Cada SKU de Capacity (F2, F4, F64, etc.) tiene una cantidad de CUs por segundo. Todas las cargas de trabajo (Spark, SQL, Dataflow, etc.) consumen CUs."
  },
  {
    id: 203, domain: 2, difficulty: 3, subtopic: "Capacity Management",
    question: "¿Qué diferencia hay entre los SKUs F y P en Fabric?",
    options: [
      "No hay diferencia, son lo mismo",
      "F-SKUs (Fabric) se compran en Azure y son más flexibles (pause/resume, autoscale); P-SKUs (Power BI Premium) son legacy y no incluyen todas las workloads de Fabric",
      "P-SKUs son más baratos que F-SKUs",
      "F-SKUs son solo para desarrollo; P-SKUs para producción"
    ],
    correct: 1,
    explanation: "F-SKUs (F2-F2048) son las capacidades nativas de Fabric, compradas en Azure: soportan pause/resume, todas las workloads de Fabric, y son el modelo recomendado. P-SKUs (P1-P5) son el modelo legacy de Power BI Premium que puede acceder a algunas funcionalidades de Fabric pero con limitaciones."
  },
  {
    id: 204, domain: 2, difficulty: 2, subtopic: "Capacity Management",
    question: "¿Qué sucede con los workspaces cuando se pausa una Capacity de Fabric?",
    options: [
      "Los workspaces se eliminan permanentemente",
      "Los workspaces y sus datos persisten pero no se pueden ejecutar operaciones de computación (queries, pipelines, notebooks). Los datos siguen accesibles tras reanudar",
      "Los datos se archivan en cold storage",
      "Los informes siguen funcionando normalmente"
    ],
    correct: 1,
    explanation: "Al pausar una Capacity, los datos en OneLake persisten pero las operaciones computacionales se detienen: no se pueden ejecutar queries, pipelines, notebooks ni refrescos. Los informes no se pueden consultar. Al reanudar, todo vuelve a la normalidad. Pausar es una estrategia de ahorro de costes para entornos no productivos."
  },
  {
    id: 205, domain: 2, difficulty: 3, subtopic: "Capacity Management",
    question: "¿Qué es el autoscale en Fabric Capacity y cómo funciona?",
    options: [
      "Escala automáticamente el número de workspaces",
      "Permite que una Capacity añada CUs adicionales automáticamente cuando se acerca al límite de throttling, hasta un máximo configurado, facturando solo las CUs extra consumidas",
      "Escala el almacenamiento automáticamente",
      "No existe autoscale en Fabric"
    ],
    correct: 1,
    explanation: "Autoscale añade CUs temporales cuando la Capacity original no es suficiente, evitando throttling. Se configura un límite máximo de CUs adicionales. Las CUs extra se facturan por segundo de uso. Es ideal para picos predecibles (fin de mes, reportes masivos) sin necesidad de sobredimensionar la Capacity base."
  },
  {
    id: 206, domain: 2, difficulty: 1, subtopic: "Capacity Management",
    question: "¿Quién puede asignar workspaces a una Capacity de Fabric?",
    options: [
      "Cualquier usuario del workspace",
      "Solo Capacity Admins y Fabric/Power BI Admins del tenant",
      "Solo el propietario del workspace",
      "Microsoft Support"
    ],
    correct: 1,
    explanation: "La asignación de workspaces a capacidades es una operación administrativa. Solo los Capacity Admins (asignados al comprar la Capacity) y los Fabric Admins del tenant pueden mover workspaces entre capacidades. Esto previene que usuarios no autorizados consuman recursos de capacidades ajenas."
  },
  // === CI/CD avanzado (207-214) ===
  {
    id: 207, domain: 2, difficulty: 2, subtopic: "Git Integration",
    question: "¿Qué items de Fabric se pueden versionar con Git Integration?",
    options: [
      "Solo informes de Power BI",
      "La mayoría de items: informes, modelos semánticos, notebooks, pipelines, dataflows, lakehouses (definición), y más",
      "Solo notebooks y pipelines",
      "Todos los datos almacenados en OneLake"
    ],
    correct: 1,
    explanation: "Git Integration soporta la mayoría de items de Fabric: informes (.pbir), modelos semánticos (.bim), notebooks, pipelines, dataflows, definiciones de Lakehouse y Warehouse. Los DATOS no se versionan en Git — solo las definiciones y configuraciones de los items."
  },
  {
    id: 208, domain: 2, difficulty: 3, subtopic: "Git Integration",
    question: "¿Cuál es el flujo de trabajo recomendado para colaboración con Git en Fabric?",
    options: [
      "Todos trabajan directamente en la rama main",
      "Cada desarrollador trabaja en un branch separado con su propio workspace dev, hace merge a main, y usa Deployment Pipelines para promover a Test/Prod",
      "Un solo workspace compartido sin branches",
      "Solo el admin del workspace puede usar Git"
    ],
    correct: 1,
    explanation: "El flujo recomendado: (1) Cada dev tiene un workspace conectado a su branch, (2) desarrolla y prueba localmente, (3) crea un Pull Request a main, (4) tras revisión y merge, el workspace de Dev (conectado a main) refleja los cambios, (5) Deployment Pipelines promueven de Dev→Test→Prod."
  },
  {
    id: 209, domain: 2, difficulty: 2, subtopic: "Deployment Pipelines",
    question: "¿Qué son las 'Deployment Rules' en los Deployment Pipelines de Fabric?",
    options: [
      "Reglas de acceso para quién puede promover contenido",
      "Configuraciones que permiten cambiar parámetros al promover entre etapas: conexiones de datos, nombres de Lakehouse, parámetros de modelo",
      "Validaciones de código antes del despliegue",
      "Políticas de backup antes de la promoción"
    ],
    correct: 1,
    explanation: "Las Deployment Rules permiten configurar qué cambia al promover contenido entre etapas. Por ejemplo: en Dev el modelo apunta a LH_Dev, en Test a LH_Test, en Prod a LH_Prod. Las rules re-mapean estas conexiones automáticamente durante la promoción, evitando ediciones manuales post-deploy."
  },
  {
    id: 210, domain: 2, difficulty: 3, subtopic: "Deployment Pipelines",
    question: "¿Qué ocurre cuando se promueve contenido que ya existe en la etapa destino de un Deployment Pipeline?",
    options: [
      "Se crea una copia duplicada",
      "El item existente se actualiza (sobrescribe) con la nueva versión. Fabric compara las versiones y muestra un resumen de cambios antes de confirmar",
      "Se elimina el item antiguo y se crea uno nuevo con nuevo ID",
      "La promoción se bloquea si el item ya existe"
    ],
    correct: 1,
    explanation: "Cuando un item ya existe en la etapa destino, Fabric actualiza su contenido con la nueva versión. Antes de promover, muestra una comparación de cambios (nuevos items, modificados, eliminados). El ID del item se mantiene, preservando links, permisos y suscripciones existentes en el destino."
  },
  {
    id: 211, domain: 2, difficulty: 2, subtopic: "Git Integration",
    question: "¿Qué sucede cuando hay un conflicto entre los cambios en el workspace y los cambios en el repositorio Git?",
    options: [
      "Los cambios del workspace siempre ganan",
      "Fabric muestra el conflicto y permite elegir entre la versión del workspace o la versión del repositorio para resolverlo",
      "Los cambios se fusionan automáticamente sin intervención",
      "Git Integration se desconecta automáticamente"
    ],
    correct: 1,
    explanation: "Cuando hay conflictos (cambios simultáneos en workspace y repo), Fabric los detecta al sincronizar y ofrece opciones de resolución: aceptar la versión del workspace, aceptar la versión del repo, o resolver manualmente. Es similar al flujo de resolución de conflictos de Git estándar."
  },
  {
    id: 212, domain: 2, difficulty: 1, subtopic: "Deployment Pipelines",
    question: "¿Cuántas etapas puede tener un Deployment Pipeline en Fabric?",
    options: [
      "Solo 2 (Dev y Prod)",
      "Hasta 10 etapas personalizables, aunque 3 es lo estándar (Dev, Test, Prod)",
      "Exactamente 3, sin posibilidad de cambiar",
      "Ilimitadas"
    ],
    correct: 1,
    explanation: "Los Deployment Pipelines soportan hasta 10 etapas, aunque el patrón más común es 3 (Development, Test, Production). Se pueden personalizar los nombres y añadir etapas intermedias como QA, Staging, UAT según las necesidades de la organización."
  },
  {
    id: 213, domain: 2, difficulty: 3, subtopic: "Git Integration",
    question: "¿Qué formato usan los items de Fabric al sincronizarse con Git?",
    options: [
      "Archivos binarios comprimidos (.zip)",
      "Cada item se descompone en archivos legibles: JSON para configuración, TMDL para modelos semánticos, PBIR para informes",
      "Un solo archivo XML por workspace",
      "Archivos .pbix binarios de Power BI Desktop"
    ],
    correct: 1,
    explanation: "Fabric serializa cada item en archivos legibles para Git: los modelos semánticos usan TMDL (Tabular Model Definition Language — archivos de texto), informes usan PBIR (formato JSON), pipelines y notebooks usan JSON. Esto permite diffs significativos, code review y merge en Git."
  },
  {
    id: 214, domain: 2, difficulty: 2, subtopic: "Deployment Pipelines",
    question: "¿Se pueden configurar aprobaciones automáticas antes de promover contenido entre etapas?",
    options: [
      "Sí, Fabric tiene un sistema de aprobaciones integrado con notificaciones",
      "No directamente en Deployment Pipelines, pero se puede lograr combinando con Azure DevOps pipelines y approval gates",
      "Las aprobaciones son obligatorias por defecto",
      "Solo los admins pueden promover, eso es suficiente control"
    ],
    correct: 1,
    explanation: "Los Deployment Pipelines nativos de Fabric no tienen sistema de aprobaciones integrado. Para flujos con aprobaciones, se combina Fabric Git Integration con Azure DevOps/GitHub: se usan Pull Requests con reviewers obligatorios y deployment gates para controlar qué se promueve y cuándo."
  },
  // === Auditing y Monitoring (215-220) ===
  {
    id: 215, domain: 2, difficulty: 2, subtopic: "Monitoring",
    question: "¿Qué es el Monitoring Hub de Fabric y qué actividades muestra?",
    options: [
      "Un dashboard de métricas de negocio",
      "Una vista centralizada de actividades en ejecución y recientes: refrescos de modelos, ejecuciones de pipelines, trabajos Spark, ejecuciones de dataflows",
      "Un monitor de red para tráfico",
      "Un panel de alertas de seguridad"
    ],
    correct: 1,
    explanation: "Monitoring Hub muestra todas las actividades activas y recientes del workspace: estado de ejecución (en curso, completado, fallido), duración, tipo de operación, submitter, hora de inicio/fin. Permite filtrar por tipo de actividad y ver detalles de errores para troubleshooting."
  },
  {
    id: 216, domain: 2, difficulty: 3, subtopic: "Monitoring",
    question: "¿Dónde se pueden consultar los logs de auditoría detallados de todas las actividades de Fabric del tenant?",
    options: [
      "Solo en el Monitoring Hub del workspace",
      "En el Unified Audit Log de Microsoft 365, accesible desde Microsoft Purview compliance portal o via PowerShell (Search-UnifiedAuditLog)",
      "Solo en Azure Monitor",
      "En el log de la Capacity Metrics App"
    ],
    correct: 1,
    explanation: "El Unified Audit Log de Microsoft 365 registra TODAS las actividades de Fabric: quién accedió a qué report, quién ejecutó qué pipeline, quién compartió qué item, cambios de permisos, etc. Se accede desde Purview compliance portal o PowerShell. Los logs de audit se retienen 90 días (estándar) o 1 año (con licencia E5)."
  },
  {
    id: 217, domain: 2, difficulty: 1, subtopic: "Monitoring",
    question: "¿Qué tipo de actividades se pueden ver en el Monitoring Hub?",
    options: [
      "Solo refrescos de modelos semánticos",
      "Refrescos de modelos, ejecuciones de pipelines, trabajos Spark (notebooks), ejecuciones de dataflows, y trabajos de copy",
      "Solo errores y fallos",
      "Solo actividades del administrador"
    ],
    correct: 1,
    explanation: "Monitoring Hub es comprehensivo: muestra refrescos de modelos semánticos, ejecuciones de Data Factory pipelines, trabajos Spark de notebooks, ejecuciones de Dataflows Gen2, actividades de Copy Data, y más. Cada entrada muestra estado, duración, submitter y detalles del error si falló."
  },
  {
    id: 218, domain: 2, difficulty: 2, subtopic: "Monitoring",
    question: "¿Qué API permite acceder programáticamente a los eventos de actividad de Fabric?",
    options: [
      "Solo la API de Azure Monitor",
      "Admin REST API de Power BI/Fabric (GetActivityEvents) y también la Office 365 Management Activity API",
      "Solo la Microsoft Graph API",
      "No hay API disponible, solo la interfaz web"
    ],
    correct: 1,
    explanation: "La Admin API GetActivityEvents permite extraer programáticamente todos los eventos de actividad de Fabric (accesos, refrescos, cambios) para un rango de fechas. Los datos se pueden ingerir en un Lakehouse para análisis personalizado de uso y seguridad. La O365 Management API ofrece funcionalidad similar."
  },
  {
    id: 219, domain: 2, difficulty: 3, subtopic: "Monitoring",
    question: "¿Cómo se configura un dashboard de monitorización personalizado para Fabric?",
    options: [
      "Solo usando la Capacity Metrics App sin posibilidad de personalización",
      "Usando la Admin API para extraer activity logs, ingresarlos en un Lakehouse, y crear un modelo semántico + informes Power BI personalizados",
      "Instalando Azure Monitor agents en los nodos de Fabric",
      "No es posible crear dashboards de monitorización personalizados"
    ],
    correct: 1,
    explanation: "El patrón recomendado: (1) Usar la Admin API (GetActivityEvents, GetGroupUsers, etc.) con un Notebook o Pipeline programado, (2) Ingestar los datos en un Lakehouse, (3) Crear un modelo semántico sobre esos datos, (4) Construir informes personalizados de adopción, uso, seguridad y rendimiento."
  },
  {
    id: 220, domain: 2, difficulty: 2, subtopic: "Monitoring",
    question: "¿Qué métricas clave muestra la Capacity Metrics App?",
    options: [
      "Solo el coste mensual de la licencia",
      "CU usage por workspace, throttling events, operaciones más costosas, tendencias de consumo, y comparación con la capacity disponible",
      "Solo el número de usuarios activos",
      "Solo el almacenamiento utilizado en OneLake"
    ],
    correct: 1,
    explanation: "La Capacity Metrics App muestra: consumo de CU por workspace y tipo de operación (Spark, SQL, etc.), eventos de throttling y su severidad, las operaciones más costosas, tendencias temporales de consumo, overhead de background operations, y porcentaje de utilización vs capacity disponible."
  },
  // === Seguridad avanzada (221-228) ===
  {
    id: 221, domain: 2, difficulty: 3, subtopic: "RLS/CLS/OLS",
    question: "¿Cómo se implementa RLS dinámico que soporte managers que ven datos de su equipo completo?",
    options: [
      "Creando un rol por cada manager",
      "Usando una tabla de jerarquía organizacional y un filtro DAX con PATH() que navegue la cadena de mando para incluir todos los subordinados del manager actual",
      "Usando OLS para ocultar columnas de otros equipos",
      "Configurando permisos de workspace por equipo"
    ],
    correct: 1,
    explanation: "Para RLS jerárquico: (1) crear tabla de empleados con ParentID (jerarquía), (2) usar PATH(ID, ParentID) para generar la cadena jerárquica, (3) en el filtro RLS usar PATHCONTAINS(EmployeePath, LOOKUPVALUE(ID, email, USERPRINCIPALNAME())) que incluye al manager y todos sus subordinados en la cadena."
  },
  {
    id: 222, domain: 2, difficulty: 2, subtopic: "RLS/CLS/OLS",
    question: "¿Cómo se prueba (test) un rol RLS configurado en un modelo semántico?",
    options: [
      "Solo publicando el informe y pidiendo a un usuario que lo abra",
      "Usando 'View as Role' en Power BI Service o 'View as' en Power BI Desktop para simular la vista de un usuario con un rol específico",
      "Ejecutando la medida DAX en DAX Studio",
      "No es posible probar RLS antes de publicar"
    ],
    correct: 1,
    explanation: "Power BI Service y Desktop ofrecen 'View as Role' que permite al desarrollador simular la experiencia de un usuario con un rol RLS específico. Se puede seleccionar el rol y opcionalmente especificar el UPN de un usuario para probar Dynamic RLS. Es esencial para verificar que los filtros funcionan correctamente antes de compartir."
  },
  {
    id: 223, domain: 2, difficulty: 3, subtopic: "Networking",
    question: "¿Qué es un VNet Gateway en Fabric y cuándo se usa?",
    options: [
      "Un gateway para redes VPN de usuario",
      "Un gateway gestionado que permite a Fabric conectarse a recursos Azure dentro de una Virtual Network, sin necesidad de un on-premises data gateway",
      "Un firewall para bloquear tráfico no autorizado",
      "Un balanceador de carga para queries"
    ],
    correct: 1,
    explanation: "VNet Gateway permite que Fabric acceda a recursos Azure protegidos dentro de una Virtual Network (como Azure SQL con private endpoints, Azure Storage con firewall). A diferencia del On-premises Data Gateway (que requiere una máquina), el VNet Gateway es totalmente gestionado en la nube."
  },
  {
    id: 224, domain: 2, difficulty: 2, subtopic: "Networking",
    question: "¿Cuándo se necesita un On-premises Data Gateway en Fabric?",
    options: [
      "Siempre que se use Fabric",
      "Cuando se necesita conectar Fabric a fuentes de datos on-premises (dentro de la red corporativa) que no están expuestas a internet",
      "Solo para conectar a Azure SQL Database",
      "Solo para usuarios que trabajan desde la oficina"
    ],
    correct: 1,
    explanation: "El On-premises Data Gateway actúa como puente entre Fabric (nube) y fuentes de datos on-premises (red corporativa): SQL Server local, archivos compartidos, Oracle, SAP, etc. Se instala en una máquina dentro de la red corporativa que tiene acceso tanto a la fuente de datos como a internet."
  },
  {
    id: 225, domain: 2, difficulty: 3, subtopic: "Networking",
    question: "¿Qué es 'Trusted Workspace Access' en Fabric?",
    options: [
      "Un tipo de permiso de workspace",
      "Una configuración que permite que workspaces específicos de Fabric accedan a cuentas de Azure Storage con firewall activado, basándose en la identidad del workspace",
      "Un modo de acceso sin contraseña",
      "Un certificado SSL para conexiones seguras"
    ],
    correct: 1,
    explanation: "Trusted Workspace Access permite configurar Azure Storage con firewall (bloqueando acceso público) pero permitiendo acceso específico desde workspaces de Fabric de confianza. Se basa en managed identity del workspace. Esto elimina la necesidad de abrir puertos o usar VPN mientras mantiene la seguridad."
  },
  {
    id: 226, domain: 2, difficulty: 2, subtopic: "Workspace Security",
    question: "¿Qué permiso mínimo necesita un usuario para ver un informe compartido directamente (sin acceso al workspace)?",
    options: [
      "Workspace Contributor",
      "Permiso de item 'Read' otorgado al compartir el informe, más permiso Build en el modelo semántico subyacente",
      "Workspace Admin",
      "Licencia Fabric Premium per user"
    ],
    correct: 1,
    explanation: "Para ver un informe compartido fuera del workspace: el usuario necesita permiso Read en el informe (otorgado al compartir) y el modelo semántico subyacente debe tener permisos Read+Build compartidos. Si falta el permiso en el modelo, el usuario verá el informe sin datos."
  },
  // === Tenant settings y DR (227-240) ===
  {
    id: 227, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Dónde se configuran las políticas del tenant como 'quién puede crear workspaces' o 'quién puede exportar datos'?",
    options: [
      "En Azure Portal",
      "En el Admin Portal de Fabric, sección Tenant Settings, donde cada configuración puede habilitarse para todo el tenant o para security groups específicos",
      "En Microsoft 365 Admin Center",
      "En cada workspace individualmente"
    ],
    correct: 1,
    explanation: "Los Tenant Settings en el Admin Portal de Fabric controlan funcionalidades a nivel de tenant: quién puede crear workspaces, exportar datos, usar Git integration, publicar apps, etc. Cada setting se puede habilitar/deshabilitar globalmente o para security groups específicos de Azure AD."
  },
  {
    id: 228, domain: 2, difficulty: 3, subtopic: "Governance",
    question: "¿Qué tenant setting controla si los usuarios pueden compartir contenido con personas externas a la organización?",
    options: [
      "Allow users to create workspaces",
      "Allow Azure Active Directory guest users to access Fabric / Share content with external users",
      "Export data",
      "Certification settings"
    ],
    correct: 1,
    explanation: "La configuración 'Share content with external users' y 'Allow Azure AD guest users to access Fabric' controlan el acceso externo. Se pueden restringir a security groups específicos. Si están deshabilitadas, no se puede compartir informes ni datasets con usuarios B2B (invitados de Azure AD)."
  },
  {
    id: 229, domain: 2, difficulty: 1, subtopic: "Governance",
    question: "¿Quién tiene acceso al Admin Portal de Microsoft Fabric?",
    options: [
      "Todos los usuarios del tenant",
      "Solo los Global Admins de Microsoft 365 y los Fabric Admins (Power BI Service Administrator role)",
      "Solo los workspace admins",
      "Solo los usuarios con licencia Fabric Premium"
    ],
    correct: 1,
    explanation: "El Admin Portal es accesible para Global Admins de Microsoft 365 y usuarios con el rol Fabric Administrator (antes Power BI Service Administrator). Estos roles se asignan en Azure AD / Entra ID. Los Capacity Admins solo gestionan su capacity específica, no todo el portal."
  },
  {
    id: 230, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Qué es la 'delegation' en los tenant settings de Fabric?",
    options: [
      "Delegar la administración a consultores externos",
      "La capacidad de que ciertos tenant settings sean configurables por los workspace admins a nivel de workspace, en lugar de solo a nivel de tenant",
      "Asignar tareas de mantenimiento a usuarios específicos",
      "Transferir la propiedad de un workspace"
    ],
    correct: 1,
    explanation: "Algunos tenant settings en Fabric permiten 'delegation': el admin del tenant puede permitir que los admins de workspace controlen ciertas configuraciones (como Git integration o export settings) a nivel de su workspace. Esto permite governance flexible: políticas centrales con excepciones controladas a nivel de equipo."
  },
  {
    id: 231, domain: 2, difficulty: 3, subtopic: "Capacity Management",
    question: "¿Qué consideraciones de disaster recovery (BCDR) aplican en Microsoft Fabric?",
    options: [
      "Fabric no tiene ninguna feature de disaster recovery",
      "OneLake replica datos con geo-redundancia (según la configuración de la Capacity region), pero se recomienda complementar con exportaciones periódicas y Git Integration para definiciones de items",
      "Fabric replica automáticamente a 3 regiones sin configuración",
      "Solo los datos en Delta Lake tienen backup automático"
    ],
    correct: 1,
    explanation: "Fabric hereda la redundancia del almacenamiento Azure subyacente (LRS/GRS según la region). Para BCDR completo se recomienda: (1) Git Integration para versionar definiciones de items, (2) Exportar datos críticos periódicamente, (3) Documentar configuraciones de workspace y permisos, (4) Considerar workspaces en diferentes regiones para cargas críticas."
  },
  {
    id: 232, domain: 2, difficulty: 2, subtopic: "Capacity Management",
    question: "¿Qué sucede si la región de Azure donde está la Capacity de Fabric experimenta una caída (outage)?",
    options: [
      "Fabric automáticamente migra a otra región sin interrupciones",
      "Los workspaces en esa Capacity no están disponibles hasta que la región se recupere. Los datos persisten pero no son accesibles para operaciones",
      "Los datos se pierden permanentemente",
      "Otro tenant asume la carga automáticamente"
    ],
    correct: 1,
    explanation: "Durante un outage regional, los workspaces asociados a Capacities en esa región no están disponibles. Los datos en OneLake persisten (están almacenados con redundancia) pero no se pueden ejecutar operaciones computacionales. Fabric no ofrece failover automático multi-región nativo — se recomienda planificación de BCDR."
  },
  {
    id: 233, domain: 2, difficulty: 2, subtopic: "Workspace Security",
    question: "¿Qué diferencia hay entre los roles Member y Contributor en un workspace?",
    options: [
      "No hay diferencia práctica",
      "Member puede gestionar permisos del workspace y añadir otros usuarios; Contributor solo puede crear, editar y eliminar contenido pero NO gestionar permisos",
      "Contributor tiene más permisos que Member",
      "Member solo puede ver contenido; Contributor puede editarlo"
    ],
    correct: 1,
    explanation: "Member = Contributor + gestión de permisos. Members pueden añadir otros usuarios al workspace (como Member, Contributor o Viewer), compartir items, y publicar apps. Contributors pueden crear y editar todo el contenido pero no pueden gestionar quién tiene acceso al workspace."
  },
  {
    id: 234, domain: 2, difficulty: 3, subtopic: "RLS/CLS/OLS",
    question: "¿Se puede combinar RLS y OLS en el mismo modelo semántico?",
    options: [
      "No, son mutuamente excluyentes",
      "Sí, se pueden usar juntos: RLS para filtrar qué filas ve cada usuario y OLS para ocultar tablas/columnas sensibles a ciertos roles",
      "Solo en modelos Import, no en Direct Lake",
      "Solo con licencia Fabric F64 o superior"
    ],
    correct: 1,
    explanation: "RLS y OLS se complementan y pueden usarse juntos: RLS filtra filas (el vendedor solo ve sus ventas), OLS oculta columnas/tablas (RRHH ve salarios, ventas no). Se definen en el modelo semántico con roles DAX (RLS) y propiedades de OLS en TMSL/TMDL. Ambos funcionan en Import y Direct Lake."
  },
  {
    id: 235, domain: 2, difficulty: 1, subtopic: "Workspace Security",
    question: "¿Qué tipo de usuario necesita una licencia para acceder a contenido de Fabric?",
    options: [
      "Solo los administradores necesitan licencia",
      "Todo usuario que consuma contenido en un workspace asociado a una Capacity de Fabric puede acceder con una licencia Free de Power BI; sin Capacity, necesita Pro o PPU",
      "Todos necesitan licencia Premium individual",
      "Solo los creadores de contenido necesitan licencia"
    ],
    correct: 1,
    explanation: "Con Fabric Capacity (F-SKU), los consumidores de contenido pueden usar una licencia Free de Power BI para ver informes y dashboards. Sin Capacity, necesitan Power BI Pro o Premium Per User (PPU). Los creadores de contenido generalmente necesitan Pro o PPU para publicar."
  },
  {
    id: 236, domain: 2, difficulty: 2, subtopic: "Networking",
    question: "¿Qué es un Private Link en el contexto de Fabric?",
    options: [
      "Un enlace acortado para compartir informes internamente",
      "Una configuración que permite que el tráfico entre usuarios y Fabric viaje por la red privada de Microsoft en lugar de internet público",
      "Un link de descarga directa de archivos",
      "Una URL privada temporal para previews"
    ],
    correct: 1,
    explanation: "Azure Private Link para Fabric permite que los usuarios accedan al servicio de Fabric a través de un Private Endpoint en su Azure Virtual Network, manteniendo todo el tráfico dentro de la red privada de Microsoft. Esto es un requisito de compliance para organizaciones con políticas de zero-trust o regulaciones estrictas."
  },
  {
    id: 237, domain: 2, difficulty: 3, subtopic: "Networking",
    question: "¿Cuál es la diferencia entre Managed Private Endpoints y Private Links en Fabric?",
    options: [
      "Son lo mismo con nombres diferentes",
      "Managed Private Endpoints protegen la conexión SALIENTE de Fabric a fuentes de datos Azure; Private Links protegen la conexión ENTRANTE de usuarios a Fabric",
      "Private Links son para fuentes de datos; Managed Private Endpoints son para usuarios",
      "Managed Private Endpoints son gratuitos; Private Links son de pago"
    ],
    correct: 1,
    explanation: "Dirección del tráfico: Managed Private Endpoints → tráfico SALIENTE (Fabric conectando a Azure SQL, Storage, etc. por red privada). Private Links → tráfico ENTRANTE (usuarios accediendo a Fabric desde su red corporativa por red privada). Ambos eliminan tráfico por internet público pero protegen conexiones en direcciones opuestas."
  },
  {
    id: 238, domain: 2, difficulty: 2, subtopic: "Governance",
    question: "¿Qué es el 'Scanner API' en Fabric y para qué se usa?",
    options: [
      "Una API para escanear virus en los datos",
      "Una API administrativa que permite escanear todos los workspaces del tenant para inventariar items, permisos, sensitivity labels y metadatos para governance",
      "Un escáner de puertos de red",
      "Una herramienta de análisis de código"
    ],
    correct: 1,
    explanation: "La Scanner API (GetModifiedWorkspaces + GetScanResult) permite a los administradores escanear masivamente todos los workspaces del tenant y obtener: lista de items, permisos configurados, sensitivity labels aplicadas, fuentes de datos, y metadatos. Es esencial para inventario de datos, auditoría de permisos y reporting de compliance a gran escala."
  },
  {
    id: 239, domain: 2, difficulty: 1, subtopic: "Deployment Pipelines",
    question: "¿Qué requisito debe cumplirse para usar Deployment Pipelines en Fabric?",
    options: [
      "Tener una cuenta de Azure DevOps",
      "Los workspaces asociados a cada etapa deben estar en una Capacity de Fabric (F-SKU) o Premium (P-SKU)",
      "Tener una suscripción de GitHub Enterprise",
      "Solo funciona con Power BI Pro"
    ],
    correct: 1,
    explanation: "Deployment Pipelines requieren que los workspaces de cada etapa (Dev, Test, Prod) estén asignados a una Capacity de Fabric o Premium. Es una feature de Capacity, no disponible con solo licencia Pro. El usuario que opera el pipeline necesita al menos rol Member en los workspaces."
  },
  {
    id: 240, domain: 2, difficulty: 3, subtopic: "Workspace Security",
    question: "¿Cómo se puede auditar quién accedió a un informe específico en las últimas 24 horas?",
    options: [
      "No es posible auditar accesos individuales",
      "Consultando el Unified Audit Log con filtros por actividad 'ViewReport' y el nombre del informe, vía Purview compliance portal o PowerShell",
      "Revisando el Monitoring Hub del workspace",
      "Preguntando a cada usuario individualmente"
    ],
    correct: 1,
    explanation: "El Unified Audit Log registra cada visualización de informe (ViewReport event) con: usuario, hora, informe, workspace, y más. Se filtra en Purview compliance portal o con PowerShell: Search-UnifiedAuditLog -Operations ViewReport -RecordType PowerBIAudit. Esto permite auditoría de acceso granular para compliance."
  }
];


const NEW_QUESTIONS_D3 = [
  // === DAX avanzado (241-252) ===
  {
    id: 241, domain: 3, difficulty: 2, subtopic: "DAX Advanced",
    question: "¿Cuál es la ventaja de usar variables (VAR/RETURN) en expresiones DAX?",
    options: [
      "Solo mejoran la legibilidad del código",
      "Mejoran legibilidad, evitan recalcular expresiones repetidas (rendimiento), y facilitan debugging al poder inspeccionar valores intermedios",
      "Son obligatorias en DAX desde 2024",
      "Solo funcionan en columnas calculadas, no en medidas"
    ],
    correct: 1,
    explanation: "VAR/RETURN: (1) Legibilidad: nombres descriptivos en lugar de expresiones anidadas. (2) Rendimiento: cada VAR se evalúa una sola vez y se reutiliza (el motor no recalcula). (3) Debug: puedes cambiar el RETURN para inspeccionar cualquier VAR intermedia. Ejemplo: VAR TotalVentas = SUM(...) VAR TotalCoste = SUM(...) RETURN TotalVentas - TotalCoste."
  },
  {
    id: 242, domain: 3, difficulty: 3, subtopic: "DAX Advanced",
    question: "¿Qué hace CALCULATE con múltiples argumentos de filtro?",
    options: [
      "Aplica OR entre todos los filtros",
      "Aplica AND entre filtros de diferentes columnas, pero OR entre filtros de la misma columna (intersección de tablas de filtro)",
      "Solo aplica el último filtro, ignorando los anteriores",
      "Genera un error si hay más de un filtro"
    ],
    correct: 1,
    explanation: "CALCULATE(medida, filtro1, filtro2) aplica AND entre filtros de columnas diferentes: CALCULATE(SUM(Ventas), Producto[Color]=\"Rojo\", Fecha[Año]=2024) → ventas de productos rojos EN 2024. Si dos filtros afectan la misma columna, el segundo reemplaza al primero (no AND)."
  },
  {
    id: 243, domain: 3, difficulty: 3, subtopic: "DAX Advanced",
    question: "¿Qué hace la función TREATAS en DAX y cuándo se usa?",
    options: [
      "Crea una tabla temporal en memoria",
      "Aplica los valores de una tabla como filtro virtual sobre otra columna, como si existiera una relación física entre ellas",
      "Transforma tipos de datos automáticamente",
      "Aplica un tratamiento especial a columnas con NULLs"
    ],
    correct: 1,
    explanation: "TREATAS(tabla_valores, columna_destino) permite usar valores de una tabla para filtrar otra columna SIN necesidad de una relación física. Ejemplo: CALCULATE(SUM(Ventas[Importe]), TREATAS(VALUES(TablaFiltro[Producto]), Ventas[Producto])). Es útil para relaciones virtuales y escenarios de role-playing dimensions."
  },
  {
    id: 244, domain: 3, difficulty: 2, subtopic: "DAX Advanced",
    question: "¿Qué función DAX permite activar una relación inactiva para un cálculo específico?",
    options: [
      "ACTIVATERELATIONSHIP()",
      "USERELATIONSHIP(Tabla1[Col], Tabla2[Col]) dentro de CALCULATE",
      "SETRELATIONSHIP()",
      "ENABLERELATION()"
    ],
    correct: 1,
    explanation: "USERELATIONSHIP activa una relación inactiva solo para la duración de ese CALCULATE. Caso típico: una tabla de ventas con FechaVenta y FechaEnvío, ambas conectadas a DimFecha. La relación con FechaVenta es activa por defecto. Para calcular por FechaEnvío: CALCULATE(SUM(Ventas[Importe]), USERELATIONSHIP(Ventas[FechaEnvío], Fecha[Date]))."
  },
  {
    id: 245, domain: 3, difficulty: 3, subtopic: "DAX Advanced",
    question: "¿Cuál es la diferencia entre SUM y SUMX en DAX?",
    options: [
      "Son idénticas, SUMX es solo un alias",
      "SUM agrega una columna existente; SUMX es un iterador que evalúa una expresión fila por fila y luego suma los resultados",
      "SUMX es más lento y nunca se recomienda",
      "SUM funciona solo con enteros; SUMX con decimales"
    ],
    correct: 1,
    explanation: "SUM(columna) agrega directamente una columna. SUMX(tabla, expresion) itera cada fila de la tabla, evalúa la expresión en el contexto de esa fila, y suma los resultados. SUMX es necesario cuando calculas algo fila por fila: SUMX(Ventas, Ventas[Cantidad] * Ventas[PrecioUnitario]) — no podrías hacer esto con SUM."
  },
  {
    id: 246, domain: 3, difficulty: 2, subtopic: "DAX Advanced",
    question: "¿Qué función DAX devuelve TRUE si el contexto de filtro actual tiene exactamente un valor para una columna?",
    options: [
      "ISFILTERED()",
      "HASONEVALUE(columna)",
      "ISSINGLEVALUE()",
      "COUNTFILTERS()"
    ],
    correct: 1,
    explanation: "HASONEVALUE(columna) devuelve TRUE si hay exactamente un valor visible en el contexto para esa columna. Se usa frecuentemente en medidas condicionales: IF(HASONEVALUE(Producto[Categoría]), SELECTEDVALUE(Producto[Categoría]), \"Múltiples\"). Es más preciso que ISFILTERED, que solo indica si existe algún filtro."
  },
  {
    id: 247, domain: 3, difficulty: 3, subtopic: "DAX Advanced",
    question: "¿Cómo se calcula un porcentaje del total general en DAX, ignorando los filtros de un slicer?",
    options: [
      "Dividiendo la medida por el total de la tabla",
      "DIVIDE([Ventas], CALCULATE([Ventas], REMOVEFILTERS(Dimension))) — REMOVEFILTERS elimina los filtros del slicer para calcular el total general",
      "Usando una columna calculada con el total fijo",
      "[Ventas] / [TotalVentas] (creando otra medida)"
    ],
    correct: 1,
    explanation: "El patrón % del total: DIVIDE([Ventas], CALCULATE([Ventas], REMOVEFILTERS(Dimension))). REMOVEFILTERS (o ALL) dentro de CALCULATE elimina los filtros de la dimensión, calculando el total general como denominador. El numerador [Ventas] respeta los filtros actuales. DIVIDE evita error de división por cero."
  },
  {
    id: 248, domain: 3, difficulty: 3, subtopic: "DAX Advanced",
    question: "¿Qué es un 'contexto de transición' (context transition) en DAX?",
    options: [
      "El cambio de modo Import a DirectQuery",
      "Cuando CALCULATE convierte el contexto de fila actual en un contexto de filtro equivalente, permitiendo que las medidas funcionen correctamente dentro de columnas calculadas o iteradores",
      "La migración de un modelo a otro workspace",
      "El cambio entre vista de datos y vista de modelo"
    ],
    correct: 1,
    explanation: "Context transition ocurre cuando CALCULATE (implícita o explícitamente) convierte el row context de un iterador o columna calculada en un filter context equivalente. Sin esto, una medida dentro de SUMX no sabría qué fila está evaluando. Es un concepto fundamental que explica por qué las medidas 'funcionan' dentro de iteradores."
  },
  {
    id: 249, domain: 3, difficulty: 2, subtopic: "DAX Advanced",
    question: "¿Qué hace la función FILTER en DAX y cuándo se usa con CALCULATE?",
    options: [
      "Elimina filas de una tabla permanentemente",
      "FILTER(tabla, condicion) devuelve una tabla filtrada. Se usa con CALCULATE cuando la condición de filtro involucra una medida o es compleja (no se puede expresar como un predicado simple)",
      "Aplica filtros a nivel de workspace",
      "Solo funciona con tablas de dimensión"
    ],
    correct: 1,
    explanation: "FILTER itera una tabla y devuelve las filas que cumplen la condición. Se usa con CALCULATE para filtros complejos: CALCULATE(SUM(Ventas[Importe]), FILTER(ALL(Producto), [MargenPct] > 0.3)) — filtra por una medida, algo que no se puede hacer con un predicado simple de CALCULATE."
  },
  {
    id: 250, domain: 3, difficulty: 2, subtopic: "DAX Time Intelligence",
    question: "¿Cómo se calcula la variación porcentual respecto al mismo mes del año anterior en DAX?",
    options: [
      "([Ventas] - [Ventas Año Anterior]) / [Ventas Año Anterior]",
      "VAR VentasActual = [Ventas] VAR VentasPY = CALCULATE([Ventas], SAMEPERIODLASTYEAR(Fecha[Date])) RETURN DIVIDE(VentasActual - VentasPY, VentasPY)",
      "PERCENTCHANGE([Ventas], -1, YEAR)",
      "YEAROVERCHANGE([Ventas])"
    ],
    correct: 1,
    explanation: "El patrón estándar de YoY%: (1) Calcular ventas actuales, (2) Calcular ventas del mismo periodo del año anterior con SAMEPERIODLASTYEAR o DATEADD(-1,YEAR), (3) Calcular el porcentaje con DIVIDE(actual - anterior, anterior). Usar DIVIDE evita error cuando VentasPY es 0."
  },
  {
    id: 251, domain: 3, difficulty: 3, subtopic: "DAX Time Intelligence",
    question: "¿Cuál es la diferencia entre DATEADD y PARALLELPERIOD en DAX?",
    options: [
      "Son exactamente iguales",
      "DATEADD desplaza las fechas del contexto actual; PARALLELPERIOD desplaza y expande al periodo completo (si el contexto es Marzo, PARALLELPERIOD(-1,YEAR) devuelve todo Marzo del año anterior)",
      "PARALLELPERIOD solo funciona con años",
      "DATEADD es más lenta que PARALLELPERIOD"
    ],
    correct: 1,
    explanation: "DATEADD(-1, MONTH, fechas) desplaza exactamente las fechas del contexto. PARALLELPERIOD(fechas, -1, MONTH) desplaza Y completa el periodo. Si el contexto filtra del 10 al 20 de marzo, DATEADD devuelve 10-20 febrero, pero PARALLELPERIOD devuelve todo febrero (1-28). PARALLELPERIOD es útil cuando quieres comparar periodos completos."
  },
  {
    id: 252, domain: 3, difficulty: 2, subtopic: "DAX Time Intelligence",
    question: "¿Qué función DAX calcula un acumulado del mes hasta la fecha (MTD)?",
    options: [
      "TOTALMTD(expresion, columna_fecha) o CALCULATE(medida, DATESMTD(columna_fecha))",
      "MONTHTODATE(expresion)",
      "SUM con filtro de mes actual",
      "RUNNINGTOTAL(expresion, MONTH)"
    ],
    correct: 0,
    explanation: "TOTALMTD es el atajo directo. Alternativamente, CALCULATE(medida, DATESMTD(Fecha[Date])) logra lo mismo con más flexibilidad. DATESMTD genera el rango de fechas desde el primer día del mes hasta la fecha actual del contexto. También existen TOTALQTD (trimestre) y TOTALYTD (año)."
  },
  // === Calculation Groups (253-260) ===
  {
    id: 253, domain: 3, difficulty: 2, subtopic: "Calculation Groups",
    question: "¿Cómo se crea un Calculation Group en un modelo semántico de Fabric?",
    options: [
      "Desde la interfaz visual de Power BI Desktop directamente",
      "Mediante herramientas externas como Tabular Editor, que se conecta al modelo semántico vía XMLA endpoint",
      "Con DAX Studio",
      "Con SQL en el Data Warehouse"
    ],
    correct: 1,
    explanation: "Los Calculation Groups se crean con herramientas externas como Tabular Editor (2 o 3), que se conecta al modelo semántico publicado via XMLA endpoint, o en modo local editando el archivo TMDL/BIM. Power BI Desktop no tiene interfaz visual nativa para crearlos, aunque sí los consume y muestra."
  },
  {
    id: 254, domain: 3, difficulty: 3, subtopic: "Calculation Groups",
    question: "¿Qué es SELECTEDMEASURE() dentro de un Calculation Item?",
    options: [
      "Una función que devuelve el nombre de la medida seleccionada",
      "Una función que hace referencia a la medida que el usuario ha colocado en el visual y sobre la cual se aplicará la transformación del Calculation Item",
      "Una función que selecciona la mejor medida automáticamente",
      "Un filtro que afecta a todas las medidas del modelo"
    ],
    correct: 1,
    explanation: "SELECTEDMEASURE() es la referencia dinámica a 'la medida actual' dentro de un Calculation Item. Si el usuario pone [Ventas] en un visual y selecciona el item 'YTD', la expresión CALCULATE(SELECTEDMEASURE(), DATESYTD(Fecha[Date])) evalúa CALCULATE([Ventas], DATESYTD(...)). Si cambia a [Costes], aplica lo mismo a [Costes]."
  },
  {
    id: 255, domain: 3, difficulty: 3, subtopic: "Calculation Groups",
    question: "¿Qué es el FormatString Expression en un Calculation Item?",
    options: [
      "Una función para convertir números a texto",
      "Una expresión opcional que cambia dinámicamente el formato de visualización de la medida según el Calculation Item seleccionado (ej: mostrar como % cuando es YoY%)",
      "El nombre del Calculation Item en la UI",
      "Una configuración de idioma regional"
    ],
    correct: 1,
    explanation: "FormatString Expression permite que el formato del valor cambie dinámicamente. Ejemplo: un item 'Actual' usa \"#,##0\" pero un item 'YoY Change %' usa \"0.0%;-0.0%\". Sin FormatString, el porcentaje se mostraría con el formato original de la medida (ej: como número absoluto). Se define en la propiedad FormatString del Calculation Item."
  },
  {
    id: 256, domain: 3, difficulty: 2, subtopic: "Calculation Groups",
    question: "¿Qué ventaja principal ofrecen los Calculation Groups sobre crear medidas individuales para cada variación temporal?",
    options: [
      "Son más rápidos de ejecutar",
      "Eliminan la explosión de medidas: en lugar de crear Ventas_YTD, Ventas_PY, Ventas_MTD, Costes_YTD, Costes_PY, Costes_MTD (6 medidas), un Calculation Group con 3 items (YTD, PY, MTD) se aplica a CUALQUIER medida",
      "Solo funcionan con modelos Direct Lake",
      "Permiten crear columnas calculadas dinámicas"
    ],
    correct: 1,
    explanation: "Sin Calculation Groups: N medidas × M variaciones = N×M medidas totales. Con Calculation Groups: N medidas + M items = N+M objetos. Para 20 medidas y 5 variaciones temporales: sin CG = 100 medidas; con CG = 20 medidas + 5 items = 25 objetos. La escalabilidad y mantenibilidad mejoran dramáticamente."
  },
  {
    id: 257, domain: 3, difficulty: 3, subtopic: "Calculation Groups",
    question: "¿Qué sucede cuando se aplican múltiples Calculation Groups simultáneamente a una medida?",
    options: [
      "Solo se aplica el primero y los demás se ignoran",
      "Se aplican en orden de precedencia (configurable). El item de mayor precedencia se aplica primero, y su resultado se pasa como SELECTEDMEASURE() al siguiente",
      "Se produce un error",
      "Se aplican todos en paralelo y se suman los resultados"
    ],
    correct: 1,
    explanation: "Cuando hay múltiples Calculation Groups, se aplican secuencialmente según la propiedad Precedence: el grupo con mayor precedencia se evalúa primero, y su resultado se pasa como SELECTEDMEASURE() al siguiente grupo. Ejemplo: Time Intelligence (precedence 10) calcula YTD, luego Currency Conversion (precedence 20) convierte la moneda del resultado YTD."
  },
  {
    id: 258, domain: 3, difficulty: 2, subtopic: "Calculation Groups",
    question: "¿Cómo se usa un Calculation Group en un informe de Power BI?",
    options: [
      "Se activa automáticamente en todas las visualizaciones",
      "El Calculation Group aparece como una tabla con una columna de items. Se coloca en un slicer, filtro, o eje del visual para que el usuario seleccione qué cálculo aplicar",
      "Se configura en las propiedades del dataset",
      "Solo funciona con tablas matrix, no con otros tipos de visual"
    ],
    correct: 1,
    explanation: "Un Calculation Group se consume como una dimensión: aparece en la lista de campos como una tabla con una columna (los items: YTD, PY, MTD, etc.). Se coloca en un slicer para que el usuario elija la transformación, o en el eje de un visual para comparar variaciones lado a lado."
  },
  // === Direct Lake advanced (259-266) ===
  {
    id: 259, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Qué guardrails (límites) aplica Direct Lake según el SKU de la Capacity?",
    options: [
      "Solo límite de almacenamiento total",
      "Máximo de filas por tabla, máximo de filas totales en el modelo, máximo de columnas, y tamaño máximo por grupo de filas (rowgroup). Exceder cualquiera causa fallback a DirectQuery",
      "Solo límite de número de tablas",
      "No hay guardrails, Direct Lake escala ilimitadamente"
    ],
    correct: 1,
    explanation: "Cada SKU (F2, F4, F8...F2048) tiene guardrails específicos para Direct Lake: max rows per table, max total model size, max parquet rowgroups, max columns. Ejemplo: F2 soporta ~300M filas; F64 soporta billones. Si se excede cualquier guardrail, el modelo hace fallback a DirectQuery con su impacto en rendimiento."
  },
  {
    id: 260, domain: 3, difficulty: 2, subtopic: "Storage Modes",
    question: "¿Cómo se puede forzar un nuevo framing en un modelo Direct Lake?",
    options: [
      "No es posible forzar framing, ocurre solo automáticamente",
      "Ejecutando una actualización (refresh) del modelo semántico desde el portal de Fabric o la API REST",
      "Reiniciando la Capacity de Fabric",
      "Eliminando y recreando el modelo"
    ],
    correct: 1,
    explanation: "Un refresh del modelo semántico Direct Lake desencadena un nuevo framing: el modelo toma un nuevo snapshot de los archivos Delta actuales. El framing también puede ocurrir automáticamente cuando Fabric detecta cambios en los archivos subyacentes. Se puede programar con triggers o ejecutar manualmente."
  },
  {
    id: 261, domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "¿Cuándo se recomienda usar Direct Lake vs Import en Fabric?",
    options: [
      "Siempre Direct Lake, nunca Import",
      "Direct Lake cuando los datos están en Delta/OneLake y quieres evitar programar refrescos; Import cuando necesitas calculated tables, transformaciones complejas en Power Query, o fuentes externas no compatibles",
      "Import siempre es mejor porque es más rápido",
      "Direct Lake para datos pequeños; Import para datos grandes"
    ],
    correct: 1,
    explanation: "Direct Lake es ideal cuando: (1) datos ya están en OneLake como Delta, (2) quieres datos siempre frescos sin programar refrescos, (3) el modelo no usa calculated tables ni ciertas funciones incompatibles. Import es mejor cuando: (1) necesitas calculated tables, (2) datos vienen de fuentes externas, (3) necesitas transformaciones Power Query complejas en el modelo."
  },
  {
    id: 262, domain: 3, difficulty: 2, subtopic: "Storage Modes",
    question: "¿Qué propiedad del modelo semántico Direct Lake controla si se permite el fallback a DirectQuery?",
    options: [
      "No hay propiedad, el fallback siempre ocurre",
      "La propiedad DirectLakeBehavior que puede ser: Automatic (fallback habilitado), DirectLakeOnly (sin fallback, falla si no puede servir), o DirectQueryOnly (forzar DQ)",
      "Una configuración en el portal del Lakehouse",
      "Un tenant setting del Admin Portal"
    ],
    correct: 1,
    explanation: "DirectLakeBehavior controla el comportamiento: Automatic (default) permite fallback transparente a DirectQuery. DirectLakeOnly desactiva el fallback — si el modelo no puede servir desde caché, la query falla en lugar de degradarse a DQ. DirectQueryOnly fuerza siempre DirectQuery. Se configura vía XMLA/TMDL."
  },
  // === Composite Models (263-270) ===
  {
    id: 263, domain: 3, difficulty: 2, subtopic: "Composite Models",
    question: "¿Qué es un modelo semántico compuesto (Composite Model)?",
    options: [
      "Un modelo con más de 10 tablas",
      "Un modelo que combina tablas en diferentes modos de almacenamiento (Import, DirectQuery, Direct Lake, Dual) en el mismo modelo",
      "Un modelo compartido entre varios workspaces",
      "Un modelo con múltiples fuentes de datos del mismo tipo"
    ],
    correct: 1,
    explanation: "Un Composite Model permite mezclar modos de almacenamiento en el mismo modelo: dimensiones en Import (rendimiento máximo), tabla de hechos grande en DirectQuery (datos en tiempo real, sin límite de tamaño), y potencialmente otras tablas en Direct Lake. Tablas Dual se almacenan en Import pero pueden actuar como DirectQuery según el contexto."
  },
  {
    id: 264, domain: 3, difficulty: 3, subtopic: "Composite Models",
    question: "¿Qué es 'DirectQuery over Semantic Models' (chained models)?",
    options: [
      "Ejecutar SQL directamente contra un modelo semántico",
      "Un modelo semántico que se conecta en DirectQuery a OTRO modelo semántico publicado, permitiendo extenderlo con tablas, medidas y relaciones adicionales sin duplicar datos",
      "Una conexión directa entre dos Warehouses",
      "Un modelo que usa exclusivamente DirectQuery"
    ],
    correct: 1,
    explanation: "DirectQuery over Semantic Models (chained/composite models) permite crear un modelo que se conecta a otro modelo semántico existente vía DirectQuery y lo extiende: añade nuevas tablas (de cualquier fuente), nuevas medidas, nuevas relaciones. El modelo base no se modifica ni duplica. Ideal para escenarios departamentales que extienden un modelo corporativo."
  },
  {
    id: 265, domain: 3, difficulty: 2, subtopic: "Composite Models",
    question: "¿Cuándo conviene usar tablas en modo 'Dual' dentro de un Composite Model?",
    options: [
      "Nunca, Dual es un modo legacy",
      "Para dimensiones que necesitan rendir bien tanto cuando se consultan solas (Import) como cuando se cruzan con tablas DirectQuery (actúan como DQ para el join)",
      "Solo para tablas temporales",
      "Solo cuando hay menos de 100 filas"
    ],
    correct: 1,
    explanation: "Tablas Dual almacenan datos en Import Y pueden actuar como DirectQuery según la necesidad. Si una query solo involucra tablas Import/Dual, usa la caché Import (rápido). Si involucra un join con una tabla DirectQuery, la tabla Dual actúa como DirectQuery para que el join se ejecute en el origen. Son ideales para dimensiones en Composite Models."
  },
  {
    id: 266, domain: 3, difficulty: 3, subtopic: "Composite Models",
    question: "¿Qué limitación tienen los modelos que usan DirectQuery over Semantic Models (chained models)?",
    options: [
      "No pueden tener medidas DAX",
      "No soportan RLS en el modelo encadenado (el RLS del modelo base sigue aplicándose), y el rendimiento depende del modelo base",
      "Solo soportan 5 tablas adicionales",
      "No pueden conectarse a fuentes externas"
    ],
    correct: 1,
    explanation: "Limitaciones clave de chained models: (1) RLS definido en el modelo encadenado NO se propaga al modelo base — se debe confiar en el RLS del modelo base. (2) Rendimiento depende de ambos modelos. (3) Ciertas funciones DAX que requieren acceso a datos granulares pueden no funcionar en tablas DQ. (4) El modelo base debe tener permisos Read y Build."
  },
  // === Performance optimization (267-276) ===
  {
    id: 267, domain: 3, difficulty: 2, subtopic: "Performance Optimization",
    question: "¿Cuál es la técnica más efectiva para reducir el tamaño de un modelo semántico Import?",
    options: [
      "Añadir más índices",
      "Reducir la cardinalidad de columnas: eliminar columnas innecesarias, reducir precisión de decimales, y evitar columnas de texto de alta cardinalidad",
      "Aumentar la memoria de la Capacity",
      "Usar más columnas calculadas"
    ],
    correct: 1,
    explanation: "La cardinalidad (número de valores distintos) es el factor principal del tamaño en VertiPaq. Reducirla: (1) Eliminar columnas no usadas en reports (IDs técnicos, descripciones largas), (2) Redondear decimales, (3) Separar fecha y hora en columnas distintas, (4) Reemplazar columnas de texto de alta cardinalidad por claves numéricas con dimensiones."
  },
  {
    id: 268, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Qué herramienta muestra el desglose de tiempo de una query DAX entre Formula Engine y Storage Engine?",
    options: [
      "Power Query Editor",
      "DAX Studio con Server Timings: muestra el tiempo en Formula Engine (FE — cálculos DAX) y Storage Engine (SE — lectura de datos de VertiPaq/DQ)",
      "Performance Analyzer de Power BI (solo tiempo total)",
      "SQL Profiler"
    ],
    correct: 1,
    explanation: "DAX Studio Server Timings descompone cada query en: Formula Engine time (procesamiento DAX en CPU) y Storage Engine time (lectura de datos de VertiPaq o envío de queries DirectQuery). El objetivo es minimizar FE (simplificar DAX) y SE (reducir datos escaneados). Un ratio FE alto indica DAX ineficiente."
  },
  {
    id: 269, domain: 3, difficulty: 2, subtopic: "Performance Optimization",
    question: "¿Qué muestra el Performance Analyzer de Power BI Desktop?",
    options: [
      "Solo el tiempo de carga de la página completa",
      "El desglose de tiempo por cada visual: query DAX generada, tiempo de evaluación DAX, tiempo de renderizado visual, y la query DAX completa que se puede copiar",
      "Solo errores de consulta",
      "Estadísticas de almacenamiento del modelo"
    ],
    correct: 1,
    explanation: "Performance Analyzer descompone cada visual en: (1) DAX Query — la query completa generada (copiable para pegar en DAX Studio), (2) Tiempo de evaluación DAX en el motor, (3) Tiempo de renderizado del visual en la UI. Permite identificar qué visuals son lentos y si el cuello de botella es DAX o rendering."
  },
  {
    id: 270, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Qué es el Best Practices Analyzer (BPA) y cómo se usa?",
    options: [
      "Un análisis automático de seguridad del modelo",
      "Un conjunto de reglas en Tabular Editor que analiza el modelo semántico y detecta anti-patrones: columnas no usadas, relaciones bidireccionales, medidas ineficientes, y más",
      "Un wizard de Power BI Desktop para crear star schemas",
      "Un test automatizado de informes"
    ],
    correct: 1,
    explanation: "BPA es un feature de Tabular Editor que aplica reglas configurables sobre el modelo: detecta columnas sin referencias, relaciones bidireccionales innecesarias, medidas sin carpeta, tablas sin relaciones, columnas calculadas que deberían ser medidas, formatos inconsistentes, etc. Se puede ejecutar vía XMLA endpoint sobre modelos publicados."
  },
  {
    id: 271, domain: 3, difficulty: 2, subtopic: "Performance Optimization",
    question: "¿Por qué se recomienda separar columnas de fecha y hora en dos columnas distintas?",
    options: [
      "Por estética en la interfaz",
      "Porque las columnas DateTime tienen cardinalidad altísima (una por cada segundo) lo cual consume mucha memoria en VertiPaq. Separar en Date (baja cardinalidad) y Time reduce significativamente el tamaño",
      "Porque las funciones de Time Intelligence no funcionan con DateTime",
      "Porque Power BI no soporta el tipo DateTime"
    ],
    correct: 1,
    explanation: "Una columna DateTime con precisión de segundo puede tener 86.400 valores únicos por día × 365 días = 31.5M valores. Separar en Date (365 valores/año) y Time (86.400 valores, compartidos entre todos los días) reduce la cardinalidad total dramáticamente. VertiPaq comprime mejor columnas de baja cardinalidad."
  },
  {
    id: 272, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Qué muestra el VertiPaq Analyzer en DAX Studio?",
    options: [
      "Las queries más lentas ejecutadas en el modelo",
      "El tamaño detallado del modelo: MB por tabla, MB por columna, cardinalidad, encoding type (hash/value/run-length), y relaciones — permite identificar qué columnas consumen más memoria",
      "Los errores de las últimas 24 horas",
      "La configuración de seguridad del modelo"
    ],
    correct: 1,
    explanation: "VertiPaq Analyzer muestra la anatomía del modelo en memoria: tamaño total, tamaño por tabla y por columna (datos + diccionario + jerarquías), cardinalidad exacta de cada columna, tipo de encoding usado, y un % del total. Esto permite identificar las columnas 'pesadas' que son candidatas a optimización (eliminar, reducir cardinalidad, cambiar tipo)."
  },
  {
    id: 273, domain: 3, difficulty: 2, subtopic: "Performance Optimization",
    question: "¿Cuál es la mejor práctica para relaciones bidireccionales en un modelo semántico?",
    options: [
      "Usar bidireccional en todas las relaciones para máxima flexibilidad",
      "Evitar relaciones bidireccionales salvo que sean estrictamente necesarias; usar CROSSFILTER() en medidas DAX específicas cuando se necesite filtrado bidireccional puntual",
      "Las relaciones bidireccionales no existen en Fabric",
      "Solo usar bidireccional con tablas de menos de 1000 filas"
    ],
    correct: 1,
    explanation: "Relaciones bidireccionales causan: (1) Ambigüedad en caminos de filtro (múltiples rutas entre tablas), (2) Menor rendimiento por evaluación de más filtros, (3) Resultados inesperados en medidas. La alternativa: usar relaciones unidireccionales por defecto y CROSSFILTER(tabla1[col], tabla2[col], BOTH) dentro de CALCULATE solo cuando sea necesario."
  },
  // === Large semantic models y XMLA (274-279) ===
  {
    id: 274, domain: 3, difficulty: 2, subtopic: "XMLA/Tabular Model",
    question: "¿Qué es el XMLA endpoint y qué operaciones permite?",
    options: [
      "Un endpoint para exportar datos como XML",
      "Un protocolo que permite a herramientas externas (Tabular Editor, SSMS, ALM Toolkit) conectarse al modelo semántico para leer metadata (XMLA read) o modificar el modelo (XMLA read/write)",
      "Un endpoint de API REST para datos",
      "Un conector de Power Query"
    ],
    correct: 1,
    explanation: "XMLA endpoint expone el modelo semántico usando el protocolo Analysis Services. Modo lectura: permite conectar herramientas de análisis (DAX Studio, SSMS). Modo lectura/escritura (requiere Premium/Fabric): permite modificar el modelo programáticamente — crear particiones, medidas, calculation groups, ejecutar refrescos, etc."
  },
  {
    id: 275, domain: 3, difficulty: 3, subtopic: "XMLA/Tabular Model",
    question: "¿Qué es TMDL (Tabular Model Definition Language) y cómo se relaciona con Git?",
    options: [
      "Un lenguaje de consultas alternativo a DAX",
      "Un formato de texto legible para definir modelos semánticos, que descompone el modelo en archivos .tmdl separados por tabla/medida, facilitando diffs y merge en Git",
      "Una extensión de T-SQL para modelos tabulares",
      "El formato binario interno de VertiPaq"
    ],
    correct: 1,
    explanation: "TMDL es el nuevo formato de serialización de modelos semánticos: descompone el modelo en múltiples archivos de texto (uno por tabla, uno por medida, etc.) con sintaxis legible. Esto facilita enormemente el control de versiones en Git: diffs significativos, merge sin conflictos, code review de cambios de modelo. Reemplaza al formato BIM (un solo JSON)."
  },
  {
    id: 276, domain: 3, difficulty: 3, subtopic: "XMLA/Tabular Model",
    question: "¿Qué permite hacer el ALM Toolkit en el contexto de modelos semánticos?",
    options: [
      "Solo visualizar modelos",
      "Comparar dos modelos semánticos (dev vs prod), ver las diferencias (nuevas medidas, tablas modificadas, relaciones cambiadas), y sincronizar cambios selectivamente",
      "Crear modelos desde cero",
      "Ejecutar queries DAX"
    ],
    correct: 1,
    explanation: "ALM Toolkit compara schema de dos modelos semánticos (origen y destino) conectándose vía XMLA. Muestra diferencias: objetos nuevos, modificados o eliminados. Permite sincronizar selectivamente: elegir qué cambios aplicar al destino. Es esencial para promover cambios de modelos entre entornos cuando Deployment Pipelines no son suficientes."
  },
  // === Field parameters (277-280) ===
  {
    id: 277, domain: 3, difficulty: 2, subtopic: "DAX Advanced",
    question: "¿Qué son los Field Parameters en Power BI?",
    options: [
      "Parámetros de conexión a la fuente de datos",
      "Tablas DAX especiales que permiten a los usuarios cambiar dinámicamente qué campo (columna o medida) se muestra en un visual, usando un slicer",
      "Variables globales del modelo",
      "Filtros predefinidos por el administrador"
    ],
    correct: 1,
    explanation: "Los Field Parameters crean una tabla DAX que lista campos (columnas y/o medidas). Al colocar el Field Parameter en un visual y un slicer, el usuario puede cambiar dinámicamente qué se muestra: cambiar el eje de una gráfica entre Producto, Región y Categoría, o cambiar la medida entre Ventas, Costes y Margen, todo con un slicer."
  },
  {
    id: 278, domain: 3, difficulty: 3, subtopic: "DAX Advanced",
    question: "¿Cómo se crea un Field Parameter que permita alternar entre diferentes medidas?",
    options: [
      "Con una tabla calculada estándar",
      "Desde Power BI Desktop: Modeling → New parameter → Fields, seleccionando las medidas a incluir. Esto genera una tabla DAX con NAMEOF() que mapea cada medida",
      "Desde el portal de Fabric",
      "Con un Calculation Group"
    ],
    correct: 1,
    explanation: "En Power BI Desktop: Modeling → New parameter → Fields. Se seleccionan las medidas (ej: Ventas, Costes, Margen). Esto genera una tabla DAX con la función NAMEOF() que referencia cada medida. La tabla aparece como un slicer y al seleccionar un valor, el visual muestra la medida correspondiente."
  },
  // === Incremental Refresh avanzado (279-284) ===
  {
    id: 279, domain: 3, difficulty: 2, subtopic: "Performance Optimization",
    question: "¿Cómo funciona Incremental Refresh con particiones en un modelo semántico?",
    options: [
      "Carga toda la tabla en cada refresco",
      "Fabric divide automáticamente la tabla en particiones temporales (día/mes/trimestre). Solo las particiones dentro del rango incremental se refrescan; las históricas se mantienen en caché",
      "El usuario crea las particiones manualmente",
      "Solo funciona con tablas Delta"
    ],
    correct: 1,
    explanation: "Al configurar Incremental Refresh, Fabric crea particiones automáticas basadas en la columna de fecha. Las particiones históricas (ej: meses anteriores) se polarizan y no se refrescan. Solo las particiones del rango incremental (ej: últimos 7 días) se refrescan. Esto reduce drásticamente el tiempo y los datos procesados."
  },
  {
    id: 280, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Qué es 'detect data changes' en Incremental Refresh?",
    options: [
      "Detectar cambios de schema en la tabla",
      "Una configuración que permite refrescar particiones históricas solo si se detectan cambios, usando una columna de última modificación (LastModifiedDate)",
      "Un escaneo de malware en los datos",
      "Una comparación automática entre versiones del modelo"
    ],
    correct: 1,
    explanation: "Detect data changes permite que particiones históricas (normalmente no refrescadas) se actualicen si una columna de tracking (ej: LastModifiedDate) indica cambios. Sin esta opción, solo se refrescan las particiones del rango incremental. Con esta opción, las correcciones de datos históricos se propagan al modelo."
  },
  // === Star Schema avanzado (281-286) ===
  {
    id: 281, domain: 3, difficulty: 2, subtopic: "Star Schema",
    question: "¿Qué es una tabla bridge (puente) y cuándo se usa en un star schema?",
    options: [
      "Una tabla que conecta la base de datos con el modelo",
      "Una tabla intermedia que resuelve relaciones many-to-many entre dos tablas, conteniendo las claves de ambas",
      "Una tabla temporal de staging",
      "Una tabla de auditoría de cambios"
    ],
    correct: 1,
    explanation: "Una bridge table resuelve relaciones M:N. Ejemplo: un estudiante tiene muchos cursos y un curso tiene muchos estudiantes. La bridge table tiene StudentID + CourseID (una fila por combinación). Esto permite modelar la relación como dos relaciones 1:N (Estudiante→Bridge←Curso) evitando la relación M:N directa."
  },
  {
    id: 282, domain: 3, difficulty: 3, subtopic: "Star Schema",
    question: "¿Por qué se recomienda desnormalizar las dimensiones en un star schema para Power BI?",
    options: [
      "Porque Power BI no soporta tablas normalizadas",
      "Porque VertiPaq comprime columnas repetitivas eficientemente, y menos tablas = menos relaciones = menos joins = mejor rendimiento y usabilidad",
      "Porque los datos ocupan menos espacio desnormalizados",
      "Porque es más fácil de crear"
    ],
    correct: 1,
    explanation: "En un star schema, las dimensiones se desnormalizan (ej: País, Región, Ciudad en la misma tabla en lugar de 3 tablas separadas). VertiPaq comprime valores repetidos eficientemente con dictionary encoding. Menos tablas significa: menos relaciones que navegar, menos joins, mejor rendimiento, y una experiencia de usuario más simple."
  },
  {
    id: 283, domain: 3, difficulty: 1, subtopic: "Star Schema",
    question: "¿Qué columnas debe tener una tabla de hechos en un star schema?",
    options: [
      "Solo atributos descriptivos como nombres y categorías",
      "Claves foráneas (FK) a las dimensiones y métricas numéricas medibles (cantidad, importe, coste, etc.)",
      "Solo la clave primaria y un timestamp",
      "Solo medidas DAX"
    ],
    correct: 1,
    explanation: "Una tabla de hechos contiene: (1) Claves foráneas que conectan con cada dimensión (DimFechaKey, DimProductoKey, DimClienteKey), (2) Métricas numéricas que se agregan (Cantidad, Importe, Descuento, Coste). No debe contener atributos descriptivos — esos van en las dimensiones."
  },
  {
    id: 284, domain: 3, difficulty: 2, subtopic: "Star Schema",
    question: "¿Qué es una 'role-playing dimension' y cómo se maneja en Power BI?",
    options: [
      "Una dimensión que cambia de estructura según el usuario",
      "Cuando la misma dimensión (ej: Fecha) se usa en múltiples roles (FechaPedido, FechaEnvío, FechaPago). Se crea una sola tabla física con relaciones activas e inactivas, usando USERELATIONSHIP para las inactivas",
      "Una dimensión que solo funciona con ciertos roles de seguridad",
      "Una dimensión temporal que se crea y destruye dinámicamente"
    ],
    correct: 1,
    explanation: "Una role-playing dimension es una tabla (típicamente Fecha) que se relaciona con la tabla de hechos por múltiples columnas. En Power BI: crear una sola tabla DimFecha, crear múltiples relaciones (solo una activa), y usar USERELATIONSHIP() en medidas para activar la relación inactiva apropiada."
  },
  // === Storage Modes y modelos avanzados (285-290) ===
  {
    id: 285, domain: 3, difficulty: 2, subtopic: "Storage Modes",
    question: "¿Qué limitación tiene DirectQuery que Import no tiene?",
    options: [
      "DirectQuery no soporta DAX",
      "DirectQuery envía queries al origen en cada interacción, resultando en mayor latencia y menor rendimiento; también tiene limitaciones en funciones DAX disponibles y no soporta todas las transformaciones Power Query",
      "DirectQuery no soporta relaciones",
      "DirectQuery no puede usar slicers"
    ],
    correct: 1,
    explanation: "DirectQuery envía queries SQL al origen por cada interacción del usuario, causando latencia. Limitaciones: algunas funciones DAX no están disponibles, Power Query tiene restricciones (folding obligatorio), el rendimiento depende del origen, hay límite de 1M filas por query, y las transformaciones complejas degradan rendimiento."
  },
  {
    id: 286, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Qué son las 'aggregations' (tablas de agregación) en un modelo semántico?",
    options: [
      "Las funciones SUM y COUNT de DAX",
      "Tablas Import pre-agregadas que aceleran queries sobre tablas DirectQuery grandes: cuando una query puede responderse con la agregación, se usa Import; si no, se consulta DirectQuery",
      "Vistas materializadas en el Warehouse",
      "Resúmenes automáticos de Power BI"
    ],
    correct: 1,
    explanation: "Las aggregations son tablas Import ocultas que contienen datos pre-agregados de tablas DirectQuery. Ejemplo: una tabla DQ tiene 100M filas de ventas diarias; la aggregation tiene ventas mensuales por producto (10K filas). Queries que piden 'ventas por mes y producto' usan la aggregation (rápido); queries que necesitan detalle diario van a DirectQuery."
  },
  // === Últimas preguntas de D3 (287-300) ===
  {
    id: 287, domain: 3, difficulty: 1, subtopic: "DAX Core",
    question: "¿Cuál es la diferencia entre BLANK() y 0 en DAX?",
    options: [
      "Son exactamente lo mismo",
      "BLANK() representa 'sin valor' (equivalente a NULL en SQL). En operaciones aritméticas, BLANK se trata como 0, pero en filtros y comparaciones se comporta diferente (BLANK no aparece en slicers por defecto)",
      "BLANK() es un error",
      "0 no es un valor válido en DAX"
    ],
    correct: 1,
    explanation: "BLANK() es el valor 'ausente' en DAX (como NULL en SQL). BLANK + 5 = 5 (se trata como 0 aritméticamente), pero IF(ISBLANK(x), 'vacío', 'tiene valor') distingue entre BLANK y 0 real. En slicers, los BLANKs aparecen como '(Blank)'. DIVIDE(x, 0) devuelve BLANK (no error). Es importante para manejar datos incompletos."
  },
  {
    id: 288, domain: 3, difficulty: 2, subtopic: "DAX Core",
    question: "¿Qué función DAX permite crear una tabla virtual en memoria dentro de una medida?",
    options: [
      "CREATE TABLE",
      "SUMMARIZE, ADDCOLUMNS, SELECTCOLUMNS, DATATABLE — funciones que generan tablas que se pueden usar dentro de CALCULATE, FILTER, etc.",
      "VIRTUAL_TABLE()",
      "TEMP_TABLE()"
    ],
    correct: 1,
    explanation: "DAX tiene varias funciones de creación de tablas virtuales: SUMMARIZE (agrupa y opcionalmente agrega), ADDCOLUMNS (añade columnas calculadas a una tabla), SELECTCOLUMNS (selecciona/renombra columnas), DATATABLE (crea una tabla literal), UNION/INTERSECT/EXCEPT (operaciones de conjuntos). Todas generan tablas en memoria para uso dentro de la expresión."
  },
  {
    id: 289, domain: 3, difficulty: 3, subtopic: "XMLA/Tabular Model",
    question: "¿Cómo se crean particiones manuales en un modelo semántico para controlar el refresco granular?",
    options: [
      "Desde la interfaz de Power BI Desktop",
      "Usando TMSL scripts o Tabular Editor vía XMLA endpoint para dividir una tabla en particiones con queries parametrizadas por rango de fechas",
      "Con Power Query en el modelo",
      "Con DAX en una columna calculada"
    ],
    correct: 1,
    explanation: "Las particiones manuales se crean vía XMLA endpoint: con TMSL (JSON) o Tabular Editor. Cada partición tiene su propia query M que filtra un rango de datos. Esto permite refrescar solo particiones específicas: TMSL refreshPartition solo refresca las particiones indicadas, ideal para tablas muy grandes donde Incremental Refresh estándar no es suficiente."
  },
  {
    id: 290, domain: 3, difficulty: 2, subtopic: "Composite Models",
    question: "¿Qué es una 'Hybrid Table' en un modelo semántico?",
    options: [
      "Una tabla que almacena datos en dos formatos diferentes",
      "Una tabla que combina particiones Import (históricas) con una partición DirectQuery (datos recientes en tiempo real) usando Incremental Refresh avanzado",
      "Una tabla compartida entre dos modelos",
      "Una tabla que usa V-Order y Z-Order simultáneamente"
    ],
    correct: 1,
    explanation: "Las Hybrid Tables combinan Incremental Refresh con DirectQuery: las particiones históricas se mantienen en Import (rendimiento) y la partición más reciente usa DirectQuery (datos en tiempo real). Esto ofrece lo mejor de ambos mundos: rendimiento Import para historial + frescura DirectQuery para datos actuales."
  },
  {
    id: 291, domain: 3, difficulty: 1, subtopic: "DAX Core",
    question: "¿Cuál es la función DAX correcta para dividir de forma segura (sin error por división entre 0)?",
    options: [
      "a / b",
      "DIVIDE(a, b) — devuelve BLANK si b es 0 o BLANK, evitando errores",
      "SAFEDIVIDE(a, b)",
      "IF(b <> 0, a/b, 0)"
    ],
    correct: 1,
    explanation: "DIVIDE(numerador, denominador [, alternativo]) es la función recomendada para divisiones en DAX. Si el denominador es 0 o BLANK, devuelve BLANK (o el valor alternativo si se especifica). Es más limpia y eficiente que usar IF para verificar antes de dividir."
  },
  {
    id: 292, domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Qué son las 'Storage Engine queries' y por qué se prefieren sobre 'Formula Engine queries' para rendimiento?",
    options: [
      "Storage Engine es para datos; Formula Engine es para fórmulas",
      "Storage Engine (SE) lee datos de VertiPaq usando operaciones vectorizadas paralelas (rápido). Formula Engine (FE) procesa lógica DAX compleja fila a fila en un solo hilo (más lento). Minimizar FE mejora rendimiento",
      "Son equivalentes en velocidad",
      "Formula Engine es siempre más rápido"
    ],
    correct: 1,
    explanation: "SE (Storage Engine): opera sobre el almacenamiento columnar de VertiPaq, altamente optimizado, ejecuta scans y aggregations en paralelo, muy rápido. FE (Formula Engine): procesa lógica DAX compleja, single-threaded, más lento. El objetivo al optimizar DAX es que el máximo trabajo lo haga el SE (con queries simples) y minimizar el trabajo del FE."
  },
  {
    id: 293, domain: 3, difficulty: 2, subtopic: "DAX Core",
    question: "¿Qué diferencia hay entre ALL() y REMOVEFILTERS() en DAX?",
    options: [
      "Son completamente diferentes en funcionalidad",
      "Cuando se usan como modificador de filtro en CALCULATE, son equivalentes: ambos eliminan filtros. Pero ALL() también puede usarse como función de tabla (devuelve todas las filas), mientras REMOVEFILTERS() solo funciona como modificador de filtro",
      "ALL es más rápida que REMOVEFILTERS",
      "REMOVEFILTERS elimina más filtros que ALL"
    ],
    correct: 1,
    explanation: "Dentro de CALCULATE, ALL(tabla/columna) y REMOVEFILTERS(tabla/columna) son funcionalmente idénticos: eliminan filtros del contexto. La diferencia: ALL() tiene un doble uso — también funciona como función de tabla (SELECT * sin filtros). REMOVEFILTERS() es más explícito y legible porque solo hace una cosa: quitar filtros. Microsoft recomienda REMOVEFILTERS por claridad."
  },
  {
    id: 294, domain: 3, difficulty: 3, subtopic: "DAX Advanced",
    question: "¿Cómo se calcula un 'Moving Average' de 3 meses en DAX?",
    options: [
      "AVERAGE de los últimos 3 valores",
      "AVERAGEX(DATESINPERIOD(Fecha[Date], MAX(Fecha[Date]), -3, MONTH), [Ventas]) — itera los últimos 3 meses y calcula la media de la medida Ventas",
      "MOVINGAVG([Ventas], 3)",
      "SUM([Ventas]) / 3"
    ],
    correct: 1,
    explanation: "El patrón Moving Average: AVERAGEX(ventana_temporal, medida). DATESINPERIOD genera el rango de fechas (últimos 3 meses desde la fecha actual del contexto). AVERAGEX itera cada fecha del rango, evalúa [Ventas] en ese contexto, y calcula la media. Esto suaviza fluctuaciones y muestra tendencias."
  },
  {
    id: 295, domain: 3, difficulty: 1, subtopic: "Star Schema",
    question: "¿Qué es una 'Slowly Changing Dimension' (SCD) Type 1 en el contexto de modelado?",
    options: [
      "Una dimensión que nunca cambia",
      "Una dimensión que sobrescribe los valores antiguos con los nuevos — sin mantener historial de cambios",
      "Una dimensión con una columna de fecha de modificación",
      "Una dimensión que solo acepta inserciones, nunca actualizaciones"
    ],
    correct: 1,
    explanation: "SCD Type 1 sobrescribe el valor anterior: si un cliente cambia de ciudad, se actualiza directamente en la tabla de dimensión. No se mantiene historial — las consultas siempre muestran el valor actual. Es el tipo más simple y adecuado cuando el historial de cambios no es relevante para el análisis."
  },
  {
    id: 296, domain: 3, difficulty: 2, subtopic: "XMLA/Tabular Model",
    question: "¿Qué es TMSL (Tabular Model Scripting Language)?",
    options: [
      "Un lenguaje de consultas similar a SQL",
      "Un lenguaje de scripts basado en JSON que permite enviar comandos al motor Analysis Services: crear/alterar/eliminar objetos, refrescar particiones, y gestionar modelos programáticamente via XMLA",
      "Un lenguaje de programación para visualizaciones",
      "Una extensión de DAX para scripting"
    ],
    correct: 1,
    explanation: "TMSL usa comandos JSON enviados via XMLA endpoint: createOrReplace (crear/actualizar objetos), refresh (refrescar tablas/particiones), alter (modificar propiedades), delete (eliminar objetos). Ejemplo: un script TMSL puede refrescar solo las particiones del último mes de una tabla, o crear una nueva medida. Se puede automatizar con PowerShell o REST API."
  },
  {
    id: 297, domain: 3, difficulty: 3, subtopic: "Composite Models",
    question: "¿Qué consideración de seguridad aplica cuando un modelo usa DirectQuery a una fuente SQL?",
    options: [
      "La seguridad solo se aplica en el modelo semántico",
      "Las queries DirectQuery se ejecutan con las credenciales configuradas en la conexión (fixed credentials o SSO). Con SSO, el RLS del origen SQL se aplica además del RLS del modelo",
      "No hay consideraciones especiales de seguridad",
      "DirectQuery siempre usa las credenciales del usuario actual"
    ],
    correct: 1,
    explanation: "Con DirectQuery, las credenciales de la conexión determinan qué datos son accesibles: Fixed credentials (una cuenta para todos — el RLS debe configurarse en el modelo) o SSO (Single Sign-On — las queries se ejecutan con la identidad del usuario, y el RLS del origen SQL también aplica). SSO proporciona doble capa de seguridad."
  },
  {
    id: 298, domain: 3, difficulty: 2, subtopic: "Performance Optimization",
    question: "¿Qué técnica reduce el tiempo de refresco de un modelo semántico Import grande?",
    options: [
      "Añadir más medidas al modelo",
      "Configurar Incremental Refresh para refrescar solo datos nuevos/modificados, eliminando la necesidad de recargar toda la tabla en cada refresco",
      "Cambiar todas las tablas a DirectQuery",
      "Aumentar la complejidad de las transformaciones Power Query"
    ],
    correct: 1,
    explanation: "Incremental Refresh es la técnica principal: divide la tabla en particiones temporales y solo refresca las que contienen datos nuevos o modificados. Otras técnicas: (1) Optimizar las queries Power Query (query folding), (2) Reducir columnas innecesarias en origen, (3) Usar Enhanced Refresh API para refrescar particiones específicas."
  },
  {
    id: 299, domain: 3, difficulty: 1, subtopic: "Storage Modes",
    question: "¿Qué modo de almacenamiento es el predeterminado al crear un modelo semántico en Power BI Desktop?",
    options: [
      "DirectQuery",
      "Import — los datos se cargan en memoria al refrescar",
      "Direct Lake",
      "Dual"
    ],
    correct: 1,
    explanation: "Import es el modo predeterminado en Power BI Desktop: al conectar una fuente y cargar datos, se copian en la caché VertiPaq del archivo .pbix. Para usar DirectQuery hay que seleccionarlo explícitamente al configurar la conexión. Direct Lake solo está disponible en modelos creados directamente en Fabric (no en Desktop)."
  },
  {
    id: 300, domain: 3, difficulty: 3, subtopic: "Calculation Groups",
    question: "¿Cómo se implementa un Calculation Item que muestre el valor acumulado del año (YTD) dinámicamente para cualquier medida?",
    options: [
      "Creando una medida TOTALYTD para cada medida del modelo",
      "En el Calculation Item, definir la expresión: CALCULATE(SELECTEDMEASURE(), DATESYTD(DimDate[Date])). SELECTEDMEASURE() referencia dinámicamente la medida en uso",
      "Con un filtro de página en Power BI",
      "Con una columna calculada de tipo running total"
    ],
    correct: 1,
    explanation: "El Calculation Item 'YTD' tiene la expresión: CALCULATE(SELECTEDMEASURE(), DATESYTD(DimDate[Date])). Cuando el usuario selecciona 'YTD' en el slicer del Calculation Group, SELECTEDMEASURE() se reemplaza dinámicamente por la medida del visual ([Ventas], [Costes], [Margen]...). Un solo item sirve para TODAS las medidas."
  }
];


// Combine all questions
const ALL_QUESTIONS = [
  ...QUESTIONS_DOMAIN_1, ...QUESTIONS_DOMAIN_2, ...QUESTIONS_DOMAIN_3,
  ...QUESTIONS_TSQL_HARD, ...QUESTIONS_DIRECT_LAKE_HARD,
  ...NEW_QUESTIONS_D1, ...NEW_QUESTIONS_D1_PART2,
  ...NEW_QUESTIONS_D2, ...NEW_QUESTIONS_D3
];

const DOMAIN_NAMES = {
  1: "Preparar Datos",
  2: "Mantener Solución de Análisis",
  3: "Implementar y Gestionar Modelos Semánticos"
};

const DOMAIN_WEIGHTS = {
  1: "45-50%",
  2: "25-30%",
  3: "25-30%"
};

// Advanced exam question types (Prompt 2)
const MULTI_QUESTIONS = [
  {
    id: "M1", type: "multi", domain: 1, difficulty: 3, subtopic: "Delta Lake",
    question: "Selecciona TODAS las afirmaciones correctas sobre Delta Lake en Fabric (elige 3):",
    options: [
      "Soporta transacciones ACID",
      "Usa Avro como formato de datos principal",
      "Permite Time Travel",
      "No admite UPDATE/DELETE",
      "Mantiene transaction log en _delta_log",
      "Solo funciona desde PySpark"
    ],
    correct: [0, 2, 4],
    requiredSelections: 3,
    explanation: "Delta Lake soporta ACID, time travel y transaction log. El formato base es Parquet (no Avro) y puede consultarse desde múltiples motores."
  },
  {
    id: "M2", type: "multi", domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "¿Qué capacidades son propias de Pipelines en Fabric? (elige 3)",
    options: [
      "Orquestar actividades con dependencias",
      "Ejecutar Dataflow y Notebooks",
      "Definir reintentos y timeout",
      "Crear medidas DAX",
      "Aplicar RLS en modelos semánticos",
      "Usar triggers programados"
    ],
    correct: [0, 1, 5],
    requiredSelections: 3,
    explanation: "Pipelines se enfocan en orquestación/automatización con actividades y triggers; DAX y RLS no pertenecen a esta capa."
  },
  {
    id: "M3", type: "multi", domain: 2, difficulty: 2, subtopic: "Governance",
    question: "Selecciona opciones correctas sobre governance en Fabric (elige 3):",
    options: [
      "Endorsement puede ser Promoted o Certified",
      "Sensitivity labels clasifican contenido",
      "Data lineage ayuda a analizar impacto",
      "RLS reemplaza completamente a permissions",
      "Solo Admin puede ver Monitoring Hub",
      "Purview no se integra con Fabric"
    ],
    correct: [0, 1, 2],
    requiredSelections: 3,
    explanation: "Endorsement, labels y lineage son pilares de governance. RLS no sustituye permisos de acceso y Purview sí se integra con Fabric."
  },
  {
    id: "M4", type: "multi", domain: 2, difficulty: 3, subtopic: "Workspace Security",
    question: "¿Qué afirmaciones son verdaderas sobre seguridad de datos en Fabric? (elige 3)",
    options: [
      "RLS filtra filas por usuario",
      "CLS restringe columnas específicas",
      "OLS puede ocultar tablas completas",
      "Sensitivity labels sustituyen RLS",
      "Workspace role Viewer permite editar items",
      "Dynamic RLS suele usar USERPRINCIPALNAME()"
    ],
    correct: [0, 1, 2],
    requiredSelections: 3,
    explanation: "RLS/CLS/OLS tienen propósitos complementarios. Labels no sustituyen seguridad de modelo y Viewer no edita contenido."
  },
  {
    id: "M5", type: "multi", domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "Selecciona lo correcto sobre Direct Lake (elige 3):",
    options: [
      "Lee datos Delta en OneLake",
      "Puede hacer fallback a DirectQuery",
      "Usa framing para snapshots",
      "Siempre requiere refresh completo para ver cambios",
      "No admite modelos semánticos",
      "No depende del SKU de capacidad"
    ],
    correct: [0, 1, 2],
    requiredSelections: 3,
    explanation: "Direct Lake usa Delta + framing y puede caer a DirectQuery según guardrails/casos incompatibles."
  },
  {
    id: "M6", type: "multi", domain: 3, difficulty: 2, subtopic: "DAX Core",
    question: "Selecciona funciones DAX de Time Intelligence válidas (elige 3):",
    options: [
      "TOTALYTD",
      "DATESMTD",
      "SAMEPERIODLASTYEAR",
      "RUNNINGTOTAL",
      "SUMWINDOW",
      "MOVINGAVG"
    ],
    correct: [0, 1, 2],
    requiredSelections: 3,
    explanation: "TOTALYTD, DATESMTD y SAMEPERIODLASTYEAR son funciones estándar de Time Intelligence."
  },
  {
    id: "M7", type: "multi", domain: 1, difficulty: 2, subtopic: "Lakehouse",
    question: "¿Qué elementos pertenecen al concepto Lakehouse en Fabric? (elige 3)",
    options: [
      "Sección Files",
      "Sección Tables",
      "SQL Analytics Endpoint",
      "Managed Private Endpoint",
      "Capacity Metrics App",
      "Deployment Pipeline"
    ],
    correct: [0, 1, 2],
    requiredSelections: 3,
    explanation: "Lakehouse incluye Files, Tables y SQL endpoint; lo demás son componentes de otras capas."
  },
  {
    id: "M8", type: "multi", domain: 2, difficulty: 2, subtopic: "Capacity Management",
    question: "Selecciona afirmaciones correctas sobre capacidad Fabric (elige 3):",
    options: [
      "El consumo se mide en CU",
      "Capacity Metrics App ayuda a detectar throttling",
      "Se puede pausar/reanudar en ciertos SKUs F",
      "No afecta a Spark workloads",
      "No existe relación con rendimiento",
      "Siempre es gratuita"
    ],
    correct: [0, 1, 2],
    requiredSelections: 3,
    explanation: "CU, métricas y administración de capacidad impactan directamente operación y rendimiento."
  },
  {
    id: "M9", type: "multi", domain: 3, difficulty: 3, subtopic: "Performance Optimization",
    question: "¿Qué acciones mejoran rendimiento de modelos semánticos? (elige 3)",
    options: [
      "Reducir cardinalidad",
      "Eliminar columnas no usadas",
      "Usar star schema",
      "Crear bidireccionales en todas las relaciones",
      "Duplicar medidas sin necesidad",
      "Aumentar texto libre en dimensiones"
    ],
    correct: [0, 1, 2],
    requiredSelections: 3,
    explanation: "Modelado limpio y reducción de cardinalidad son claves de rendimiento tabular."
  },
  {
    id: "M10", type: "multi", domain: 1, difficulty: 3, subtopic: "Dataflows Gen2",
    question: "Sobre Dataflow Gen2, selecciona las correctas (elige 3):",
    options: [
      "Usa Power Query M",
      "Query folding puede ejecutarse en origen",
      "Puede cargar a Lakehouse/Warehouse",
      "Solo admite fuentes CSV",
      "No permite programación",
      "Sustituye completamente a Pipelines"
    ],
    correct: [0, 1, 2],
    requiredSelections: 3,
    explanation: "Dataflow Gen2 es ETL visual con destino en Fabric; no reemplaza todos los escenarios de orquestación de Pipelines."
  }
];

const ORDER_QUESTIONS = [
  {
    id: "O1", type: "order", domain: 2, difficulty: 2, subtopic: "Deployment Pipelines",
    question: "Ordena los pasos para configurar un Deployment Pipeline en Fabric:",
    options: [
      "Promover contenido de Dev a Test",
      "Crear el Deployment Pipeline",
      "Asignar workspaces a cada etapa",
      "Configurar deployment rules",
      "Validar en Test y promover a Prod"
    ],
    correctOrder: [1, 2, 3, 0, 4],
    explanation: "Primero creas pipeline, luego etapas/workspaces, reglas, promoción a Test y finalmente a Prod."
  },
  {
    id: "O2", type: "order", domain: 1, difficulty: 2, subtopic: "Pipelines",
    question: "Ordena un flujo típico de ingestión diaria con Pipeline:",
    options: [
      "Ejecutar Notebook de limpieza",
      "Disparar trigger programado",
      "Copiar datos a Bronze",
      "Validar calidad y registrar métricas",
      "Publicar tabla Silver"
    ],
    correctOrder: [1, 2, 0, 3, 4],
    explanation: "Trigger inicia el proceso, Copy carga raw, Notebook transforma, validación y publicación final."
  },
  {
    id: "O3", type: "order", domain: 1, difficulty: 3, subtopic: "Medallion Architecture",
    question: "Ordena la secuencia correcta de Medallion Architecture:",
    options: [
      "Aplicar reglas de negocio y agregaciones",
      "Ingerir dato crudo",
      "Modelar para consumo BI",
      "Limpiar y deduplicar",
      "Exponer KPIs a reportes"
    ],
    correctOrder: [1, 3, 0, 2, 4],
    explanation: "Raw primero, luego calidad, después lógica de negocio, modelado y exposición analítica."
  },
  {
    id: "O4", type: "order", domain: 3, difficulty: 2, subtopic: "Star Schema",
    question: "Ordena los pasos para crear un modelo estrella:",
    options: [
      "Crear medidas DAX base",
      "Cargar hechos y dimensiones",
      "Configurar relaciones 1:N",
      "Depurar tipos y claves",
      "Publicar modelo"
    ],
    correctOrder: [1, 3, 2, 0, 4],
    explanation: "Carga, tipado/llaves, relaciones, medidas y finalmente publicación."
  },
  {
    id: "O5", type: "order", domain: 3, difficulty: 3, subtopic: "Storage Modes",
    question: "Ordena la secuencia más razonable para diagnosticar fallback en Direct Lake:",
    options: [
      "Medir consulta inicial",
      "Revisar guardrails y tamaño modelo",
      "Aplicar optimizaciones de modelo/Delta",
      "Validar latencia después de cambios",
      "Confirmar modo de almacenamiento"
    ],
    correctOrder: [4, 0, 1, 2, 3],
    explanation: "Primero confirmas contexto, mides baseline, analizas causa, ajustas y comparas."
  },
  {
    id: "O6", type: "order", domain: 2, difficulty: 2, subtopic: "Git Integration",
    question: "Ordena un flujo simple de Git Integration en Fabric:",
    options: [
      "Hacer commit de cambios",
      "Crear rama feature",
      "Conectar workspace al repo",
      "Abrir Pull Request",
      "Mergear a main"
    ],
    correctOrder: [2, 1, 0, 3, 4],
    explanation: "Conectas workspace, trabajas en feature, haces commit, PR y merge a main."
  },
  {
    id: "O7", type: "order", domain: 1, difficulty: 2, subtopic: "Delta Lake",
    question: "Ordena una rutina de mantenimiento Delta:",
    options: [
      "Comparar métricas antes/después",
      "Ejecutar OPTIMIZE",
      "Capturar baseline de rendimiento",
      "Ejecutar VACUUM según retención",
      "Planificar periodicidad"
    ],
    correctOrder: [2, 1, 3, 0, 4],
    explanation: "Mides baseline, optimizas, limpias con retención, comparas y calendarizas."
  },
  {
    id: "O8", type: "order", domain: 2, difficulty: 3, subtopic: "RLS/CLS/OLS",
    question: "Ordena implementación de Dynamic RLS:",
    options: [
      "Publicar y validar en Service",
      "Crear tabla de mapeo usuario-rol/scope",
      "Definir filtro DAX con USERPRINCIPALNAME()",
      "Probar con View As",
      "Ajustar relaciones del modelo"
    ],
    correctOrder: [1, 4, 2, 3, 0],
    explanation: "Tabla de seguridad y relaciones primero, luego expresión RLS, pruebas y publicación."
  }
];

const CASE_STUDIES = [
  {
    id: "CS1",
    domain: 1,
    difficulty: 3,
    scenario: "**Contoso Retail** tiene ventas en SQL Server on-prem (200M filas/año), inventario diario en CSV (Blob) y fidelización vía API. Necesita una solución en Fabric con actualización diaria antes de las 8:00 AM, histórico de 3 años y dashboards ejecutivos.",
    questions: [
      {
        question: "¿Qué arquitectura base es más apropiada?",
        options: [
          "Solo Eventhouse",
          "Solo Warehouse",
          "Lakehouse Bronze/Silver + Warehouse o Gold curado",
          "Solo Dataflow Gen2"
        ],
        correct: 2,
        explanation: "La combinación medallion + capa curada para consumo SQL/BI encaja con múltiples fuentes y gobierno escalable."
      },
      {
        question: "¿Cómo ingieres SQL Server on-prem de forma robusta?",
        options: [
          "Shortcut directo a SQL Server",
          "Pipeline con Copy Data y On-premises Data Gateway",
          "Solo Excel export manual",
          "Direct Lake sobre SQL Server"
        ],
        correct: 1,
        explanation: "On-prem requiere gateway; Copy Data permite cargas programadas y controladas."
      },
      {
        question: "¿Qué patrón usarías para limpiar y estandarizar inventario CSV diario?",
        options: [
          "Guardar todo en Bronze sin transformación",
          "Notebook/Dataflow a Silver con tipado, deduplicación y reglas de calidad",
          "Transformación manual mensual",
          "Ignorar validación de schema"
        ],
        correct: 1,
        explanation: "Silver es la capa adecuada para calidad y estandarización repetible."
      }
    ]
  },
  {
    id: "CS2",
    domain: 2,
    difficulty: 3,
    scenario: "**Northwind BI** tiene 40 analistas y problemas de cambios no controlados en reportes. Quiere Dev/Test/Prod, versionado, reglas por entorno y menor riesgo en despliegues.",
    questions: [
      {
        question: "¿Qué combinación cubre mejor el objetivo?",
        options: [
          "Solo exportar PBIX manualmente",
          "Git Integration + Deployment Pipeline",
          "Solo Workspace sharing",
          "Solo Capacity Metrics App"
        ],
        correct: 1,
        explanation: "Git controla versiones; Deployment Pipeline controla promoción entre entornos."
      },
      {
        question: "¿Qué ventaja clave aportan deployment rules?",
        options: [
          "Mejoran visual design",
          "Cambian conexiones/parámetros por etapa sin editar manualmente",
          "Sustituyen pruebas funcionales",
          "Eliminan necesidad de permisos"
        ],
        correct: 1,
        explanation: "Rules evitan errores manuales al cambiar de Dev/Test/Prod."
      },
      {
        question: "¿Qué práctica reduce más el riesgo en producción?",
        options: [
          "Editar directamente Prod",
          "PR obligatoria + validación en Test antes de Prod",
          "Un único workspace para todos",
          "Desactivar control de cambios"
        ],
        correct: 1,
        explanation: "Aprobación por PR y validación en Test estabilizan el ciclo de releases."
      }
    ]
  },
  {
    id: "CS3",
    domain: 3,
    difficulty: 3,
    scenario: "**Fabrikam Finance** tiene un modelo tabular lento (25s por visual) con tablas grandes, relaciones ambiguas y medidas complejas. Necesita bajar tiempos a menos de 5s.",
    questions: [
      {
        question: "¿Qué primer paso es más efectivo?",
        options: [
          "Rehacer dashboard completo",
          "Medir con DAX Studio Server Timings + VertiPaq Analyzer",
          "Cambiar todo a DirectQuery",
          "Eliminar todas las relaciones"
        ],
        correct: 1,
        explanation: "Primero se mide para identificar FE/SE y columnas costosas antes de optimizar."
      },
      {
        question: "¿Qué mejora suele tener mayor impacto en memoria?",
        options: [
          "Aumentar cantidad de medidas",
          "Reducir cardinalidad y quitar columnas no usadas",
          "Activar relaciones bidireccionales",
          "Duplicar dimensiones"
        ],
        correct: 1,
        explanation: "Cardinalidad y columnas innecesarias dominan el tamaño VertiPaq."
      },
      {
        question: "¿Qué enfoque aplica para time intelligence sin duplicar medidas?",
        options: [
          "Crear 30 medidas por KPI",
          "Calculation Groups con SELECTEDMEASURE",
          "Solo columnas calculadas",
          "No usar time intelligence"
        ],
        correct: 1,
        explanation: "Calculation Groups reducen mantenimiento y evitan explosión de medidas."
      }
    ]
  },
  {
    id: "CS4",
    domain: 2,
    difficulty: 2,
    scenario: "**Adventure Works HR** necesita que cada gerente vea solo su área y el equipo de BI vea datos globales. Además, hay columnas salariales restringidas.",
    questions: [
      {
        question: "¿Qué combinación de seguridad es más adecuada?",
        options: [
          "Solo workspace roles",
          "Dynamic RLS para filas + OLS/CLS para columnas/objetos sensibles",
          "Solo sensitivity labels",
          "Solo sharing por informe"
        ],
        correct: 1,
        explanation: "RLS controla filas por usuario y OLS/CLS restringen exposición de objetos sensibles."
      },
      {
        question: "¿Qué función DAX es clave en RLS dinámico?",
        options: ["USERNAMEHASH()", "USERPRINCIPALNAME()", "CURRENTROLE()", "ACCESSLEVEL()"],
        correct: 1,
        explanation: "USERPRINCIPALNAME() permite mapear usuario actual con tabla de seguridad."
      },
      {
        question: "¿Cómo validar que las reglas funcionan antes de liberar?",
        options: [
          "Publicar directamente en Prod",
          "Usar View As Role con usuarios de prueba",
          "Solo revisión visual del modelo",
          "Reiniciar capacity"
        ],
        correct: 1,
        explanation: "View As permite simular permisos y verificar resultados de seguridad."
      }
    ]
  },
  {
    id: "CS5",
    domain: 1,
    difficulty: 2,
    scenario: "**Tailspin Logistics** recibe 5GB diarios de telemetría IoT y necesita alertas casi en tiempo real y análisis histórico semanal.",
    questions: [
      {
        question: "¿Qué componente usarías para ingesta y análisis en tiempo real?",
        options: ["Eventhouse + Eventstream", "Solo Warehouse", "Solo Excel", "Solo Dataflow batch"],
        correct: 0,
        explanation: "Eventstream + Eventhouse es la ruta natural para streaming y consultas KQL en tiempo real."
      },
      {
        question: "¿Cómo combinarías histórico y real-time para BI?",
        options: [
          "Eliminar históricos cada semana",
          "Persistir en Lakehouse/Delta y modelar consumo analítico",
          "Usar únicamente dashboard temporal",
          "No almacenar telemetría"
        ],
        correct: 1,
        explanation: "Persistir en Delta permite histórico y análisis cruzado con datasets de negocio."
      },
      {
        question: "¿Qué solución encaja para alertas automáticas por umbral?",
        options: ["Data Activator", "OPTIMIZE", "RLS", "Deployment rules"],
        correct: 0,
        explanation: "Data Activator permite disparar acciones cuando se cumplen condiciones de eventos."
      }
    ]
  }
];
