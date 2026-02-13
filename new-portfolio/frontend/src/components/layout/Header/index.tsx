import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { LanguageSelector } from '@/components/common/LanguageSelector'

const navItems = [
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'education', href: '#education' },
  { key: 'contact', href: '#contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-xl font-bold gradient-text">
            Ingride Souza
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-200/20 dark:border-gray-700/20"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-4 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500 transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
