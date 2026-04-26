import { defineStore } from 'pinia'

export type MetodoPagamento = 'CARTAO' | 'PIX' | 'DINHEIRO'
export type StatusPedido = 'PENDENTE' | 'PREPARANDO' | 'SAIU_PARA_ENTREGA' | 'ENTREGUE' | 'CANCELADO'

interface PedidoItem {
  produtoId: number
  quantidade: number
}

interface NovoPedido {
  cep: string
  complemento: string
  metodoPagamento: MetodoPagamento
  itens: PedidoItem[]
}

export interface Pedido {
  id: number
  status: StatusPedido
  total: number
  cep: string
  complemento: string
  metodoPagamento: MetodoPagamento
  dataCriacao: string
  itens: {
    id: number
    quantidade: number
    produtoNome: string
    preco: number
  }[]
}

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [] as Pedido[],
    loading: false
  }),

  actions: {
    async createOrder(pedido: NovoPedido) {
      const { $api } = useNuxtApp()
      this.loading = true
      try {
        const response = await $api.post('/pedidos', pedido)
        return response.data
      } catch (error) {
        console.error('Erro ao criar pedido:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMyOrders() {
      const { $api } = useNuxtApp()
      this.loading = true
      try {
        const response = await $api.get('/pedidos')
        this.orders = response.data
        return response.data
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
