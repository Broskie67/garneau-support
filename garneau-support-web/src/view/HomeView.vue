<script setup>
import NavBar from '@/components/navBar.vue';

</script>

<template>
  <NavBar />
  <div class="layout">
    <main class="content">
      <div class="welcome-content">
        <h2>Un problème? Nous avons la solution!</h2>
        <div class="div-message">
           <p class="message">
            Garneau Support est une plateforme de gestion d'incident qui permet aux utilisateurs de signaler
            un problème technique et de suivre l'évolution jusqu'à sa résolution.
          </p>
        </div>
        <div class ="div-action">
          <p class="action">
            Connectez-vous à votre compte pour consulter vos tickets ou créer votre compte pour nous donner la chance de vous aider.
          </p>
        </div>
        <div class="buttons">
          <button class="connect-btn">Se connecter</button>
          <button class="login-btn">S'inscrire</button>
        </div>
      </div>
    </main>  
  </div>
</template>

<style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
  }

  .content {
    flex: 1;
    padding: 20px;
    width: 60%;
    text-align: center;
  }

  .welcome-content {
    align-items: center;
  }

  .div-message, .div-action {
    background-color: var(--color-background);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

  }
  .message {
    font-size: 1.2em;
    margin-top: 20px;
    background-color: var(--color-background);
  }

  .action {
    font-size: 1.1em;
    margin-top: 10px;
  }

  .buttons {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
  }

  .connect-btn{
    background-color: var(--button-primary-bg);
    color:var(--button-primary-text);
    border: var(--button-primary-border) 1px solid;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .login-btn{
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-text);
    border: var(--button-secondary-border) 1px solid;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .login-btn:hover {
    background-color: var(--button-secondary-hover-bg);
    color: var(--button-secondary-hover-text);
  }
  .connect-btn:hover {
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }
</style>