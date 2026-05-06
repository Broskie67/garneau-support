<script setup>
  import { RouterView } from 'vue-router';
  import NavBar from './components/commun/navBar.vue';

</script>

<template>
  <div class="app-layout">
    <NavBar />
    <main class="main-content">
      <RouterView />
    </main>
    <footer>
      <p> Nathan Milot, ASP 2026. All rights reserved.</p>
    </footer>
  </div>
    
</template>

<style scoped></style>
