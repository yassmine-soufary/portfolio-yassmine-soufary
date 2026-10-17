import { useState } from 'react'

const technologies = [
    "Python", "SQL", "PostgreSQL", "MySQL", "NumPy",
    "Machine Learning", "Deep Learning", "Data Mining",
    "Power BI", "Tableau", "Flask", "Docker", "Git",
    "HTML", "CSS", "Arduino", "IoT", "Cloud",
    "UML", "MCD", "Data Warehouse"
]

export default function TechMarquee() {
    const [isPaused, setIsPaused] = useState(false)

    // Double the array for seamless infinite marquee loop
    const marqueeItems = [...technologies, ...technologies, ...technologies]

    return (
        <section
            aria-label="Technologies"
            style={{
                position: 'relative',
                zIndex: 2,
                overflow: 'hidden',
                background: 'var(--surface)',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                padding: '1.25rem 0',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Fade Gradients at Edges */}
            <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '120px',
                background: 'linear-gradient(to right, var(--surface) 20%, transparent 100%)',
                zIndex: 3,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '120px',
                background: 'linear-gradient(to left, var(--surface) 20%, transparent 100%)',
                zIndex: 3,
                pointerEvents: 'none'
            }} />

            {/* Marquee Track */}
            <div
                style={{
                    display: 'flex',
                    gap: '2.5rem',
                    width: 'max-content',
                    animation: 'marquee-scroll 38s linear infinite',
                    animationPlayState: isPaused ? 'paused' : 'running',
                }}
            >
                {marqueeItems.map((tech, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            whiteSpace: 'nowrap',
                            userSelect: 'none'
                        }}
                    >
                        <span style={{
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: i % 2 === 0 ? 'var(--neon-blue)' : 'var(--purple)',
                            boxShadow: i % 2 === 0
                                ? '0 0 8px var(--neon-blue)'
                                : '0 0 8px var(--purple)',
                        }} />
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            letterSpacing: '0.08em',
                            color: 'var(--text)',
                            transition: 'color 0.2s ease',
                        }}>
                            {tech}
                        </span>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }
                @media (prefers-reduced-motion: reduce) {
                    div[style*="marquee-scroll"] {
                        animation: none !important;
                    }
                }
            `}</style>
        </section>
    )
}
