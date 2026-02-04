import { createContext, useContext, useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Language = 'pt-BR' | 'pt-PT' | 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n, t } = useTranslation()
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language') as Language
    return stored || 'pt-BR'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
