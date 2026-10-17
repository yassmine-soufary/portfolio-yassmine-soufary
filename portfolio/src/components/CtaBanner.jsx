import { motion } from 'framer-motion'
import { ArrowDownRight, FileText } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { profile } from '../data/profile'
import './CtaBanner.css'

export default function CtaBanner() {
    const { lang } = useApp()
    const t = translations[lang].ctaBanner

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="cta-banner" aria-labelledby="cta-banner-title">
            <div className="cta-banner__watermark" aria-hidden="true">YASSMINE</div>
            <div className="cta-banner__glow" aria-hidden="true" />
            <motion.div
                className="cta-banner__content"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="cta-banner__eyebrow">{t.eyebrow}</span>
                <h2 id="cta-banner-title">{t.title}</h2>
                <p>{t.subtitle}</p>
                <div className="cta-banner__actions">
                    <button type="button" className="cta-banner__primary" onClick={scrollToContact}>
                        {t.contact}
                        <ArrowDownRight size={17} />
                    </button>
                    <a
                        className="cta-banner__secondary"
                        href={profile.cvPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        download="CV_Yassmine_Soufary.pdf"
                    >
                        <FileText size={16} />
                        {t.resume}
                    </a>
                </div>
            </motion.div>
        </section>
    )
}
