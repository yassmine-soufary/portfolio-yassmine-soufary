import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { profile } from '../data/profile'
import { GraduationCap, Database, FileText, MapPin } from 'lucide-react'

export default function About() {
    const { lang, setIsRecruiterModalOpen } = useApp()
    const t = translations[lang].about
    const card = t.recruiterCard

    return (
        <section
            id="about"
            style={{
                padding: '7rem 2rem',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
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
                </motion.div>

                {/* 2-Column Grid: Biography & Recruiter Summary Card */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    {/* Left: Professional Biography */}
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '16px',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.4rem',
                            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                        }}
                    >
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.7rem',
                            color: 'var(--accent)',
                            letterSpacing: '0.15em'
                        }}>
                            // PRÉSENTATION
                        </div>

                        <p style={{
                            color: 'var(--text)',
                            fontSize: '1.05rem',
                            lineHeight: 1.8,
                            margin: 0,
                            fontWeight: 400
                        }}>
                            {t.p1}
                        </p>

                        <p style={{
                            color: 'var(--muted-light)',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                            margin: 0
                        }}>
                            {t.p2}
                        </p>

                        <div style={{
                            marginTop: '0.5rem',
                            padding: '1.25rem',
                            borderRadius: '10px',
                            background: 'var(--surface-alt)',
                            borderLeft: '3px solid var(--purple)',
                            color: 'var(--text-pure)',
                            fontSize: '0.95rem',
                            lineHeight: 1.7,
                            fontWeight: 700
                        }}>
                            {t.p3}
                        </div>

                        {/* Fast Meta Chips */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.6rem',
                            marginTop: 'auto',
                            paddingTop: '1rem'
                        }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.35rem 0.8rem',
                                borderRadius: '9999px',
                                background: 'rgba(236, 72, 153, 0.1)',
                                border: '1px solid rgba(236, 72, 153, 0.3)',
                                color: 'var(--neon-blue)',
                                fontSize: '0.74rem',
                                fontFamily: "'JetBrains Mono', monospace"
                            }}>
                                <GraduationCap size={13} />
                                <span>Université Mundiapolis</span>
                            </span>

                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.35rem 0.8rem',
                                borderRadius: '9999px',
                                background: 'rgba(246, 92, 169, 0.1)',
                                border: '1px solid rgba(246, 92, 169, 0.3)',
                                color: 'var(--purple)',
                                fontSize: '0.74rem',
                                fontFamily: "'JetBrains Mono', monospace"
                            }}>
                                <Database size={13} />
                                <span>Yiwu College (Big Data)</span>
                            </span>

                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.35rem 0.8rem',
                                borderRadius: '9999px',
                                background: 'var(--surface-alt)',
                                border: '1px solid var(--border)',
                                color: 'var(--muted)',
                                fontSize: '0.74rem',
                                fontFamily: "'JetBrains Mono', monospace"
                            }}>
                                <MapPin size={13} />
                                <span>{profile.location}</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Recruiter Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--neon-blue)',
                            borderRadius: '16px',
                            height: 'fit-content',
                            padding: '1.15rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem',
                            position: 'relative',
                            boxShadow: '0 0 35px var(--accent-dim), 0 20px 50px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.58rem',
                                color: 'var(--neon-blue)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                fontWeight: 600
                            }}>
                                // {card.title}
                            </span>
                            <span style={{
                                padding: '0.15rem 0.45rem',
                                borderRadius: '9999px',
                                background: 'rgba(236, 72, 153, 0.15)',
                                color: 'var(--neon-blue)',
                                fontSize: '0.55rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 700
                            }}>
                                PFE 2027
                            </span>
                        </div>

                        {/* Attributes List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.35rem' }}>
                                <div style={{ fontSize: '0.58rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                    {card.roleLabel}
                                </div>
                                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-pure)', marginTop: '0.1rem' }}>
                                    {card.roleValue}
                                </div>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.35rem' }}>
                                <div style={{ fontSize: '0.58rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                    {card.specialtyLabel}
                                </div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--neon-blue)', marginTop: '0.1rem' }}>
                                    {card.specialtyValue}
                                </div>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.35rem' }}>
                                <div style={{ fontSize: '0.58rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                    {card.stackLabel}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text)', marginTop: '0.1rem', fontWeight: 500 }}>
                                    {card.stackValue}
                                </div>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.35rem' }}>
                                <div style={{ fontSize: '0.58rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                    {card.curriculumLabel}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--purple)', marginTop: '0.1rem', fontWeight: 500 }}>
                                    {card.curriculumValue}
                                </div>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.35rem' }}>
                                <div style={{ fontSize: '0.58rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                    {card.experienceLabel}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text)', marginTop: '0.1rem' }}>
                                    {card.experienceValue}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '0.58rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                    {card.availabilityLabel}
                                </div>
                                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ec4899', marginTop: '0.1rem' }}>
                                    {card.availabilityValue}
                                </div>
                            </div>
                        </div>

                        {/* Direct PDF CV Download Button */}
                        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <a
                                href={profile.cvPath}
                                download="CV_Yassmine_Soufary.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    padding: '0.55rem 0.75rem',
                                    borderRadius: '8px',
                                    background: 'var(--electric-gradient)',
                                    color: '#000',
                                    fontWeight: 700,
                                    fontSize: '0.66rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.35rem',
                                    boxShadow: '0 0 20px var(--accent-glow)'
                                }}
                            >
                                <FileText size={14} />
                                <span>{card.actionDownload}</span>
                            </a>

                            <button
                                onClick={() => setIsRecruiterModalOpen(true)}
                                style={{
                                    padding: '0.55rem 0.7rem',
                                    borderRadius: '8px',
                                    background: 'var(--surface-alt)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text)',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.66rem',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                {lang === 'fr' ? 'Aperçu ⤢' : 'Preview ⤢'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
