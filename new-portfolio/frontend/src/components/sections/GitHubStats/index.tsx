import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { githubService } from '@/services/githubService'
import { useInView } from 'react-intersection-observer'
import { Star, GitFork, Users, FolderGit2 } from 'lucide-react'
import { ContributionGraph } from '@/components/common/ContributionGraph'

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
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {statItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-800 rounded-xl p-4 sm:p-6 text-center shadow-lg"
                >
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{item.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Contribution Graph */}
            {(stats?.contribution_calendar?.weeks?.length ?? 0) > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-dark-800 rounded-xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('github.contributions')}</h3>
                <ContributionGraph data={stats!.contribution_calendar!} inView={inView} />
              </motion.div>
            )}

            {/* Languages - GitHub Style */}
            {stats?.top_languages && Object.keys(stats.top_languages).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-dark-800 rounded-xl p-4 sm:p-6 shadow-lg"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{t('github.languages')}</h3>

                {(() => {
                  const languageColors: Record<string, string> = {
                    Python: '#3572A5',
                    JavaScript: '#f1e05a',
                    TypeScript: '#3178c6',
                    HTML: '#e34c26',
                    CSS: '#563d7c',
                    Java: '#b07219',
                    'C++': '#f34b7d',
                    C: '#555555',
                    'C#': '#178600',
                    Go: '#00ADD8',
                    Rust: '#dea584',
                    Ruby: '#701516',
                    PHP: '#4F5D95',
                    Swift: '#ffac45',
                    Kotlin: '#A97BFF',
                    Dart: '#00B4AB',
                    Shell: '#89e051',
                    Vue: '#41b883',
                    Scss: '#c6538c',
                  }

                  const total = Object.values(stats.top_languages as Record<string, number>).reduce((a, b) => a + b, 0)
                  const languages = Object.entries(stats.top_languages as Record<string, number>)
                    .slice(0, 5)
                    .map(([lang, count]) => ({
                      name: lang,
                      percentage: Math.round((count / total) * 100),
                      color: languageColors[lang] || '#6e7681',
                    }))

                  return (
                    <>
                      {/* GitHub-style language bar */}
                      <div className="h-2.5 sm:h-3 w-full rounded-full overflow-hidden flex mb-4 sm:mb-6">
                        {languages.map((lang, index) => (
                          <motion.div
                            key={lang.name}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${lang.percentage}%` } : {}}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            className="h-full first:rounded-l-full last:rounded-r-full"
                            style={{ backgroundColor: lang.color }}
                            title={`${lang.name}: ${lang.percentage}%`}
                          />
                        ))}
                      </div>

                      {/* Language cards */}
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {languages.map((lang, index) => (
                          <motion.div
                            key={lang.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                            className="flex items-center gap-1.5 sm:gap-2 bg-gray-100 dark:bg-dark-700 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2"
                          >
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: lang.color }}
                            />
                            <span className="text-xs sm:text-sm font-medium">{lang.name}</span>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold">
                              {lang.percentage}%
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
