import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Dashboard from '../ui/views/dashboard/Dashboard.vue'
import CustomerDetailView from '../ui/views/customers/CustomerDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    meta: { name: 'Home' },
  },
  {
    path: '/customers/:id',
    name: 'CustomerDetail',
    component: CustomerDetailView,
    meta: { name: 'CustomerDetail' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
