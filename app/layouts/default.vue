<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar Brutalista Minimalista -->
    <header class="border-b-2 border-charcoal bg-base sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="text-3xl font-display font-black tracking-tighter uppercase flex items-center gap-2">
          <div class="w-4 h-4 bg-crimson"></div>
          Restaurante
        </NuxtLink>
        
        <nav class="hidden md:flex items-center gap-6 font-bold text-sm uppercase tracking-widest">
          <NuxtLink to="/" class="hover:text-crimson transition-colors">Cardápio</NuxtLink>
          
          <!-- Carrinho -->
          <NuxtLink to="/checkout" class="flex items-center gap-2 border-2 border-charcoal px-4 py-2 hover:bg-charcoal hover:text-white transition-all relative">
            Carrinho
            <span v-if="cart.totalItems > 0" class="bg-crimson text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {{ cart.totalItems }}
            </span>
          </NuxtLink>

          <!-- Autenticação -->
          <template v-if="auth.isAuthenticated">
            <NuxtLink to="/pedidos" class="hover:text-crimson transition-colors">Meus Pedidos</NuxtLink>
            <button @click="auth.logout()" class="text-crimson border-b-2 border-crimson pb-0.5 hover:opacity-70">Sair</button>
          </template>
          <NuxtLink v-else to="/login" class="bg-charcoal text-base px-6 py-3 hover:bg-crimson transition-colors">
            Entrar
          </NuxtLink>
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

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'

const auth = useAuthStore()
const cart = useCartStore()
</script>
