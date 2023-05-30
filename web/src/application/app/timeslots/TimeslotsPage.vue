<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApiClient } from '@/application/app/api/ApiClient'
import { Timeslot } from '@/application/app/api/Timeslot'
import { injectAuthentication } from '@/application/authentication/Authentication.provider'

const timeslots = ref<Timeslot[]>()
const apiClient = useApiClient()

onMounted(async () => {
  const auth = injectAuthentication()
  timeslots.value = await apiClient.getTimeslots(await auth.getAccessToken())
})
</script>

<template>
  <h1>Timeslots</h1>
  <ul v-if="timeslots">
    <li v-for="timeslot in timeslots" :key="timeslot.id">
      {{ timeslot.weekday }} {{ timeslot.startTime }} until
      {{ timeslot.endTime }}
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
