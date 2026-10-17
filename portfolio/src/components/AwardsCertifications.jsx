import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { mainDistinction, certifications } from '../data/certifications'
import { Award, Cloud, Workflow, BarChart2, CheckCircle2 } from 'lucide-react'
import './CommunityCards.css'

export default function AwardsCertifications() {
    const { lang } = useApp()
    const t = translations[lang].awards

    const certIcons = {
        Cloud,
        Workflow,
        BarChart2
    }

    return (
        <section
            id="awards"
            style={{
                padding: '7rem 2rem',
                background: 'var(--surface)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 2,
            }}
        >
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div style={{
                            width: 3,
                            height: 48,
                            background: 'var(--electric-gradient)'
                        }} />
                        <div>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.72rem',
                                color: 'var(--neon-blue)',
                                letterSpacing: '0.22em',
                                marginBottom: '0.3rem'
                            }}>
                                {t.sectionNumber}
                            </div>
                            <h2 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                                fontWeight: 700,
                                color: 'var(--text-pure)',
                                letterSpacing: '-0.02em',
                                margin: 0
                            }}>
                                {t.title}
                            </h2>
                        </div>
                    </div>

                    <p style={{
                        color: 'var(--muted-light)',
                        fontSize: '1.05rem',
                        maxWidth: '750px',
                        marginBottom: '3rem'
                    }}>
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* 1. Featured Distinction Card: NXP 2nd Place */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="community-card community-card--featured"
                >
                    <div className="community-card__avatar-orbit" aria-hidden="true">
                        <div className="community-card__avatar">
                            <span>NXP</span>
                        </div>
                    </div>

                    <div className="community-card__content">
                        <div className="community-card__badges">
                            <span className="community-card__badge">{t.distinctionTitle}</span>
                            <span className="community-card__period">
                                {mainDistinction.organization} — {mainDistinction.year}
                            </span>
                        </div>
                        <h3 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--text-pure)',
                            margin: '0 0 0.75rem'
                        }}>
                            {lang === 'fr' ? mainDistinction.title.fr : mainDistinction.title.en}
                        </h3>

                        <p style={{
                            color: 'var(--muted-light)',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                            maxWidth: '920px',
                            margin: '0 0 1.25rem'
                        }}>
                            {lang === 'fr' ? mainDistinction.description.fr : mainDistinction.description.en}
                        </p>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {mainDistinction.tags.map(tag => (
                                <span
                                    key={tag}
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.72rem',
                                        padding: '0.3rem 0.75rem',
                                        borderRadius: '6px',
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 2. Official Certifications Grid: AWS, IBM, Cisco */}
                <div>
                    <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.75rem',
                        color: 'var(--neon-blue)',
                        letterSpacing: '0.15em',
                        marginBottom: '1.5rem',
                        fontWeight: 600
                    }}>
                        // {t.certificationsTitle}
                    </div>

                    <div className="community-card-grid">
                        {certifications.map((cert, idx) => {
                            const Icon = certIcons[cert.icon] || Award

                            return (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                                    className="community-card"
                                >
                                    <div className="community-card__avatar-orbit" aria-hidden="true">
                                        <div className="community-card__avatar">
                                            <Icon size={24} />
                                        </div>
                                    </div>

                                    <div className="community-card__content">
                                        <span className="community-card__badge">{cert.issuer}</span>
                                        <h4 style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: '1.2rem',
                                            fontWeight: 700,
                                            color: 'var(--text-pure)',
                                            margin: '0.65rem 0 0.5rem'
                                        }}>
                                            {cert.title}
                                        </h4>

                                        <p style={{
                                            color: 'var(--muted-light)',
                                            fontSize: '0.88rem',
                                            lineHeight: 1.6,
                                            margin: 0
                                        }}>
                                            {lang === 'fr' ? cert.description.fr : cert.description.en}
                                        </p>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.72rem',
                                        color: 'var(--neon-blue)',
                                        marginTop: '1rem',
                                        paddingTop: '0.75rem',
                                        borderTop: '1px solid var(--border)'
                                    }}>
                                        <CheckCircle2 size={13} />
                                        <span>{t.verifiedBadge}</span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
