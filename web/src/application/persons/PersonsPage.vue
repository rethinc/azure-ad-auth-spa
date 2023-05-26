<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Person } from '@/application/persons/Person'

const persons = ref<Person[]>()
const apiBaseUrl = 'https://my-auth-test-api.azurewebsites.net'

onMounted(async () => {
  const response = await fetch(`${apiBaseUrl}/persons`)
  const json = await response.json()
  if (!('data' in json)) {
    return
  }

  if (!Array.isArray(json.data)) {
    return
  }

  let fetchedPersons = []
  json.data.forEach((personData: object) => {
    let person: Person = {
      id: '',
      name: '',
      familyName: '',
    }
    Object.assign(person, personData)
    fetchedPersons.push(person)
  })

  persons.value = fetchedPersons
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
