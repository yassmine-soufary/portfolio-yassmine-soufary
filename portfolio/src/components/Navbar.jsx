import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { Search, Sun, Moon, Globe, Briefcase, Menu, X, FileText } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
    const {
        lang,
        toggleLang,
        theme,
        toggleTheme,
        setIsCommandPaletteOpen,
        setIsRecruiterModalOpen
    } = useApp()

    const t = translations[lang].nav
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')
    const location = useLocation()

    const navLinks = [
        { href: '#about', id: 'about', label: t.about },
        { href: '#experience', id: 'experience', label: t.experience },
        { href: '#projects', id: 'projects', label: t.projects },
        { href: '#skills', id: 'skills', label: t.skills },
        { href: '#contact', id: 'contact', label: t.contact },
    ]

    // Scroll detector & Active section spy
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40)

            const sectionIds = ['contact', 'skills', 'projects', 'experience', 'about', 'hero']
            for (const id of sectionIds) {
                const el = document.getElementById(id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= 200) {
                        setActiveSection(id)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleNav = (href) => {
        setMobileOpen(false)
        if (location.pathname !== '/') {
            window.location.href = '/' + href
            return
        }
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="site-navbar"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: scrolled ? '0.65rem 1.5rem' : '0.95rem 1.5rem',
                background: scrolled
                    ? (theme === 'dark' ? 'rgba(10, 10, 10, 0.92)' : 'rgba(248, 250, 252, 0.92)')
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--border)' : 'none',
                transition: 'padding 0.3s ease, background 0.3s ease, border-color 0.3s ease',
            }}
        >
            {/* Logo: YS. */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: 'var(--electric-gradient)',
                        boxShadow: '0 0 12px var(--accent-glow)'
                    }} />
                    <span style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--text-pure)',
                        letterSpacing: '-0.02em',
                    }}>
                        YS<span style={{ color: 'var(--neon-blue)' }}>.</span>
                    </span>
                </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div
                className="site-navbar__links"
            >
                {navLinks.map((link) => {
                    const isActive = activeSection === link.id
                    return (
                        <button
                            key={link.id}
                            onClick={() => handleNav(link.href)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.74rem',
                                color: isActive ? 'var(--neon-blue)' : 'var(--muted)',
                                fontWeight: isActive ? 600 : 400,
                                letterSpacing: '0.04em',
                                transition: 'color 0.2s ease',
                                position: 'relative',
                                padding: '4px 0',
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) e.currentTarget.style.color = 'var(--text-pure)'
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.color = 'var(--muted)'
                            }}
                        >
                            {link.label}
                            {isActive && (
                                <motion.span
                                    layoutId="activeNavIndicator"
                                    style={{
                                        position: 'absolute',
                                        bottom: -2,
                                        left: 0,
                                        right: 0,
                                        height: 2,
                                        background: 'var(--electric-gradient)',
                                        borderRadius: '2px',
                                        boxShadow: '0 0 8px var(--accent-glow)'
                                    }}
                                />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Right Action Icons & Toggles */}
            <div className="site-navbar__actions">
                {/* Search / Command Palette (Ctrl+K) */}
                <button
                    onClick={() => setIsCommandPaletteOpen(true)}
                    title="Quick search (Ctrl+K)"
                    style={{
                        background: 'var(--surface-alt)',
                        border: '1px solid var(--border)',
                        color: 'var(--muted)',
                        cursor: 'pointer',
                        padding: '0.45rem 0.75rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.72rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent)'
                        e.currentTarget.style.color = 'var(--text-pure)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.color = 'var(--muted)'
                    }}
                >
                    <Search size={14} />
                    <span>Ctrl+K</span>
                </button>

                {/* Recruiter Summary Trigger */}
                <button
                    onClick={() => setIsRecruiterModalOpen(true)}
                    title={t.recruiterSummary}
                    style={{
                        background: 'rgba(236, 72, 153, 0.12)',
                        border: '1px solid var(--neon-blue)',
                        color: 'var(--neon-blue)',
                        cursor: 'pointer',
                        padding: '0.45rem 0.85rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.72rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--neon-blue)'
                        e.currentTarget.style.color = '#000'
                        e.currentTarget.style.boxShadow = '0 0 15px var(--accent-glow)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(236, 72, 153, 0.12)'
                        e.currentTarget.style.color = 'var(--neon-blue)'
                        e.currentTarget.style.boxShadow = 'none'
                    }}
                >
                    <Briefcase size={14} />
                    <span>{t.recruiterSummary}</span>
                </button>

                {/* FR / EN Toggle */}
                <button
                    onClick={toggleLang}
                    title="Change language"
                    style={{
                        background: 'var(--surface-alt)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        padding: '0.45rem 0.65rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                    }}
                >
                    <Globe size={14} color="var(--purple)" />
                    <span>{lang.toUpperCase()}</span>
                </button>

                {/* Dark / Light Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    title="Toggle Dark/Light Mode"
                    style={{
                        background: 'var(--surface-alt)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        padding: '0.45rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {theme === 'dark' ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color="#db2777" />}
                </button>

                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={() => setMobileOpen(prev => !prev)}
                    className="site-navbar__mobile-toggle"
                    aria-label="Toggle Navigation Menu"
                    style={{
                        background: 'var(--surface-alt)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        padding: '0.45rem',
                        borderRadius: '6px',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Mobile Slide-Out Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: theme === 'dark' ? 'rgba(10, 10, 10, 0.98)' : 'rgba(248, 250, 252, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid var(--border)',
                            padding: '1.5rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.1rem',
                            overflow: 'hidden',
                        }}
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNav(link.href)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.9rem',
                                    color: activeSection === link.id ? 'var(--neon-blue)' : 'var(--text)',
                                    fontWeight: activeSection === link.id ? 700 : 400,
                                    textAlign: 'left',
                                    letterSpacing: '0.05em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span>{link.label}</span>
                                {activeSection === link.id && <span style={{ color: 'var(--neon-blue)' }}>●</span>}
                            </button>
                        ))}

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '0.5rem',
                            paddingTop: '1rem',
                            borderTop: '1px solid var(--border)'
                        }}>
                            <a
                                href="/cv.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    background: 'var(--electric-gradient)',
                                    color: '#000',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <FileText size={16} />
                                <span>CV (PDF)</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
