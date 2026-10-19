import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 12000
const ARM_COUNT = 5

function createGalaxy(THREE) {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const colorChoices = [
        new THREE.Color('#ec4899'),
        new THREE.Color('#f472b6'),
        new THREE.Color('#db2777'),
        new THREE.Color('#ffffff'),
    ]

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const radius = Math.pow(Math.random(), 0.62) * 13
        const arm = i % ARM_COUNT
        const armAngle = (arm / ARM_COUNT) * Math.PI * 2
        const rotation = radius * 0.48
        const spread = 0.06 + radius * 0.02
        const angle = armAngle + rotation + (Math.random() - 0.5) * spread * 2
        const index = i * 3

        positions[index] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread
        positions[index + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread
        positions[index + 2] = (Math.random() - 0.5) * (0.12 + radius * 0.025)

        const color = colorChoices[Math.random() < 0.68
            ? (Math.random() < 0.62 ? 0 : 1)
            : (Math.random() < 0.82 ? 2 : 3)]
        const brightness = 0.55 + Math.random() * 0.65
        colors[index] = color.r * brightness
        colors[index + 1] = color.g * brightness
        colors[index + 2] = color.b * brightness
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return geometry
}

function initializeGalaxy(container, THREE) {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100)
    camera.position.z = 23

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const galaxy = new THREE.Group()
    galaxy.add(new THREE.Points(
        createGalaxy(THREE),
        new THREE.PointsMaterial({
            size: 0.14,
            vertexColors: true,
            transparent: true,
            opacity: 0.52,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })
    ))
    scene.add(galaxy)

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targetTilt = { x: 0.24, y: 0 }
    const currentTilt = { ...targetTilt }
    let frameId = 0
    let lastFrameTime = 0

    const resize = () => {
        const { width, height } = container.getBoundingClientRect()
        if (!width || !height) return
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        galaxy.scale.set(Math.min(1, camera.aspect), Math.min(1, camera.aspect * 2.4), 1)
        renderer.setSize(width, height, false)
    }

    const handlePointerMove = (event) => {
        const bounds = container.getBoundingClientRect()
        if (
            event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom
        ) {
            targetTilt.x = 0.24
            targetTilt.y = 0
            return
        }
        targetTilt.y = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.24
        targetTilt.x = 0.24 + ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.18
    }

    const resetPointerTilt = () => {
        targetTilt.x = 0.24
        targetTilt.y = 0
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', resetPointerTilt)
    resize()

    const animate = (time) => {
        frameId = window.requestAnimationFrame(animate)
        if (document.hidden) return

        const delta = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.05) : 0
        lastFrameTime = time
        if (!motionPreference.matches) galaxy.rotation.z += delta * 0.05
        currentTilt.x += (targetTilt.x - currentTilt.x) * 0.035
        currentTilt.y += (targetTilt.y - currentTilt.y) * 0.035
        galaxy.rotation.x = currentTilt.x
        galaxy.rotation.y = currentTilt.y
        renderer.render(scene, camera)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => {
        window.cancelAnimationFrame(frameId)
        resizeObserver.disconnect()
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerleave', resetPointerTilt)
        galaxy.children.forEach((particleCloud) => {
            particleCloud.geometry.dispose()
            particleCloud.material.dispose()
        })
        renderer.dispose()
        renderer.domElement.remove()
    }
}

export default function BinaryRainBackground() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return undefined

        let isDisposed = false
        let cleanup

        import('three')
            .then((THREE) => {
                if (!isDisposed) cleanup = initializeGalaxy(container, THREE)
            })
            .catch((error) => {
                console.error('Unable to initialize the Three.js galaxy background.', error)
            })

        return () => {
            isDisposed = true
            cleanup?.()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}
