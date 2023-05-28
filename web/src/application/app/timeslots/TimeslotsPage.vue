<script setup lang="ts">
import { onMounted, ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InteractionRequiredAuthError } from '@azure/msal-common'
import { useApiClient } from '@/application/app/api/ApiClient'
import { useMsal } from '@/msal.use'
import { Timeslot } from '@/application/app/api/Timeslot'

const timeslots = ref<Timeslot[]>()
const apiClient = useApiClient()

onMounted(async () => {
  const msal = await useMsal()
  const redirectResponse = await msal.handleRedirectPromise()
  if (!redirectResponse) {
    const tokenRequest = {
      scopes: ['api://3f22301d-51a2-4374-b364-583d93122ab5/user_impersonation'],
      forceRefresh: false,
    }
    try {
      let redirectResponse = await msal.acquireTokenSilent(tokenRequest)
      timeslots.value = await apiClient.getTimeslots(
        redirectResponse.accessToken
      )
    } catch (e: InteractionRequiredAuthError) {
      await msal.acquireTokenRedirect(tokenRequest)
    }
  } else {
    timeslots.value = await apiClient.getTimeslots(redirectResponse.accessToken)
  }
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
