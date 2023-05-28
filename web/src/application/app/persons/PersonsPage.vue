<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { InteractionRequiredAuthError } from '@azure/msal-common'
import { Person } from '@/application/app/api/Person'
import { useApiClient } from '@/application/app/api/ApiClient'
import { useMsal } from '@/msal.use'

const persons = ref<Person[]>()
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
      persons.value = await apiClient.getPersons(redirectResponse.accessToken)
    } catch (e: InteractionRequiredAuthError) {
      await msal.acquireTokenRedirect(tokenRequest)
    }
  } else {
    persons.value = await apiClient.getPersons(redirectResponse.accessToken)
  }
})
</script>

<template>
  <h1>Persons</h1>
  <ul v-if="persons">
    <li v-for="person in persons" :key="person.id">
      {{ person.name }} {{ person.familyName }}
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
