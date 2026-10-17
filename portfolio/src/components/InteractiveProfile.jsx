import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NODES = [
    { label: 'Python', desc: 'Core language for data & AI', angle: 0 },
    { label: 'SQL', desc: 'MySQL, relational databases', angle: 51 },
    { label: 'DATA', desc: 'Data-driven mindset', angle: 103 },
    { label: 'AI', desc: 'Machine learning, intelligent systems', angle: 154 },
    { label: 'IoT', desc: 'ESP32, connected systems', angle: 206 },
    { label: 'Power BI', desc: 'Business intelligence dashboards', angle: 257 },
    { label: 'UI/UX', desc: 'User-centered design', angle: 308 },
]

function polarToXY(angle, r) {
    const rad = (angle - 90) * (Math.PI / 180)
    return { x: Math.cos(rad) * r, y: Math.sin(rad) * r }
}

export default function InteractiveProfile() {
    const [clicked, setClicked] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [hovered, setHovered] = useState(null)
    const [scanPos, setScanPos] = useState(0)
    const [particles, setParticles] = useState([])
    const R = 140

    // Scan line animation
    useEffect(() => {
        if (!clicked) return
        let raf, pos = 0
        const tick = () => {
            pos = (pos + 0.8) % 100
            setScanPos(pos)
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [clicked])

    // Particle animation
    useEffect(() => {
        if (!expanded) { setParticles([]); return }
        const interval = setInterval(() => {
            const nodeIdx = Math.floor(Math.random() * NODES.length)
            setParticles(prev => [...prev.slice(-20), {
                id: Date.now(), nodeIdx,
                t: 0, fromCenter: Math.random() > 0.5
            }])
        }, 300)
        return () => clearInterval(interval)
    }, [expanded])

    const handleClick = () => {
        if (!clicked) {
            setClicked(true)
            setTimeout(() => setExpanded(true), 1200)
        }
    }

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            data-hover>
            {/* Outer orbit ring */}
            <svg
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', overflow: 'visible' }}
                width={R * 2 + 120}
                height={R * 2 + 120}
                viewBox={`${-R - 60} ${-R - 60} ${R * 2 + 120} ${R * 2 + 120}`}
            >
                {/* Orbit circles */}
                <circle cx={0} cy={0} r={R} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 8" />
                <motion.circle
                    cx={0} cy={0} r={R}
                    fill="none" stroke="var(--accent)" strokeWidth="1"
                    strokeDasharray="80 400"
                    strokeOpacity={0.4}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    style={{ transformOrigin: '0 0 0' }}
                />

                {/* Node connections */}
                {expanded && NODES.map((node, i) => {
                    const { x, y } = polarToXY(node.angle, R)
                    return (
                        <motion.line key={node.label}
                            x1={0} y1={0} x2={x} y2={y}
                            stroke="var(--accent)" strokeWidth="0.5" strokeOpacity="0.3"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                        />
                    )
                })}

                {/* Nodes */}
                {NODES.map((node, i) => {
                    const { x, y } = polarToXY(node.angle, R)
                    const isHov = hovered === node.label
                    return (
                        <AnimatePresence key={node.label}>
                            {expanded && (
                                <motion.g
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={() => setHovered(node.label)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    <circle cx={x} cy={y} r={isHov ? 22 : 16}
                                        fill={isHov ? 'var(--accent)' : 'var(--surface)'}
                                        stroke="var(--accent)" strokeWidth={isHov ? 2 : 1}
                                        style={{ filter: isHov ? 'drop-shadow(0 0 8px var(--accent-glow))' : 'none', transition: 'all 0.3s' }}
                                    />
                                    <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
                                        style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '6px', fill: isHov ? '#000' : 'var(--accent)',
                                            userSelect: 'none', transition: 'all 0.3s'
                                        }}>
                                        {node.label.length > 7 ? node.label.slice(0, 6) + '…' : node.label}
                                    </text>
                                    {/* Tooltip */}
                                    {isHov && (
                                        <g>
                                            <rect x={x - 50} y={y + 26} width={100} height={20} rx={3}
                                                fill="var(--surface-alt)" stroke="var(--accent)" strokeWidth="0.5" />
                                            <text x={x} y={y + 37} textAnchor="middle" dominantBaseline="middle"
                                                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '5px', fill: 'var(--muted-light)', userSelect: 'none' }}>
                                                {node.desc.slice(0, 28)}
                                            </text>
                                        </g>
                                    )}
                                </motion.g>
                            )}
                        </AnimatePresence>
                    )
                })}

                {/* Particles flowing along lines */}
                {expanded && NODES.map((node, i) => {
                    const { x, y } = polarToXY(node.angle, R)
                    return (
                        <ParticleLine key={i} x={x} y={y} />
                    )
                })}
            </svg>

            {/* Photo frame */}
            <motion.div
                onClick={handleClick}
                whileHover={{ scale: 1.02 }}
                style={{
                    position: 'relative', cursor: 'pointer',
                    width: 160, height: 160, flexShrink: 0
                }}
            >
                {/* Rotating border */}
                <svg style={{
                    position: 'absolute', top: -8, left: -8,
                    width: 176, height: 176
                }}>
                    <motion.rect
                        x={4} y={4} width={168} height={168}
                        rx={4}
                        fill="none" stroke="var(--accent)" strokeWidth="1.5"
                        strokeDasharray="30 10"
                        strokeOpacity={0.6}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                        style={{ transformOrigin: '88px 88px' }}
                    />
                    <motion.rect
                        x={4} y={4} width={168} height={168}
                        rx={4}
                        fill="none" stroke="var(--accent)" strokeWidth="0.5"
                        strokeDasharray="5 35"
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                        style={{ transformOrigin: '88px 88px', opacity: 0.3 }}
                    />
                </svg>

                {/* Corner data points */}
                {[[-8, -8], [168, -8], [-8, 168], [168, 168]].map(([cx, cy], i) => (
                    <motion.div key={i}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                        style={{
                            position: 'absolute', width: 6, height: 6,
                            borderRadius: '50%', background: 'var(--accent)',
                            boxShadow: '0 0 8px var(--accent-glow)',
                            left: cx - 3, top: cy - 3
                        }}
                    />
                ))}

                {/* Photo placeholder */}
                <div style={{
                    width: 160, height: 160, overflow: 'hidden', position: 'relative',
                    background: 'var(--surface)',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}>
                    <img
                        src="/photo.jpg"
                        alt="Yassmine Soufary"
                        style={{
                            width: '100%', height: '100%', objectFit: 'cover',
                            filter: clicked ? 'grayscale(1) contrast(1.4) brightness(0.7)' : 'none',
                            transition: 'filter 0.8s ease',
                            display: 'block'
                        }}
                        onError={e => { e.target.style.display = 'none' }}
                    />
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex',
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        background: clicked ? 'rgba(0,255,200,0.05)' : 'transparent',
                        transition: 'background 0.8s ease'
                    }}>
                        {/* Scan line */}
                        {clicked && (
                            <div style={{
                                position: 'absolute', left: 0, right: 0, height: 2,
                                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                                top: `${scanPos}%`, opacity: 0.7
                            }} />
                        )}
                        {/* Fallback initials */}
                        <span style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '2.5rem', fontWeight: 700,
                            color: clicked ? 'var(--accent)' : 'var(--muted)',
                            transition: 'color 0.8s ease'
                        }}>YS</span>
                    </div>
                </div>

                {/* Click prompt */}
                {!clicked && (
                    <motion.div
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{
                            position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
                            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
                            color: 'var(--accent)', whiteSpace: 'nowrap', letterSpacing: '0.15em'
                        }}
                    >
                        CLICK TO ACTIVATE
                    </motion.div>
                )}

                {/* Binary overlay */}
                {clicked && <BinaryOverlay />}
            </motion.div>
        </div>
    )
}

function BinaryOverlay() {
    const [chars, setChars] = useState([])
    useEffect(() => {
        const interval = setInterval(() => {
            setChars(Array.from({ length: 12 }, () => ({
                x: Math.random() * 140 + 10, y: Math.random() * 140 + 10,
                val: Math.random() > 0.5 ? '1' : '0',
                id: Math.random()
            })))
        }, 200)
        return () => clearInterval(interval)
    }, [])
    return (
        <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} width={160} height={160}>
            {chars.map(c => (
                <text key={c.id} x={c.x} y={c.y}
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', fill: 'var(--accent)', opacity: 0.5 }}>
                    {c.val}
                </text>
            ))}
        </svg>
    )
}

function ParticleLine({ x, y }) {
    const [t, setT] = useState(Math.random())
    const ref = useRef(null)
    useEffect(() => {
        let raf
        const tick = () => {
            setT(prev => (prev + 0.008) % 1)
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])
    const px = x * t
    const py = y * t
    return (
        <circle cx={px} cy={py} r={2}
            fill="var(--accent)"
            opacity={0.7}
            style={{ filter: 'drop-shadow(0 0 3px var(--accent))' }}
        />
    )
}
