import { RouteRecordRaw } from 'vue-router'
import PersonsPage from '@/application/app/persons/PersonsPage.vue'
import TimeslotsPage from '@/application/app/timeslots/TimeslotsPage.vue'
import AppStartPage from '@/application/app/AppStartPage.vue'

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: AppStartPage,
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
