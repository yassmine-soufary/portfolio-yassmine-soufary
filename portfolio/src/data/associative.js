import iftarImg from '../assets/Iftar Ramadan.jpg'
import retraiteImg from '../assets/Maison de retraite.jpg'
import orphelinatImg from '../assets/Orphelinat.jpg'
import handicapImg from '../assets/Association Enfants Handicapés.jpg'

export const associationRoles = [
    {
        id: "gentech",
        club: "Club GENTECH",
        role: {
            fr: "Secrétaire et Trésorière",
            en: "Secretary & Treasurer"
        },
        period: "2025 – Présent",
        periodEn: "2025 – Present",
        icon: "Zap",
        color: "#f97316",
        description: {
            fr: "Gestion administrative, suivi de la trésorerie et coordination des initiatives technologiques et événements du club.",
            en: "Administrative management, treasury monitoring, and coordination of technological initiatives and club events."
        }
    },
    {
        id: "legends",
        club: "Club Legends",
        role: {
            fr: "Vice-présidente",
            en: "Vice President"
        },
        period: "2024 – Présent",
        periodEn: "2024 – Present",
        icon: "Users",
        color: "#dc2626",
        description: {
            fr: "Coordination des équipes, organisation des projets associatifs et soutien au développement des actions étudiantes.",
            en: "Team leadership, coordination of student association projects, and driving club initiatives."
        }
    }
]

export const associativeCategories = [
    {
        id: "iftar-ramadan",
        key: "iftar",
        title: {
            fr: "Iftar Ramadan",
            en: "Ramadan Iftar"
        },
        badge: {
            fr: "Solidarité & Partage",
            en: "Solidarity & Sharing"
        },
        icon: "🌙",
        summary: {
            fr: "Actions humanitaires et distributions de repas solidaires organisées pendant le mois sacré de Ramadan pour apporter réconfort et soutien aux familles.",
            en: "Charitable actions and solidarity meal distributions organized during the holy month of Ramadan to support families."
        },
        fullDescription: {
            fr: "Organisation et distribution de paniers repas et d'iftars solidaires au profit de personnes et familles dans le besoin pendant le mois sacré de Ramadan. Un moment fort de fraternité, d'entraide et de convivialité partagée.",
            en: "Organization and distribution of food baskets and solidarity iftar meals for families and individuals in need during Ramadan. A heartfelt moment of brotherhood and community mutual aid."
        },
        highlights: {
            fr: [
                "Préparation et conditionnement des paniers repas",
                "Distribution sur le terrain aux familles bénéficiaires",
                "Moments d'échange, de fraternité et de convivialité"
            ],
            en: [
                "Preparation and packaging of food baskets",
                "On-the-ground distribution to beneficiary families",
                "Moments of mutual support, warmth, and brotherhood"
            ]
        },
        coverImage: iftarImg,
        images: [
            {
                src: iftarImg,
                caption: {
                    fr: "Distribution des paniers de repas solidaires pendant le Ramadan",
                    en: "Distribution of solidarity food parcels during Ramadan"
                },
                date: "Ramadan"
            }
        ]
    },
    {
        id: "maison-retraite",
        key: "retraite",
        title: {
            fr: "Maison de Retraite",
            en: "Elderly Care Home"
        },
        badge: {
            fr: "Lien Intergénérationnel",
            en: "Intergenerational Bond"
        },
        icon: "🤝",
        summary: {
            fr: "Visites bienveillantes, écoute et moments de convivialité auprès des personnes âgées en maison de retraite pour rompre l'isolement.",
            en: "Benevolent visits, active listening, and warmth shared with seniors in retirement homes to combat loneliness."
        },
        fullDescription: {
            fr: "Journées d'écoute, d'animation et de partage aux côtés des résidents en maison de retraite. Des échanges riches d'expériences et d'émotions sincères pour valoriser la mémoire et apporter chaleur humaine à nos aînés.",
            en: "Days dedicated to active listening, entertainment, and warmth alongside retirement home residents. Meaningful moments honoring their memories and providing sincere comfort."
        },
        highlights: {
            fr: [
                "Animation d'ateliers et échanges bienveillants",
                "Écoute active et présence chaleureuse",
                "Renforcement précieux des liens intergénérationnels"
            ],
            en: [
                "Workshops and kind, friendly discussions",
                "Active listening and compassionate presence",
                "Strengthening precious intergenerational ties"
            ]
        },
        coverImage: retraiteImg,
        images: [
            {
                src: retraiteImg,
                caption: {
                    fr: "Visite chaleureuse et partage d'instants précieux en maison de retraite",
                    en: "Warm visit and memorable moments shared with seniors"
                },
                date: "Action Solidaire"
            }
        ]
    },
    {
        id: "orphelinat",
        key: "orphelinat",
        title: {
            fr: "Orphelinat",
            en: "Orphanage"
        },
        badge: {
            fr: "Enfance & Espoir",
            en: "Childhood & Hope"
        },
        icon: "☀️",
        summary: {
            fr: "Ateliers ludiques, soutien moral et activités éducatives auprès des enfants orphelins pour illuminer leur quotidien et encourager leur épanouissement.",
            en: "Fun workshops, emotional support, and educational activities with children in orphanages to bring joy to their daily lives."
        },
        fullDescription: {
            fr: "Organisation d'activités récréatives, d'animations artistiques et de moments de jeu avec les enfants dans les orphelinats. Notre mission : créer un espace sécurisant et joyeux, encourager leurs passions et leur redonner le sourire.",
            en: "Recreational activities, artistic workshops, and group games with children in orphanages. Creating a safe, joyful atmosphere to encourage their creativity and bring bright smiles."
        },
        highlights: {
            fr: [
                "Ateliers créatifs, dessins et jeux collectifs",
                "Soutien moral et encouragement de leurs passions",
                "Distribution de cadeaux et moments de joie partagée"
            ],
            en: [
                "Creative workshops, drawing, and collective games",
                "Encouragement and positive emotional reinforcement",
                "Gift distribution and shared joyful moments"
            ]
        },
        coverImage: orphelinatImg,
        images: [
            {
                src: orphelinatImg,
                caption: {
                    fr: "Atelier ludique et moments de joie partagés avec les enfants",
                    en: "Playful workshop and joyful moments shared with the children"
                },
                date: "Mission Enfance"
            }
        ]
    },
    {
        id: "enfants-handicap",
        key: "handicap",
        title: {
            fr: "Enfants en situation de handicap",
            en: "Children with Disabilities"
        },
        badge: {
            fr: "Inclusion & Bienveillance",
            en: "Inclusion & Empathy"
        },
        icon: "💙",
        summary: {
            fr: "Accompagnement, activités adaptées et moments de partage chaleureux auprès d'enfants en situation de handicap dans une démarche d'inclusion.",
            en: "Adapted activities, social inclusion, and loving support dedicated to children with special needs."
        },
        fullDescription: {
            fr: "Engagement dédié à l'inclusion sociale et à l'épanouissement d'enfants à besoins spécifiques. À travers des activités sensorielles, artistiques et d'éveil adaptées, nous célébrons la singularité de chaque enfant avec tendresse et respect.",
            en: "Dedicated commitment toward social inclusion and the fulfillment of children with special needs. Through adapted sensory and artistic activities, we celebrate each child's uniqueness with respect and love."
        },
        highlights: {
            fr: [
                "Activités d'éveil sensorielles adaptées et sécurisées",
                "Sensibilisation bienveillante à l'inclusion et à l'accessibilité",
                "Écoute et soutien aux familles et encadrants"
            ],
            en: [
                "Adapted, safe sensory and creative workshops",
                "Advocacy for social inclusion and accessibility",
                "Active listening and support for families and caregivers"
            ]
        },
        coverImage: handicapImg,
        images: [
            {
                src: handicapImg,
                caption: {
                    fr: "Séance d'activités inclusives et de partage avec les enfants",
                    en: "Inclusive activity session and heartfelt sharing with children"
                },
                date: "Action Inclusive"
            }
        ]
    }
]
