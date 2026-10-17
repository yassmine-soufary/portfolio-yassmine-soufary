import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('ys_lang') || 'fr'
    })

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('ys_theme') || 'dark'
    })

    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
    const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false)
    const [selectedSkill, setSelectedSkill] = useState(null)

    useEffect(() => {
        localStorage.setItem('ys_lang', lang)
    }, [lang])

    useEffect(() => {
        localStorage.setItem('ys_theme', theme)
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme')
            document.documentElement.classList.remove('dark-theme')
        } else {
            document.documentElement.classList.add('dark-theme')
            document.documentElement.classList.remove('light-theme')
        }
    }, [theme])

    // Global keyboard shortcut for Ctrl+K / Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setIsCommandPaletteOpen((prev) => !prev)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const toggleLang = () => setLang((prev) => (prev === 'fr' ? 'en' : 'fr'))
    const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

    return (
        <AppContext.Provider
            value={{
                lang,
                setLang,
                toggleLang,
                theme,
                setTheme,
                toggleTheme,
                isCommandPaletteOpen,
                setIsCommandPaletteOpen,
                isRecruiterModalOpen,
                setIsRecruiterModalOpen,
                selectedSkill,
                setSelectedSkill,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
