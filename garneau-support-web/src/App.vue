<script setup>
  import { RouterView } from 'vue-router';
  import NavBar from './components/navBar.vue';

</script>

<template>
  <body>
    <NavBar />
    <RouterView />

    <footer>
      <p> Nathan Milot, ASP 2026. All rights reserved.</p>
    </footer>
  </body>
</template>

<style scoped></style>
