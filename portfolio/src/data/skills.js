export const skillCategories = [
    { id: "programming", labelFr: "Programmation", labelEn: "Programming", icon: "Code" },
    { id: "dataEngineering", labelFr: "Data Engineering & Bases de données", labelEn: "Data Engineering & Databases", icon: "Database" },
    { id: "dataScience", labelFr: "Data Science & Business Intelligence", labelEn: "Data Science & BI", icon: "BarChart3" },
    { id: "modeling", labelFr: "Modélisation, Systèmes & Autres", labelEn: "Modeling & Systems", icon: "Cpu" },
]

export const skillsList = [
    // 1. Programmation
    {
        name: "Python",
        category: "programming",
        desc: {
            fr: "Langage principal pour l'analyse des données, l'IA, la modélisation et le développement backend.",
            en: "Core language for data analysis, AI pipelines, predictive modeling, and backend services."
        },
        relatedProjects: ["stock-ai-manager"]
    },
    {
        name: "SQL",
        category: "programming",
        desc: {
            fr: "Requêtes complexes, agrégations, jointures multi-tables et modélisation de bases de données relationnelles.",
            en: "Complex querying, aggregations, relational joins, and relational database modeling."
        },
        relatedProjects: ["hotel-data-analysis", "stock-ai-manager"]
    },
    {
        name: "HTML",
        category: "programming",
        desc: {
            fr: "Structuration sémantique de pages web et intégration d'interfaces utilisateur.",
            en: "Semantic structuring of web interfaces and frontend component integration."
        },
        relatedProjects: ["vertical-farming", "stock-ai-manager"]
    },
    {
        name: "CSS",
        category: "programming",
        desc: {
            fr: "Mise en page moderne, design responsive et animations fluides.",
            en: "Modern styling, responsive layouts, and fluid motion design."
        },
        relatedProjects: ["vertical-farming", "stock-ai-manager"]
    },
    {
        name: "Flask",
        category: "programming",
        desc: {
            fr: "Développement d'APIs légères en Python pour servir des modèles IA et connecter des bases de données.",
            en: "Lightweight Python web API framework for serving AI logic and database endpoints."
        },
        relatedProjects: ["stock-ai-manager"]
    },
    {
        name: "Git",
        category: "programming",
        desc: {
            fr: "Gestion de versions, travail collaboratif, branches et traçabilité du code source.",
            en: "Version control, collaborative workflows, branching, and source code tracking."
        },
        relatedProjects: ["vertical-farming", "stock-ai-manager"]
    },

    // 2. Data Engineering & Databases
    {
        name: "PostgreSQL",
        category: "dataEngineering",
        desc: {
            fr: "SGBD relationnel robuste utilisé pour les entrepôts de données et le requêtage analytique avancé.",
            en: "Enterprise relational database utilized for data warehousing and advanced analytical querying."
        },
        relatedProjects: ["hotel-data-analysis"]
    },
    {
        name: "MySQL",
        category: "dataEngineering",
        desc: {
            fr: "Conception, administration et requêtage de bases de données relationnelles transactionnelles.",
            en: "Design, administration, and querying of relational transactional databases."
        },
        relatedProjects: ["stock-ai-manager"]
    },
    {
        name: "Data Warehouse",
        category: "dataEngineering",
        desc: {
            fr: "Conception d'entrepôts de données centralisés pour l'aide à la décision et l'analyse décisionnelle.",
            en: "Centralized data warehouse architecture designed for business analytics and decision making."
        },
        relatedProjects: ["hotel-data-analysis"]
    },
    {
        name: "Docker",
        category: "dataEngineering",
        desc: {
            fr: "Conteneurisation d'applications et d'environnements pour garantir la reproductibilité du déploiement.",
            en: "Application and environment containerization ensuring reproducible deployments."
        },
        relatedProjects: ["vertical-farming"]
    },
    {
        name: "Star Schema Modeling",
        category: "dataEngineering",
        desc: {
            fr: "Modélisation dimensionnelle en étoile séparant tables de faits et dimensions analytiques.",
            en: "Dimensional star-schema modeling segregating central fact tables and business dimensions."
        },
        relatedProjects: ["hotel-data-analysis"]
    },

    // 3. Data Science & Business Intelligence
    {
        name: "NumPy",
        category: "dataScience",
        desc: {
            fr: "Calcul matriciel haute performance, manipulation de tableaux multidimensionnels et algèbre linéaire.",
            en: "High-performance array computation, multidimensional data structures, and linear algebra."
        },
        relatedProjects: ["stock-ai-manager"]
    },
    {
        name: "Data Mining",
        category: "dataScience",
        desc: {
            fr: "Extraction de motifs cachés, classification, segmentation et exploration de données hétérogènes.",
            en: "Pattern extraction, classification, customer clustering, and exploratory data mining."
        },
        relatedProjects: ["hotel-data-analysis"]
    },
    {
        name: "Machine Learning",
        category: "dataScience",
        desc: {
            fr: "Algorithmes d'apprentissage supervisé et non-supervisé pour la prédiction et l'analyse de tendances.",
            en: "Supervised and unsupervised algorithms for predictive analytics and trend identification."
        },
        relatedProjects: ["stock-ai-manager"]
    },
    {
        name: "Deep Learning",
        category: "dataScience",
        desc: {
            fr: "Réseaux de neurones artificiels pour la reconnaissance de motifs et le traitement de données complexes.",
            en: "Artificial neural network architectures for complex pattern recognition and feature extraction."
        },
        relatedProjects: ["stock-ai-manager"]
    },
    {
        name: "Power BI",
        category: "dataScience",
        desc: {
            fr: "Création de rapports interactifs, modélisation DAX et restitution visuelle des indicateurs clés de performance.",
            en: "Interactive dashboard creation, DAX measure modeling, and executive KPI reporting."
        },
        relatedProjects: ["hotel-data-analysis"]
    },
    {
        name: "Tableau",
        category: "dataScience",
        desc: {
            fr: "Visualisation avancée de données et conception de dashboards interactifs pour l'aide à la décision.",
            en: "Advanced visual analytics and interactive dashboard design for data-driven decisions."
        },
        relatedProjects: []
    },

    // 4. Modeling & Systems
    {
        name: "UML",
        category: "modeling",
        desc: {
            fr: "Diagrammes de cas d'utilisation, classes, séquences et activités pour la modélisation logicielle.",
            en: "Use case, class, sequence, and activity diagrams for software system engineering."
        },
        relatedProjects: ["vertical-farming", "stock-ai-manager"]
    },
    {
        name: "MCD",
        category: "modeling",
        desc: {
            fr: "Modèle Conceptuel de Données (Merise) pour la conception rigoureuse de schémas de bases de données.",
            en: "Conceptual Data Modeling (MCD/Merise) for robust relational database schema design."
        },
        relatedProjects: ["hotel-data-analysis", "stock-ai-manager"]
    },
    {
        name: "Arduino",
        category: "modeling",
        desc: {
            fr: "Programmation de microcontrôleurs, gestion des entrées/sorties et prototypage de systèmes embarqués.",
            en: "Microcontroller programming, sensor IO management, and embedded systems prototyping."
        },
        relatedProjects: ["nxp-robot"]
    },
    {
        name: "IoT",
        category: "modeling",
        desc: {
            fr: "Objets connectés, communication sans fil, acquisition et streaming continu de télémétrie capteurs.",
            en: "Internet of Things, telemetry streaming, sensor acquisition, and real-time connectivity."
        },
        relatedProjects: ["vertical-farming"]
    },
    {
        name: "Cloud",
        category: "modeling",
        desc: {
            fr: "Notions et fondamentaux des architectures Cloud (AWS Academy Cloud Foundations).",
            en: "Fundamentals of Cloud architecture, virtualization, and services (AWS Academy Cloud Foundations)."
        },
        relatedProjects: []
    },
    {
        name: "UI/UX",
        category: "modeling",
        desc: {
            fr: "Conception d'interfaces centrées sur l'utilisateur, clarté visuelle, accessibilité et ergonomie.",
            en: "User-centric interface design, visual hierarchy, ergonomics, and intuitive navigation."
        },
        relatedProjects: ["vertical-farming"]
    }
]
