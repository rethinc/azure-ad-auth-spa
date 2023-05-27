import { createRouter, createWebHistory } from 'vue-router'
import EntryPoint from '@/application/app/entryPoint/EntryPoint.vue'
import PersonsPage from '@/application/app/persons/PersonsPage.vue'

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
