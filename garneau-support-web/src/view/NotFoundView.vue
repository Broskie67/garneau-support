<template>
  <div class="container mt-5 text-center">
    <h1 class="display-1 text-danger mb-4">404</h1>
    <h2 class="mb-3">Page non trouvé</h2>
    <p>Nous n'avons pas trouver la page que vous cherchier</p>
    <router-link to="/" class="btn btn-primary mt-3">
      Retour à l'accueil
    </router-link>
  </div>
</template>

<script setup>

</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 100px;
}

.display-1 {
  font-size: 6rem;
}

.btn-primary {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
}
</style>

