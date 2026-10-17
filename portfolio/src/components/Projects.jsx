import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Sparkles, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { projects } from '../data/projects'
import { otherProjects } from '../data/otherProjects'
import { Github as GithubIcon } from './BrandIcons'
import ProjectVisual from './ProjectVisual'
import './Projects.css'

export default function Projects() {
    const { lang, selectedSkill, setSelectedSkill } = useApp()
    const t = translations[lang].projects
    const [selectedCategory, setSelectedCategory] = useState('ALL')
    const [activeProjectId, setActiveProjectId] = useState(null)

    const filteredProjects = projects.filter(project => {
        if (selectedSkill && !project.tags.some(tag => tag.toLowerCase() === selectedSkill.toLowerCase())) {
            return false
        }
        if (selectedCategory === 'ALL') return true
        if (selectedCategory === 'DATA') {
            return project.tags.some(tag => ['PostgreSQL', 'Power BI', 'Data Warehouse', 'SQL'].includes(tag))
        }
        if (selectedCategory === 'AI') return project.tags.some(tag => ['AI', 'Python'].includes(tag))
        if (selectedCategory === 'IOT') {
            return project.tags.some(tag => ['IoT', 'ESP32', 'Robotics', 'Arduino'].includes(tag))
        }
        return true
    })

    const activeProject = filteredProjects.find(project => project.id === activeProjectId) || filteredProjects[0]

    return (
        <section id="projects" className="projects-section">
            <div className="projects-container">
                <motion.div
                    className="projects-heading"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="projects-heading__title">
                        <div className="projects-heading__rule" />
                        <div>
                            <div className="projects-eyebrow">{t.sectionNumber}</div>
                            <h2>{t.title}</h2>
                        </div>
                    </div>
                    <p>{t.subtitle}</p>
                </motion.div>

                <div className="projects-controls">
                    <div className="projects-filters" role="group" aria-label={t.title}>
                        {[
                            { id: 'ALL', label: t.filterAll },
                            { id: 'DATA', label: 'Data & BI' },
                            { id: 'AI', label: 'AI & Machine Learning' },
                            { id: 'IOT', label: 'IoT & Systèmes' },
                        ].map(category => (
                            <button
                                key={category.id}
                                type="button"
                                className={`projects-filter ${selectedCategory === category.id ? 'is-active' : ''}`}
                                onClick={() => {
                                    setSelectedCategory(category.id)
                                    setActiveProjectId(null)
                                }}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {selectedSkill && (
                        <div className="projects-skill-filter">
                            <span>{t.filterActive} : <strong>{selectedSkill}</strong></span>
                            <button
                                type="button"
                                onClick={() => setSelectedSkill(null)}
                                title={t.resetFilter}
                                aria-label={t.resetFilter}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {activeProject ? (
                    <div className="projects-split">
                        <div className="projects-stories">
                            {filteredProjects.map((project, idx) => (
                                <ProjectStory
                                    key={project.id}
                                    project={project}
                                    index={idx}
                                    lang={lang}
                                    translations={t}
                                    onEnter={() => setActiveProjectId(project.id)}
                                />
                            ))}
                        </div>

                        <aside className="projects-preview" aria-label="Project visual preview">
                            <div className="projects-preview__frame">
                                <div className="projects-preview__topbar">
                                    <span className="projects-preview__indicator">
                                        <span />
                                        LIVE PROJECT VIEW
                                    </span>
                                    <span className="projects-preview__index">
                                        {String(filteredProjects.findIndex(project => project.id === activeProject.id) + 1).padStart(2, '0')}
                                        <span> / {String(filteredProjects.length).padStart(2, '0')}</span>
                                    </span>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeProject.id}
                                        className="projects-preview__content"
                                        initial={{ opacity: 0, y: 16, scale: 0.985 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -12, scale: 0.985 }}
                                        transition={{ duration: 0.35, ease: 'easeOut' }}
                                    >
                                        <ProjectVisual projectId={activeProject.id} instanceId={`sticky-${activeProject.id}`} />
                                        <div className="projects-preview__caption">
                                            <span>{lang === 'fr' ? activeProject.category.fr : activeProject.category.en}</span>
                                            <strong>{lang === 'fr' ? activeProject.title.fr : activeProject.title.en}</strong>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="projects-preview__footnote">
                                <span className="projects-preview__footnote-line" />
                                SCROLL TO EXPLORE
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="projects-empty">
                        <p>{lang === 'fr' ? 'Aucun projet ne correspond à ces filtres.' : 'No projects match these filters.'}</p>
                    </div>
                )}
            </div>
            <div className="projects-container">
                <OtherProjects projects={otherProjects} lang={lang} title={t.otherProjects} />
            </div>
        </section>
    )
}

function OtherProjects({ projects: items, lang, title }) {
    return (
        <section className="other-projects" aria-labelledby="other-projects-title">
            <div className="other-projects__heading">
                <span>03.2 // OPEN SOURCE & EXPLORATIONS</span>
                <h2 id="other-projects-title">{title}</h2>
            </div>
            <div className="other-projects__list">
                {items.map((project, index) => (
                    <a
                        key={project.id}
                        className="other-project-row"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${lang === 'fr' ? project.title : project.titleEn} — GitHub`}
                    >
                        <span className="other-project-row__index">{String(index + 1).padStart(2, '0')}</span>
                        <strong className="other-project-row__title">
                            {lang === 'fr' ? project.title : project.titleEn}
                        </strong>
                        <span className="other-project-row__category">
                            {lang === 'fr' ? project.category : project.categoryEn}
                        </span>
                        <time className="other-project-row__date">{lang === 'fr' ? project.date : project.dateEn}</time>
                        <ExternalLink className="other-project-row__icon" size={18} aria-hidden="true" />
                    </a>
                ))}
            </div>
        </section>
    )
}

function ProjectStory({ project, index, lang, translations: t, onEnter }) {
    const title = lang === 'fr' ? project.title.fr : project.title.en

    return (
        <motion.article
            className="project-story"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.55, once: true }}
            onViewportEnter={onEnter}
            transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.24) }}
        >
            <div className="project-story__mobile-visual">
                <ProjectVisual projectId={project.id} instanceId={`mobile-${project.id}`} />
            </div>

            <div className="project-story__meta">
                <div className="project-story__badges">
                    {project.isFlagship && (
                        <span className="project-story__badge project-story__badge--featured">
                            <Sparkles size={11} />
                            {t.featured}
                        </span>
                    )}
                    {project.awardBadge && (
                        <span className="project-story__badge project-story__badge--award">
                            {project.awardBadge}
                        </span>
                    )}
                    <span className="project-story__category">
                        {lang === 'fr' ? project.category.fr : project.category.en}
                    </span>
                </div>
                <span className="project-story__date">{project.date}</span>
            </div>

            <span className="project-story__number">
                PROJECT // {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{title}</h3>
            <p className="project-story__summary">
                {lang === 'fr' ? project.summary.fr : project.summary.en}
            </p>
            <p className="project-story__description">
                {lang === 'fr' ? project.description.fr : project.description.en}
            </p>

            {project.kpis && (
                <div className="project-story__kpis">
                    {project.kpis.map(kpi => (
                        <div key={kpi.label} className="project-story__kpi">
                            <span>{kpi.label}</span>
                            <strong>{kpi.value}</strong>
                        </div>
                    ))}
                </div>
            )}

            <div className="project-story__tags" aria-label="Technologies">
                {project.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>

            <div className="project-story__actions">
                <Link to={`/projects/${project.slug}`} className="project-story__details">
                    {t.viewDetails}
                    <ArrowRight size={15} />
                </Link>
                {project.githubUrl ? (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-story__github"
                        aria-label={`GitHub repo for ${title}`}
                    >
                        <GithubIcon size={15} />
                        GitHub
                        <ExternalLink size={12} />
                    </a>
                ) : (
                    <span className="project-story__academic">
                        {lang === 'fr' ? 'PROJET ACADÉMIQUE' : 'ACADEMIC PROJECT'}
                    </span>
                )}
            </div>
        </motion.article>
    )
}
