import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { skills } from '../data/skills'

const R1 = 130
const R2 = 220

function polar(angle, r) {
    const rad = (angle - 90) * (Math.PI / 180)
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r }
}

export default function SkillsConstellation() {
    const [hovered, setHovered] = useState(null)
    const [particles, setParticles] = useState([])
    const svgW = 600, svgH = 600

    // Distribute nodes
    const n1 = skills.nodes.slice(0, 6)
    const n2 = skills.nodes.slice(6)
    const placedNodes = [
        ...n1.map((n, i) => ({ ...n, pos: polar((i / n1.length) * 360, R1) })),
        ...n2.map((n, i) => ({ ...n, pos: polar((i / n2.length) * 360 + 30, R2) })),
    ]

    // Animate particles on connection lines
    useEffect(() => {
        const ids = []
        const addParticle = () => {
            const fromIdx = Math.floor(Math.random() * placedNodes.length)
            ids.push({ id: Date.now() + Math.random(), fromIdx, t: 0 })
        }
        const interval = setInterval(addParticle, 600)
        return () => clearInterval(interval)
    }, [])

    return (
        <section id="skills" style={{
            padding: '8rem 2rem', background: 'var(--bg)',
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
                        <div style={{ width: 2, height: 40, background: 'var(--accent)' }} />
                        <div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.25em', marginBottom: '0.3rem' }}>SECTION_03</div>
                            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>DATA SKILLS CONSTELLATION</h2>
                        </div>
                    </div>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: svgW }}>
                        <svg
                            viewBox={`${-svgW / 2} ${-svgH / 2} ${svgW} ${svgH}`}
                            style={{ width: '100%', height: 'auto', overflow: 'visible' }}
                        >
                            <defs>
                                <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff6600" />
                                    <stop offset="100%" stopColor="#fcb484" />
                                </linearGradient>
                            </defs>
                            {/* Background rings */}
                            {[R1, R2].map(r => (
                                <circle key={r} cx={0} cy={0} r={r}
                                    fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 10" />
                            ))}

                            {/* Connections from center to nodes */}
                            {placedNodes.map(node => (
                                <line key={node.id + '-line'}
                                    x1={0} y1={0} x2={node.pos.x} y2={node.pos.y}
                                    stroke="var(--accent)" strokeWidth="0.5" strokeOpacity={hovered === node.id ? 0.6 : 0.15}
                                    style={{ transition: 'opacity 0.3s' }}
                                />
                            ))}

                            {/* Cross connections */}
                            {n1.map((n, i) => {
                                const a = placedNodes[i]
                                const b = placedNodes[(i + 1) % n1.length]
                                return (
                                    <line key={i + '-cross'}
                                        x1={a.pos.x} y1={a.pos.y} x2={b.pos.x} y2={b.pos.y}
                                        stroke="var(--accent)" strokeWidth="0.3" strokeOpacity={0.1}
                                        strokeDasharray="3 6"
                                    />
                                )
                            })}

                            {/* Animated particles */}
                            <AnimatedParticles nodes={placedNodes} />

                            {/* Center node */}
                            <g>
                                <circle cx={0} cy={0} r={48}
                                    fill="var(--surface-alt)" stroke="var(--accent)" strokeWidth="1.5" />
                                <motion.circle cx={0} cy={0} r={48}
                                    fill="none" stroke="url(#constellationGradient)" strokeWidth="1.5"
                                    strokeDasharray="20 60"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                                    style={{ transformOrigin: '0 0' }}
                                />
                                <text x={0} y={-6} textAnchor="middle" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '9px', fontWeight: 700, fill: 'var(--accent)' }}>DATA</text>
                                <text x={0} y={8} textAnchor="middle" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '9px', fontWeight: 700, fill: 'var(--accent)' }}>SCIENCE</text>
                            </g>

                            {/* Skill nodes */}
                            {placedNodes.map(node => {
                                const isHov = hovered === node.id
                                return (
                                    <g key={node.id}
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={() => setHovered(node.id)}
                                        onMouseLeave={() => setHovered(null)}
                                    >
                                        <circle cx={node.pos.x} cy={node.pos.y}
                                            r={isHov ? 30 : 24}
                                            fill={isHov ? 'var(--accent)' : 'var(--surface)'}
                                            stroke="var(--accent)"
                                            strokeWidth={isHov ? 2 : 0.5}
                                            style={{
                                                filter: isHov ? 'drop-shadow(0 0 10px var(--accent-glow))' : 'none',
                                                transition: 'all 0.3s'
                                            }}
                                        />
                                        <text x={node.pos.x} y={node.pos.y + 1}
                                            textAnchor="middle" dominantBaseline="middle"
                                            style={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: isHov ? '7px' : '6.5px',
                                                fill: isHov ? '#000' : 'var(--text)',
                                                userSelect: 'none', transition: 'all 0.3s'
                                            }}>
                                            {node.label.length > 8 ? node.label.slice(0, 7) + '…' : node.label}
                                        </text>

                                        {/* Tooltip on hover */}
                                        {isHov && (
                                            <g>
                                                <rect x={node.pos.x - 60} y={node.pos.y + 34} width={120} height={22} rx={3}
                                                    fill="var(--surface-alt)" stroke="var(--accent)" strokeWidth="0.7" />
                                                <text x={node.pos.x} y={node.pos.y + 46}
                                                    textAnchor="middle" dominantBaseline="middle"
                                                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '5.5px', fill: 'var(--muted-light)', userSelect: 'none' }}>
                                                    {node.desc.slice(0, 32)}
                                                </text>
                                            </g>
                                        )}
                                    </g>
                                )
                            })}
                        </svg>
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                        {[
                            { cat: 'tech', color: 'var(--accent)', label: 'Technology' },
                            { cat: 'ai', color: '#7fffd4', label: 'AI/ML' },
                            { cat: 'viz', color: '#40e0d0', label: 'Visualization' },
                            { cat: 'tool', color: '#b25a20', label: 'Tools' },
                            { cat: 'design', color: '#d17f48', label: 'Design' },
                        ].map(l => (
                            <div key={l.cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: 'var(--muted-light)' }}>{l.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function AnimatedParticles({ nodes }) {
    const [pts, setPts] = useState([])
    const frame = useRef(null)

    useEffect(() => {
        let list = []
        const addParticle = () => {
            const idx = Math.floor(Math.random() * nodes.length)
            list.push({ id: Math.random(), nodeIdx: idx, t: 0 })
            if (list.length > 30) list = list.slice(-30)
        }
        const tick = () => {
            list = list.map(p => ({ ...p, t: p.t + 0.015 })).filter(p => p.t < 1)
            if (Math.random() < 0.08) addParticle()
            setPts([...list])
            frame.current = requestAnimationFrame(tick)
        }
        frame.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame.current)
    }, [nodes])

    return (
        <g>
            {pts.map(p => {
                const node = nodes[p.nodeIdx]
                if (!node) return null
                const x = node.pos.x * p.t
                const y = node.pos.y * p.t
                return (
                    <circle key={p.id} cx={x} cy={y} r={2}
                        fill="var(--accent)" opacity={0.8}
                        style={{ filter: 'drop-shadow(0 0 3px var(--accent))' }}
                    />
                )
            })}
        </g>
    )
}
