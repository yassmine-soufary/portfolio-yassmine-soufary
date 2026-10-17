import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { ArrowUp, Download, ExternalLink, LoaderCircle, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { translations } from '../i18n/translations'
import { profile } from '../data/profile'
import { Github as GithubIcon, Linkedin } from './BrandIcons'
import './Contact.css'

const currentYear = new Date().getFullYear()
const emailJsConfig = {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
}

export default function Contact() {
    const { lang } = useApp()
    const t = translations[lang].contact
    const isFrench = lang === 'fr'
    const [isSending, setIsSending] = useState(false)
    const [formStatus, setFormStatus] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        setFormStatus(null)

        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }

        const formData = new FormData(form)
        const name = formData.get('name')?.toString().trim() || ''
        const email = formData.get('email')?.toString().trim() || ''
        const company = formData.get('company')?.toString().trim() || ''
        const subject = formData.get('subject')?.toString().trim() || ''
        const message = formData.get('message')?.toString().trim() || ''

        if (!name || !email || !subject || !message) {
            setFormStatus({
                type: 'error',
                message: isFrench
                    ? 'Veuillez renseigner tous les champs obligatoires.'
                    : 'Please complete all required fields.',
            })
            return
        }

        if (!emailJsConfig.publicKey || !emailJsConfig.serviceId || !emailJsConfig.templateId) {
            setFormStatus({
                type: 'error',
                message: isFrench
                    ? 'Le formulaire n’est pas configuré. Veuillez nous contacter directement par e-mail.'
                    : 'The contact form is not configured. Please contact us directly by email.',
            })
            return
        }

        setIsSending(true)
        try {
            await emailjs.send(
                emailJsConfig.serviceId,
                emailJsConfig.templateId,
                {
                    name,
                    email,
                    company,
                    subject,
                    message,
                    from_name: name,
                    from_email: email,
                    reply_to: email,
                    to_email: profile.email,
                },
                { publicKey: emailJsConfig.publicKey }
            )
            form.reset()
            setFormStatus({
                type: 'success',
                message: isFrench
                    ? 'Votre message a bien été envoyé. Merci de m’avoir contactée !'
                    : 'Your message was sent successfully. Thank you for reaching out!',
            })
        } catch {
            setFormStatus({
                type: 'error',
                message: isFrench
                    ? 'L’envoi a échoué. Veuillez réessayer ou m’écrire directement par e-mail.'
                    : 'Your message could not be sent. Please try again or email me directly.',
            })
        } finally {
            setIsSending(false)
        }
    }

    const whatsappMessage = encodeURIComponent(
        isFrench
            ? 'Bonjour Yassmine, je vous contacte au sujet de votre profil et de vos projets.'
            : 'Hi Yassmine, I am contacting you about your profile and projects.'
    )
    const whatsappUrl = `https://wa.me/212625442697?text=${whatsappMessage}`

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section id="contact" className="contact-section">
            <div className="contact-section__glow" aria-hidden="true" />
            <div className="contact-section__watermark" aria-hidden="true">YASSMINE</div>

            <div className="contact-container">
                <motion.header
                    className="contact-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                >
                    <span className="contact-heading__eyebrow">{t.sectionNumber}</span>
                    <h2>{t.headline}</h2>
                    <p>{t.supportingText}</p>
                </motion.header>

                <div className="contact-layout">
                    <motion.div
                        className="contact-form-card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                    >
                        <div className="contact-card-heading">
                            <div>
                                <span>{isFrench ? 'NOUVEAU MESSAGE' : 'NEW MESSAGE'}</span>
                                <h3>{isFrench ? 'Parlons de votre projet' : "Let's talk about your project"}</h3>
                            </div>
                            <Mail size={20} aria-hidden="true" />
                        </div>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="contact-form__grid">
                                <label className="contact-field">
                                    <span>{isFrench ? 'Nom complet' : 'Full name'} <i>*</i></span>
                                    <input name="name" type="text" autoComplete="name" placeholder={isFrench ? 'Votre nom' : 'Your name'} required />
                                </label>
                                <label className="contact-field">
                                    <span>{isFrench ? 'Email professionnel' : 'Professional email'} <i>*</i></span>
                                    <input name="email" type="email" autoComplete="email" placeholder="nom@entreprise.com" required />
                                </label>
                            </div>

                            <label className="contact-field">
                                <span>{isFrench ? 'Entreprise (optionnel)' : 'Company (optional)'}</span>
                                <input name="company" type="text" autoComplete="organization" placeholder={isFrench ? 'Nom de votre entreprise' : 'Your company name'} />
                            </label>

                            <label className="contact-field">
                                <span>{isFrench ? 'Objet' : 'Subject'} <i>*</i></span>
                                <input name="subject" type="text" placeholder={isFrench ? 'Sujet de votre message' : 'Message subject'} required />
                            </label>

                            <label className="contact-field">
                                <span>{isFrench ? 'Message' : 'Message'} <i>*</i></span>
                                <textarea name="message" rows="5" placeholder={isFrench ? 'Comment puis-je vous aider ?' : 'How can I help you?'} required />
                            </label>

                            <button type="submit" className="contact-submit" disabled={isSending} aria-busy={isSending}>
                                {isSending
                                    ? <LoaderCircle size={16} className="contact-submit__spinner" aria-hidden="true" />
                                    : <Send size={16} aria-hidden="true" />}
                                {isSending
                                    ? (isFrench ? 'Envoi en cours…' : 'Sending…')
                                    : (isFrench ? 'Envoyer le message' : 'Send message')}
                            </button>
                            <p
                                className={`contact-form__note${formStatus ? ` contact-form__note--${formStatus.type}` : ''}`}
                                role={formStatus?.type === 'error' ? 'alert' : formStatus ? 'status' : undefined}
                                aria-live={formStatus ? 'polite' : undefined}
                            >
                                {formStatus
                                    ? formStatus.message
                                    : (isFrench
                                        ? 'Vos informations sont envoyées de façon sécurisée par e-mail.'
                                        : 'Your details are sent securely by email.')}
                            </p>
                        </form>
                    </motion.div>

                    <motion.aside
                        className="contact-direct"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                    >
                        <div className="contact-direct__heading">
                            <span>{isFrench ? 'RESTONS EN CONTACT' : "LET'S CONNECT"}</span>
                            <h3>{isFrench ? 'Contact direct' : 'Direct contact'}</h3>
                        </div>

                        <a className="contact-link-card" href={`mailto:${profile.email}`}>
                            <span className="contact-link-card__icon"><Mail size={18} /></span>
                            <span className="contact-link-card__body">
                                <small>{t.email}</small>
                                <strong>{profile.email}</strong>
                            </span>
                            <ExternalLink size={14} className="contact-link-card__arrow" />
                        </a>

                        <a className="contact-link-card" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <span className="contact-link-card__icon"><MessageCircle size={18} /></span>
                            <span className="contact-link-card__body">
                                <small>WhatsApp</small>
                                <strong>{profile.phone}</strong>
                                <em>{isFrench ? 'Message prérempli' : 'Pre-filled message'}</em>
                            </span>
                            <ExternalLink size={14} className="contact-link-card__arrow" />
                        </a>

                        <a className="contact-link-card" href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
                            <span className="contact-link-card__icon"><Phone size={18} /></span>
                            <span className="contact-link-card__body">
                                <small>{t.phone}</small>
                                <strong>{profile.phone}</strong>
                            </span>
                            <ExternalLink size={14} className="contact-link-card__arrow" />
                        </a>

                        <a className="contact-link-card" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <span className="contact-link-card__icon"><Linkedin size={18} /></span>
                            <span className="contact-link-card__body">
                                <small>{t.viewLinkedin}</small>
                                <strong>Yassmine Soufary</strong>
                            </span>
                            <ExternalLink size={14} className="contact-link-card__arrow" />
                        </a>

                        <div className="contact-location">
                            <MapPin size={15} />
                            <span>{profile.location}</span>
                        </div>

                        <a
                            href={profile.cvPath}
                            download="CV_Yassmine_Soufary.pdf"
                            className="contact-cv-link"
                        >
                            <Download size={15} />
                            {t.downloadCv}
                        </a>
                    </motion.aside>
                </div>

                <footer className="contact-footer">
                    <div className="contact-footer__copyright">
                        © {currentYear} {profile.name}. {t.copyright}
                    </div>
                    <div className="contact-footer__links">
                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GithubIcon />
                        </a>
                        <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <button type="button" onClick={scrollToTop} className="contact-back-to-top">
                            {isFrench ? 'Haut de page' : 'Back to top'}
                            <ArrowUp size={14} />
                        </button>
                    </div>
                </footer>
            </div>
        </section>
    )
}
