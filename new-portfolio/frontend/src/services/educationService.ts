import { api } from './api'
import { Technology } from './projectService'

export interface Education {
  id: number
  institution: string
  institution_logo: string
  institution_url: string
  degree_type: string
  degree_name: string
  field_of_study: string
  description: string
  start_date: string
  end_date: string | null
  is_current: boolean
  skills_learned: Technology[]
}

export interface Certification {
  id: number
  name: string
  issuing_organization: string
  organization_logo: string
  issue_date: string
  expiration_date: string | null
  credential_url: string
  certificate_file: string
}

export const educationService = {
  getEducation: async (): Promise<Education[]> => {
    const { data } = await api.get('/education/')
    return data.results || data
  },

  getCertifications: async (): Promise<Certification[]> => {
    const { data } = await api.get('/education/certifications/')
    return data.results || data
  },
}
