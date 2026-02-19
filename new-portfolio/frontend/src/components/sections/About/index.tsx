import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { profileService } from '@/services/profileService'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

// Photo configuration
const MAIN_PHOTO = {
  src: '/images/about/perfil.jpeg',
  alt: 'Foto de perfil',
}

const SECONDARY_PHOTOS = [
  { src: '/images/about/reuniao-sorrindo.jpeg', alt: 'Em reunião' },
  { src: '/images/about/reuniao-lado.jpeg', alt: 'Trabalhando em equipe' },
]

// Configuration
const CONFIG = {
  workModel: 'Remoto / Híbrido',
  location: 'Salvador, BA - Brasil',
  linkedin: 'https://www.linkedin.com/in/ingride-souza-a21a4518a/',
  cvUrl: '/cv-ingride-souza.pdf',
}

export function About() {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  })

  const allPhotos = [MAIN_PHOTO, ...SECONDARY_PHOTOS]

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-900" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Background title */}
        <div className="relative">
          <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl sm:text-6xl md:text-8xl font-bold text-primary-500/10 dark:text-primary-500/5 whitespace-nowrap pointer-events-none">
            {t('about.title').toUpperCase()}
          </h2>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 relative z-10"
        >
          {t('about.title')}
        </motion.h2>

        {/* Main Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
        >
          {/* Photo Column */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Main Photo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                onClick={() => setSelectedPhoto(MAIN_PHOTO.src)}
              >
                <img
                  src={MAIN_PHOTO.src}
                  alt={MAIN_PHOTO.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Secondary Photos */}
              <div className="flex justify-center gap-2 mt-4">
                {SECONDARY_PHOTOS.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-lg overflow-hidden shadow-md cursor-pointer border-2 border-white dark:border-dark-700"
                    onClick={() => setSelectedPhoto(photo.src)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="flex-1 text-center lg:text-left">
            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6"
            >
              {profile?.bio_full || t('about.description')}
            </motion.p>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{CONFIG.workModel}</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <a
                href={CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href={CONFIG.cvUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500 font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Currículo
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedPhoto}
            alt="Foto ampliada"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-primary-400 transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            &times;
          </button>
          <button
            className="absolute left-4 text-white text-4xl hover:text-primary-400 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = allPhotos.findIndex((p) => p.src === selectedPhoto)
              const prevIndex = currentIndex === 0 ? allPhotos.length - 1 : currentIndex - 1
              setSelectedPhoto(allPhotos[prevIndex].src)
            }}
          >
            &#8249;
          </button>
          <button
            className="absolute right-4 text-white text-4xl hover:text-primary-400 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = allPhotos.findIndex((p) => p.src === selectedPhoto)
              const nextIndex = currentIndex === allPhotos.length - 1 ? 0 : currentIndex + 1
              setSelectedPhoto(allPhotos[nextIndex].src)
            }}
          >
            &#8250;
          </button>
        </motion.div>
      )}
    </section>
  )
}
