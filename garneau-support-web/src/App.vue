<script setup>
  import { RouterView } from 'vue-router';
  import HomeView from './view/HomeView.vue';

</script>

<template>
  <body>
    <RouterView />
    <HomeView />

    <footer>
      <p> Nathan Milot, ASP 2026. All rights reserved.</p>
    </footer>
  </body>
</template>

<style scoped></style>
