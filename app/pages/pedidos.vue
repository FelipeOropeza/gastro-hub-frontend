<template>
  <div class="py-20 px-4 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
      <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
        Meus <span class="text-crimson">Pedidos</span>
      </h1>
      <div v-if="route.query.sucesso" class="bg-green-500 text-white px-6 py-3 font-bold uppercase animate-bounce border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        Pedido Realizado com Sucesso!
      </div>
    </div>

    <div v-if="orderStore.loading && orderStore.orders.length === 0" class="space-y-8">
      <div v-for="i in 3" :key="i" class="h-40 bg-gray-100 animate-pulse border-2 border-charcoal"></div>
    </div>

    <div v-else-if="orderStore.orders.length === 0" class="py-20 text-center border-4 border-dashed border-charcoal bg-gray-50">
      <p class="text-2xl font-bold uppercase mb-8">Você ainda não fez nenhum pedido.</p>
      <NuxtLink to="/" class="bg-charcoal text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-crimson transition-colors">
        Pedir Agora
      </NuxtLink>
    </div>

    <div v-else class="space-y-8">
      <div 
        v-for="order in orderStore.orders" 
        :key="order.id" 
        class="border-2 border-charcoal bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
      >
        <!-- Header do Pedido -->
        <div class="bg-charcoal text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p class="text-[10px] uppercase tracking-[0.2em] opacity-60">Identificador do Pedido</p>
            <h3 class="text-xl font-bold font-mono">#{{ String(order.id).padStart(5, '0') }}</h3>
          </div>
          <div class="flex items-center gap-4">
            <span :class="getStatusClass(order.status)" class="px-4 py-1 text-sm font-black uppercase border-2 border-white">
              {{ order.status }}
            </span>
            <div class="text-right">
              <p class="text-[10px] uppercase tracking-[0.2em] opacity-60 text-right">Total</p>
              <p class="text-2xl font-black text-crimson">R$ {{ Number(order.valorTotal).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Conteúdo do Pedido -->
        <div class="p-6 grid md:grid-cols-2 gap-8">
          <div>
            <h4 class="text-xs uppercase font-black text-gray-400 mb-4 tracking-widest">Itens</h4>
            <ul class="space-y-2">
              <li v-for="item in order.itens" :key="item.id" class="flex justify-between border-b border-gray-100 pb-2">
                <span class="font-bold uppercase">{{ item.quantidade }}x {{ item.nomeProduto }}</span>
                <span class="font-mono text-gray-500">R$ {{ (Number(item.precoUnitario) * item.quantidade).toFixed(2) }}</span>
              </li>
            </ul>
          </div>
          
          <div class="border-t md:border-t-0 md:border-l border-charcoal/10 md:pl-8 pt-8 md:pt-0">
            <h4 class="text-xs uppercase font-black text-gray-400 mb-4 tracking-widest">Detalhes de Entrega</h4>
            <div class="space-y-2 text-sm">
              <p><span class="font-bold uppercase">CEP:</span> {{ order.cep }}</p>
              <p><span class="font-bold uppercase">Complemento:</span> {{ order.complemento || 'N/A' }}</p>
              <p><span class="font-bold uppercase">Pagamento:</span> <span class="bg-gray-100 px-2 py-0.5 border border-charcoal/20">{{ order.metodoPagamento }}</span></p>
              <p><span class="font-bold uppercase">Data:</span> {{ formatDate(order.data) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatusPedido } from '~/stores/orders'
import { useOrderStore } from '~/stores/orders'

definePageMeta({
  middleware: 'auth'
})

const orderStore = useOrderStore()
const route = useRoute()

function getStatusClass(status: StatusPedido): string {
  switch (status) {
    case 'PENDENTE': return 'bg-yellow-400 text-charcoal'
    case 'PREPARANDO': return 'bg-blue-500 text-white'
    case 'SAIU_PARA_ENTREGA': return 'bg-indigo-600 text-white'
    case 'ENTREGUE': return 'bg-green-500 text-white'
    case 'CANCELADO': return 'bg-crimson text-white'
    default: return 'bg-gray-400 text-white'
  }
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'Data não disponível'
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  orderStore.fetchMyOrders()
})
</script>
