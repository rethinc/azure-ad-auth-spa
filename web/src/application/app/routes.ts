import { RouteRecordRaw } from 'vue-router'
import PersonsPage from '@/application/app/persons/PersonsPage.vue'
import TimeslotsPage from '@/application/app/timeslots/TimeslotsPage.vue'

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/app/persons',
  },
  {
    path: 'persons',
    component: PersonsPage,
  },
  {
    path: 'timeslots',
    component: TimeslotsPage,
  },
]
