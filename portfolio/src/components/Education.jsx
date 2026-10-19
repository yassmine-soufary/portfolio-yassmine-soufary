import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { education } from '../data/education'
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react'

export default function Education() {
    const { lang } = useApp()
    const t = translations[lang].education

    return (
        <section
            id="education"
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
                        marginBottom: '3.5rem'
                    }}>
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* Academic Timeline Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {education.map((edu, idx) => {
                        const isCurrent = idx === 0 || idx === 1

                        return (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.12 }}
                                style={{
                                    background: 'var(--surface-alt)',
                                    border: isCurrent ? '1px solid var(--purple)' : '1px solid var(--border)',
                                    borderRadius: '14px',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    boxShadow: isCurrent ? '0 0 25px var(--purple-dim)' : 'none',
                                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                    e.currentTarget.style.borderColor = 'var(--neon-blue)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.borderColor = isCurrent ? 'var(--purple)' : 'var(--border)'
                                }}
                            >
                                <div>
                                    {/* Period & Status */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '0.74rem',
                                            color: isCurrent ? 'var(--neon-blue)' : 'var(--muted)',
                                            fontWeight: 600
                                        }}>
                                            <Calendar size={13} />
                                            <span>{lang === 'fr' ? edu.period : edu.periodEn}</span>
                                        </div>

                                        <span style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '0.65rem',
                                            padding: '0.2rem 0.55rem',
                                            borderRadius: '9999px',
                                            background: isCurrent ? 'rgba(246, 92, 169, 0.15)' : 'var(--surface)',
                                            border: isCurrent ? '1px solid var(--purple)' : '1px solid var(--border)',
                                            color: isCurrent ? 'var(--purple)' : 'var(--muted)',
                                            fontWeight: 600
                                        }}>
                                            {lang === 'fr' ? edu.status.fr : edu.status.en}
                                        </span>
                                    </div>

                                    {/* Degree Title */}
                                    <h3 style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: 'var(--text-pure)',
                                        margin: '0 0 0.5rem',
                                        lineHeight: 1.3
                                    }}>
                                        {lang === 'fr' ? edu.degree.fr : edu.degree.en}
                                    </h3>

                                    {/* Institution */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.9rem',
                                        color: 'var(--neon-blue)',
                                        fontWeight: 600,
                                        marginBottom: '0.75rem'
                                    }}>
                                        <GraduationCap size={15} />
                                        <span>{edu.institution}</span>
                                    </div>

                                    {/* Description */}
                                    <p style={{
                                        color: 'var(--muted-light)',
                                        fontSize: '0.88rem',
                                        lineHeight: 1.6,
                                        margin: 0
                                    }}>
                                        {lang === 'fr' ? edu.description.fr : edu.description.en}
                                    </p>
                                </div>

                                {/* Location */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.72rem',
                                    color: 'var(--muted)',
                                    marginTop: '1.5rem',
                                    paddingTop: '1rem',
                                    borderTop: '1px solid var(--border)'
                                }}>
                                    <MapPin size={13} />
                                    <span>{edu.location}</span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
