<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useApiClient } from '@/application/app/api/ApiClient'
import { Timeslot } from '@/application/app/api/Timeslot'
import { injectAccessToken } from '@/application/app/authentication/AccessToken.provider'

const timeslots = ref<Timeslot[]>()
const apiClient = useApiClient()

onMounted(async () => {
  timeslots.value = await apiClient.getTimeslots(injectAccessToken())
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
