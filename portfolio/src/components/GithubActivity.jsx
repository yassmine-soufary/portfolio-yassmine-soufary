import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, ExternalLink, GitBranch, RefreshCw } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { profile } from '../data/profile'
import { Github } from './BrandIcons'
import './GithubActivity.css'

const fallbackRepos = [
    {
        name: 'vertical-farming',
        description: 'Smart vertical farming project',
        html_url: 'https://github.com/yassmine-soufary/vertical-farming',
        language: 'JavaScript',
        updated_at: '2026-09-26T21:33:56Z',
    },
    {
        name: 'stock-ia-management-',
        description: 'StockAppAI — intelligent inventory management with AI-assisted analysis and automated alerts.',
        html_url: 'https://github.com/yassmine-soufary/stock-ia-management-',
        language: 'Python',
        updated_at: '2026-10-01T12:01:47Z',
    },
]

const languageColors = {
    Python: '#3572A5',
    Java: '#b07219',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    SQL: '#e38c00',
    'Jupyter Notebook': '#da5b0b',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Dockerfile: '#384d54',
}

function getLanguageColor(language) {
    return languageColors[language] || '#ff4500'
}

function getLanguageStats(repositories) {
    const counts = repositories.reduce((result, repository) => {
        if (repository.language) {
            result[repository.language] = (result[repository.language] || 0) + 1
        }
        return result
    }, {})
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0)

    return Object.entries(counts)
        .sort(([, first], [, second]) => second - first)
        .slice(0, 6)
        .map(([name, count]) => ({
            name,
            count,
            percentage: total ? (count / total) * 100 : 0,
            color: getLanguageColor(name),
        }))
}

function formatUpdatedDate(date, lang) {
    if (!date) return ''
    return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'short',
        year: 'numeric',
    }).format(new Date(date))
}

export default function GithubActivity() {
    const { lang } = useApp()
    const t = translations[lang].github
    const [repos, setRepos] = useState(fallbackRepos)
    const [userMeta, setUserMeta] = useState(null)
    const [languageStats, setLanguageStats] = useState(() => getLanguageStats(fallbackRepos))
    const [loading, setLoading] = useState(true)
    const [isFallback, setIsFallback] = useState(false)

    useEffect(() => {
        let isMounted = true

        const fetchGithubData = async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch('https://api.github.com/users/yassmine-soufary'),
                    fetch('https://api.github.com/users/yassmine-soufary/repos?sort=updated&per_page=100'),
                ])

                if (!userRes.ok || !reposRes.ok) {
                    throw new Error(`GitHub API request failed: user ${userRes.status}, repositories ${reposRes.status}`)
                }

                const [userData, reposData] = await Promise.all([userRes.json(), reposRes.json()])
                if (!Array.isArray(reposData)) {
                    throw new Error('GitHub API returned an invalid repositories response')
                }

                const publicRepos = reposData.filter(repository => !repository.fork)
                const recentRepos = [...publicRepos]
                    .sort((first, second) => new Date(second.updated_at) - new Date(first.updated_at))
                    .slice(0, 6)

                if (isMounted) {
                    setUserMeta(userData)
                    setRepos(recentRepos.length ? recentRepos : fallbackRepos)
                    setLanguageStats(getLanguageStats(publicRepos))
                    setIsFallback(false)
                }
            } catch (error) {
                console.error('Unable to load GitHub activity:', error)
                if (isMounted) {
                    setIsFallback(true)
                    setRepos(fallbackRepos)
                    setLanguageStats(getLanguageStats(fallbackRepos))
                }
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchGithubData()
        return () => { isMounted = false }
    }, [])

    return (
        <section id="github" className="github-activity">
            <div className="github-activity__container">
                <motion.div
                    className="github-activity__heading"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="github-activity__title">
                        <div className="github-activity__rule" />
                        <div>
                            <span className="github-activity__eyebrow">{t.sectionNumber}</span>
                            <h2>{t.title}</h2>
                        </div>
                    </div>
                    <div className="github-activity__intro">
                        <p>{t.subtitle}</p>
                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="github-activity__profile-link">
                            <Github size={16} />
                            {t.viewProfile}
                            <ExternalLink size={13} />
                        </a>
                    </div>
                </motion.div>

                {loading && (
                    <div className="github-activity__status">
                        <RefreshCw size={14} />
                        <span>{t.loading}</span>
                    </div>
                )}
                {!loading && isFallback && (
                    <p className="github-activity__fallback">{t.fallbackMsg}</p>
                )}

                <div className="github-activity__layout">
                    <motion.aside
                        className="github-profile-card"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="github-profile-card__identity">
                            {userMeta?.avatar_url ? (
                                <img src={userMeta.avatar_url} alt="" className="github-profile-card__avatar" />
                            ) : (
                                <div className="github-profile-card__avatar github-profile-card__avatar--fallback">
                                    <Github size={27} />
                                </div>
                            )}
                            <div>
                                <span className="github-profile-card__eyebrow">GITHUB PROFILE</span>
                                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="github-profile-card__username">
                                    @{userMeta?.login || 'yassmine-soufary'}
                                </a>
                            </div>
                        </div>

                        <div className="github-profile-card__stat">
                            <strong>{userMeta?.public_repos ?? '—'}</strong>
                            <span>{t.publicRepos}</span>
                        </div>

                        <div className="github-languages">
                            <div className="github-languages__heading">
                                <span>{t.languageDistribution}</span>
                                <Code2 size={14} />
                            </div>
                            {languageStats.length > 0 ? (
                                <>
                                    <div className="github-languages__bar" role="img" aria-label={languageStats.map(language => `${language.name} ${Math.round(language.percentage)}%`).join(', ')}>
                                        {languageStats.map(language => (
                                            <span
                                                key={language.name}
                                                style={{ width: `${language.percentage}%`, background: language.color }}
                                                title={`${language.name}: ${Math.round(language.percentage)}%`}
                                            />
                                        ))}
                                    </div>
                                    <div className="github-languages__legend">
                                        {languageStats.map(language => (
                                            <span key={language.name}>
                                                <i style={{ background: language.color }} />
                                                {language.name}
                                                <small>{Math.round(language.percentage)}%</small>
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="github-languages__empty">{loading ? t.loading : '—'}</p>
                            )}
                        </div>

                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="github-profile-card__cta">
                            <Github size={15} />
                            {t.viewProfile}
                            <ExternalLink size={13} />
                        </a>
                    </motion.aside>

                    <div className="github-repositories">
                        <div className="github-repositories__heading">
                            <div>
                                <span>OPEN SOURCE // REPOSITORIES</span>
                                <h3>{t.recentRepos}</h3>
                            </div>
                            <GitBranch size={18} />
                        </div>

                        <div className="github-repositories__list">
                            {repos.map((repo, index) => (
                                <motion.a
                                    key={repo.name}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-repo-row"
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.24) }}
                                >
                                    <div className="github-repo-row__main">
                                        <div className="github-repo-row__title">
                                            <h4>{repo.name}</h4>
                                            <ExternalLink size={13} />
                                        </div>
                                        <p>{repo.description || t.noDescription}</p>
                                    </div>
                                    <div className="github-repo-row__meta">
                                        <span className="github-repo-row__language">
                                            <i style={{ background: getLanguageColor(repo.language) }} />
                                            {repo.language || 'Code'}
                                        </span>
                                        <time>{formatUpdatedDate(repo.updated_at, lang)}</time>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
