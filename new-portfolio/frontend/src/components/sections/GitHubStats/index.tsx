import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { githubService } from '@/services/githubService'
import { useInView } from 'react-intersection-observer'
import { Star, GitFork, Users, FolderGit2 } from 'lucide-react'

export function GitHubStats() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const { data: stats, isLoading } = useQuery({
    queryKey: ['githubStats'],
    queryFn: githubService.getStats,
  })

  const statItems = [
    { icon: FolderGit2, label: t('github.repos'), value: stats?.total_repos || 0 },
    { icon: Star, label: t('github.stars'), value: stats?.total_stars || 0 },
    { icon: GitFork, label: 'Forks', value: stats?.total_forks || 0 },
    { icon: Users, label: t('github.followers'), value: stats?.total_followers || 0 },
  ]

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {t('github.title')}
        </motion.h2>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {statItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-800 rounded-xl p-6 text-center shadow-lg"
                >
                  <item.icon className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            {stats?.top_languages && Object.keys(stats.top_languages).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{t('github.languages')}</h3>
                <div className="space-y-3">
                  {Object.entries(stats.top_languages)
                    .slice(0, 5)
                    .map(([lang, count], index) => {
                      const total = Object.values(stats.top_languages).reduce((a, b) => a + b, 0)
                      const percentage = Math.round((count / total) * 100)

                      return (
                        <div key={lang}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{lang}</span>
                            <span className="text-gray-500">{percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${percentage}%` } : {}}
                              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
