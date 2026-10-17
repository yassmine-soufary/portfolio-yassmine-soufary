import { useState } from 'react'
import { motion } from 'framer-motion'
import { education, experience } from '../data/experience'

export default function Journey() {
    const [activeTab, setActiveTab] = useState('education')
    const items = activeTab === 'education' ? education : experience

    return (
        <section id="journey" style={{
            padding: '8rem 2rem', background: 'var(--surface)',
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                        <div style={{ width: 2, height: 40, background: 'var(--accent)' }} />
                        <div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.25em', marginBottom: '0.3rem' }}>SECTION_02</div>
                            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>MY JOURNEY</h2>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '0', marginBottom: '3rem', borderBottom: '1px solid var(--border)' }}>
                        {[['education', 'EDUCATION'], ['experience', 'EXPERIENCE']].map(([tab, label]) => (
                            <button key={tab} onClick={() => setActiveTab(tab)} style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.15em',
                                padding: '0.8rem 2rem', background: 'none', border: 'none',
                                borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                                color: activeTab === tab ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer',
                                marginBottom: '-1px', transition: 'all 0.3s ease'
                            }}>{label}</button>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline */}
                <div style={{ position: 'relative' }}>
                    {/* Central line */}
                    <div style={{
                        position: 'absolute', left: '50%', top: 0, bottom: 0,
                        width: 1, background: 'linear-gradient(to bottom, var(--accent) 0%, var(--border) 100%)',
                        transform: 'translateX(-50%)'
                    }} />

                    {items.map((item, i) => {
                        const isLeft = i % 2 === 0
                        return (
                            <motion.div key={item.id}
                                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                                    marginBottom: '3rem', position: 'relative'
                                }}
                            >
                                <div style={{
                                    width: 'calc(50% - 2rem)',
                                    background: 'var(--bg)', border: '1px solid var(--border)',
                                    padding: '1.5rem',
                                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                                    marginLeft: isLeft ? 0 : undefined,
                                    marginRight: isLeft ? undefined : 0,
                                    transition: 'border-color 0.3s ease'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                >
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--accent)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                                        {item.period || item.period}
                                    </div>
                                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                                        {item.title || item.company}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--muted-light)', marginBottom: '0.5rem' }}>
                                        {item.subtitle || item.role}
                                    </div>
                                    {item.institution && (
                                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--muted)' }}>
                                            {item.institution}
                                        </div>
                                    )}
                                    {item.contributions && (
                                        <ul style={{ marginTop: '0.75rem', paddingLeft: '1rem' }}>
                                            {item.contributions.map((c, ci) => (
                                                <li key={ci} style={{ fontSize: '0.8rem', color: 'var(--muted-light)', marginBottom: '0.3rem', lineHeight: 1.5 }}>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {item.current && (
                                        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}
                                                style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
                                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>CURRENT</span>
                                        </div>
                                    )}
                                </div>

                                {/* Center dot */}
                                <div style={{
                                    position: 'absolute', left: '50%', top: '1.5rem',
                                    transform: 'translate(-50%,-50%)',
                                    width: 12, height: 12, borderRadius: '50%',
                                    background: 'var(--accent)',
                                    boxShadow: '0 0 14px var(--accent-glow)',
                                    border: '2px solid var(--bg)'
                                }} />
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
