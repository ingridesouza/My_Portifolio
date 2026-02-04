import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { profileService } from '@/services/profileService'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, Linkedin, Github, Instagram } from 'lucide-react'

export function Contact() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  })

  const contactItems = [
    {
      icon: Phone,
      label: t('contact.phone'),
      value: profile?.phone || '71 98117-0909',
      href: `tel:${profile?.phone?.replace(/\D/g, '') || '71981170909'}`,
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: profile?.email || 'ingridesouza040@gmail.com',
      href: `mailto:${profile?.email || 'ingridesouza040@gmail.com'}`,
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: 'ingride-souza',
      href: profile?.linkedin_url || 'https://www.linkedin.com/in/ingride-souza-a21a4518a',
    },
    {
      icon: Github,
      label: t('contact.github'),
      value: profile?.github_username || 'ingridesouza',
      href: `https://github.com/${profile?.github_username || 'ingridesouza'}`,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@ingridesouzadev',
      href: profile?.instagram_url || 'https://www.instagram.com/ingridesouzadev/',
    },
  ]

  return (
    <section id="contact" className="section-padding bg-gray-50 dark:bg-dark-900" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {t('contact.title')}
        </motion.h2>

        <div className="space-y-4">
          {contactItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="p-3 bg-primary-500/10 rounded-lg group-hover:bg-primary-500 transition-colors">
                <item.icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="font-medium group-hover:text-primary-500 transition-colors">
                  {item.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
