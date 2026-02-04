import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const socialLinks = [
  { icon: Github, href: 'https://github.com/ingridesouza', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ingride-souza-a21a4518a', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/ingridesouzadev/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:ingridesouza040@gmail.com', label: 'Email' },
]

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 dark:bg-dark-950 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} - {t('footer.copyright')}
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
