import { api } from './api'

export interface Profile {
  full_name: string
  professional_title: string
  location: string
  email: string
  phone: string
  photo: string
  bio_short: string
  bio_full: string
  github_username: string
  linkedin_url: string
  instagram_url: string
  is_available_for_hire: boolean
  social_links: SocialLink[]
}

export interface SocialLink {
  id: number
  platform: string
  url: string
  icon_class: string
  display_name: string
}

export const profileService = {
  getProfile: async (): Promise<Profile> => {
    const { data } = await api.get('/profile/')
    return data
  },

  getSocialLinks: async (): Promise<SocialLink[]> => {
    const { data } = await api.get('/profile/social-links/')
    return data
  },
}
