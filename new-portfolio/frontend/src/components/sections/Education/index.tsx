import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { educationService } from '@/services/educationService'
import { useInView } from 'react-intersection-observer'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileText, ExternalLink, Award, Download } from 'lucide-react'

export function Education() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const { data: education } = useQuery({
    queryKey: ['education'],
    queryFn: educationService.getEducation,
  })

  const { data: certifications } = useQuery({
    queryKey: ['certifications'],
    queryFn: educationService.getCertifications,
  })

  return (
    <section id="education" className="section-padding bg-dark-900 text-white" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Background title */}
        <div className="relative">
          <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl sm:text-6xl md:text-8xl font-bold text-white/5 whitespace-nowrap pointer-events-none">
            {t('education.title').toUpperCase()}
          </h2>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 relative z-10"
        >
          {t('education.title')}
        </motion.h2>

        {/* Education */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          {education?.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-dark-800 rounded-xl p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-2">
                <div>
                  <span className="text-xs sm:text-sm text-primary-400 uppercase font-medium">
                    {edu.degree_type}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold">{edu.degree_name}</h3>
                  {edu.institution_url ? (
                    <a
                      href={edu.institution_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1"
                    >
                      {edu.institution}
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-400">{edu.institution}</p>
                  )}
                </div>
                <span className="text-xs sm:text-sm text-gray-500 sm:text-right sm:flex-shrink-0">
                  {format(new Date(edu.start_date), 'MMM yyyy', { locale: ptBR })} -{' '}
                  {edu.is_current ? 'Atual' : edu.end_date ? format(new Date(edu.end_date), 'MMM yyyy', { locale: ptBR }) : ''}
                </span>
              </div>

              {/* Skills learned */}
              {edu.skills_learned?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {edu.skills_learned.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-primary-500 text-white rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-5 sm:mb-6"
            >
              <div className="p-2 bg-primary-500/20 rounded-lg">
                <Award className="text-primary-400" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">{t('education.certifications')}</h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-dark-800 rounded-xl overflow-hidden border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300"
                >
                  {/* Gradient accent top */}
                  <div className="h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600" />

                  <div className="p-3.5 sm:p-4">
                    <div className="flex items-start gap-3">
                      {/* Logo or icon */}
                      <div className="flex-shrink-0">
                        {cert.organization_logo ? (
                          <img
                            src={cert.organization_logo}
                            alt={cert.issuing_organization}
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-contain bg-white p-1"
                          />
                        ) : (
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary-500/15 flex items-center justify-center">
                            <FileText className="text-primary-400" size={18} />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base text-white leading-tight mb-0.5 line-clamp-2">
                          {cert.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {cert.issuing_organization}
                        </p>
                        {cert.issue_date && (
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                            {format(new Date(cert.issue_date), 'MMM yyyy', { locale: ptBR })}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    {(cert.credential_url || cert.certificate_file) && (
                      <a
                        href={cert.credential_url || cert.certificate_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 mt-3 py-1.5 sm:py-2 rounded-lg bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 hover:text-primary-300 transition-colors text-xs sm:text-sm font-medium"
                      >
                        {cert.credential_url ? (
                          <><ExternalLink size={13} /> Ver credencial</>
                        ) : (
                          <><Download size={13} /> Ver certificado</>
                        )}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
