import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:8080',
  })

  // Injetar token em cada requisição
  api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  })

  // Tratar erros globais (Ex: Token expirado)
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        const auth = useAuthStore()
        auth.logout()
      }
      return Promise.reject(error)
    }
  )
  
  return {
    provide: {
      api
    }
  }
})
