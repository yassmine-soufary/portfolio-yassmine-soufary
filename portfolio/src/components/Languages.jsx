import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { languages } from '../data/languages'
import { Globe2 } from 'lucide-react'

export default function Languages() {
    const { lang } = useApp()
    const t = translations[lang].languages

    return (
        <section
            id="languages"
            style={{
                padding: '6rem 2rem',
                background: 'var(--bg)',
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

                {/* 4 Clean Language Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.75rem'
                }}>
                    {languages.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                padding: '1.75rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
                                transition: 'transform 0.2s ease, border-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)'
                                e.currentTarget.style.borderColor = 'var(--neon-blue)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.borderColor = 'var(--border)'
                            }}
                        >
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <Globe2 size={20} color="var(--neon-blue)" />
                                    <span style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.74rem',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '9999px',
                                        background: 'rgba(255, 69, 0, 0.12)',
                                        border: '1px solid rgba(255, 69, 0, 0.3)',
                                        color: 'var(--neon-blue)',
                                        fontWeight: 700
                                    }}>
                                        {item.badge}
                                    </span>
                                </div>

                                <h3 style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: '1.3rem',
                                    fontWeight: 700,
                                    color: 'var(--text-pure)',
                                    margin: '0 0 0.4rem'
                                }}>
                                    {lang === 'fr' ? item.name.fr : item.name.en}
                                </h3>

                                <div style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.8rem',
                                    color: 'var(--purple)',
                                    fontWeight: 600
                                }}>
                                    {item.level}
                                </div>
                            </div>

                            <p style={{
                                color: 'var(--muted)',
                                fontSize: '0.84rem',
                                lineHeight: 1.5,
                                marginTop: '1.25rem',
                                marginBottom: 0
                            }}>
                                {lang === 'fr' ? item.proficiency.fr : item.proficiency.en}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
