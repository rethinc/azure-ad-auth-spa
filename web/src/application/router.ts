import { createRouter, createWebHistory } from 'vue-router'
import EntryPoint from '@/application/entryPoint/EntryPoint.vue'
import PersonsPage from '@/application/persons/PersonsPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: EntryPoint,
    },
    {
      path: '/persons',
      component: PersonsPage,
    },
  ],
})
