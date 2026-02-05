import { api } from './api'
import { Technology } from './projectService'

export interface Experience {
  id: number
  company_name: string
  company_logo: string
  company_url: string
  position: string
  location: string
  employment_type: string
  description: string
  start_date: string
  end_date: string | null
  is_current: boolean
  technologies: Technology[]
  highlights: ExperienceHighlight[]
}

export interface ExperienceHighlight {
  id: number
  description: string
}

export const experienceService = {
  getExperiences: async (): Promise<Experience[]> => {
    const { data } = await api.get('/experience/')
    return data.results || data
  },
}
