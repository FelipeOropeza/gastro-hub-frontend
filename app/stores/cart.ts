import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  nome: string
  preco: number
  quantidade: number
  categoria?: string
}

export const useCartStore = defineStore('cart', {
  state: (): { items: CartItem[] } => ({
    items: typeof window !== 'undefined'
      ? (JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[])
      : []
  }),

  getters: {
    totalItems: (state): number => state.items.reduce((sum: number, item: CartItem) => sum + item.quantidade, 0),
    totalPrice: (state): number => state.items.reduce((sum: number, item: CartItem) => sum + (item.preco * item.quantidade), 0),
    isEmpty: (state): boolean => state.items.length === 0
  },

  actions: {
    addItem(produto: { id: number; nome: string; preco: number; categoria?: string }) {
      const existingItem = this.items.find(item => item.id === produto.id)

      if (existingItem) {
        existingItem.quantidade++
      } else {
        this.items.push({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 1,
          categoria: produto.categoria
        })
      }

      this.saveCart()
    },

    removeItem(id: number) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveCart()
    },

    updateQuantity(id: number, quantity: number) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        item.quantidade = Math.max(1, quantity)
        this.saveCart()
      }
    },

    clearCart() {
      this.items = []
      this.saveCart()
    },

    saveCart() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    }
  }
})
