<template>
  <div class="min-h-[80vh] flex items-center justify-center p-4">
    <div class="w-full max-w-md border-4 border-charcoal bg-white p-8 md:p-12 relative">
      <!-- Elemento Decorativo Brutalista -->
      <div class="absolute -top-6 -right-6 w-12 h-12 bg-crimson border-2 border-charcoal z-10"></div>
      
      <div class="mb-10">
        <h1 class="text-5xl font-black uppercase tracking-tighter leading-none mb-2">Entrar.</h1>
        <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">Acesse sua conta para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-xs uppercase tracking-widest font-black mb-2">E-mail</label>
          <input 
            v-model="form.email"
            type="email" 
            required
            placeholder="usuario@email.com"
            class="w-full border-2 border-charcoal p-4 focus:bg-crimson/5 outline-none transition-colors font-bold"
          />
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest font-black mb-2">Senha</label>
          <input 
            v-model="form.senha"
            type="password" 
            required
            placeholder="••••••••"
            class="w-full border-2 border-charcoal p-4 focus:bg-crimson/5 outline-none transition-colors font-bold"
          />
        </div>

        <div v-if="error" class="bg-crimson text-white p-4 font-bold text-sm border-2 border-charcoal">
          {{ error }}
        </div>

        <button 
          type="submit"
          :disabled="loading"
          class="w-full bg-charcoal text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-crimson transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {{ loading ? 'Autenticando...' : 'Fazer Login' }}
        </button>
      </form>

      <div class="mt-8 pt-8 border-t-2 border-charcoal/10 text-center">
        <p class="text-sm font-bold text-gray-500 uppercase tracking-widest">
          Novo por aqui? 
          <NuxtLink to="/cadastro" class="text-crimson hover:underline">Crie uma conta</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const auth = useAuthStore()

const form = reactive({
  email: '',
  senha: ''
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  
  try {
    const response = await $api.post('/login', form)
    const { token, ...user } = response.data
    
    auth.setAuth(token, user)
    
    // Redirecionar baseado no tipo
    if (user.tipo === 'ADMIN') {
      navigateTo('/admin')
    } else {
      navigateTo('/')
    }
  } catch (err) {
    error.value = err.response?.data?.mensagem || 'Falha na autenticação. Verifique suas credenciais.'
  } finally {
    loading.value = false
  }
}
</script>
