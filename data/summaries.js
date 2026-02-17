// DP-600 Topic Summaries — Module summaries with links to Microsoft Learn
const SUMMARIES = [
    {
        id: 1, domain: 1, title: "Introducción a Microsoft Fabric",
        summary: "Microsoft Fabric es una plataforma SaaS de análisis de datos de extremo a extremo que unifica todas las cargas de trabajo: ingeniería de datos, data warehouse, ciencia de datos, análisis en tiempo real y business intelligence. Su capa de almacenamiento unificada es **OneLake** (un solo lake por tenant). Los componentes principales incluyen **Lakehouse**, **Data Warehouse**, **Eventhouse**, cuadernos, pipelines, flujos de datos y modelos semánticos.",
        keyPoints: ["OneLake: un almacenamiento unificado por tenant", "Componentes: Lakehouse, Warehouse, Eventhouse, Notebooks, Pipelines, Dataflows, Semantic Models", "SaaS: sin infraestructura que gestionar", "Licenciamiento por Capacity (F2-F2048)"],
        link: "https://learn.microsoft.com/es-es/training/modules/introduction-end-analytics-use-microsoft-fabric/"
    },
    {
        id: 2, domain: 1, title: "Lakehouses en Microsoft Fabric",
        summary: "Un Lakehouse combina la flexibilidad de un data lake (archivos no estructurados) con la capacidad analítica de un data warehouse. Almacena datos en formato **Delta Lake** sobre OneLake. Tiene dos secciones: **Tables** (tablas Delta gestionadas) y **Files** (archivos de cualquier tipo). Cada Lakehouse incluye automáticamente un **SQL Analytics Endpoint** de solo lectura para consultas T-SQL.",
        keyPoints: ["Formato nativo: Delta Lake (Parquet + transaction log)", "Secciones: Tables (Delta) y Files (cualquier formato)", "SQL Analytics Endpoint automático (solo lectura)", "Shortcuts para acceder datos externos sin copiarlos", "Soporta Spark (PySpark, SQL, Scala, R)"],
        link: "https://learn.microsoft.com/es-es/training/modules/get-started-lakehouses/"
    },
    {
        id: 3, domain: 1, title: "Data Warehouse en Microsoft Fabric",
        summary: "El Data Warehouse de Fabric es un almacén analítico relacional optimizado para T-SQL completo (lectura Y escritura). Soporta tablas, vistas, funciones, procedimientos almacenados y seguridad a nivel de columna (CLS). Los datos también se almacenan en Delta/Parquet en OneLake. Es la opción cuando necesitas escritura SQL directa y objetos programáticos complejos.",
        keyPoints: ["T-SQL completo: DDL + DML (Create, Insert, Update, Delete, Merge)", "Vistas, funciones y stored procedures", "Column-Level Security (GRANT/DENY en columnas)", "COPY INTO para cargas masivas de alto rendimiento", "Cross-database queries entre Warehouses y Lakehouses"],
        link: "https://learn.microsoft.com/es-es/training/modules/get-started-data-warehouse/"
    },
    {
        id: 4, domain: 1, title: "Pipelines y Data Factory en Fabric",
        summary: "Las **canalizaciones (Pipelines)** orquestan tareas de ingesta y transformación de datos. Incluyen actividades como Copy Data, Notebook, Dataflow, ForEach, If Condition, etc. Los **flujos de datos Gen2** (Dataflows Gen2) usan **Power Query Online** para crear transformaciones visuales de datos. Pipelines para orquestación compleja, Dataflows para transformaciones visuales sencillas.",
        keyPoints: ["Pipelines: orquestación con actividades (Copy, Notebook, Dataflow, Script)", "Dataflows Gen2: transformación visual con Power Query Online", "Programación: triggers por horario o evento", "Reintentos y manejo de errores configurable", "Parámetros y expresiones dinámicas"],
        link: "https://learn.microsoft.com/es-es/training/modules/use-data-factory-pipelines-fabric/"
    },
    {
        id: 5, domain: 1, title: "Real-Time Intelligence: Eventhouse y KQL",
        summary: "**Eventhouse** es el componente para datos de streaming en tiempo real. Incluye bases de datos KQL optimizadas para ingerir y consultar grandes volúmenes de datos de eventos. **Eventstream** captura datos de fuentes streaming (Event Hubs, IoT Hub) y los enruta a destinos. **KQL (Kusto Query Language)** usa sintaxis de pipe: Tabla | where | summarize | render.",
        keyPoints: ["Eventhouse: almacén optimizado para streaming y logs", "KQL: sintaxis pipe (|), operadores: where, summarize, extend, project, render", "Eventstream: captura y enruta datos de streaming visualmente", "KQL Queryset: artefacto para escribir y guardar consultas KQL", "Nuevo en DP-600 2026 (antes no incluido)"],
        link: "https://learn.microsoft.com/es-es/training/modules/get-started-kusto-fabric/"
    },
    {
        id: 6, domain: 1, title: "Delta Lake y Optimización de Datos",
        summary: "**Delta Lake** añade sobre Parquet: transacciones ACID, time travel, schema evolution, MERGE/UPDATE/DELETE. Mantenimiento: **OPTIMIZE** compacta archivos pequeños, **VACUUM** elimina archivos obsoletos. **V-Order** optimiza compresión Parquet automáticamente en Fabric. **Z-Order** reorganiza datos para acelerar filtros en columnas específicas. **Partitioning** organiza datos en subcarpetas para partition pruning.",
        keyPoints: ["ACID transactions: escrituras atómicas y consistentes", "Time Travel: VERSION AS OF / TIMESTAMP AS OF", "Schema Evolution: mergeSchema / overwriteSchema", "OPTIMIZE + VACUUM para mantenimiento", "V-Order (auto) + Z-Order (manual por columna)"],
        link: "https://learn.microsoft.com/es-es/training/modules/work-delta-lake-tables-fabric/"
    },
    {
        id: 7, domain: 2, title: "Seguridad y Gobernanza",
        summary: "Fabric ofrece múltiples capas de seguridad: **Workspace roles** (Admin/Member/Contributor/Viewer) para acceso al workspace, **Item permissions** para compartir items individuales, **RLS** (filtrar filas por usuario), **CLS** (restringir columnas), **OLS** (ocultar tablas/columnas), y **Sensitivity Labels** de Microsoft Purview para clasificación y protección de datos.",
        keyPoints: ["Workspace Roles: Admin > Member > Contributor > Viewer", "RLS: filtros DAX con USERPRINCIPALNAME() para seguridad dinámica", "CLS: GRANT/DENY column-level en T-SQL (solo Data Warehouse)", "OLS: oculta tablas/columnas enteras en modelos semánticos", "Sensitivity Labels: clasificación (Purview) + protección automática"],
        link: "https://learn.microsoft.com/es-es/training/modules/administer-fabric/"
    },
    {
        id: 8, domain: 2, title: "Deployment Pipelines y ALM",
        summary: "Los **Deployment Pipelines** gestionan el ciclo de vida del contenido con 3 etapas: Development → Test → Production. Cada etapa se asocia a un workspace. Permiten comparar cambios entre etapas y promover contenido de forma controlada. La **integración Git** (Azure DevOps/GitHub) complementa con control de versiones y branching.",
        keyPoints: ["3 etapas: Development → Test → Production", "Cada etapa = un workspace diferente", "Comparación visual de cambios entre etapas", "Rules: permiten cambiar conexiones/parámetros por etapa", "Git Integration: Azure DevOps o GitHub para versionado"],
        link: "https://learn.microsoft.com/es-es/training/modules/administer-fabric/"
    },
    {
        id: 9, domain: 2, title: "Administración y Monitorización",
        summary: "El **Admin Portal** centraliza la configuración del tenant: tenant settings, capacidades, dominios, auditoría. **Monitoring Hub** muestra actividades en curso. **Capacity Metrics App** analiza el consumo de recursos. **Endorsement** permite marcar contenido como Promoted/Certified. Las **Managed Private Endpoints** aseguran conexiones a fuentes Azure por red privada.",
        keyPoints: ["Admin Portal: tenant settings, capacidades, dominios", "Monitoring Hub: actividades en tiempo real", "Capacity Metrics App: análisis de consumo", "Endorsement: Promoted (autor) / Certified (admin)", "Lineage View: trazabilidad de datos extremo a extremo"],
        link: "https://learn.microsoft.com/es-es/training/modules/administer-fabric/"
    },
    {
        id: 10, domain: 3, title: "Modelos Semánticos y Modos de Almacenamiento",
        summary: "Un **modelo semántico** (antes dataset) define tablas, relaciones, medidas DAX y jerarquías para análisis. Modos de almacenamiento: **Import** (datos en memoria VertiPaq, máximo rendimiento), **DirectQuery** (consulta en tiempo real al origen), **Direct Lake** (lee Delta de OneLake directamente, exclusivo de Fabric), **Composite** (mezcla Import + DirectQuery).",
        keyPoints: ["Import: datos en memoria, rápido, requiere refresco", "DirectQuery: tiempo real, rendimiento depende del origen", "Direct Lake: lee Delta/Parquet de OneLake sin importar", "Composite Model: mezcla modos en el mismo modelo", "VertiPaq: motor columnar in-memory con compresión"],
        link: "https://learn.microsoft.com/es-es/training/paths/get-started-fabric/"
    },
    {
        id: 11, domain: 3, title: "DAX Fundamentals",
        summary: "DAX es el lenguaje de fórmulas para medidas y columnas calculadas. **CALCULATE** modifica el contexto de filtro. Funciones clave: **SUM/AVERAGE/COUNT** (agregación), **FILTER/ALL/VALUES** (tablas y filtros), **DIVIDE** (división segura), **DISTINCTCOUNT** (valores únicos). La diferencia entre **contexto de fila** (columnas calculadas) y **contexto de filtro** (medidas) es fundamental.",
        keyPoints: ["CALCULATE: evalúa expresión en contexto de filtro modificado", "Contexto de fila vs contexto de filtro", "Medidas > columnas calculadas (rendimiento y flexibilidad)", "DIVIDE(a, b) en lugar de a/b (evita error por 0)", "REMOVEFILTERS/ALL para ignorar filtros existentes"],
        link: "https://learn.microsoft.com/es-es/training/paths/get-started-fabric/"
    },
    {
        id: 12, domain: 3, title: "Time Intelligence en DAX",
        summary: "Las funciones de Time Intelligence requieren una **tabla de fechas** marcada (sin gaps, una fila por día). **TOTALYTD**: acumulado año. **SAMEPERIODLASTYEAR/DATEADD(-1,YEAR)**: comparación año anterior. **DATESYTD/DATESMTD/DATESQTD**: rangos de fechas para períodos. **PARALLELPERIOD**: período paralelo completo.",
        keyPoints: ["Requisito: tabla de fechas marcada como Date Table, sin gaps", "TOTALYTD(medida, fechas): acumulado del año", "SAMEPERIODLASTYEAR(fechas): mismo periodo año anterior", "DATEADD(fechas, -N, unidad): desplazamiento flexible", "Calculation Groups: YTD/MTD/PY como items reutilizables"],
        link: "https://learn.microsoft.com/es-es/training/paths/get-started-fabric/"
    },
    {
        id: 13, domain: 3, title: "Modelado de Datos: Star Schema y Relaciones",
        summary: "El **esquema en estrella** es el patrón recomendado: tablas de hechos (métricas numéricas, granulares) rodeadas de dimensiones (atributos descriptivos, desnormalizadas). Relaciones **1:N** unidireccionales de dimensión a hechos. Evitar relaciones M:N y bidireccionales. Las **jerarquías** definen niveles de drill-down.",
        keyPoints: ["Star Schema: hechos (centro) + dimensiones (puntas)", "Relaciones 1:N unidireccionales: dimensión → hechos", "Evitar M:N (usar bridge tables si necesario)", "Desnormalizar dimensiones (menos joins = mejor rendimiento)", "Jerarquías: niveles de drill (País→Región→Ciudad)"],
        link: "https://learn.microsoft.com/es-es/training/paths/get-started-fabric/"
    },
    {
        id: 14, domain: 3, title: "Direct Lake y Optimización de Rendimiento",
        summary: "**Direct Lake** es exclusivo de Fabric. Lee datos directamente de archivos Delta en OneLake. **Framing** toma un snapshot de archivos para cargar. Si excede límites, hace **fallback a DirectQuery**. Para optimizar: reducir cardinalidad, usar V-Order, particionar tablas, mantener Delta con OPTIMIZE/VACUUM. **DAX Studio** para analizar rendimiento de consultas.",
        keyPoints: ["Framing: snapshot de archivos Delta para caché en memoria", "Fallback a DirectQuery si excede límites", "Optimizar: reducir cardinalidad, V-Order, OPTIMIZE", "DAX Studio: Server Timings (FE vs SE)", "Performance Analyzer en Power BI Desktop"],
        link: "https://learn.microsoft.com/es-es/training/paths/get-started-fabric/"
    },

    // ─── 16 NEW SUMMARIES (IDs 15-30) ───
    {
        id: 15, domain: 1, title: "Notebooks y Spark en Fabric",
        summary: "Los **notebooks** de Fabric permiten ejecutar código interactivo usando **PySpark**, **SparkSQL**, **Scala** y **R** sobre los datos de OneLake. Fabric gestiona los **Spark pools** automáticamente — no hay aprovisionamiento de clusters. Los notebooks soportan magic commands: **%%sql** para SparkSQL, **%%pyspark** para Python (default), **%pip install** para instalar librerías, **%run** para ejecutar otros notebooks, y **%%configure** para ajustar la sesión Spark (cores, memoria, librerías). Los datos se leen y escriben en formato Delta usando `spark.read.format('delta')` o sentencias SQL CREATE TABLE. Los **Environments** de Fabric permiten definir conjuntos reutilizables de librerías y configuraciones que persisten entre sesiones, garantizando reproducibilidad. Los notebooks son ideales para transformaciones complejas que no se pueden expresar visualmente en Dataflows Gen2.",
        keyPoints: [
            "Lenguajes: PySpark, SparkSQL, Scala, R en celdas intercambiables",
            "Spark pools gestionados automáticamente (sin clusters manuales)",
            "Magic commands: %%sql, %%pyspark, %pip install, %run, %%configure",
            "Environments: conjuntos reutilizables de librerías y configuración Spark",
            "Lectura/escritura Delta: spark.read.format('delta') o CREATE TABLE",
            "Integración con Pipelines mediante Notebook Activity"
        ],
        link: "https://learn.microsoft.com/es-es/training/modules/use-apache-spark-work-files-lakehouse/"
    },
    {
        id: 16, domain: 1, title: "Power Query M y Dataflows Gen2 en profundidad",
        summary: "Los **Dataflows Gen2** usan el motor **Power Query Online** con el lenguaje **M** para transformaciones visuales de datos. La clave del rendimiento es el **query folding**: Power Query traduce los pasos M en queries nativas (SQL) que se ejecutan en el origen. Cuando un paso no se puede plegar (función M sin equivalente SQL), Fabric descarga los datos parcialmente filtrados y los procesa localmente — esto puede ser significativamente más lento. Para maximizar el folding: ordenar los pasos filtrantes primero, evitar funciones custom M, usar el indicador visual de folding. Los Dataflows Gen2 tienen un **destino de datos** (data destination) que puede ser Lakehouse o Warehouse, con modos **Replace** (reemplaza todo) o **Append** (añade filas). También soportan **staging** intermedio para mejorar el rendimiento al procesar múltiples consultas del mismo origen.",
        keyPoints: [
            "Lenguaje M: let/in, Table.SelectRows, Table.Group, Table.TransformColumnTypes",
            "Query Folding: traducción automática de pasos M a SQL nativo del origen",
            "Si un paso rompe el folding, todo lo posterior se procesa localmente (lento)",
            "Data Destination: Replace (full refresh) o Append (incremental)",
            "Staging: copia intermedia para optimizar múltiples consultas",
            "Indicador visual de folding en cada paso del editor"
        ],
        link: "https://learn.microsoft.com/es-es/training/modules/use-dataflow-gen-2-fabric/"
    },
    {
        id: 17, domain: 1, title: "Real-Time Intelligence completo",
        summary: "La experiencia **Real-Time Intelligence** de Fabric incluye varios componentes: **Eventhouse** es el almacén optimizado para datos de streaming con bases de datos KQL. **Eventstream** captura datos de fuentes streaming (Azure Event Hubs, IoT Hub, Custom App, CDC de bases de datos) y los enruta a destinos (Eventhouse, Lakehouse, KQL Database). **KQL (Kusto Query Language)** usa sintaxis pipe para consultas: Tabla | where | summarize | render. Operadores clave: **where** (filtrar), **summarize** (agregar con bin() para intervalos), **extend** (columnas calculadas), **project** (seleccionar), **join** (combinar tablas), **dcount()** (conteo aproximado con HyperLogLog). **Data Activator** (Reflex) crea alertas automáticas sobre condiciones en datos de streaming — envía emails, Teams messages o ejecuta Power Automate flows cuando se cumple una condición.",
        keyPoints: [
            "Eventhouse: almacén de eventos con KQL Database y retención configurable",
            "Eventstream: captura visual de streaming → enruta a destinos",
            "KQL: sintaxis pipe (|), operadores: where, summarize, extend, project, join, render",
            "dcount(): conteo aproximado de valores distintos (HyperLogLog)",
            "Data Activator (Reflex): alertas automáticas sobre condiciones en datos",
            "bin(): agrupa timestamps en intervalos (bin(timestamp, 1h))"
        ],
        link: "https://learn.microsoft.com/es-es/training/modules/get-started-kusto-fabric/"
    },
    {
        id: 18, domain: 3, title: "Direct Lake en profundidad",
        summary: "**Direct Lake** es el modo de almacenamiento exclusivo de Fabric que lee directamente archivos Delta/Parquet de OneLake en la caché VertiPaq, combinando la frescura de DirectQuery con el rendimiento de Import. El proceso de **framing** toma un snapshot de qué archivos Delta debe leer el modelo. Entre framings, el modelo usa el snapshot anterior. Cada **F-SKU** tiene **guardrails** que limitan el tamaño del modelo: número de filas por tabla, número de columnas, tamaño total en memoria. Si el modelo excede estos guardrails, hace **fallback a DirectQuery** — las queries se envían al SQL Analytics Endpoint, con rendimiento significativamente menor. Para evitar fallback: reducir cardinalidad, eliminar columnas innecesarias, ejecutar OPTIMIZE con V-Order en las tablas Delta. Las columnas calculadas DAX fuerzan fallback porque no existen en los archivos Delta. Power Query tampoco es soportado — las transformaciones deben hacerse antes (en notebooks o pipelines).",
        keyPoints: [
            "Framing: snapshot de archivos Delta → caché VertiPaq en memoria",
            "Guardrails por SKU: F64 (~500M filas), F128 (~1B), F256 (~3B)",
            "Fallback a DirectQuery si excede guardrails o columnas no cacheadas",
            "Columnas calculadas DAX fuerzan fallback (usar medidas en su lugar)",
            "V-Order + OPTIMIZE mejoran la velocidad de transcoding a VertiPaq",
            "No soporta Power Query — transformaciones pre-modelo obligatorias"
        ],
        link: "https://learn.microsoft.com/es-es/fabric/fundamentals/direct-lake-overview"
    },
    {
        id: 19, domain: 3, title: "Composite Models y encadenado de modelos",
        summary: "Un **Composite Model** mezcla tablas con diferentes modos de almacenamiento (Import + DirectQuery) en el mismo modelo. Caso típico: dimensiones en Import (rendimiento) y hechos grandes en DirectQuery (frescura). En Fabric, se puede crear un modelo con **DirectQuery sobre otro modelo semántico** publicado — esto permite: reutilizar un modelo central corporativo, añadir tablas locales de departamento, crear medidas específicas sin duplicar datos. Los **Hybrid Tables** van un paso más allá: una sola tabla con particiones históricas en Import y una partición de datos recientes en DirectQuery, implementado automáticamente con **Incremental Refresh** configurando una política con rangos de fechas. Esto combina rendimiento para datos históricos con frescura para datos actuales.",
        keyPoints: [
            "Composite Model: Import + DirectQuery en el mismo modelo",
            "Dimensiones Import + hechos DirectQuery: patrón óptimo",
            "DirectQuery over Semantic Models: conecta modelos entre sí",
            "Hybrid Tables: particiones Import (histórico) + DirectQuery (reciente)",
            "Incremental Refresh habilita Hybrid Tables automáticamente",
            "Cadena de modelos: modelo departamental → modelo corporativo"
        ],
        link: "https://learn.microsoft.com/es-es/power-bi/transform-model/desktop-composite-models"
    },
    {
        id: 20, domain: 3, title: "DAX avanzado: Calculation Groups, TREATAS y Variables",
        summary: "Los **Calculation Groups** definen transformaciones reutilizables (YTD, Prior Year, Moving Average) que se aplican dinámicamente a cualquier medida del modelo. Cada **Calculation Item** modifica la expresión de la medida seleccionada usando SELECTEDMEASURE(). Los items pueden tener **Format String Expressions** para cambiar el formato dinámicamente (moneda → porcentaje). La **precedencia** entre múltiples Calculation Groups define el orden de aplicación. **TREATAS** permite aplicar una tabla como filtro virtual sobre columnas no relacionadas: CALCULATE(medida, TREATAS(VALUES(T1[Col]), T2[Col])). Las **variables (VAR/RETURN)** mejoran legibilidad, evitan recálculos, y se evalúan en el contexto donde se definen (no donde se usan en RETURN). Los **iteradores** (SUMX, AVERAGEX, RANKX) recorren tablas fila a fila evaluando expresiones, fundamentales para cálculos que involucran múltiples columnas.",
        keyPoints: [
            "Calculation Groups: transformaciones reutilizables con SELECTEDMEASURE()",
            "Format String Expression: cambia formato dinámicamente por calculation item",
            "Precedencia: controla orden de aplicación entre múltiples Calculation Groups",
            "TREATAS: filtro virtual entre tablas sin relación física",
            "VAR/RETURN: variables evaluadas en contexto de definición",
            "Iteradores (SUMX, RANKX): evaluación fila a fila sobre tablas"
        ],
        link: "https://learn.microsoft.com/es-es/power-bi/transform-model/calculation-groups"
    },
    {
        id: 21, domain: 3, title: "Performance Optimization Toolkit",
        summary: "La optimización de modelos semánticos requiere varias herramientas: **DAX Studio** (gratuito) permite ejecutar queries DAX contra el modelo, con **Server Timings** que desglosa el tiempo entre Formula Engine (FE — cálculos DAX) y Storage Engine (SE — scans de datos VertiPaq). **VertiPaq Analyzer** (integrado en DAX Studio) muestra el tamaño de cada tabla, columna, relación — identifica columnas de alta cardinalidad que consumen memoria. **Performance Analyzer** en Power BI Desktop muestra el tiempo de cada visual del informe. **Best Practices Analyzer** (BPA) en Tabular Editor aplica reglas automatizadas para detectar anti-patrones: columnas no usadas, relaciones bidireccionales innecesarias, medidas sin formato, columnas de alta cardinalidad. Las técnicas clave incluyen: reducir cardinalidad, separar fecha/hora en columnas distintas, eliminar columnas no usadas, preferir medidas sobre columnas calculadas, y usar variables DAX.",
        keyPoints: [
            "DAX Studio: Server Timings (FE vs SE), VertiPaq Analyzer",
            "FE (Formula Engine): procesa DAX, single-threaded, costoso",
            "SE (Storage Engine): scans VertiPaq, multi-threaded, eficiente",
            "Performance Analyzer: tiempo de render/query por visual en PBI Desktop",
            "Best Practices Analyzer: reglas automatizadas en Tabular Editor",
            "Técnicas: reducir cardinalidad, separar fecha/hora, eliminar columnas no usadas"
        ],
        link: "https://learn.microsoft.com/es-es/power-bi/guidance/star-schema"
    },
    {
        id: 22, domain: 3, title: "XMLA Endpoint y Tabular Model",
        summary: "El **XMLA Endpoint** permite gestionar modelos semánticos programáticamente, requiere Premium o Fabric capacity. Soporta **lectura** (conectar desde SSMS, DAX Studio, Excel) y **escritura** (modificar tablas, medidas, particiones via herramientas externas). **TOM (Tabular Object Model)** es la API .NET para crear/modificar modelos semánticos: tablas, medidas, relaciones, particiones programáticamente. **TMSL (Tabular Model Scripting Language)** son scripts JSON (createOrReplace, refresh, alter) ejecutables desde SSMS o PowerShell. **ALM Toolkit** compara y sincroniza modelos entre entornos. **Tabular Editor** es el IDE más potente para editar modelos: soporta edición de medidas, Calculation Groups, BPA, y puede conectarse directamente al XMLA endpoint. Estas herramientas son esenciales para equipos de BI enterprise con modelos complejos.",
        keyPoints: [
            "XMLA Endpoint: lectura (análisis) y escritura (modificación) de modelos",
            "TOM: API .NET para gestión programática del modelo tabular",
            "TMSL: scripts JSON para operaciones administrativas (refresh, deploy)",
            "ALM Toolkit: comparación y sincronización entre entornos",
            "Tabular Editor: IDE para modelos con BPA y Calculation Groups",
            "Requiere Premium/Fabric capacity para acceso XMLA"
        ],
        link: "https://learn.microsoft.com/es-es/power-bi/enterprise/service-premium-connect-tools"
    },
    {
        id: 23, domain: 2, title: "Microsoft Purview y Fabric Governance",
        summary: "**Microsoft Purview** se integra con Fabric para proporcionar governance empresarial de datos. Los **Sensitivity Labels** (etiquetas de sensibilidad) clasifican contenido como Público, Interno, Confidencial o Altamente Confidencial — pueden aplicar cifrado, restringir exportación y añadir marcas de agua automáticamente. El **Data Lineage** visualiza el flujo de datos desde orígenes hasta informes, mostrando las dependencias entre items. El **Impact Analysis** muestra qué items se verían afectados por un cambio. Los **Data Domains** organizan el contenido del tenant por áreas de negocio (Ventas, Finanzas, RRHH), facilitando el descubrimiento y la governance. El **Endorsement** marca contenido como **Promoted** (recomendado por el autor) o **Certified** (validado por un admin), ayudando a los usuarios a encontrar contenido confiable. Purview también escanea Fabric para catalogar todos los assets de datos en el Data Catalog corporativo.",
        keyPoints: [
            "Sensitivity Labels: clasificación + protección automática (cifrado, restricción export)",
            "Data Lineage: visualización del flujo origen → pipeline → modelo → informe",
            "Impact Analysis: qué se afecta si cambio un item",
            "Data Domains: organización por área de negocio en el tenant",
            "Endorsement: Promoted (autor) / Certified (admin)",
            "Purview Data Catalog: escanea y cataloga assets de Fabric"
        ],
        link: "https://learn.microsoft.com/es-es/fabric/governance/governance-compliance-overview"
    },
    {
        id: 24, domain: 2, title: "Capacity Management y Licenciamiento",
        summary: "Fabric usa un modelo de **Capacity** basado en **F-SKUs** (F2, F4, F8... F2048) que se provisiona en Azure. Cada SKU proporciona un número fijo de **Capacity Units (CU)**. Todas las operaciones (Spark, SQL, Dataflows, refrescos de modelos) consumen CU. Cuando el consumo excede los CU disponibles, Fabric aplica **throttling** (ralentización). **Smoothing** promedia el consumo en ventanas de 5 minutos para tolerar picos breves. **Bursting** permite usar temporalmente CU por encima del límite, con una deuda que se paga en los siguientes minutos. La **Capacity Metrics App** es una aplicación Power BI que muestra el consumo detallado por workspace, item, tipo de carga y tiempo — esencial para right-sizing. **Autoscale** permite añadir CU automáticamente cuando la demanda lo requiere (con tope configurable). La equivalencia con Power BI Premium es: **F64 = P1**, **F128 = P2**, **F256 = P3**. El trial de Fabric incluye una F64 durante 60 días.",
        keyPoints: [
            "F-SKUs: F2 (mínima) a F2048, provisionadas en Azure",
            "CU (Capacity Units): unidad universal de consumo para todas las cargas",
            "Throttling: ralentización cuando consumo > CU disponibles",
            "Smoothing (5 min) y Bursting: tolerancia a picos temporales",
            "Capacity Metrics App: monitorización detallada del consumo",
            "Equivalencias: F64=P1, F128=P2, F256=P3; Trial = F64 x 60 días"
        ],
        link: "https://learn.microsoft.com/es-es/fabric/enterprise/licenses"
    },
    {
        id: 25, domain: 2, title: "CI/CD y Git Integration en detalle",
        summary: "La **Git Integration** de Fabric conecta workspaces a repositorios **Azure DevOps** o **GitHub**. Cada item del workspace (Lakehouse, modelo semántico, notebook, pipeline) se serializa como archivos en el repo, permitiendo control de versiones, diffs, y colaboración via Pull Requests. El flujo recomendado: workspace Dev conectado a branch de desarrollo → feature branches para cambios → PR a main → **Deployment Pipelines** para promover a Test/Prod. Los **Deployment Pipelines** tienen **Deployment Rules** que permiten sustituir parámetros por etapa (conexiones de base de datos, nombres de workspace, etc.) sin modificar el contenido. También soportan **Parameter Rules** para items con parámetros configurables. La combinación de Git (versionado granular) + Deployment Pipelines (promoción controlada) proporciona un ALM completo para equipos de datos.",
        keyPoints: [
            "Git Integration: Azure DevOps o GitHub, serializa items como archivos",
            "Branching: feature branches → PR → main → deploy",
            "Deployment Pipelines: Dev → Test → Prod (3 workspaces)",
            "Deployment Rules: sustituyen conexiones/parámetros por etapa",
            "No todos los items son soportados por Git (verificar compatibilidad)",
            "Combinación Git + Deployment Pipelines = ALM completo"
        ],
        link: "https://learn.microsoft.com/es-es/fabric/cicd/git-integration/intro-to-git-integration"
    },
    {
        id: 26, domain: 2, title: "Networking y Seguridad avanzada",
        summary: "Fabric ofrece varias opciones de conectividad segura: **Managed Private Endpoints** permiten conectar Fabric a recursos Azure (Storage, SQL) a través del backbone privado de Azure sin tráfico público. **VNet Gateway** (Virtual Network Gateway) conecta Fabric a recursos dentro de una Azure VNet sin necesidad de instalar un agente gateway — reemplaza al On-premises Data Gateway para recursos Azure. El **On-premises Data Gateway** sigue siendo necesario para fuentes locales (SQL Server on-prem, archivos de red). **Trusted Workspace Access** permite que un workspace de Fabric acceda a recursos Azure protegidos por firewall registrando la identidad del workspace en las reglas de firewall del recurso. Estas opciones se complementan con **tenant settings** para controlar el tráfico de datos: restricciones de exportación, bloqueo de conexiones externas, y control de compartición externa.",
        keyPoints: [
            "Managed Private Endpoints: Fabric → Azure por backbone privado",
            "VNet Gateway: conecta a recursos en Azure VNet sin agente",
            "On-premises Data Gateway: agente local para fuentes on-prem",
            "Trusted Workspace Access: identidad del workspace en firewall Azure",
            "Tenant settings: controlan exportación, compartición y conectividad",
            "Sin acceso público: combinar Private Endpoints + Trusted Access"
        ],
        link: "https://learn.microsoft.com/es-es/fabric/security/security-overview"
    },
    {
        id: 27, domain: 1, title: "Medallion Architecture Best Practices",
        summary: "La **arquitectura Medallion** (Bronze → Silver → Gold) es el patrón recomendado para organizar datos en un Lakehouse. **Bronze** almacena datos raw inmutables tal como llegan del origen — sin transformaciones, append-only, para preservar la fuente de verdad. **Silver** aplica limpieza, deduplicación (con MERGE + ROW_NUMBER), tipado correcto, joins entre fuentes, y validación de calidad de datos. **Gold** contiene datos curados listos para negocio: tablas dimensionales en star schema, KPIs agregados, métricas de negocio. En Fabric se implementa con un Lakehouse por capa (o schemas separados), usando notebooks/pipelines para mover datos entre capas. La capa Gold alimenta modelos semánticos Direct Lake. La clave es que Bronze nunca se transforma destructivamente — si descubres un error en Silver, puedes reprocesar desde Bronze. Silver debe ser idempotente: cada ejecución produce el mismo resultado para los mismos datos de entrada.",
        keyPoints: [
            "Bronze: raw inmutable, append-only, sin transformaciones",
            "Silver: limpieza, deduplicación (MERGE + ROW_NUMBER), validación",
            "Gold: star schema, KPIs, métricas — alimenta Direct Lake",
            "Un Lakehouse por capa o schemas separados",
            "Bronze como fuente de verdad: permite reprocesamiento",
            "Silver idempotente: MERGE para upserts reproducibles"
        ],
        link: "https://learn.microsoft.com/es-es/fabric/onelake/onelake-medallion-lakehouse-architecture"
    },
    {
        id: 28, domain: 2, title: "Data Domains y Data Mesh en Fabric",
        summary: "Los **Data Domains** en Fabric organizan el tenant por áreas de negocio (Ventas, Finanzas, Operaciones, RRHH) para facilitar governance y descubrimiento. Cada dominio agrupa workspaces relacionados bajo una misma etiqueta organizativa. Esto se alinea con el concepto de **Data Mesh**, donde cada dominio de negocio es responsable de sus propios datos como producto. En Fabric, un dominio puede tener sus propios workspaces, lakehouses y modelos semánticos, con equipos responsables de la calidad y documentación. Los **shortcuts** de OneLake permiten compartir datos entre dominios sin duplicación. El **Endorsement** (Certified/Promoted) señala qué items son confiables como productos de datos. El **OneLake Data Hub** centraliza el descubrimiento de datos cross-domain. La governance se refuerza con sensitivity labels, lineage tracking y auditoría centralizada via Purview.",
        keyPoints: [
            "Data Domains: agrupación organizativa de workspaces por área de negocio",
            "Data Mesh: cada dominio es dueño de sus datos como producto",
            "Shortcuts: comparten datos entre dominios sin copiar",
            "Endorsement: señala productos de datos confiables",
            "OneLake Data Hub: descubrimiento centralizado cross-domain",
            "Purview: governance, lineage y auditoría transversal"
        ],
        link: "https://learn.microsoft.com/es-es/fabric/governance/domains"
    },
    {
        id: 29, domain: 3, title: "Hybrid Tables e Incremental Refresh avanzado",
        summary: "**Incremental Refresh** divide una tabla en particiones basadas en rangos de fecha. Solo refresca las particiones que contienen datos nuevos o modificados, reduciendo drásticamente el tiempo de refresco y la carga en el origen. Se configura con dos parámetros: **RangeStart** y **RangeEnd** (tipo DateTime). La política define cuántos períodos almacenar (ej. 3 años) y cuántos refrescar (ej. últimos 10 días). Con la opción **'Detect data changes'** se usa una columna de marca de agua (LastModified) para solo refrescar particiones donde los datos realmente cambiaron. Las **Hybrid Tables** añaden una partición con modo **DirectQuery** para datos del período actual — combinando Import (histórico, rápido) con DirectQuery (reciente, en tiempo real). Esto se habilita automáticamente al activar 'Get the latest data in real time' en la política de Incremental Refresh. Las particiones se gestionan automáticamente pero pueden manipularse manualmente via XMLA endpoint + TOM/TMSL.",
        keyPoints: [
            "Incremental Refresh: particiones por rango de fecha, solo refresca cambios",
            "Parámetros obligatorios: RangeStart y RangeEnd (DateTime)",
            "Detect data changes: columna marca de agua para evitar refrescos innecesarios",
            "Hybrid Tables: partición DirectQuery para datos más recientes",
            "Gestión manual de particiones via XMLA endpoint (TOM/TMSL)",
            "Reduce tiempo de refresco de horas a minutos para tablas grandes"
        ],
        link: "https://learn.microsoft.com/es-es/power-bi/connect-data/incremental-refresh-overview"
    },
    {
        id: 30, domain: 1, title: "OneLake, Mirroring y Cross-database Queries",
        summary: "**OneLake** es la capa de almacenamiento unificada de Fabric — un solo data lake por tenant, basado en ADLS Gen2 con protocolo ABFS. Todos los items de Fabric (Lakehouses, Warehouses, Eventhouses) almacenan sus datos aquí en formato Delta/Parquet. **Mirroring** replica datos de fuentes externas (Azure SQL DB, Cosmos DB, Snowflake) hacia OneLake de forma continua y automática, sin necesidad de pipelines. Los datos replicados se mantienen sincronizados y son accesibles como tablas Delta. Las **cross-database queries** permiten consultar tablas de otros Lakehouses o Warehouses del mismo workspace: `SELECT * FROM otro_lakehouse.dbo.tabla`. Para cross-workspace, se usan **shortcuts** que crean referencias virtuales a datos de otro workspace. El **OneLake Data Hub** es el portal para descubrir y acceder a todos los datos del tenant, con filtros por workspace, tipo, dominio y endorsement. La facturación de OneLake es por GB almacenado (similar a Azure Storage), separada de la facturación de Capacity (computación).",
        keyPoints: [
            "OneLake: un data lake por tenant, basado en ADLS Gen2 (ABFS)",
            "Mirroring: réplica continua desde Azure SQL, Cosmos DB, Snowflake",
            "Cross-database queries: SELECT * FROM otro_item.dbo.tabla (mismo workspace)",
            "Shortcuts: referencias virtuales para cross-workspace (sin copiar datos)",
            "OneLake Data Hub: descubrimiento centralizado de datos",
            "Facturación: almacenamiento por GB separado de computación (Capacity)"
        ],
        link: "https://learn.microsoft.com/es-es/fabric/onelake/onelake-overview"
    }
];
