<script setup lang="ts">
import { Environment } from '@/Environment'
import { provideEnvironment } from '@/Environment.provider'

const props = defineProps<{
  environment: Environment
}>()

provideEnvironment(props.environment)
</script>

<template>
  <slot></slot>
</template>

<style scoped lang="scss"></style>
