import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add language to all requests
api.interceptors.request.use((config) => {
  const lang = localStorage.getItem('language') || 'pt-BR'
  config.params = {
    ...config.params,
    lang: lang.toLowerCase(),
  }
  return config
})
