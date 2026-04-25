export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  // Se não for ADMIN, bloqueia acesso (redireciona para home)
  if (!auth.isAdmin) {
    return navigateTo('/')
  }
})
