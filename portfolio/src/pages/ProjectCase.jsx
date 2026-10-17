import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { projects } from '../data/projects'
import { ArrowLeft, Calendar, CheckCircle2, Layers, Cpu, Database, Sparkles } from 'lucide-react'
import { Github } from '../components/BrandIcons'

export default function ProjectCase() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { lang } = useApp()
    const project = projects.find(p => p.slug === slug)

    if (!project) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg)',
                padding: '2rem'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'var(--neon-blue)',
                        fontSize: '0.85rem',
                        marginBottom: '1rem'
                    }}>
                        404 — PROJET NON TROUVÉ
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'var(--electric-gradient)',
                            color: '#000',
                            border: 'none',
                            padding: '0.85rem 2rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.8rem',
                            fontWeight: 700
                        }}
                    >
                        ← {lang === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', zIndex: 2 }}>
            {/* Sticky Top Header */}
            <header style={{
                background: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                padding: '1.25rem 2rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(20px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'var(--surface-alt)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.75rem',
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
                    <span>{lang === 'fr' ? 'Retour' : 'Back'}</span>
                </button>

                <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.78rem',
                    color: 'var(--muted)',
                }}>
                    PROJET // {lang === 'fr' ? project.title.fr : project.title.en}
                </div>

                {project.githubUrl ? (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            background: 'var(--surface-alt)',
                            border: '1px solid var(--border)',
                            color: 'var(--neon-blue)',
                            textDecoration: 'none',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}
                    >
                        <Github size={14} />
                        <span>GitHub</span>
                    </a>
                ) : (
                    <div style={{ width: 80 }} />
                )}
            </header>

            {/* Case Study Container */}
            <main style={{ maxWidth: '980px', margin: '0 auto', padding: '4rem 2rem 8rem' }}>
                {/* Meta Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.72rem',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '9999px',
                            background: 'rgba(255, 69, 0, 0.12)',
                            border: '1px solid var(--neon-blue)',
                            color: 'var(--neon-blue)',
                            fontWeight: 700
                        }}>
                            {lang === 'fr' ? project.category.fr : project.category.en}
                        </span>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.75rem',
                            color: 'var(--muted)'
                        }}>
                            <Calendar size={13} />
                            <span>{project.date}</span>
                        </div>
                    </div>

                    <h1 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                        fontWeight: 800,
                        color: 'var(--text-pure)',
                        lineHeight: 1.15,
                        margin: '0 0 1.5rem'
                    }}>
                        {lang === 'fr' ? project.title.fr : project.title.en}
                    </h1>

                    <p style={{
                        color: 'var(--muted-light)',
                        fontSize: '1.15rem',
                        lineHeight: 1.8,
                        margin: '0 0 2.5rem'
                    }}>
                        {lang === 'fr' ? project.description.fr : project.description.en}
                    </p>
                </motion.div>

                {/* 1. Context & Objective */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '1.75rem'
                    }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.72rem',
                            color: 'var(--neon-blue)',
                            letterSpacing: '0.12em',
                            marginBottom: '0.6rem',
                            fontWeight: 600
                        }}>
                            01 // {lang === 'fr' ? 'CONTEXTE DU PROJET' : 'PROJECT CONTEXT'}
                        </div>
                        <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.7, margin: 0 }}>
                            {lang === 'fr' ? project.context.fr : project.context.en}
                        </p>
                    </div>

                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '1.75rem'
                    }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.72rem',
                            color: 'var(--purple)',
                            letterSpacing: '0.12em',
                            marginBottom: '0.6rem',
                            fontWeight: 600
                        }}>
                            02 // {lang === 'fr' ? 'OBJECTIF STRATÉGIQUE' : 'OBJECTIVE'}
                        </div>
                        <p style={{ color: 'var(--text)', fontSize: '0.94rem', lineHeight: 1.7, margin: 0 }}>
                            {lang === 'fr' ? project.objective.fr : project.objective.en}
                        </p>
                    </div>
                </div>

                {/* 2. Architecture & Technical Pipeline */}
                {project.architectureSteps && (
                    <div style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        padding: '2.5rem',
                        marginBottom: '3rem'
                    }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.75rem',
                            color: 'var(--neon-blue)',
                            letterSpacing: '0.15em',
                            marginBottom: '1.5rem',
                            fontWeight: 600
                        }}>
                            03 // {lang === 'fr' ? 'ARCHITECTURE & FLUX DE DONNÉES' : 'ARCHITECTURE & DATA FLOW'}
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {project.architectureSteps.map((step, sIdx) => (
                                <div
                                    key={sIdx}
                                    style={{
                                        background: 'var(--surface-alt)',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: '10px',
                                        padding: '1.25rem',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '0.7rem',
                                        color: 'var(--purple)',
                                        fontWeight: 700,
                                        marginBottom: '0.4rem'
                                    }}>
                                        ÉTAPE 0{sIdx + 1}
                                    </div>
                                    <h4 style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        color: 'var(--text-pure)',
                                        margin: '0 0 0.3rem'
                                    }}>
                                        {step.title}
                                    </h4>
                                    <p style={{
                                        color: 'var(--muted)',
                                        fontSize: '0.84rem',
                                        lineHeight: 1.5,
                                        margin: 0
                                    }}>
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. Tools & Technologies */}
                <div style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.72rem',
                        color: 'var(--neon-blue)',
                        letterSpacing: '0.12em',
                        marginBottom: '1rem',
                        fontWeight: 600
                    }}>
                        04 // {lang === 'fr' ? 'OUTILS & TECHNOLOGIES UTILISÉS' : 'TOOLS & TECHNOLOGIES'}
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '0.8rem',
                                    padding: '0.4rem 0.9rem',
                                    borderRadius: '6px',
                                    background: 'var(--surface-alt)',
                                    border: '1px solid var(--border-light)',
                                    color: 'var(--text-pure)'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 4. Results & Key Metrics */}
                {project.kpis && (
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.06) 0%, rgba(246, 154, 92, 0.06) 100%)',
                        border: '1px solid var(--neon-blue)',
                        borderRadius: '14px',
                        padding: '2rem',
                        boxShadow: '0 0 30px var(--accent-dim)'
                    }}>
                        <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.72rem',
                            color: 'var(--neon-blue)',
                            letterSpacing: '0.12em',
                            marginBottom: '1rem',
                            fontWeight: 600
                        }}>
                            05 // {lang === 'fr' ? 'RÉSULTATS & INDICATEURS CLÉS' : 'RESULTS & KEY METRICS'}
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '1.25rem'
                        }}>
                            {project.kpis.map((kpi, kIdx) => (
                                <div key={kIdx}>
                                    <div style={{ fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
                                        {kpi.label}
                                    </div>
                                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-pure)', marginTop: '0.2rem' }}>
                                        {kpi.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
