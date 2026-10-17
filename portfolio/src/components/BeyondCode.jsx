import { motion } from 'framer-motion'
import { achievements } from '../data/certifications'
import { certifications } from '../data/certifications'

export default function BeyondCode() {
    return (
        <section id="beyond" style={{
            padding: '8rem 2rem', background: 'var(--bg)',
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
                        <div style={{ width: 2, height: 40, background: 'var(--accent)' }} />
                        <div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.25em', marginBottom: '0.3rem' }}>SECTION_06 // BEYOND CODE</div>
                            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>BEYOND CODE</h2>
                        </div>
                    </div>
                </motion.div>

                {/* Achievements */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                    {achievements.map((ach, i) => (
                        <motion.div key={ach.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                background: 'var(--surface)', border: '1px solid var(--border)',
                                padding: '1.5rem', cursor: 'default',
                                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                                transition: 'all 0.3s ease'
                            }}
                            whileHover={{ borderColor: 'var(--accent)', y: -4 }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{ach.icon}</div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.3rem' }}>
                                {ach.title}
                            </div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--muted-light)', marginBottom: '0.25rem' }}>
                                {ach.subtitle}
                            </div>
                            {ach.period && (
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: 'var(--accent)' }}>
                                    {ach.period}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Certifications */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
            // CERTIFICATIONS
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {certifications.map((cert, i) => (
                            <motion.div key={cert.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: 'var(--surface)', border: '1px solid var(--border)',
                                    padding: '1.25rem 1.75rem',
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                                    transition: 'all 0.3s ease', cursor: 'default'
                                }}
                                whileHover={{ borderColor: 'var(--accent)' }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{cert.icon}</span>
                                <div>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                                        {cert.issuer}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>
                                        {cert.title}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
