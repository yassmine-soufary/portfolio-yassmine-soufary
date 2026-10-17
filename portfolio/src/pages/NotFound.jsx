import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { ArrowLeft, Home, Compass } from 'lucide-react'

export default function NotFound() {
    const navigate = useNavigate()
    const { lang } = useApp()

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg)',
            padding: '2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 69, 0, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}
            >
                <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.8rem',
                    color: 'var(--neon-blue)',
                    letterSpacing: '0.2em',
                    marginBottom: '1rem'
                }}>
                    ERROR_404 // ROUTE_NOT_FOUND
                </div>

                <h1 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    fontWeight: 800,
                    margin: 0,
                    lineHeight: 1,
                    background: 'var(--electric-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px var(--accent-glow)'
                }}>
                    404
                </h1>

                <p style={{
                    color: 'var(--muted-light)',
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    margin: '1.5rem 0 2.5rem'
                }}>
                    {lang === 'fr'
                        ? "La page ou la ressource que vous recherchez semble introuvable ou a été déplacée dans une autre dimension numérique."
                        : "The page or resource you are looking for cannot be found or has been moved to another digital dimension."}
                </p>

                <button
                    onClick={() => navigate('/')}
                    style={{
                        padding: '0.9rem 2rem',
                        borderRadius: '8px',
                        background: 'var(--electric-gradient)',
                        color: '#000',
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.82rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: '0 0 25px var(--accent-glow)'
                    }}
                >
                    <Home size={16} />
                    <span>{lang === 'fr' ? "Retour à l'accueil" : "Return to Home"}</span>
                </button>
            </motion.div>
        </div>
    )
}
