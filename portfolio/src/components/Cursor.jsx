import { useEffect, useRef } from 'react'

export default function Cursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return

        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        let mouseX = -100, mouseY = -100
        let ringX = -100, ringY = -100
        let animId

        const onMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            dot.style.left = mouseX + 'px'
            dot.style.top = mouseY + 'px'
        }

        const animate = () => {
            ringX += (mouseX - ringX) * 0.14
            ringY += (mouseY - ringY) * 0.14
            ring.style.left = ringX + 'px'
            ring.style.top = ringY + 'px'
            animId = requestAnimationFrame(animate)
        }

        const onMouseOver = (e) => {
            if (e.target.closest('a, button, [data-hover], input, textarea')) {
                ring.style.transform = 'translate(-50%,-50%) scale(1.7)'
                ring.style.borderColor = '#ec4899'
                ring.style.boxShadow = '0 0 15px rgba(236, 72, 153, 0.4), 0 0 25px rgba(252, 132, 192, 0.3)'
            } else {
                ring.style.transform = 'translate(-50%,-50%) scale(1)'
                ring.style.borderColor = 'rgba(236, 72, 153, 0.5)'
                ring.style.boxShadow = 'none'
            }
        }

        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onMouseOver)
        animId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onMouseOver)
            cancelAnimationFrame(animId)
        }
    }, [])

    return (
        <>
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#ec4899',
                    boxShadow: '0 0 8px #ec4899',
                    transform: 'translate(-50%,-50%)',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    mixBlendMode: 'screen'
                }}
            />
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '1px solid rgba(236, 72, 153, 0.5)',
                    transform: 'translate(-50%,-50%)',
                    pointerEvents: 'none',
                    zIndex: 99998,
                    transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s, box-shadow 0.2s',
                    opacity: 0.8
                }}
            />
        </>
    )
}
