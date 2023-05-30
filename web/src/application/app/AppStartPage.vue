<script setup lang="ts"></script>

<template>
  <ul>
    <li><RouterLink to="/app/persons">Persons</RouterLink></li>
    <li><RouterLink to="/app/timeslots">Timeslots</RouterLink></li>
  </ul>
  <RouterView />
</template>

<style lang="scss">
@import '../../assets/styles/global';
</style>
