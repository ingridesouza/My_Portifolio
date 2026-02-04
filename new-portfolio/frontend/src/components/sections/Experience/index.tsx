import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { experienceService, Experience as ExperienceType } from '@/services/experienceService'
import { useInView } from 'react-intersection-observer'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function Experience() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const { data: experiences, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: experienceService.getExperiences,
  })

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Background title */}
        <div className="relative">
          <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl md:text-8xl font-bold text-primary-500/10 dark:text-primary-500/5 whitespace-nowrap pointer-events-none">
            {t('experience.title').toUpperCase()}
          </h2>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12 relative z-10"
        >
          {t('experience.title')}
        </motion.h2>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-500/30" />

            <div className="space-y-8">
              {experiences?.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ExperienceCard({
  experience,
  index,
  inView,
}: {
  experience: ExperienceType
  index: number
  inView: boolean
}) {
  const { t } = useTranslation()

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy', { locale: ptBR })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="relative pl-20"
    >
      {/* Timeline dot */}
      <div className="absolute left-6 w-5 h-5 bg-primary-500 rounded-full border-4 border-white dark:border-dark-900" />

      {/* Date */}
      <div className="absolute left-0 top-0 text-sm text-gray-500 dark:text-gray-400 font-medium">
        {formatDate(experience.start_date)}
        <br />
        {experience.is_current ? t('experience.current') : experience.end_date ? formatDate(experience.end_date) : ''}
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          {experience.company_logo && (
            <img
              src={experience.company_logo}
              alt={experience.company_name}
              className="w-12 h-12 rounded-lg object-contain bg-white"
            />
          )}
          <div>
            <h3 className="font-semibold text-lg">{experience.company_name}</h3>
            <p className="text-primary-500 font-medium">{experience.position}</p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
          {experience.description}
        </p>

        {/* Technologies */}
        {experience.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech) => (
              <span
                key={tech.id}
                className="px-2 py-1 text-xs bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
