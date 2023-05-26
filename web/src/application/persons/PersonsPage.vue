<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Person } from '@/application/api/Person'
import { useApiClient } from '@/application/api/ApiClient'

const persons = ref<Person[]>()
const apiClient = useApiClient()

onMounted(async () => {
  persons.value = await apiClient.getPersons()
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
