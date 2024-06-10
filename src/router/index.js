import { createRouter, createWebHistory } from 'vue-router'
import CurrencyExchange from '@/views/CurrencyExchange.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'currency_exchange',
      component: CurrencyExchange
    }
  ]
})

export default router
