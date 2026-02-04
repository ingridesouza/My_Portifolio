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
      <div className="max-w-4xl mx-auto px-4">
        {/* Background title */}
        <div className="relative">
          <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl md:text-7xl font-bold text-primary-500/10 dark:text-primary-500/5 whitespace-nowrap pointer-events-none">
            {t('skills.title').toUpperCase()}
          </h2>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl md:text-3xl font-bold text-center mb-10 relative z-10"
        >
          {t('skills.title')}
        </motion.h2>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
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
      className="bg-white dark:bg-dark-800 rounded-lg p-5 shadow-md"
    >
      <h3 className="text-lg font-semibold mb-3 text-primary-500">
        {title}
      </h3>

      <ul className="space-y-2.5">
        {category.skills.map((skill) => (
          <li key={skill.id} className="flex items-center gap-2">
            {skill.icon_class && (
              <i className={`${skill.icon_class} text-primary-500 text-sm`} />
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300 min-w-0 flex-shrink-0">
              {skill.name}
            </span>
            {skill.proficiency > 0 && (
              <div className="flex-1 max-w-[120px] ml-auto">
                <div className="h-1.5 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
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
