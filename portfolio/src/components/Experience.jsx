import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { experiences } from '../data/experiences'
import { Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'
import './Experience.css'

export default function Experience() {
    const { lang } = useApp()
    const t = translations[lang].experience
    const [expandedIds, setExpandedIds] = useState({ 'exp-wafa-ima': true, 'exp-1': true, 'exp-2': true, 'exp-3': false })
    const timelineRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 65%', 'end 45%']
    })

    const toggleExpand = (id) => {
        setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <section
            id="experience"
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
                        maxWidth: '750px',
                        marginBottom: '3.5rem'
                    }}>
                        {t.subtitle}
                    </p>
                </motion.div>

                <div className="experience-timeline" ref={timelineRef}>
                    <div className="experience-timeline__track" aria-hidden="true">
                        <motion.div
                            className="experience-timeline__fill"
                            style={{ scaleY: scrollYProgress }}
                        />
                    </div>

                    <div className="experience-timeline__entries">
                        {experiences.map((exp, idx) => {
                            const isExpanded = !!expandedIds[exp.id]
                            const isLeft = idx % 2 === 0

                            return (
                                <motion.div
                                    key={exp.id}
                                    className={`experience-timeline__entry ${isLeft ? 'is-left' : 'is-right'}`}
                                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                                >
                                    {/* Timeline Node Dot */}
                                    <div className="experience-timeline__node" aria-hidden="true" />

                                    {/* Experience Card */}
                                    <div className="experience-timeline__card" style={{
                                        background: 'var(--surface-alt)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '14px',
                                        padding: '1.75rem 2rem',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    }}>
                                        {/* Card Top Row */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            flexWrap: 'wrap',
                                            gap: '1rem',
                                            cursor: 'pointer'
                                        }}
                                            onClick={() => toggleExpand(exp.id)}
                                        >
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                    <h3 style={{
                                                        fontFamily: "'Space Grotesk', sans-serif",
                                                        fontSize: '1.35rem',
                                                        fontWeight: 700,
                                                        color: 'var(--text-pure)',
                                                        margin: 0
                                                    }}>
                                                        {exp.company}
                                                    </h3>
                                                    <span style={{
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                        fontSize: '0.7rem',
                                                        padding: '0.25rem 0.65rem',
                                                        borderRadius: '9999px',
                                                        background: 'rgba(255, 69, 0, 0.12)',
                                                        border: '1px solid rgba(255, 69, 0, 0.3)',
                                                        color: 'var(--neon-blue)',
                                                        fontWeight: 600
                                                    }}>
                                                        {lang === 'fr' ? exp.type.fr : exp.type.en}
                                                    </span>
                                                </div>

                                                <div style={{
                                                    fontSize: '1rem',
                                                    color: 'var(--text)',
                                                    fontWeight: 500,
                                                    marginTop: '0.35rem'
                                                }}>
                                                    {lang === 'fr' ? exp.role.fr : exp.role.en}
                                                </div>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1.25rem',
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-end',
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                    fontSize: '0.76rem',
                                                    color: 'var(--muted)',
                                                    gap: '0.2rem'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--neon-blue)' }}>
                                                        <Calendar size={13} />
                                                        <span>{lang === 'fr' ? exp.period.fr : exp.period.en}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                        <MapPin size={13} />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                </div>

                                                <button
                                                    aria-label="Toggle details"
                                                    style={{
                                                        background: 'var(--surface)',
                                                        border: '1px solid var(--border)',
                                                        color: 'var(--text)',
                                                        cursor: 'pointer',
                                                        padding: '6px',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expandable Task Details */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{
                                                        marginTop: '1.25rem',
                                                        paddingTop: '1.25rem',
                                                        borderTop: '1px solid var(--border)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.75rem'
                                                    }}>
                                                        <div style={{
                                                            fontSize: '0.75rem',
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                            color: 'var(--muted)',
                                                            fontWeight: 600
                                                        }}>
                                                            {t.keyTasks}
                                                        </div>

                                                        {(lang === 'fr' ? exp.tasks.fr : exp.tasks.en).map((task, i) => (
                                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                                                                <CheckCircle size={15} color="var(--neon-blue)" style={{ marginTop: '3px', flexShrink: 0 }} />
                                                                <span style={{ color: 'var(--muted-light)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                                                    {task}
                                                                </span>
                                                            </div>
                                                        ))}

                                                        {/* Technologies Badges */}
                                                        {exp.technologies.length > 0 && (
                                                            <div style={{
                                                                display: 'flex',
                                                                flexWrap: 'wrap',
                                                                gap: '0.5rem',
                                                                marginTop: '0.75rem'
                                                            }}>
                                                                {exp.technologies.map(tag => (
                                                                    <span
                                                                        key={tag}
                                                                        style={{
                                                                            fontFamily: "'JetBrains Mono', monospace",
                                                                            fontSize: '0.7rem',
                                                                            padding: '0.25rem 0.65rem',
                                                                            borderRadius: '4px',
                                                                            background: 'var(--surface)',
                                                                            border: '1px solid var(--border-light)',
                                                                            color: 'var(--text)'
                                                                        }}
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
