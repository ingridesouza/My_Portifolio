import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { profileService } from '@/services/profileService'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, Linkedin, Github, Instagram, Copy, Check } from 'lucide-react'
import React, { useState, useRef } from 'react'

export function Contact() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  })

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedItem(label)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || 'ingridesouza040@gmail.com',
      href: `mailto:${profile?.email || 'ingridesouza040@gmail.com'}`,
      copyable: true,
      color: 'from-primary-500 to-primary-700',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile?.phone || '71 98117-0909',
      href: `tel:${profile?.phone?.replace(/\D/g, '') || '71981170909'}`,
      copyable: true,
      color: 'from-primary-600 to-primary-800',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'ingride-souza',
      href: profile?.linkedin_url || 'https://www.linkedin.com/in/ingride-souza-a21a4518a/',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: profile?.github_username || 'ingridesouza',
      href: `https://github.com/${profile?.github_username || 'ingridesouza'}`,
      color: 'from-primary-700 to-primary-900',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@ingridesouzadev',
      href: 'https://instagram.com/ingridesouzadev',
      color: 'from-primary-400 to-primary-600',
    },
  ]

  // Floating icons positions (positioned around the card, all visible)
  const orbitPositions = [
    { x: -220, y: -60, delay: 0 },      // Top left
    { x: 220, y: -60, delay: 0.2 },     // Top right
    { x: -240, y: 80, delay: 0.4 },     // Bottom left
    { x: 240, y: 80, delay: 0.6 },      // Bottom right
    { x: 0, y: 200, delay: 0.8 },       // Bottom center
  ]

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary-700 via-primary-500 to-primary-700 dark:from-primary-300 dark:via-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
        </motion.div>

        {/* 3D Floating Card Container */}
        <div className="relative flex justify-center items-center min-h-[500px]" style={{ perspective: '1000px' }}>

          {/* Floating Orbit Icons */}
          {contactItems.map((item, index) => (
            <motion.a
              key={`orbit-${item.label}`}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? {
                opacity: 1,
                scale: 1,
                x: [orbitPositions[index].x, orbitPositions[index].x + 10, orbitPositions[index].x],
                y: [orbitPositions[index].y, orbitPositions[index].y - 15, orbitPositions[index].y],
              } : {}}
              transition={{
                delay: orbitPositions[index].delay + 0.5,
                x: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.3, zIndex: 50 }}
              className={`absolute p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg cursor-pointer z-10 group`}
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-24px',
              }}
            >
              <item.icon className="w-6 h-6 text-white" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded-md"
              >
                {item.label}
              </motion.div>
            </motion.a>
          ))}

          {/* Main 3D Card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-md z-20"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-3xl opacity-30 blur-2xl animate-pulse" />

            {/* Card Content */}
            <div className="relative bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">

              {/* Holographic Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-50 pointer-events-none" />

              {/* Header with gradient */}
              <div className="relative h-24 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-700 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

                {/* Animated particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ opacity: 0.3 }}
                    animate={{
                      x: [Math.random() * 400, Math.random() * 400],
                      y: [Math.random() * 100, Math.random() * 100],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ))}
              </div>

              {/* Avatar */}
              <div className="relative -mt-12 flex justify-center" style={{ transform: 'translateZ(40px)' }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-3xl font-bold text-primary-500 overflow-hidden">
                      {profile?.photo ? (
                        <img src={profile.photo} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        'IS'
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-dark-800"
                  />
                </motion.div>
              </div>

              {/* Info */}
              <div className="p-6 text-center" style={{ transform: 'translateZ(20px)' }}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {profile?.full_name || 'Ingride Souza'}
                </h3>
                <p className="text-primary-500 font-medium mb-4">
                  {profile?.professional_title || 'Full Stack Developer'}
                </p>
                {/* Contact Info List */}
                <div className="space-y-3">
                  {contactItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-700/50 rounded-xl group cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-600/50 transition-colors"
                      onClick={(e: React.MouseEvent) => {
                        if (item.copyable) {
                          e.preventDefault()
                          copyToClipboard(item.value, item.label)
                        }
                      }}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.value}
                        </p>
                      </div>
                      {item.copyable && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg transition-colors"
                        >
                          {copiedItem === item.label ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </motion.div>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
