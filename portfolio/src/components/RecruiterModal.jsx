import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { profile } from '../data/profile'
import { X, Download, Mail, CheckCircle, GraduationCap, Calendar, MapPin } from 'lucide-react'

export default function RecruiterModal() {
    const { lang, isRecruiterModalOpen, setIsRecruiterModalOpen } = useApp()
    const t = translations[lang].recruiterModal
    const aboutT = translations[lang].about.recruiterCard

    if (!isRecruiterModalOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsRecruiterModalOpen(false)}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(7, 7, 7, 0.85)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 999999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                }}
            >
                <motion.div
                    initial={{ scale: 0.92, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.92, y: 20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        maxWidth: '680px',
                        width: '100%',
                        background: 'var(--surface)',
                        border: '1px solid var(--accent)',
                        borderRadius: '16px',
                        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px var(--accent-dim)',
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '1.5rem 2rem',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(246, 154, 92, 0.08) 100%)'
                    }}>
                        <div>
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.7rem',
                                color: 'var(--accent)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase'
                            }}>
                                // EXECUTIVE SUMMARY
                            </span>
                            <h2 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.6rem',
                                fontWeight: 700,
                                color: 'var(--text-pure)',
                                margin: '0.25rem 0 0'
                            }}>
                                {profile.name}
                            </h2>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--muted)',
                                margin: '0.2rem 0 0'
                            }}>
                                {t.role}
                            </p>
                        </div>

                        <button
                            onClick={() => setIsRecruiterModalOpen(false)}
                            aria-label={t.close}
                            style={{
                                background: 'var(--surface-alt)',
                                border: '1px solid var(--border)',
                                color: 'var(--text)',
                                cursor: 'pointer',
                                padding: '6px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content Matrix */}
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {/* Target & Availability Banner */}
                        <div style={{
                            padding: '1rem 1.25rem',
                            borderRadius: '10px',
                            background: 'rgba(255, 69, 0, 0.08)',
                            border: '1px solid rgba(255, 69, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <Calendar size={22} color="var(--accent)" />
                            <div>
                                <div style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', fontWeight: 600 }}>
                                    {aboutT.availabilityLabel}
                                </div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-pure)' }}>
                                    {aboutT.availabilityValue}
                                </div>
                            </div>
                        </div>

                        {/* Key Attributes Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '1rem'
                        }}>
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'var(--surface-alt)',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                    <GraduationCap size={16} color="var(--purple)" />
                                    <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                        {aboutT.curriculumLabel}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>
                                    {aboutT.curriculumValue}
                                </div>
                            </div>

                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'var(--surface-alt)',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                    <CheckCircle size={16} color="var(--accent)" />
                                    <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                        {aboutT.stackLabel}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>
                                    {aboutT.stackValue}
                                </div>
                            </div>

                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'var(--surface-alt)',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                    <MapPin size={16} color="var(--accent)" />
                                    <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                        Localisation
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>
                                    {profile.location} (Mobilité &amp; Télétravail acceptés)
                                </div>
                            </div>

                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                background: 'var(--surface-alt)',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                    <CheckCircle size={16} color="var(--purple)" />
                                    <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                        {aboutT.experienceLabel}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>
                                    {aboutT.experienceValue}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                            <a
                                href="/cv.pdf"
                                download="CV_Yassmine_Soufary.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    minWidth: '220px',
                                    padding: '0.85rem 1.5rem',
                                    borderRadius: '8px',
                                    background: 'var(--electric-gradient)',
                                    color: '#000',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.6rem',
                                    boxShadow: '0 0 25px var(--accent-glow)'
                                }}
                            >
                                <Download size={18} />
                                <span>{t.downloadPdf}</span>
                            </a>

                            <a
                                href={`mailto:${profile.email}`}
                                style={{
                                    padding: '0.85rem 1.5rem',
                                    borderRadius: '8px',
                                    background: 'var(--surface-alt)',
                                    border: '1px solid var(--border-light)',
                                    color: 'var(--text)',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.6rem'
                                }}
                            >
                                <Mail size={18} color="var(--accent)" />
                                <span>{t.contactDirect}</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
