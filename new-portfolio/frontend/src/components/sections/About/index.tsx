import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { profileService } from '@/services/profileService'
import { useInView } from 'react-intersection-observer'

export function About() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  })

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-900" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Background title */}
        <div className="relative">
          <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl md:text-8xl font-bold text-primary-500/10 dark:text-primary-500/5 whitespace-nowrap pointer-events-none">
            {t('about.title').toUpperCase()}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {t('about.title')}
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none text-center">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {profile?.bio_full || t('about.description')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
