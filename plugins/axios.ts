import axios from 'axios'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:8080',
  })

  // interceptor to inject token will go here later
  
  return {
    provide: {
      api
    }
  }
})
