<template>
  <div>
    <!-- Hero Brutalista 90/10 Split -->
    <section class="min-h-[80vh] flex flex-col md:flex-row border-b-2 border-charcoal">
      <!-- 70% Content -->
      <div class="md:w-[70%] p-8 md:p-16 flex flex-col justify-center border-r-2 border-charcoal bg-base relative overflow-hidden">
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-crimson opacity-10 rounded-full blur-3xl"></div>
        <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 relative z-10">
          <span class="block">Puro.</span>
          <span class="block text-crimson">Genuíno.</span>
          <span class="block">Sabor.</span>
        </h1>
        <p class="text-xl md:text-2xl max-w-lg mb-10 font-medium text-gray-800 relative z-10">
          Sem ingredientes artificiais. Sem receitas genéricas. Apenas comida de verdade feita para paladares exigentes.
        </p>
        <div class="flex gap-4 relative z-10">
          <button @click="scrollToMenu" class="bg-crimson text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-charcoal transition-colors border-2 border-transparent hover:border-charcoal">
            Ver Cardápio
          </button>
        </div>
      </div>
      
      <!-- 30% Visual / Tension -->
      <div class="md:w-[30%] bg-charcoal flex flex-col items-center justify-center p-8 text-base">
        <div class="w-full aspect-square bg-gray-800 mb-8 border-4 border-crimson relative overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" 
            alt="Hambúrguer Gourmet"
            class="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div class="text-center w-full">
          <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Destaque do Dia</p>
          <h3 class="text-2xl font-bold uppercase">Hambúrguer Gourmet</h3>
          <p class="text-crimson font-bold text-xl mt-2">R$ 35,00</p>
        </div>
      </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="py-20 px-4 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b-2 border-charcoal pb-4 gap-6">
        <h2 class="text-5xl font-black uppercase tracking-tighter leading-none">O Cardápio</h2>
        
        <div class="flex flex-wrap gap-2">
          <!-- Category Pills -->
          <button 
            @click="selectedCategory = null"
            :class="selectedCategory === null ? 'bg-charcoal text-white' : 'border-2 border-charcoal hover:bg-charcoal hover:text-white'"
            class="px-4 py-2 font-bold uppercase text-sm transition-colors"
          >
            Todos
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="selectedCategory === cat.id ? 'bg-charcoal text-white' : 'border-2 border-charcoal hover:bg-charcoal hover:text-white'"
            class="px-4 py-2 font-bold uppercase text-sm transition-colors"
          >
            {{ cat.nome }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="border-2 border-charcoal p-6 animate-pulse">
          <div class="w-full h-48 bg-gray-200 mb-6"></div>
          <div class="h-8 bg-gray-200 mb-2"></div>
          <div class="h-4 bg-gray-200 w-2/3"></div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="produto in filteredProducts" 
          :key="produto.id" 
          class="border-2 border-charcoal p-6 hover:-translate-y-2 transition-transform bg-white group cursor-pointer relative"
        >
          <!-- Tag de Categoria -->
          <span class="absolute top-0 right-0 bg-charcoal text-white px-3 py-1 text-[10px] uppercase font-black tracking-widest z-10">
            {{ produto.categoria }}
          </span>

          <div class="w-full h-48 bg-gray-100 mb-6 border border-charcoal relative overflow-hidden">
            <div class="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors z-0"></div>
            <img 
              :src="`https://source.unsplash.com/800x600/?food,${produto.nome}`" 
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              :alt="produto.nome"
            />
          </div>
          
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-2xl font-bold uppercase truncate pr-4">{{ produto.nome }}</h3>
            <span class="text-crimson font-black text-xl">R$ {{ Number(produto.preco).toFixed(2) }}</span>
          </div>
          
          <p class="text-gray-600 text-sm mb-6 line-clamp-2 h-10">{{ produto.descricao }}</p>
          
          <button 
            @click="cart.addItem(produto)"
            class="w-full border-2 border-charcoal py-3 font-bold uppercase tracking-widest group-hover:bg-crimson group-hover:border-crimson group-hover:text-white transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredProducts.length === 0" class="py-20 text-center border-2 border-dashed border-charcoal">
        <p class="font-black uppercase tracking-widest text-gray-400">Nenhum produto encontrado nesta categoria.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

interface Categoria {
  id: number
  nome: string
}

interface Produto {
  id: number
  nome: string
  preco: number
  descricao?: string
  categoria?: string
  idCategoria?: number
  categoriaId?: number
}

const { $api } = useNuxtApp() as { $api: ReturnType<typeof import('axios').default.create> }
const cart = useCartStore()

const categories = ref<Categoria[]>([])
const products = ref<Produto[]>([])
const loading = ref(true)
const selectedCategory = ref<number | null>(null)

const filteredProducts = computed<Produto[]>(() => {
  if (!selectedCategory.value) return products.value
  return products.value.filter(p => p.idCategoria === selectedCategory.value || p.categoriaId === selectedCategory.value)
})

async function fetchData() {
  loading.value = true
  try {
    const [catRes, prodRes] = await Promise.all([
      ($api as any).get('/categorias'),
      ($api as any).get('/produtos')
    ])

    categories.value = catRes.data.content || []
    products.value = prodRes.data.content || []
  } catch (err) {
    console.error('Erro ao buscar dados da vitrine:', err)
  } finally {
    loading.value = false
  }
}

function scrollToMenu() {
  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  fetchData()
})
</script>
