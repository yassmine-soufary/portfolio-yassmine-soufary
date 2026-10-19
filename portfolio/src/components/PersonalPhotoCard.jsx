import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import photoImg from '../assets/maphotos.jpg'

export default function PersonalPhotoCard() {
    const [isHovered, setIsHovered] = useState(false)
    const [isTouched, setIsTouched] = useState(false)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [zapKey, setZapKey] = useState(0)
    const cardRef = useRef(null)
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const progressRef = useRef(0) // 0: photo, 1: binary data scattered

    const active = isHovered || isTouched

    // 3D Tilt calculation
    const handleMouseMove = (e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const rotX = -(y / (rect.height / 2)) * 12
        const rotY = (x / (rect.width / 2)) * 12
        setTilt({ x: rotX, y: rotY })
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setTilt({ x: 0, y: 0 })
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
        setZapKey(prev => prev + 1) // trigger electric arc sizzle
    }

    const handleTouchToggle = () => {
        setIsTouched(prev => !prev)
        setZapKey(prev => prev + 1)
    }

    // Canvas particle & binary transformation effect
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = 260
        canvas.width = size
        canvas.height = size
        const center = size / 2

        // Generate static grid of data points inside circular mask
        const particles = []
        const count = 180
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2
            const r = Math.sqrt(Math.random()) * (size * 0.46)
            const originX = center + Math.cos(angle) * r
            const originY = center + Math.sin(angle) * r
            const scatterAngle = angle + (Math.random() - 0.5) * 0.8
            const scatterDist = 20 + Math.random() * 55

            particles.push({
                originX,
                originY,
                scatterX: center + Math.cos(scatterAngle) * (r + scatterDist),
                scatterY: center + Math.sin(scatterAngle) * (r + scatterDist),
                char: Math.random() > 0.5 ? '1' : '0',
                color: Math.random() > 0.45 ? '#ec4899' : (Math.random() > 0.3 ? '#db2777' : '#FFFFFF'),
                size: 9 + Math.floor(Math.random() * 5),
                jitterSpeed: 0.05 + Math.random() * 0.1
            })
        }

        let lastTime = performance.now()

        const render = (now) => {
            const dt = (now - lastTime) / 1000
            lastTime = now

            // Animate progress smoothly towards 1 (active) or 0 (idle)
            const target = active ? 1 : 0
            const speed = active ? 2.6 : 3.2
            if (progressRef.current < target) {
                progressRef.current = Math.min(target, progressRef.current + dt * speed)
            } else if (progressRef.current > target) {
                progressRef.current = Math.max(target, progressRef.current - dt * speed)
            }

            const p = progressRef.current

            ctx.clearRect(0, 0, size, size)

            if (p > 0.01) {
                ctx.save()
                // Clip to circular area
                ctx.beginPath()
                ctx.arc(center, center, size * 0.48, 0, Math.PI * 2)
                ctx.clip()

                // 1. Digital scanline
                const scanY = ((now * 0.25) % size)
                ctx.fillStyle = 'rgba(236, 72, 153, 0.25)'
                ctx.fillRect(0, scanY, size, 2)

                // 2. Cyber glow background wash
                ctx.fillStyle = `rgba(5, 5, 16, ${p * 0.75})`
                ctx.fillRect(0, 0, size, size)

                // 3. Render binary digits & dispersing particles
                for (let i = 0; i < particles.length; i++) {
                    const pt = particles[i]
                    const ease = 1 - Math.pow(1 - p, 3)
                    const x = pt.originX + (pt.scatterX - pt.originX) * ease + Math.sin(now * 0.01 + i) * 2 * p
                    const y = pt.originY + (pt.scatterY - pt.originY) * ease + Math.cos(now * 0.01 + i) * 2 * p

                    ctx.font = `${pt.size}px 'JetBrains Mono', monospace`
                    ctx.fillStyle = pt.color
                    ctx.globalAlpha = p * 0.95
                    ctx.shadowColor = pt.color
                    ctx.shadowBlur = 6 * p

                    const displayChar = (Math.sin(now * pt.jitterSpeed + i) > 0.6)
                        ? (pt.char === '1' ? '0' : '1')
                        : pt.char

                    ctx.fillText(displayChar, x - 4, y + 4)
                }

                ctx.restore()
            }

            animRef.current = requestAnimationFrame(render)
        }

        animRef.current = requestAnimationFrame(render)

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current)
        }
    }, [active])

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1000px',
            userSelect: 'none'
        }}>
            {/* Outer ambient energy glow */}
            <motion.div
                animate={{
                    scale: active ? [1, 1.15, 1.08] : [1, 1.04, 1],
                    opacity: active ? [0.6, 0.9, 0.75] : [0.25, 0.45, 0.25]
                }}
                transition={{ repeat: Infinity, duration: active ? 1.5 : 4, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    width: 290,
                    height: 290,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(236, 72, 153,0.25) 0%, rgba(246, 92, 169,0.2) 50%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* Main Interactive Card Container with 3D Tilt */}
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleTouchToggle}
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                    y: active ? -6 : [-4, 4, -4]
                }}
                transition={{
                    rotateX: { type: 'spring', stiffness: 300, damping: 25 },
                    rotateY: { type: 'spring', stiffness: 300, damping: 25 },
                    y: active ? { duration: 0.3 } : { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
                }}
                style={{
                    position: 'relative',
                    width: 250,
                    height: 250,
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    zIndex: 2
                }}
                data-hover
            >
                {/* 1. Rotating Dual-Glow Cyber Ring (Electric Blue & Purple) */}
                <svg
                    style={{
                        position: 'absolute',
                        top: -16,
                        left: -16,
                        width: 282,
                        height: 282,
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                    <defs>
                        <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f472b6" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#db2777" />
                        </linearGradient>
                        <linearGradient id="cyberGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#db2777" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>

                    {/* Outer dashed ring */}
                    <motion.circle
                        cx={141}
                        cy={141}
                        r={136}
                        fill="none"
                        stroke="url(#cyberGradient)"
                        strokeWidth="1.8"
                        strokeDasharray="24 16 8 16"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                        style={{ transformOrigin: '141px 141px' }}
                    />

                    {/* Counter-rotating fine ring */}
                    <motion.circle
                        cx={141}
                        cy={141}
                        r={131}
                        fill="none"
                        stroke="url(#cyberGradient2)"
                        strokeWidth="1"
                        strokeDasharray="6 30"
                        strokeOpacity="0.7"
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                        style={{ transformOrigin: '141px 141px' }}
                    />

                    {/* 4 Cardinal Cyber Marks */}
                    {[0, 90, 180, 270].map((deg) => (
                        <g key={deg} transform={`rotate(${deg} 141 141)`}>
                            <line x1={141} y1={2} x2={141} y2={12} stroke="#ec4899" strokeWidth="2.5" />
                            <circle cx={141} cy={16} r={2} fill="#db2777" />
                        </g>
                    ))}
                </svg>

                {/* 2. Electric Arc Zap that shoots across the frame border on hover */}
                <ElectricBorderArc key={zapKey} active={active} />

                {/* 3. Luminous Pulse Ring on hover */}
                {active && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0.9 }}
                        animate={{ scale: 1.25, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            inset: -6,
                            borderRadius: '50%',
                            border: '2px solid #ec4899',
                            boxShadow: '0 0 20px #ec4899, 0 0 40px #db2777',
                            pointerEvents: 'none'
                        }}
                    />
                )}

                {/* 4. Natural Portrait Mask Container */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#121212',
                    border: '2px solid rgba(236, 72, 153, 0.4)',
                    boxShadow: active
                        ? '0 0 35px rgba(236, 72, 153, 0.5), 0 0 60px rgba(246, 92, 169, 0.4)'
                        : '0 0 20px rgba(236, 72, 153, 0.25)',
                    transition: 'box-shadow 0.5s ease, border-color 0.5s ease'
                }}>
                    {/* Natural Photo */}
                    <img
                        src={photoImg}
                        alt="Yassmine Soufary"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center 15%',
                            display: 'block',
                            filter: active
                                ? 'contrast(1.2) brightness(0.85) saturate(1.1)'
                                : 'none',
                            transform: active ? 'scale(1.05)' : 'scale(1)',
                            opacity: active ? 0.25 : 1,
                            transition: 'opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease'
                        }}
                    />

                    {/* Canvas for Binary Decomposition & Data Particles */}
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            zIndex: 3
                        }}
                    />

                    {/* Subtle Holographic Grid Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(circle, rgba(236, 72, 153,0.12) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                        pointerEvents: 'none',
                        opacity: active ? 0.8 : 0.2,
                        transition: 'opacity 0.4s ease'
                    }} />
                </div>
            </motion.div>

            {/* Interactive Status Indicator beneath Photo */}
            <motion.div
                animate={{ opacity: active ? 1 : 0.7 }}
                style={{
                    marginTop: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: active ? '#ec4899' : 'var(--muted-light)'
                }}
            >
                <span style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: active ? '#ec4899' : '#db2777',
                    boxShadow: active ? '0 0 10px #ec4899' : '0 0 6px #db2777'
                }} />
                <span>
                    {active ? 'DATA_TRANSFORMATION: 1011001' : 'HOVER TO DIGITIZE // TOUCH'}
                </span>
            </motion.div>
        </div>
    )
}

function ElectricBorderArc({ active }) {
    if (!active) return null

    return (
        <svg
            style={{
                position: 'absolute',
                inset: -14,
                width: 278,
                height: 278,
                pointerEvents: 'none',
                zIndex: 10
            }}
        >
            <motion.path
                d="M 139 5 Q 230 20 265 110 T 250 220 T 139 273 T 15 200 T 20 80 Z"
                fill="none"
                stroke="#ec4899"
                strokeWidth="2.2"
                strokeDasharray="40 180"
                filter="drop-shadow(0 0 8px #ec4899) drop-shadow(0 0 14px #db2777)"
                animate={{
                    strokeDashoffset: [0, -440],
                    opacity: [0.9, 1, 0.4, 1]
                }}
                transition={{
                    strokeDashoffset: { repeat: Infinity, duration: 1.2, ease: 'linear' },
                    opacity: { repeat: Infinity, duration: 0.15 }
                }}
            />
            <motion.path
                d="M 139 5 Q 60 40 15 140 T 80 250 T 200 260 T 265 140 Z"
                fill="none"
                stroke="#db2777"
                strokeWidth="1.6"
                strokeDasharray="25 150"
                filter="drop-shadow(0 0 6px #db2777)"
                animate={{
                    strokeDashoffset: [0, 360],
                    opacity: [0.3, 0.9, 0.2]
                }}
                transition={{
                    strokeDashoffset: { repeat: Infinity, duration: 0.9, ease: 'linear' },
                    opacity: { repeat: Infinity, duration: 0.2 }
                }}
            />
        </svg>
    )
}
