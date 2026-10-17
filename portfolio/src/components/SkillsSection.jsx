import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { skillCategories, skillsList } from '../data/skills'
import { Code, Database, BarChart3, Cpu, Sparkles, ArrowRight, X } from 'lucide-react'

export default function SkillsSection() {
    const { lang, selectedSkill, setSelectedSkill } = useApp()
    const t = translations[lang].skills
    const [activeCategory, setActiveCategory] = useState('programming')

    const categoryIcons = {
        Code,
        Database,
        BarChart3,
        Cpu
    }

    const currentSkillObj = skillsList.find(s => s.name === selectedSkill)

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="skills"
            style={{
                padding: '7rem 2rem',
                background: 'var(--bg)',
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
                        maxWidth: '750px',
                        marginBottom: '3rem'
                    }}>
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* Category Navigation Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    marginBottom: '2.5rem'
                }}>
                    {skillCategories.map((cat) => {
                        const Icon = categoryIcons[cat.icon] || Code
                        const isCurrent = activeCategory === cat.id

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.78rem',
                                    padding: '0.7rem 1.3rem',
                                    borderRadius: '8px',
                                    border: isCurrent ? '1px solid var(--neon-blue)' : '1px solid var(--border)',
                                    background: isCurrent ? 'rgba(255, 69, 0, 0.12)' : 'var(--surface)',
                                    color: isCurrent ? 'var(--neon-blue)' : 'var(--muted)',
                                    fontWeight: isCurrent ? 700 : 500,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: isCurrent ? '0 0 20px var(--accent-dim)' : 'none'
                                }}
                            >
                                <Icon size={16} />
                                <span>{lang === 'fr' ? cat.labelFr : cat.labelEn}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Skills Interactive Grid & Contextual Description Inspector */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'start'
                }}>
                    {/* Left: Skills Chips Grid in Active Category */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                        gap: '0.9rem'
                    }}>
                        {skillsList
                            .filter(s => s.category === activeCategory)
                            .map((skill) => {
                                const isSelected = selectedSkill === skill.name

                                return (
                                    <motion.button
                                        key={skill.name}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                                        style={{
                                            background: isSelected ? 'var(--electric-gradient)' : 'var(--surface)',
                                            border: isSelected ? '1px solid var(--neon-blue)' : '1px solid var(--border)',
                                            borderRadius: '10px',
                                            padding: '1.1rem 0.9rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            boxShadow: isSelected
                                                ? '0 0 25px var(--accent-glow)'
                                                : '0 4px 15px rgba(0, 0, 0, 0.2)',
                                            transition: 'all 0.2s ease',
                                            color: isSelected ? '#000' : 'var(--text-pure)'
                                        }}
                                    >
                                        <span style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: isSelected ? '#000' : 'var(--neon-blue)',
                                            boxShadow: isSelected ? 'none' : '0 0 8px var(--neon-blue)'
                                        }} />
                                        <span style={{
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontSize: '0.92rem',
                                            fontWeight: 600,
                                            textAlign: 'center'
                                        }}>
                                            {skill.name}
                                        </span>
                                    </motion.button>
                                )
                            })}
                    </div>

                    {/* Right: Contextual Inspector Card */}
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        padding: '2.25rem',
                        position: 'relative',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                        minHeight: '260px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <AnimatePresence mode="wait">
                            {currentSkillObj ? (
                                <motion.div
                                    key={currentSkillObj.name}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <Sparkles size={18} color="var(--neon-blue)" />
                                            <h3 style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontSize: '1.4rem',
                                                fontWeight: 700,
                                                color: 'var(--text-pure)',
                                                margin: 0
                                            }}>
                                                {currentSkillObj.name}
                                            </h3>
                                        </div>

                                        <button
                                            onClick={() => setSelectedSkill(null)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--muted)',
                                                cursor: 'pointer',
                                                padding: '4px'
                                            }}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <p style={{
                                        color: 'var(--muted-light)',
                                        fontSize: '0.96rem',
                                        lineHeight: 1.7,
                                        margin: 0
                                    }}>
                                        {lang === 'fr' ? currentSkillObj.desc.fr : currentSkillObj.desc.en}
                                    </p>

                                    {currentSkillObj.relatedProjects.length > 0 && (
                                        <div style={{
                                            marginTop: '0.75rem',
                                            paddingTop: '1rem',
                                            borderTop: '1px solid var(--border)'
                                        }}>
                                            <div style={{
                                                fontSize: '0.72rem',
                                                fontFamily: "'JetBrains Mono', monospace",
                                                color: 'var(--neon-blue)',
                                                marginBottom: '0.5rem'
                                            }}>
                                                {t.projectsUsing}
                                            </div>

                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                {currentSkillObj.relatedProjects.map(slug => (
                                                    <button
                                                        key={slug}
                                                        onClick={scrollToProjects}
                                                        style={{
                                                            padding: '0.35rem 0.75rem',
                                                            borderRadius: '4px',
                                                            background: 'rgba(255, 69, 0, 0.1)',
                                                            border: '1px solid rgba(255, 69, 0, 0.3)',
                                                            color: 'var(--neon-blue)',
                                                            fontSize: '0.74rem',
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.4rem'
                                                        }}
                                                    >
                                                        <span>{slug}</span>
                                                        <ArrowRight size={12} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        textAlign: 'center',
                                        color: 'var(--muted)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                >
                                    <Cpu size={36} color="var(--purple)" style={{ opacity: 0.6 }} />
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
                                        {t.contextHint}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
