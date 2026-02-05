import { api } from './api'

export interface Skill {
  id: number
  name: string
  description: string
  category_name: string
  proficiency: number
  icon_class: string
  color: string
  is_featured: boolean
}

export interface SkillCategory {
  id: number
  name: string
  type: 'hard' | 'soft' | 'tools' | 'certifications'
  icon_class: string
  skills: Skill[]
}

export const skillService = {
  getSkills: async (): Promise<Skill[]> => {
    const { data } = await api.get('/skills/')
    return data.results || data
  },

  getFeaturedSkills: async (): Promise<Skill[]> => {
    const { data } = await api.get('/skills/featured/')
    return data.results || data
  },

  getCategories: async (): Promise<SkillCategory[]> => {
    const { data } = await api.get('/skills/categories/')
    return data.results || data
  },

  getByType: async (type: string): Promise<SkillCategory[]> => {
    const { data } = await api.get(`/skills/categories/by-type/${type}/`)
    return data.results || data
  },
}
