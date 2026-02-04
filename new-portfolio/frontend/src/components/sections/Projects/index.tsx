import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { projectService, Project } from '@/services/projectService'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'
import { Terminal } from '@/components/terminal/Terminal'

export function Projects() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const { data: projects, isLoading } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: projectService.getFeaturedProjects,
  })

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-900" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Background title */}
        <div className="relative">
          <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl md:text-8xl font-bold text-primary-500/10 dark:text-primary-500/5 whitespace-nowrap pointer-events-none">
            {t('projects.title').toUpperCase()}
          </h2>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-4 relative z-10"
        >
          {t('projects.featured')}
        </motion.h2>

        {/* Featured Projects Grid */}
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects?.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        )}

        {/* Terminal */}
        <div className="mt-32 md:mt-40 lg:mt-48">
          <Terminal />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project
  index: number
  inView: boolean
}) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
    >
      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-3 left-3 px-2 py-1 bg-primary-500 text-white text-sm rounded">
            {project.year}
          </span>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.short_description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 4).map((tech) => (
            <span
              key={tech.id}
              className="px-2 py-1 text-xs bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded"
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.github_repo && (
            <a
              href={project.github_repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
            >
              <Github size={16} />
              {t('projects.viewCode')}
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
            >
              <ExternalLink size={16} />
              {t('projects.viewDemo')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
