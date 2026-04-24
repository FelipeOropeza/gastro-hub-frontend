<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar Brutalista Minimalista -->
    <header class="border-b-2 border-charcoal bg-base sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="text-3xl font-display font-black tracking-tighter uppercase flex items-center gap-2">
          <div class="w-4 h-4 bg-crimson"></div>
          Restaurante
        </NuxtLink>
        
        <nav class="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
          <NuxtLink to="/" class="hover:text-crimson transition-colors">Cardápio</NuxtLink>
          <NuxtLink to="/login" class="bg-charcoal text-base px-6 py-3 hover:bg-crimson transition-colors">Login / Pedir</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer Brutalista -->
    <footer class="bg-charcoal text-base py-16 border-t-8 border-crimson">
      <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-5xl font-black uppercase tracking-tighter mb-4">Fome?</h2>
          <p class="text-gray-400 max-w-md">Os melhores pratos, ingredientes frescos e uma experiência única. Sem meio termo.</p>
        </div>
        <div class="md:text-right flex flex-col justify-end">
          <p class="font-bold tracking-widest uppercase">© 2026 Restaurante Premium.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
