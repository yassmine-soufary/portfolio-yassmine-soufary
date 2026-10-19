import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 180
const COLORS = ['#ec4899', '#f472b6', '#d946ef', '#f9a8d4', '#f5d0a9']

export default function CursorParticleTrail() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (!canvas || !context) {
            console.error('Unable to initialize the cursor particle trail canvas.')
            return undefined
        }
        if (
            window.matchMedia('(pointer: coarse)').matches ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return undefined
        }

        const particles = []
        let frameId = 0
        let previousX = null
        let previousY = null
        let pixelRatio = 1

        const resize = () => {
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.round(window.innerWidth * pixelRatio)
            canvas.height = Math.round(window.innerHeight * pixelRatio)
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        }

        const drawParticle = (particle, opacity) => {
            context.save()
            context.translate(particle.x, particle.y)
            context.rotate(particle.rotation)
            context.globalAlpha = opacity
            context.fillStyle = particle.color
            context.shadowColor = particle.color
            context.shadowBlur = particle.isStar ? 9 : 6

            if (particle.isStar) {
                const arm = particle.size
                context.beginPath()
                context.moveTo(0, -arm)
                context.lineTo(arm * 0.25, -arm * 0.25)
                context.lineTo(arm, 0)
                context.lineTo(arm * 0.25, arm * 0.25)
                context.lineTo(0, arm)
                context.lineTo(-arm * 0.25, arm * 0.25)
                context.lineTo(-arm, 0)
                context.lineTo(-arm * 0.25, -arm * 0.25)
                context.closePath()
                context.fill()
            } else {
                context.beginPath()
                context.arc(0, 0, particle.size, 0, Math.PI * 2)
                context.fill()
            }

            context.restore()
        }

        const animate = (time) => {
            context.clearRect(0, 0, window.innerWidth, window.innerHeight)

            for (let index = particles.length - 1; index >= 0; index -= 1) {
                const particle = particles[index]
                const elapsed = time - particle.bornAt
                const progress = elapsed / particle.life
                if (progress >= 1) {
                    particles.splice(index, 1)
                    continue
                }

                particle.x += particle.vx
                particle.y += particle.vy
                particle.vx *= 0.985
                particle.vy *= 0.985

                const fadeIn = Math.min(progress / 0.12, 1)
                const fadeOut = Math.min((1 - progress) / 0.42, 1)
                const scale = 1 - progress * 0.78
                particle.size = particle.initialSize * scale
                drawParticle(particle, fadeIn * fadeOut)
            }

            if (particles.length) {
                frameId = window.requestAnimationFrame(animate)
            } else {
                frameId = 0
            }
        }

        const addParticle = (x, y, time) => {
            const angle = Math.random() * Math.PI * 2
            const speed = 0.25 + Math.random() * 1.45
            const initialSize = Math.random() < 0.2 ? 2.2 : 1.1 + Math.random() * 1.5
            particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                bornAt: time,
                life: 430 + Math.random() * 420,
                initialSize,
                size: initialSize,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                isStar: Math.random() < 0.24,
                rotation: Math.random() * Math.PI,
            })
            if (particles.length > MAX_PARTICLES) particles.shift()
        }

        const handleMouseMove = (event) => {
            const time = performance.now()
            const distance = previousX === null
                ? 0
                : Math.hypot(event.clientX - previousX, event.clientY - previousY)
            const count = Math.min(4, Math.max(1, Math.ceil(distance / 9)))

            for (let index = 0; index < count; index += 1) {
                const progress = (index + 1) / count
                const x = previousX === null
                    ? event.clientX
                    : previousX + (event.clientX - previousX) * progress
                const y = previousY === null
                    ? event.clientY
                    : previousY + (event.clientY - previousY) * progress
                addParticle(x, y, time)
            }

            previousX = event.clientX
            previousY = event.clientY
            if (!frameId) frameId = window.requestAnimationFrame(animate)
        }

        resize()
        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove, { passive: true })

        return () => {
            window.cancelAnimationFrame(frameId)
            window.removeEventListener('resize', resize)
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
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    )
}
