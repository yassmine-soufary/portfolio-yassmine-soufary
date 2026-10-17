export const projects = [
    {
        id: "hotel-data-analysis",
        slug: "hotel-data-analysis",
        title: {
            fr: "Analyse des données hôtelières",
            en: "Hotel Reservation Data Analysis"
        },
        category: {
            fr: "Data Warehouse & Business Intelligence",
            en: "Data Warehouse & Business Intelligence"
        },
        date: "Mars 2026",
        isFlagship: true,
        tags: ["PostgreSQL", "Power BI", "Data Warehouse", "Star Schema Modeling", "SQL"],
        summary: {
            fr: "Entrepôt de données PostgreSQL modélisé en étoile et dashboard interactif Power BI pour l'analyse des réservations hôtelières et l'optimisation des revenus.",
            en: "PostgreSQL star-schema data warehouse and interactive Power BI dashboard analyzing hotel bookings, seasonal revenue, and distribution channels."
        },
        description: {
            fr: "Structuration et consolidation des flux de données de réservation au sein d'un entrepôt de données PostgreSQL sous schéma en étoile (faits et dimensions). Conception d'un tableau de bord interactif sous Power BI permettant le suivi dynamique du chiffre d'affaires (CA), des volumes de réservations, du revenu moyen par nuitée (RevPAR) et de la performance comparative des canaux de distribution.",
            en: "Consolidation and structuring of hotel reservation streams inside a PostgreSQL star-schema data warehouse (facts and dimensions). Design of an interactive Power BI dashboard monitoring key metrics: total revenue, booking volumes, average revenue per night, and performance across distribution channels."
        },
        kpis: [
            { label: "Modélisation", value: "Schéma en Étoile" },
            { label: "SGBD", value: "PostgreSQL" },
            { label: "BI Dashboard", value: "Power BI" },
            { label: "Indicateurs", value: "CA & RevPAR" }
        ],
        context: {
            fr: "Projet académique axé sur la Business Intelligence et l'aide à la décision dans le secteur hôtelier.",
            en: "Academic project focused on Business Intelligence and decision support in the hospitality sector."
        },
        objective: {
            fr: "Transformer des données brutes de réservation en indicateurs stratégiques pour optimiser les politiques tarifaires et la gestion des canaux de vente.",
            en: "Transform raw booking data into strategic KPIs to optimize pricing policies and sales channel performance."
        },
        architectureSteps: [
            { title: "Sources de données", desc: "Données brutes de réservations, clients et hébergements" },
            { title: "ETL & Modélisation", desc: "Transformation et modélisation en étoile (faits et dimensions)" },
            { title: "Entrepôt PostgreSQL", desc: "Stockage optimisé avec contraintes d'intégrité" },
            { title: "Dashboard Power BI", desc: "Visualisations interactives et KPI financiers" }
        ],
        githubUrl: null,
        liveUrl: null,
    },
    {
        id: "vertical-farming",
        slug: "vertical-farming",
        title: {
            fr: "Smart Vertical Farming",
            en: "Smart Vertical Farming"
        },
        category: {
            fr: "IoT / Automatisation / Collecte de données",
            en: "IoT / Automation / Data Collection"
        },
        date: "2026",
        isFlagship: false,
        tags: ["ESP32", "IoT", "Node.js", "MongoDB", "React", "Socket.io", "Automation"],
        summary: {
            fr: "Système de culture verticale intelligente combinant capteurs connectés IoT, collecte de données en temps réel et automatisation.",
            en: "Smart vertical agriculture system combining connected IoT sensors, real-time data streaming, and automated environmental monitoring."
        },
        description: {
            fr: "Système complet pour l'agriculture verticale connectée. Des microcontrôleurs ESP32 collectent les paramètres environnementaux (température, humidité, humidité du sol) et transmettent les flux à une API backend Node.js. Les données sont persistées dans MongoDB et visualisées en temps réel sur une interface React avec notifications et alertes automatiques via Socket.io.",
            en: "End-to-end connected vertical farming platform. ESP32 microcontrollers gather real-time environmental metrics (temperature, humidity, soil moisture) streaming into a Node.js API, stored in MongoDB, and visualized on a React dashboard with real-time Socket.io alerts."
        },
        kpis: [
            { label: "Hardware", value: "ESP32 & Sensors" },
            { label: "Backend", value: "Node.js & MongoDB" },
            { label: "Temps réel", value: "Socket.io" },
            { label: "Frontend", value: "React Dashboard" }
        ],
        context: {
            fr: "Agriculture de précision et systèmes connectés durables.",
            en: "Precision agriculture and sustainable connected systems."
        },
        objective: {
            fr: "Automatiser la surveillance continue des cultures et réduire la consommation d'eau grâce à des relevés de capteurs réguliers.",
            en: "Automate crop monitoring and reduce water waste through continuous sensor telemetry."
        },
        architectureSteps: [
            { title: "Capteurs ESP32", desc: "Relevé des données physiques et environnementales" },
            { title: "API Node.js", desc: "Ingestion des métriques et contrôle des flux" },
            { title: "Base MongoDB", desc: "Historisation des séries temporelles" },
            { title: "Dashboard React", desc: "Monitoring live et déclenchement d'alertes" }
        ],
        githubUrl: "https://github.com/yassmine-soufary/vertical-farming",
        liveUrl: null,
    },
    {
        id: "stock-ai-manager",
        slug: "stock-ai-manager",
        title: {
            fr: "Stock AI Manager",
            en: "Stock AI Manager"
        },
        category: {
            fr: "Gestion d'inventaire & IA",
            en: "Inventory Management & AI"
        },
        date: "2026",
        isFlagship: false,
        tags: ["Python", "Flask", "MySQL", "AI", "Dashboard", "Automation"],
        summary: {
            fr: "Application intelligente de gestion d'inventaire avec alertes automatiques, analyse IA des stocks et tableau de bord en temps réel.",
            en: "Intelligent inventory management application featuring automatic alerts, AI-driven stock analysis, and a real-time dashboard."
        },
        description: {
            fr: "Solution de gestion des stocks centralisée combinant un backend Flask en Python, une base de données MySQL et un module d'analyse préventive par IA. L'application surveille en continu les niveaux de stock, identifie les risques de rupture ou de surstockage et déclenche des alertes en temps réel à destination des gestionnaires.",
            en: "Centralized inventory management solution combining a Python Flask backend, MySQL database, and AI-assisted analysis module. The system continuously tracks inventory levels, flags stockout and overstock risks, and fires automatic alerts."
        },
        kpis: [
            { label: "Backend", value: "Python / Flask" },
            { label: "Base", value: "MySQL" },
            { label: "Fonctionnalité", value: "Alertes automatiques" },
            { label: "Interface", value: "Dashboard temps réel" }
        ],
        context: {
            fr: "Digitalisation et optimisation des flux logistiques en entreprise.",
            en: "Digitalization and optimization of corporate inventory logistics."
        },
        objective: {
            fr: "Réduire les temps de traitement d'inventaire et anticiper les réapprovisionnements critiques via des alertes intelligentes.",
            en: "Mitigate inventory tracking delays and anticipate critical restocks via intelligent alerts."
        },
        architectureSteps: [
            { title: "Entrée données", desc: "Transactions d'entrées/sorties et états de stock" },
            { title: "Moteur Flask", desc: "Logique métier et traitement des règles de réapprovisionnement" },
            { title: "Base MySQL", desc: "Persistance relationnelle et intégrité des stocks" },
            { title: "Tableau de bord", desc: "Affichage des indicateurs et notifications d'alerte" }
        ],
        githubUrl: "https://github.com/yassmine-soufary/stock-ia-management-",
        liveUrl: null,
    },
    {
        id: "nxp-robot",
        slug: "nxp-robot",
        title: {
            fr: "Robot Autonome — Compétition NXP",
            en: "Autonomous Robot — NXP Competition"
        },
        category: {
            fr: "Robotique & Systèmes embarqués",
            en: "Robotics & Embedded Systems"
        },
        date: "2025",
        isFlagship: false,
        awardBadge: "2ème Place",
        tags: ["Arduino", "PID", "LineScan", "C/C++", "Robotics", "Embedded"],
        summary: {
            fr: "Conception et programmation d'un robot autonome récompensé par la 2ème place lors de la compétition d'innovation NXP.",
            en: "Design and programming of an autonomous line-tracking robot awarded 2nd place at the NXP Innovation Competition."
        },
        description: {
            fr: "Projet de robotique mobile autonome conçu pour la compétition technologique NXP. Utilisation d'une caméra linéaire (capteur LineScan) pour la détection optique de la piste en temps réel, couplée à un algorithme de régulation proportionnelle, intégrale et dérivée (PID) assurant le suivi précis de trajectoire et la stabilité dynamique à haute vitesse.",
            en: "Autonomous mobile robotics project engineered for the NXP technology competition. Employed a LineScan linear camera sensor for real-time track detection combined with a PID (Proportional-Integral-Derivative) control algorithm ensuring precise trajectory tracking and dynamic high-speed stability."
        },
        kpis: [
            { label: "Résultat", value: "2ème Place" },
            { label: "Capteur", value: "LineScan optique" },
            { label: "Contrôle", value: "Algorithme PID" },
            { label: "Environnement", value: "Systèmes embarqués" }
        ],
        context: {
            fr: "Compétition technologique NXP — Solutions électroniques et innovation.",
            en: "NXP Technology Competition — Electronic innovation and solutions."
        },
        objective: {
            fr: "Atteindre la vitesse maximale de parcours tout en maintenant un asservissement de direction stable sans sortie de piste.",
            en: "Achieve maximum lap velocity while maintaining stable direction control without leaving the track."
        },
        architectureSteps: [
            { title: "Acquisition optique", desc: "Échantillonnage de la ligne par capteur LineScan" },
            { title: "Traitement du signal", desc: "Calcul de l'erreur d'écart par rapport au centre" },
            { title: "Régulation PID", desc: "Correction dynamique de l'angle des servomoteurs" },
            { title: "Traction & Puissance", desc: "Gestion des moteurs CC et de l'accélération" }
        ],
        githubUrl: null,
        liveUrl: null,
    }
]
