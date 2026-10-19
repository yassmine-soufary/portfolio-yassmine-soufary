import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { associationRoles, associativeCategories } from '../data/associative'
import { ArrowLeft, ArrowRight, X, Maximize2 } from 'lucide-react'
import './CommunityCards.css'

export default function AssociativeLife() {
    const { lang } = useApp()
    const t = translations[lang].associative
    const [activeIdx, setActiveIdx] = useState(0)
    const [selectedImage, setSelectedImage] = useState(null)
    const [isHovering, setIsHovering] = useState(false)

    const currentCat = associativeCategories[activeIdx]

    const nextCategory = () => {
        setActiveIdx((prev) => (prev + 1) % associativeCategories.length)
    }

    const prevCategory = () => {
        setActiveIdx((prev) => (prev - 1 + associativeCategories.length) % associativeCategories.length)
    }

    // Auto-advance gallery when not hovering
    useEffect(() => {
        if (isHovering || selectedImage) return
        const timer = setInterval(() => {
            nextCategory()
        }, 7000)
        return () => clearInterval(timer)
    }, [isHovering, selectedImage])

    // Keyboard navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null)
            if (e.key === 'ArrowRight' && !selectedImage) nextCategory()
            if (e.key === 'ArrowLeft' && !selectedImage) prevCategory()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedImage])

    return (
        <section
            id="associative"
            style={{
                padding: '7rem 2rem',
                background: 'var(--surface)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 2,
            }}
        >
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div style={{
                            width: 3,
                            height: 48,
                            background: 'var(--electric-gradient)'
                        }} />
                        <div>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.72rem',
                                color: 'var(--neon-blue)',
                                letterSpacing: '0.22em',
                                marginBottom: '0.3rem'
                            }}>
                                {t.sectionNumber}
                            </div>
                            <h2 style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                                fontWeight: 700,
                                color: 'var(--text-pure)',
                                letterSpacing: '-0.02em',
                                margin: 0
                            }}>
                                {t.title}
                            </h2>
                        </div>
                    </div>

                    <p style={{
                        color: 'var(--muted-light)',
                        fontSize: '1.05rem',
                        maxWidth: '820px',
                        marginBottom: '3.5rem'
                    }}>
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* Part 1: Featured Association Leadership Roles */}
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.75rem',
                        color: 'var(--neon-blue)',
                        letterSpacing: '0.15em',
                        marginBottom: '1.5rem',
                        fontWeight: 600
                    }}>
                        // {t.rolesTitle}
                    </div>

                    <div className="community-card-grid">
                        {associationRoles.map((role, idx) => (
                            <motion.div
                                key={role.id}
                                initial={{ opacity: 0, x: idx === 0 ? -25 : 25 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="community-card"
                            >
                                <div className="community-card__avatar-orbit" aria-hidden="true">
                                    <div className="community-card__avatar">
                                        <span>{role.id === 'gentech' ? 'GT' : 'LEG'}</span>
                                    </div>
                                </div>

                                <div className="community-card__content">
                                    <div className="community-card__badges">
                                        <span className="community-card__badge">
                                            {lang === 'fr' ? 'ENGAGEMENT ASSOCIATIF' : 'COMMUNITY ENGAGEMENT'}
                                        </span>
                                        <span className="community-card__period">
                                            {lang === 'fr' ? role.period : role.periodEn}
                                        </span>
                                    </div>

                                    <h3 style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '1.4rem',
                                        fontWeight: 700,
                                        color: 'var(--text-pure)',
                                        margin: '0 0 0.3rem'
                                    }}>
                                        {role.club}
                                    </h3>

                                    <div style={{
                                        fontSize: '1rem',
                                        color: 'var(--neon-blue)',
                                        fontWeight: 600,
                                        marginBottom: '0.8rem'
                                    }}>
                                        {lang === 'fr' ? role.role.fr : role.role.en}
                                    </div>

                                    <p style={{
                                        color: 'var(--muted-light)',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.6,
                                        margin: 0
                                    }}>
                                        {lang === 'fr' ? role.description.fr : role.description.en}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Part 2: 4 Authentic Social Activity Galleries */}
                <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '1.75rem'
                    }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.75rem',
                            color: 'var(--neon-blue)',
                            letterSpacing: '0.15em',
                            fontWeight: 600
                        }}>
                            // {t.galleriesTitle}
                        </div>
                        <div style={{
                            fontSize: '0.72rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            color: 'var(--muted)'
                        }}>
                            {t.photoHint}
                        </div>
                    </div>

                    {/* Category Selector Tabs */}
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        marginBottom: '2.5rem'
                    }}>
                        {associativeCategories.map((cat, idx) => {
                            const isCurrent = idx === activeIdx

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveIdx(idx)}
                                    style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.76rem',
                                        padding: '0.7rem 1.3rem',
                                        borderRadius: '8px',
                                        border: isCurrent ? '1px solid var(--neon-blue)' : '1px solid var(--border)',
                                        background: isCurrent ? 'rgba(236, 72, 153, 0.12)' : 'var(--surface-alt)',
                                        color: isCurrent ? 'var(--neon-blue)' : 'var(--muted)',
                                        fontWeight: isCurrent ? 700 : 500,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        transition: 'all 0.2s ease',
                                        boxShadow: isCurrent ? '0 0 20px var(--accent-dim)' : 'none'
                                    }}
                                >
                                    <span style={{ fontSize: '1.1rem' }}>{cat.icon}</span>
                                    <span>{lang === 'fr' ? cat.title.fr : cat.title.en}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Active Gallery Showcase Card */}
                    <div
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        style={{
                            background: 'var(--surface-alt)',
                            border: '1px solid var(--border)',
                            borderRadius: '16px',
                            padding: '2.5rem',
                            position: 'relative',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentCat.id}
                                initial={{ opacity: 0, x: 25 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -25 }}
                                transition={{ duration: 0.45 }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                    gap: '3rem',
                                    alignItems: 'center'
                                }}
                            >
                                {/* Left: Gallery Metadata & Highlights */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '0.72rem',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '9999px',
                                            background: 'rgba(246, 92, 169, 0.15)',
                                            border: '1px solid var(--purple)',
                                            color: 'var(--purple)',
                                            fontWeight: 600
                                        }}>
                                            {lang === 'fr' ? currentCat.badge.fr : currentCat.badge.en}
                                        </span>

                                        <span style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '0.8rem',
                                            color: 'var(--muted)',
                                            fontWeight: 600
                                        }}>
                                            0{activeIdx + 1} / 0{associativeCategories.length}
                                        </span>
                                    </div>

                                    <h3 style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                                        fontWeight: 700,
                                        color: 'var(--text-pure)',
                                        margin: 0
                                    }}>
                                        {lang === 'fr' ? currentCat.title.fr : currentCat.title.en}
                                    </h3>

                                    <p style={{
                                        color: 'var(--muted-light)',
                                        lineHeight: 1.8,
                                        fontSize: '0.98rem',
                                        margin: 0
                                    }}>
                                        {lang === 'fr' ? currentCat.fullDescription.fr : currentCat.fullDescription.en}
                                    </p>

                                    {/* Highlights list */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                                        <div style={{
                                            fontFamily: "'JetBrains Mono', monospace",
                                            fontSize: '0.7rem',
                                            color: 'var(--neon-blue)',
                                            fontWeight: 600
                                        }}>
                                            // ACTIONS SUR LE TERRAIN :
                                        </div>
                                        {(lang === 'fr' ? currentCat.highlights.fr : currentCat.highlights.en).map((hl, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                                <span style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    background: 'var(--purple)',
                                                    boxShadow: '0 0 6px var(--purple)'
                                                }} />
                                                <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{hl}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Navigation Controls */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                                        <button
                                            onClick={prevCategory}
                                            aria-label="Previous gallery"
                                            style={{
                                                padding: '0.65rem 1.25rem',
                                                borderRadius: '6px',
                                                background: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                                color: 'var(--text)',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.75rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--neon-blue)'
                                                e.currentTarget.style.color = 'var(--neon-blue)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--border)'
                                                e.currentTarget.style.color = 'var(--text)'
                                            }}
                                        >
                                            <ArrowLeft size={14} />
                                            <span>{t.prev}</span>
                                        </button>

                                        <button
                                            onClick={nextCategory}
                                            aria-label="Next gallery"
                                            style={{
                                                padding: '0.65rem 1.25rem',
                                                borderRadius: '6px',
                                                background: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                                color: 'var(--text)',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.75rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--purple)'
                                                e.currentTarget.style.color = 'var(--purple)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'var(--border)'
                                                e.currentTarget.style.color = 'var(--text)'
                                            }}
                                        >
                                            <span>{t.next}</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Right: Photo Gallery with sequential entrance animation */}
                                <div style={{ position: 'relative' }}>
                                    {currentCat.images.map((imgObj, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: 0.15 }}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setSelectedImage({
                                                src: imgObj.src,
                                                title: lang === 'fr' ? currentCat.title.fr : currentCat.title.en,
                                                caption: lang === 'fr' ? imgObj.caption.fr : imgObj.caption.en,
                                                badge: lang === 'fr' ? currentCat.badge.fr : currentCat.badge.en,
                                                date: imgObj.date
                                            })}
                                            style={{
                                                position: 'relative',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                border: '1px solid var(--border-light)',
                                                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
                                                aspectRatio: '16 / 10',
                                                background: '#0a0a0a'
                                            }}
                                        >
                                            <img
                                                src={imgObj.src}
                                                alt={lang === 'fr' ? imgObj.caption.fr : imgObj.caption.en}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                    transition: 'transform 0.5s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                            />

                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(11, 11, 11, 0.9) 0%, rgba(11, 11, 11, 0.2) 50%, transparent 100%)',
                                                pointerEvents: 'none'
                                            }} />

                                            <div style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                right: '1rem',
                                                background: 'rgba(11, 11, 11, 0.75)',
                                                backdropFilter: 'blur(8px)',
                                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                                borderRadius: '4px',
                                                padding: '0.25rem 0.65rem',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: '0.62rem',
                                                color: 'var(--neon-blue)'
                                            }}>
                                                PHOTO AUTHENTIQUE ✦
                                            </div>

                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: '1.25rem',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-end',
                                                gap: '1rem'
                                            }}>
                                                <div>
                                                    <div style={{
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                        fontSize: '0.65rem',
                                                        color: 'var(--purple)',
                                                        marginBottom: '0.2rem'
                                                    }}>
                                                        {imgObj.date}
                                                    </div>
                                                    <div style={{
                                                        color: '#ffffff',
                                                        fontSize: '0.9rem',
                                                        fontWeight: 500
                                                    }}>
                                                        {lang === 'fr' ? imgObj.caption.fr : imgObj.caption.en}
                                                    </div>
                                                </div>

                                                <div style={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: '50%',
                                                    background: 'rgba(236, 72, 153, 0.2)',
                                                    border: '1px solid var(--neon-blue)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'var(--neon-blue)',
                                                    flexShrink: 0
                                                }}>
                                                    <Maximize2 size={16} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Dots */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.6rem',
                            marginTop: '2rem'
                        }}>
                            {associativeCategories.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIdx(i)}
                                    aria-label={`Aller à la catégorie ${i + 1}`}
                                    style={{
                                        width: i === activeIdx ? 26 : 8,
                                        height: 8,
                                        borderRadius: '4px',
                                        border: 'none',
                                        background: i === activeIdx
                                            ? 'var(--electric-gradient)'
                                            : 'var(--border)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        padding: 0
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox / Modal for High-Resolution Image Inspection */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(7, 7, 7, 0.95)',
                            backdropFilter: 'blur(20px)',
                            zIndex: 999999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '960px',
                                width: '100%',
                                background: 'var(--surface)',
                                border: '1px solid var(--neon-blue)',
                                borderRadius: '14px',
                                overflow: 'hidden',
                                boxShadow: '0 0 50px var(--accent-dim), 0 25px 60px rgba(0, 0, 0, 0.8)'
                            }}
                        >
                            {/* Modal Header */}
                            <div style={{
                                padding: '1.25rem 1.75rem',
                                borderBottom: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <span style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.72rem',
                                        color: 'var(--neon-blue)',
                                        letterSpacing: '0.12em'
                                    }}>
                                        {selectedImage.badge} // {selectedImage.title}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    aria-label="Close"
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--muted)',
                                        cursor: 'pointer',
                                        padding: '4px'
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Image */}
                            <div style={{ maxHeight: '70vh', overflow: 'hidden', background: '#000' }}>
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.caption}
                                    style={{
                                        width: '100%',
                                        maxHeight: '70vh',
                                        objectFit: 'contain',
                                        display: 'block'
                                    }}
                                />
                            </div>

                            {/* Modal Footer */}
                            <div style={{
                                padding: '1.25rem 1.75rem',
                                background: 'var(--surface-alt)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div style={{ color: 'var(--text-pure)', fontSize: '0.95rem' }}>
                                    {selectedImage.caption}
                                </div>
                                <div style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.72rem',
                                    color: 'var(--purple)'
                                }}>
                                    {t.closeModal}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
