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
          <button class="bg-crimson text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-charcoal transition-colors border-2 border-transparent hover:border-charcoal">
            Ver Cardápio
          </button>
        </div>
      </div>
      
      <!-- 30% Visual / Tension -->
      <div class="md:w-[30%] bg-charcoal flex flex-col items-center justify-center p-8 text-base">
        <div class="w-full aspect-square bg-gray-800 mb-8 border-4 border-crimson relative">
          <!-- Placeholder for Hero Image - In real life, an actual image -->
          <div class="absolute inset-0 flex items-center justify-center text-gray-600 font-bold tracking-widest uppercase">
            [ Foto Prato Macro ]
          </div>
        </div>
        <div class="text-center w-full">
          <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">Destaque do Dia</p>
          <h3 class="text-2xl font-bold uppercase">Hambúrguer Gourmet</h3>
          <p class="text-crimson font-bold text-xl mt-2">R$ 35,00</p>
        </div>
      </div>
    </section>

    <!-- Menu Section Placeholder -->
    <section class="py-20 px-4 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-12 border-b-2 border-charcoal pb-4">
        <h2 class="text-5xl font-black uppercase tracking-tighter">O Cardápio</h2>
        <div class="hidden md:flex gap-2">
          <!-- Category Pills -->
          <button class="px-4 py-2 bg-charcoal text-white font-bold uppercase text-sm">Todos</button>
          <button class="px-4 py-2 border-2 border-charcoal hover:bg-charcoal hover:text-white transition-colors font-bold uppercase text-sm">Lanches</button>
          <button class="px-4 py-2 border-2 border-charcoal hover:bg-charcoal hover:text-white transition-colors font-bold uppercase text-sm">Bebidas</button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Menu Item Card -->
        <div v-for="i in 6" :key="i" class="border-2 border-charcoal p-6 hover:-translate-y-2 transition-transform bg-white group cursor-pointer">
          <div class="w-full h-48 bg-gray-200 mb-6 border border-charcoal relative overflow-hidden">
            <div class="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-2xl font-bold uppercase truncate pr-4">Nome do Produto</h3>
            <span class="text-crimson font-black text-xl">R$ 25</span>
          </div>
          <p class="text-gray-600 text-sm mb-6">Descrição curta dos ingredientes e preparo do prato selecionado.</p>
          <button class="w-full border-2 border-charcoal py-3 font-bold uppercase tracking-widest group-hover:bg-crimson group-hover:border-crimson group-hover:text-white transition-colors">
            Adicionar
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Page logic will go here
</script>
