import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { profileService } from '@/services/profileService'
import { ParticleBackground } from '@/components/effects/ParticleBackground'

export function Hero() {
  const { t } = useTranslation()
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  })

  const title = profile?.professional_title || t('hero.title')

  useEffect(() => {
    if (!title) return

    let index = 0
    setTypedText('')
    setIsTyping(true)

    const interval = setInterval(() => {
      if (index < title.length) {
        setTypedText(title.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [title])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              {/* Aura effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/30 to-primary-700/30 blur-xl animate-pulse-slow" />

              {/* Tech circle */}
              <div className="absolute -inset-4 border-2 border-dashed border-primary-500/40 rounded-full animate-spin-slow" />

              {/* Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary-500 shadow-2xl">
                {profile?.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-6xl font-bold">
                    IS
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              {t('hero.greeting')}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {profile?.full_name || 'Ingride Souza'}
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-500 mb-4 min-h-[2rem] sm:min-h-[2.5rem]">
              {typedText}
              {isTyping && <span className="terminal-cursor ml-1" />}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg">
              {profile?.bio_short || t('hero.subtitle')}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 dark:text-gray-400">
              <MapPin size={18} />
              <span>{profile?.location || 'Salvador, Bahia - Brasil'}</span>
            </div>

            {profile?.is_available_for_hire && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Disponivel para novos projetos
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
