import { motion } from 'framer-motion'

const steps = [
    { id: 'Q', label: 'QUESTION', desc: 'Define the problem precisely' },
    { id: 'D', label: 'DATA', desc: 'Collect & clean relevant data' },
    { id: 'A', label: 'ANALYSIS', desc: 'Explore patterns & insights' },
    { id: 'I', label: 'INSIGHT', desc: 'Extract meaningful conclusions' },
    { id: 'S', label: 'SOLUTION', desc: 'Build & deploy intelligent systems' },
]

export default function HowIThink() {
    return (
        <section style={{
            padding: '8rem 2rem', background: 'var(--surface-alt)',
            position: 'relative', overflow: 'hidden'
        }}>
            {/* Subtle grid */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.02,
                backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                        HOW I THINK
                    </div>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--text)' }}>
                        My Data-Driven Process
                    </h2>
                </motion.div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0' }}>
                    {steps.map((step, i) => (
                        <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
                            >
                                <div style={{
                                    width: 72, height: 72, borderRadius: '50%',
                                    background: 'var(--bg)', border: '1px solid var(--accent)',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 0 20px rgba(255, 102, 0, 0.2), 0 0 35px rgba(252, 180, 132, 0.15)',
                                    cursor: 'default'
                                }}>
                                    <span style={{
                                        fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem',
                                        fontWeight: 800, color: 'var(--accent)'
                                    }}>{step.id}</span>
                                </div>
                                <div style={{ textAlign: 'center', maxWidth: 100 }}>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--text)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                                        {step.label}
                                    </div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', color: 'var(--muted)', lineHeight: 1.4, textAlign: 'center' }}>
                                        {step.desc}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Arrow connector */}
                            {i < steps.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 + 0.3 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 0.5rem', marginBottom: '2.5rem' }}
                                >
                                    <FlowLine />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FlowLine() {
    return (
        <svg width={50} height={30} viewBox="0 0 50 30">
            <defs>
                <marker id="ah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" opacity={0.7} />
                </marker>
            </defs>
            <line x1={4} y1={15} x2={44} y2={15}
                stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ah)" strokeOpacity={0.5} />
            <motion.circle
                cx={4} cy={15} r={3} fill="var(--accent)"
                animate={{ cx: [4, 44, 4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                opacity={0.8}
            />
        </svg>
    )
}
