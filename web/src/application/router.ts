import { createRouter, createWebHistory } from 'vue-router'
import PersonsPage from '@/application/app/persons/PersonsPage.vue'
import TimeslotsPage from '@/application/app/timeslots/TimeslotsPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/persons',
      component: PersonsPage,
    },
    {
      path: '/timeslots',
      component: TimeslotsPage,
    },
  ],
})
