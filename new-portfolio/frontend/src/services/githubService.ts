import { api } from './api'

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  language: string
  topics: string[]
  stars_count: number
  forks_count: number
  watchers_count: number
  is_fork: boolean
  is_archived: boolean
  pushed_at: string
  is_featured: boolean
}

export interface ContributionDay {
  contributionCount: number
  date: string
  weekday: number
  color: string
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

export interface GitHubStats {
  total_repos: number
  total_stars: number
  total_forks: number
  total_followers: number
  total_following: number
  public_repos: number
  top_languages: Record<string, number>
  contribution_calendar: ContributionCalendar | null
  profile_data: {
    name: string
    bio: string
    avatar_url: string
    html_url: string
  }
  last_synced_at: string
}

export const githubService = {
  getRepos: async (): Promise<GitHubRepo[]> => {
    const { data } = await api.get('/github/repos/')
    return data.results || data
  },

  getFeaturedRepos: async (): Promise<GitHubRepo[]> => {
    const { data } = await api.get('/github/repos/featured/')
    return data.results || data
  },

  getStats: async (): Promise<GitHubStats> => {
    const { data } = await api.get('/github/stats/')
    return data
  },
}
