<template>
  <div class="py-20 px-4 max-w-7xl mx-auto">
    <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12 border-b-4 border-charcoal pb-4">
      Finalizar <span class="text-crimson">Pedido</span>
    </h1>

    <div v-if="cart.isEmpty" class="py-20 text-center border-4 border-dashed border-charcoal bg-gray-50">
      <p class="text-2xl font-bold uppercase mb-8">Seu carrinho está vazio.</p>
      <NuxtLink to="/" class="bg-charcoal text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-crimson transition-colors">
        Voltar ao Cardápio
      </NuxtLink>
    </div>

    <div v-else class="grid lg:grid-cols-2 gap-16">
      <!-- Coluna da Esquerda: Itens -->
      <section>
        <h2 class="text-3xl font-black uppercase mb-8 flex items-center gap-4">
          <span class="w-8 h-8 bg-charcoal text-white flex items-center justify-center text-sm">01</span>
          Seus Itens
        </h2>
        
        <div class="space-y-4">
          <div v-for="item in cart.items" :key="item.id" class="border-2 border-charcoal p-6 flex flex-col md:flex-row gap-6 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div class="flex-grow">
              <h3 class="text-xl font-bold uppercase">{{ item.nome }}</h3>
              <p class="text-crimson font-black text-lg">R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="flex border-2 border-charcoal">
                <button @click="cart.updateQuantity(item.id, item.quantidade - 1)" class="px-4 py-2 hover:bg-gray-100 font-bold">-</button>
                <span class="px-6 py-2 border-x-2 border-charcoal font-black">{{ item.quantidade }}</span>
                <button @click="cart.updateQuantity(item.id, item.quantidade + 1)" class="px-4 py-2 hover:bg-gray-100 font-bold">+</button>
              </div>
              <button @click="cart.removeItem(item.id)" class="text-gray-400 hover:text-crimson transition-colors uppercase text-xs font-bold underline">Remover</button>
            </div>
          </div>
        </div>

        <div class="mt-8 p-6 bg-charcoal text-white border-4 border-crimson">
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold uppercase">Total do Pedido</span>
            <span class="text-3xl font-black">R$ {{ cart.totalPrice.toFixed(2) }}</span>
          </div>
        </div>
      </section>

      <!-- Coluna da Direita: Dados e Pagamento -->
      <section class="space-y-12">
        <div>
          <h2 class="text-3xl font-black uppercase mb-8 flex items-center gap-4">
            <span class="w-8 h-8 bg-charcoal text-white flex items-center justify-center text-sm">02</span>
            Entrega
          </h2>
          <div class="grid gap-4">
            <div class="flex flex-col">
              <label class="uppercase font-bold text-xs mb-1">CEP</label>
              <input 
                v-model="form.cep" 
                type="text" 
                placeholder="00000-000"
                class="border-2 border-charcoal p-4 focus:outline-none focus:border-crimson font-bold text-lg"
              />
            </div>
            <div class="flex flex-col">
              <label class="uppercase font-bold text-xs mb-1">Complemento</label>
              <input 
                v-model="form.complemento" 
                type="text" 
                placeholder="Apt, Bloco, Referência..."
                class="border-2 border-charcoal p-4 focus:outline-none focus:border-crimson font-bold"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-3xl font-black uppercase mb-8 flex items-center gap-4">
            <span class="w-8 h-8 bg-charcoal text-white flex items-center justify-center text-sm">03</span>
            Pagamento
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              v-for="metodo in metodos" 
              :key="metodo"
              @click="form.metodoPagamento = metodo"
              :class="form.metodoPagamento === metodo ? 'bg-crimson text-white border-crimson' : 'border-charcoal hover:bg-gray-100'"
              class="border-2 p-4 font-bold uppercase transition-all"
            >
              {{ metodo }}
            </button>
          </div>
        </div>

        <div v-if="!auth.isAuthenticated" class="p-6 border-4 border-crimson bg-crimson/5">
          <p class="font-bold uppercase text-center mb-4">Você precisa estar logado para finalizar.</p>
          <NuxtLink to="/login?redirect=checkout" class="block w-full bg-charcoal text-white text-center py-4 font-bold uppercase hover:bg-crimson transition-colors">
            Fazer Login
          </NuxtLink>
        </div>

        <button 
          v-else
          @click="handleFinalizar"
          :disabled="orderStore.loading || !form.cep"
          class="w-full bg-crimson text-white py-6 font-black uppercase text-2xl tracking-widest hover:bg-charcoal transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          {{ orderStore.loading ? 'Processando...' : 'Confirmar Pedido' }}
        </button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MetodoPagamento } from '~/stores/orders'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'

const cart = useCartStore()
const auth = useAuthStore()
const orderStore = useOrderStore()

const metodos: MetodoPagamento[] = ['PIX', 'CARTAO', 'DINHEIRO']

const form = ref<{ cep: string; complemento: string; metodoPagamento: MetodoPagamento }>({
  cep: '',
  complemento: '',
  metodoPagamento: 'PIX'
})

async function handleFinalizar() {
  if (!form.value.cep) {
    alert('Por favor, informe o CEP.')
    return
  }
  
  const payload = {
    cep: form.value.cep,
    complemento: form.value.complemento,
    metodoPagamento: form.value.metodoPagamento,
    itens: cart.items.map(item => ({
      produtoId: item.id,
      quantidade: item.quantidade
    }))
  }

  try {
    await orderStore.createOrder(payload)
    cart.clearCart()
    navigateTo('/pedidos?sucesso=true')
  } catch {
    alert('Erro ao finalizar pedido. Verifique os dados e tente novamente.')
  }
}
</script>
