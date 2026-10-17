import { useEffect, useRef } from 'react'

export default function BinaryRainBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animId
        let width = 0
        let height = 0
        // Limit DPR to 1.5 to maximize performance and save battery
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

        // Check reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let isTabVisible = !document.hidden

        const handleVisibilityChange = () => {
            isTabVisible = !document.hidden
        }
        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Resize handler
        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            ctx.scale(dpr, dpr)
            initDrops()
            initNodes()
        }

        // --- 1. BINARY RAIN CONFIG ---
        const isMobile = window.innerWidth < 768
        const fontSize = isMobile ? 18 : 14
        let columns = 0
        let drops = []
        let speeds = []
        let colors = []
        let charClusters = []

        const initDrops = () => {
            columns = Math.floor(width / fontSize)
            drops = []
            speeds = []
            colors = []
            charClusters = []
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100
                speeds[i] = 0.5 + Math.random() * 0.8
                // Alternate between orange, crimson, and muted white
                const r = Math.random()
                if (r > 0.6) {
                    colors[i] = 'rgba(255, 69, 0,' // Neon orange
                } else if (r > 0.25) {
                    colors[i] = 'rgba(220, 38, 38,' // Purple
                } else {
                    colors[i] = 'rgba(248, 250, 252,' // Muted white
                }
                charClusters[i] = 0
            }
        }

        // --- 2. NEURAL NODES ---
        let nodeCount = isMobile ? 18 : Math.min(Math.floor(window.innerWidth / 40), 40)
        let nodes = []

        const initNodes = () => {
            nodes = []
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    radius: 1.2 + Math.random() * 1.5,
                    color: Math.random() > 0.5 ? '#ff4500' : '#dc2626',
                    pulse: Math.random() * Math.PI * 2
                })
            }
        }

        // --- 3. ELECTRIC LIGHTNING GENERATOR ---
        let lightning = null
        let nextLightningTime = Date.now() + 4000 + Math.random() * 6000

        const createLightningArc = () => {
            const startX = Math.random() * width
            const startY = 0
            const segments = []
            let currX = startX
            let currY = startY
            const maxSegments = 10 + Math.floor(Math.random() * 8)
            const targetY = height * (0.3 + Math.random() * 0.3)
            const dy = targetY / maxSegments

            for (let i = 0; i < maxSegments; i++) {
                const nextX = currX + (Math.random() - 0.5) * 50
                const nextY = currY + dy
                segments.push({ x1: currX, y1: currY, x2: nextX, y2: nextY })

                if (Math.random() > 0.65) {
                    segments.push({
                        x1: currX,
                        y1: currY,
                        x2: currX + (Math.random() - 0.5) * 65,
                        y2: currY + dy * 1.4,
                        isBranch: true
                    })
                }
                currX = nextX
                currY = nextY
            }

            // Electrically activate nearby binary columns
            const hitCol = Math.floor(startX / fontSize)
            for (let c = Math.max(0, hitCol - 4); c < Math.min(columns, hitCol + 5); c++) {
                charClusters[c] = 1.0 // pulse brightness
            }

            return {
                segments,
                life: 1.0,
                color: Math.random() > 0.5 ? '#ff4500' : '#dc2626'
            }
        }

        // --- MOUSE ENERGY FIELD ---
        let targetMouseX = -1000
        let targetMouseY = -1000
        let currentMouseX = -1000
        let currentMouseY = -1000

        const handleMouseMove = (e) => {
            targetMouseX = e.clientX
            targetMouseY = e.clientY
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)

        // --- ANIMATION LOOP ---
        let lastTime = performance.now()

        const render = (time) => {
            animId = requestAnimationFrame(render)

            // Pause if tab is hidden to save GPU/battery
            if (!isTabVisible) return

            const dt = Math.min((time - lastTime) / 1000, 0.1)
            lastTime = time

            // Interpolate mouse
            currentMouseX += (targetMouseX - currentMouseX) * 0.08
            currentMouseY += (targetMouseY - currentMouseY) * 0.08

            // Soft clear trailing
            ctx.fillStyle = 'rgba(11, 11, 11, 0.22)'
            ctx.fillRect(0, 0, width, height)

            // 1. Draw Neural Connections & Nodes
            const maxDist = 130
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i]

                if (!prefersReducedMotion) {
                    a.x += a.vx
                    a.y += a.vy
                    a.pulse += 0.02

                    if (a.x < 0) a.x = width
                    if (a.x > width) a.x = 0
                    if (a.y < 0) a.y = height
                    if (a.y > height) a.y = 0
                }

                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j]
                    const dist = Math.hypot(a.x - b.x, a.y - b.y)
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.14
                        ctx.strokeStyle = `rgba(255, 69, 0, ${alpha})`
                        ctx.lineWidth = 0.6
                        ctx.beginPath()
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b.x, b.y)
                        ctx.stroke()
                    }
                }

                const glow = (Math.sin(a.pulse) + 1) * 0.5
                ctx.fillStyle = a.color
                ctx.globalAlpha = 0.3 + glow * 0.3
                ctx.beginPath()
                ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 1.0
            }

            // 2. Draw Falling Binary Rain (0 and 1)
            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

            for (let i = 0; i < columns; i++) {
                const char = Math.random() > 0.5 ? '1' : '0'
                const x = i * fontSize
                const y = drops[i] * fontSize

                // Mouse proximity reaction: slight energy field repulsion
                const distToMouse = Math.hypot(x - currentMouseX, y - currentMouseY)
                const isNearMouse = distToMouse < 90
                const clusterEnergy = charClusters[i] || 0

                // Decrease cluster energy
                if (charClusters[i] > 0) {
                    charClusters[i] = Math.max(0, charClusters[i] - dt * 1.5)
                }

                if (isNearMouse || clusterEnergy > 0.3) {
                    // Bright electric cluster
                    ctx.fillStyle = '#FFFFFF'
                    ctx.shadowColor = '#ff4500'
                    ctx.shadowBlur = 10
                } else if (Math.random() > 0.9) {
                    ctx.fillStyle = '#FFFFFF'
                    ctx.shadowColor = '#dc2626'
                    ctx.shadowBlur = 6
                } else {
                    const alpha = 0.12 + (Math.sin(i + time * 0.001) + 1) * 0.06
                    ctx.fillStyle = `${colors[i]} ${alpha})`
                    ctx.shadowBlur = 0
                }

                ctx.fillText(char, x, y)
                ctx.shadowBlur = 0

                if (!prefersReducedMotion) {
                    drops[i] += speeds[i] * 0.38
                    if (drops[i] * fontSize > height && Math.random() > 0.98) {
                        drops[i] = 0
                        speeds[i] = 0.5 + Math.random() * 0.8
                    }
                }
            }

            // 3. Lightning Flash & Arc
            const now = Date.now()
            if (!prefersReducedMotion) {
                if (now > nextLightningTime && !lightning) {
                    lightning = createLightningArc()
                    nextLightningTime = now + 8000 + Math.random() * 10000
                }

                if (lightning) {
                    lightning.life -= dt * 2.6

                    if (lightning.life > 0) {
                        ctx.save()
                        if (lightning.life > 0.7) {
                            ctx.fillStyle = lightning.color === '#ff4500'
                                ? 'rgba(255, 69, 0, 0.03)'
                                : 'rgba(246, 154, 92, 0.03)'
                            ctx.fillRect(0, 0, width, height)
                        }

                        ctx.strokeStyle = lightning.color
                        ctx.shadowColor = lightning.color
                        ctx.shadowBlur = 12
                        ctx.lineWidth = 1.6 * lightning.life

                        lightning.segments.forEach(seg => {
                            ctx.globalAlpha = seg.isBranch ? lightning.life * 0.6 : lightning.life
                            ctx.beginPath()
                            ctx.moveTo(seg.x1, seg.y1)
                            ctx.lineTo(seg.x2, seg.y2)
                            ctx.stroke()
                        })
                        ctx.restore()
                    } else {
                        lightning = null
                    }
                }
            }
        }

        animId = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(animId)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                background: 'transparent'
            }}
        />
    )
}
