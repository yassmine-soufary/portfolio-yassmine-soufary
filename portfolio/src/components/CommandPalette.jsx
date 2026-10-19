import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { projects } from '../data/projects'
import { skillsList } from '../data/skills'
import { Search, Compass, FolderKanban, Cpu, Download, Globe, Moon, Sun, X } from 'lucide-react'

export default function CommandPalette() {
    const {
        lang,
        toggleLang,
        theme,
        toggleTheme,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        setSelectedSkill
    } = useApp()

    const t = translations[lang].commandPalette
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef(null)

    const sections = [
        { id: 'hero', nameFr: 'Accueil', nameEn: 'Home', icon: Compass },
        { id: 'about', nameFr: 'À propos', nameEn: 'About', icon: Compass },
        { id: 'experience', nameFr: 'Expériences', nameEn: 'Experience', icon: Compass },
        { id: 'projects', nameFr: 'Projets', nameEn: 'Projects', icon: FolderKanban },
        { id: 'education', nameFr: 'Formation', nameEn: 'Education', icon: Compass },
        { id: 'skills', nameFr: 'Compétences', nameEn: 'Skills', icon: Cpu },
        { id: 'awards', nameFr: 'Distinctions & Certifications', nameEn: 'Awards & Certifications', icon: Compass },
        { id: 'associative', nameFr: 'Vie associative', nameEn: 'Volunteer Work', icon: Compass },
        { id: 'contact', nameFr: 'Contact', nameEn: 'Contact', icon: Compass },
    ]

    useEffect(() => {
        if (isCommandPaletteOpen) {
            setQuery('')
            setSelectedIndex(0)
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [isCommandPaletteOpen])

    const filteredSections = sections.filter(s =>
        (lang === 'fr' ? s.nameFr : s.nameEn).toLowerCase().includes(query.toLowerCase())
    )

    const filteredProjects = projects.filter(p =>
        (lang === 'fr' ? p.title.fr : p.title.en).toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )

    const filteredSkills = skillsList.filter(sk =>
        sk.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6)

    const allItems = [
        ...filteredSections.map(s => ({ type: 'section', item: s })),
        ...filteredProjects.map(p => ({ type: 'project', item: p })),
        ...filteredSkills.map(sk => ({ type: 'skill', item: sk })),
        { type: 'action', id: 'cv', label: lang === 'fr' ? 'Télécharger mon CV (PDF)' : 'Download my CV (PDF)', icon: Download },
        { type: 'action', id: 'lang', label: lang === 'fr' ? 'Switch to English' : 'Passer en Français', icon: Globe },
        { type: 'action', id: 'theme', label: theme === 'dark' ? (lang === 'fr' ? 'Mode Clair' : 'Light Mode') : (lang === 'fr' ? 'Mode Sombre' : 'Dark Mode'), icon: theme === 'dark' ? Sun : Moon },
    ]

    const handleSelect = (entry) => {
        if (!entry) return
        setIsCommandPaletteOpen(false)

        if (entry.type === 'section') {
            document.getElementById(entry.item.id)?.scrollIntoView({ behavior: 'smooth' })
        } else if (entry.type === 'project') {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        } else if (entry.type === 'skill') {
            setSelectedSkill(entry.item.name)
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
        } else if (entry.type === 'action') {
            if (entry.id === 'cv') {
                window.open('/cv.pdf', '_blank')
            } else if (entry.id === 'lang') {
                toggleLang()
            } else if (entry.id === 'theme') {
                toggleTheme()
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => (prev + 1) % Math.max(allItems.length, 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => (prev - 1 + allItems.length) % Math.max(allItems.length, 1))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            handleSelect(allItems[selectedIndex])
        } else if (e.key === 'Escape') {
            setIsCommandPaletteOpen(false)
        }
    }

    return (
        <AnimatePresence>
            {isCommandPaletteOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCommandPaletteOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(7, 7, 7, 0.82)',
                        backdropFilter: 'blur(16px)',
                        zIndex: 999999,
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        padding: '12vh 1.5rem 2rem',
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.94, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.94, y: -20, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '640px',
                            width: '100%',
                            background: 'var(--surface)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '12px',
                            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7), 0 0 35px var(--accent-dim)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Search Input Bar */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            padding: '1rem 1.25rem',
                            borderBottom: '1px solid var(--border)',
                        }}>
                            <Search size={20} color="var(--accent)" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    setSelectedIndex(0)
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={t.placeholder}
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.98rem',
                                    color: 'var(--text)',
                                }}
                            />
                            <button
                                onClick={() => setIsCommandPaletteOpen(false)}
                                aria-label="Close"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--muted)',
                                    cursor: 'pointer',
                                    padding: '4px',
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Results List */}
                        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.75rem' }}>
                            {allItems.length === 0 ? (
                                <div style={{
                                    padding: '2.5rem 1rem',
                                    textAlign: 'center',
                                    color: 'var(--muted)',
                                    fontSize: '0.9rem'
                                }}>
                                    {t.noResults}
                                </div>
                            ) : (
                                allItems.map((entry, idx) => {
                                    const isSelected = idx === selectedIndex
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => handleSelect(entry)}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '0.65rem 0.9rem',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                background: isSelected ? 'var(--accent-dim)' : 'transparent',
                                                border: isSelected ? '1px solid var(--accent)' : '1px solid transparent',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                {entry.type === 'section' && <Compass size={16} color="var(--accent)" />}
                                                {entry.type === 'project' && <FolderKanban size={16} color="#db2777" />}
                                                {entry.type === 'skill' && <Cpu size={16} color="#ec4899" />}
                                                {entry.type === 'action' && <entry.icon size={16} color="var(--accent)" />}

                                                <span style={{
                                                    fontSize: '0.9rem',
                                                    color: isSelected ? 'var(--text-pure)' : 'var(--text)',
                                                    fontWeight: isSelected ? 600 : 400
                                                }}>
                                                    {entry.type === 'section' && (lang === 'fr' ? entry.item.nameFr : entry.item.nameEn)}
                                                    {entry.type === 'project' && (lang === 'fr' ? entry.item.title.fr : entry.item.title.en)}
                                                    {entry.type === 'skill' && `${entry.item.name}`}
                                                    {entry.type === 'action' && entry.label}
                                                </span>
                                            </div>

                                            <span style={{
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.65rem',
                                                color: 'var(--muted)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.08em'
                                            }}>
                                                {entry.type}
                                            </span>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {/* Footer Hints */}
                        <div style={{
                            padding: '0.6rem 1.25rem',
                            background: 'var(--surface-alt)',
                            borderTop: '1px solid var(--border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.7rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            color: 'var(--muted)',
                        }}>
                            <span>↑↓ {lang === 'fr' ? 'Naviguer' : 'Navigate'}</span>
                            <span>↵ {lang === 'fr' ? 'Sélectionner' : 'Select'}</span>
                            <span>ESC {lang === 'fr' ? 'Fermer' : 'Close'}</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
