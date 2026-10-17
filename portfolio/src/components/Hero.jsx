import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { profile } from '../data/profile'
import PersonalPhotoCard from './PersonalPhotoCard'
import { Download, ArrowRight, Mail, MapPin } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'

export default function Hero() {
    const { lang } = useApp()
    const t = translations[lang].hero
    const [isSoufaryHovered, setIsSoufaryHovered] = useState(false)

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '110px 1.5rem 4rem',
                zIndex: 2,
            }}
        >
            {/* Ambient Background Glows */}
            <div style={{
                position: 'absolute',
                top: '30%',
                left: '20%',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                top: '40%',
                right: '15%',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(246, 154, 92, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Main Content Layout */}
            <div style={{
                maxWidth: '1240px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '3.5rem',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2
            }}>
                {/* Left Column: Personal Presentation & Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Availability Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            alignSelf: 'flex-start',
                            padding: '0.45rem 1rem',
                            borderRadius: '9999px',
                            background: 'rgba(255, 69, 0, 0.08)',
                            border: '1px solid rgba(255, 69, 0, 0.35)',
                            boxShadow: '0 0 15px rgba(255, 69, 0, 0.15)'
                        }}
                    >
                        <span style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'var(--neon-blue)',
                            boxShadow: '0 0 10px var(--neon-blue)'
                        }} />
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.72rem',
                            color: 'var(--neon-blue)',
                            letterSpacing: '0.08em',
                            fontWeight: 600
                        }}>
                            {t.badge}
                        </span>
                    </motion.div>

                    {/* Intro text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '1rem',
                            color: 'var(--muted)',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {t.intro}
                    </motion.div>

                    {/* Name: YASSMINE SOUFARY */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ margin: 0, lineHeight: 1.05 }}
                    >
                        {/* Solid White YASSMINE */}
                        <span style={{
                            display: 'block',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(3rem, 7.5vw, 6rem)',
                            fontWeight: 800,
                            color: 'var(--text-pure)',
                            letterSpacing: '-0.02em',
                            textShadow: '0 0 35px rgba(255, 255, 255, 0.2)'
                        }}>
                            YASSMINE
                        </span>

                        {/* Outlined SOUFARY that fills with electric blue/purple on hover */}
                        <span
                            onMouseEnter={() => setIsSoufaryHovered(true)}
                            onMouseLeave={() => setIsSoufaryHovered(false)}
                            style={{
                                display: 'block',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(3rem, 7.5vw, 6rem)',
                                fontWeight: 300,
                                letterSpacing: '0.06em',
                                cursor: 'pointer',
                                transition: 'all 0.4s ease',
                                WebkitTextStroke: isSoufaryHovered ? '1.5px transparent' : '1.5px var(--neon-blue)',
                                color: isSoufaryHovered ? 'transparent' : 'transparent',
                                background: isSoufaryHovered
                                    ? 'var(--electric-gradient)'
                                    : 'transparent',
                                WebkitBackgroundClip: isSoufaryHovered ? 'text' : 'unset',
                                textShadow: isSoufaryHovered ? '0 0 35px var(--accent-glow)' : 'none'
                            }}
                        >
                            SOUFARY
                        </span>
                    </motion.h1>

                    {/* Gradient separator bar */}
                    <div style={{
                        height: 2,
                        width: '100%',
                        maxWidth: '440px',
                        background: 'var(--electric-gradient)',
                        borderRadius: '2px',
                        boxShadow: '0 0 10px var(--accent-glow)'
                    }} />

                    {/* Animated Typewriter Specialization */}
                    <div style={{ minHeight: '3.2rem', display: 'flex', alignItems: 'center' }}>
                        <TypewriterSpecialty roles={t.roles} />
                    </div>

                    {/* Professional Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{
                            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                            color: 'var(--muted-light)',
                            fontWeight: 400,
                            lineHeight: 1.7,
                            maxWidth: '560px',
                            margin: 0
                        }}
                    >
                        {t.tagline}
                    </motion.p>

                    {/* Primary & Secondary Action CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            marginTop: '0.75rem'
                        }}
                    >
                        {/* Primary: Découvrir mes projets */}
                        <button
                            onClick={() => scrollTo('projects')}
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.8rem',
                                letterSpacing: '0.08em',
                                padding: '0.95rem 1.9rem',
                                border: 'none',
                                borderRadius: '8px',
                                background: 'var(--electric-gradient)',
                                color: '#000',
                                cursor: 'pointer',
                                fontWeight: 700,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                boxShadow: '0 0 25px var(--accent-glow)',
                                transition: 'all 0.25s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 0 35px var(--accent-glow)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 0 25px var(--accent-glow)'
                            }}
                        >
                            <span>{t.primaryCta}</span>
                            <ArrowRight size={16} />
                        </button>

                        {/* Secondary: Télécharger mon CV (PDF in public directory) */}
                        <a
                            href={profile.cvPath}
                            download="CV_Yassmine_Soufary.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.8rem',
                                letterSpacing: '0.08em',
                                padding: '0.95rem 1.8rem',
                                borderRadius: '8px',
                                border: '1px solid var(--purple)',
                                color: 'var(--purple)',
                                background: 'rgba(246, 154, 92, 0.08)',
                                cursor: 'pointer',
                                fontWeight: 600,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                transition: 'all 0.25s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(246, 154, 92, 0.2)'
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 0 25px var(--purple-glow)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(246, 154, 92, 0.08)'
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <Download size={16} />
                            <span>{t.secondaryCta}</span>
                        </a>
                    </motion.div>

                    {/* Social links & Location info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            marginTop: '0.5rem',
                            flexWrap: 'wrap'
                        }}
                    >
                        <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: 'var(--muted)',
                                textDecoration: 'none',
                                fontSize: '0.82rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                        >
                            <Github size={18} />
                            <span>GitHub</span>
                        </a>

                        <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: 'var(--muted)',
                                textDecoration: 'none',
                                fontSize: '0.82rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--purple)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                        >
                            <Linkedin size={18} />
                            <span>LinkedIn</span>
                        </a>

                        <a
                            href={`mailto:${profile.email}`}
                            aria-label="Send Email"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: 'var(--muted)',
                                textDecoration: 'none',
                                fontSize: '0.82rem',
                                fontFamily: "'JetBrains Mono', monospace",
                                transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                        >
                            <Mail size={18} />
                            <span>Email</span>
                        </a>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: 'var(--muted)',
                            fontSize: '0.82rem',
                            fontFamily: "'JetBrains Mono', monospace"
                        }}>
                            <MapPin size={16} color="var(--accent)" />
                            <span>{t.location}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Personal Portrait with 3D depth and Binary Data Disintegration */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    <PersonalPhotoCard />
                </div>
            </div>
        </section>
    )
}

function TypewriterSpecialty({ roles }) {
    const [currentText, setCurrentText] = useState('')
    const [roleIndex, setRoleIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const targetRole = roles[roleIndex] || ''
        let timer

        if (!isDeleting) {
            if (currentText.length < targetRole.length) {
                timer = setTimeout(() => {
                    setCurrentText(targetRole.slice(0, currentText.length + 1))
                }, 55)
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(true)
                }, 2200)
            }
        } else {
            if (currentText.length > 0) {
                timer = setTimeout(() => {
                    setCurrentText(targetRole.slice(0, currentText.length - 1))
                }, 28)
            } else {
                timer = setTimeout(() => {
                    setIsDeleting(false)
                    setRoleIndex((prev) => (prev + 1) % roles.length)
                }, 280)
            }
        }

        return () => clearTimeout(timer)
    }, [currentText, isDeleting, roleIndex, roles])

    const isEven = roleIndex % 2 === 0

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(1rem, 2.4vw, 1.35rem)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
        }}>
            <span style={{
                color: isEven ? 'var(--neon-blue)' : 'var(--purple)',
                textShadow: isEven
                    ? '0 0 15px var(--accent-glow)'
                    : '0 0 15px var(--purple-glow)',
                transition: 'color 0.3s ease'
            }}>
                {currentText}
            </span>
            <span
                style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '1.25em',
                    marginLeft: '6px',
                    background: isEven ? 'var(--neon-blue)' : 'var(--purple)',
                    boxShadow: isEven ? '0 0 10px var(--neon-blue)' : '0 0 10px var(--purple)',
                    animation: 'cursor-blink 1s infinite'
                }}
            />
        </div>
    )
}
