<template>
  <div class="min-h-[80vh] flex items-center justify-center p-4">
    <div class="w-full max-w-md border-4 border-charcoal bg-white p-8 md:p-12 relative">
      <!-- Elemento Decorativo Brutalista -->
      <div class="absolute -bottom-6 -left-6 w-12 h-12 bg-crimson border-2 border-charcoal z-10"></div>
      
      <div class="mb-10">
        <h1 class="text-5xl font-black uppercase tracking-tighter leading-none mb-2">Criar Conta.</h1>
        <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">Junte-se à nossa experiência gastronômica</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label class="block text-xs uppercase tracking-widest font-black mb-2">Nome Completo</label>
          <input 
            v-model="form.nome"
            type="text" 
            required
            placeholder="Seu nome"
            class="w-full border-2 border-charcoal p-4 focus:bg-crimson/5 outline-none transition-colors font-bold"
          />
        </div>

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

        <div v-if="success" class="bg-green-600 text-white p-4 font-bold text-sm border-2 border-charcoal">
          Cadastro realizado com sucesso! Redirecionando para o login...
        </div>

        <button 
          type="submit"
          :disabled="loading"
          class="w-full bg-charcoal text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-crimson transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {{ loading ? 'Processando...' : 'Cadastrar agora' }}
        </button>
      </form>

      <div class="mt-8 pt-8 border-t-2 border-charcoal/10 text-center">
        <p class="text-sm font-bold text-gray-500 uppercase tracking-widest">
          Já tem uma conta? 
          <NuxtLink to="/login" class="text-crimson hover:underline">Fazer Login</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $api } = useNuxtApp()

const form = reactive({
  nome: '',
  email: '',
  senha: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

async function handleRegister() {
  loading.value = true
  error.value = ''
  success.value = false
  
  try {
    await $api.post('/usuarios', form)
    success.value = true
    
    // Pequeno delay para mostrar a mensagem de sucesso antes de redirecionar
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
    
  } catch (err) {
    // Tratamento de erros de validação da API
    if (Array.isArray(err.response?.data)) {
      error.value = err.response.data.map(e => e.mensagem).join(', ')
    } else {
      error.value = err.response?.data?.mensagem || 'Erro ao realizar cadastro. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>
