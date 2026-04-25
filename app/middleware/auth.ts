export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  // Se não estiver logado, redireciona para login
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }
})
