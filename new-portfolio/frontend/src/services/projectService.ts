import { api } from './api'

export interface Project {
  id: number
  slug: string
  title: string
  short_description: string
  full_description?: string
  thumbnail: string
  year: number
  is_featured: boolean
  technologies: Technology[]
  github_repo: string
  live_url: string
  features?: ProjectFeature[]
  links?: ProjectLink[]
}

export interface Technology {
  id: number
  name: string
  icon_class: string
  color: string
}

export interface ProjectFeature {
  id: number
  description: string
}

export interface ProjectLink {
  type: string
  url: string
  icon_class: string
}

export interface TerminalResponse {
  type: 'response' | 'error' | 'info' | 'project' | 'clear'
  content: string | Project
}

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const { data } = await api.get('/projects/')
    return data.results || data
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    const { data } = await api.get('/projects/featured/')
    return data.results || data
  },

  getProject: async (slug: string): Promise<Project> => {
    const { data } = await api.get(`/projects/${slug}/`)
    return data
  },

  executeTerminalCommand: async (command: string): Promise<TerminalResponse> => {
    const { data } = await api.post('/projects/terminal/execute/', { command })
    return data
  },
}
