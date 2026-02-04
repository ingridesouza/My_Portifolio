import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { skillService, SkillCategory } from '@/services/skillService'
import { useInView } from 'react-intersection-observer'

export function Skills() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const { data: categories, isLoading } = useQuery({
    queryKey: ['skillCategories'],
    queryFn: skillService.getCategories,
  })

  const categoryTitles: Record<string, string> = {
    hard: t('skills.hardSkills'),
    soft: t('skills.softSkills'),
    tools: t('skills.tools'),
    certifications: t('skills.certifications'),
  }

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Background title */}
        <div className="relative">
          <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl md:text-8xl font-bold text-primary-500/10 dark:text-primary-500/5 whitespace-nowrap pointer-events-none">
            {t('skills.title').toUpperCase()}
          </h2>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12 relative z-10"
        >
          {t('skills.title')}
        </motion.h2>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="grid gap-6">
            {categories?.map((category, categoryIndex) => (
              <SkillCategoryCard
                key={category.id}
                category={category}
                title={categoryTitles[category.type] || category.name}
                index={categoryIndex}
                inView={inView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function SkillCategoryCard({
  category,
  title,
  index,
  inView,
}: {
  category: SkillCategory
  title: string
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4 text-primary-500">
        {title}
      </h3>

      <ul className="space-y-2">
        {category.skills.map((skill) => (
          <li key={skill.id} className="flex items-center gap-3">
            {skill.icon_class && (
              <i className={`${skill.icon_class} text-primary-500`} />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {skill.name}
            </span>
            {skill.proficiency > 0 && (
              <div className="flex-1 max-w-xs">
                <div className="h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.proficiency}%` } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
