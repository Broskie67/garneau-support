<script setup>

</script>

<template>
  
  <div class="layout">
    <main class="content">
      <div class="welcome-content">
        <h2>Un problème? Nous avons la solution!</h2>
        <div class="div-message">
           <p class="message">
            Garneau Support est une plateforme de gestion d'incident qui permet aux utilisateurs de signaler
            un problème technique et de suivre l'évolution jusqu'à sa résolution.
          </p>
          <p class="message">Laissez nos techniciens s'occuper de vos moindre soucis</p>
        </div>
        <div class ="div-action">
          <p class="action">
            Connectez-vous à votre compte pour consulter vos tickets, ou créez un compte afin de signaler un problème.
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
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    background-color: var(--color-background);
  }

  .content {
    width: min(90%, 900px);
    margin: 0 auto;
    padding: 30px 20px;
    text-align: center;
  }

  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .welcome-content h2 {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  .div-message,
  .div-action {
    width: 100%;
    background-color: var(--color-surface);
    padding: 28px 34px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 22px;
    
  }

  .message,
  .action {
    font-size: 17px;
    line-height: 1.6;
    margin: 0;
    color: var(--color-text);
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 8px;
  }

  .connect-btn,
  .login-btn {
    min-width: 145px;
    padding: 12px 22px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.2s ease;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  }

  .connect-btn {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: 1px solid var(--button-primary-border);
  }

  .login-btn {
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-text);
    border: 1px solid var(--button-secondary-border);
  }

  .login-btn:hover {
    background-color: var(--button-secondary-hover-bg);
    color: var(--button-secondary-hover-text);
    border: 1px solid var(--button-secondary-border)
  }
  .connect-btn:hover {
    background-color: var(--button-primary-hover-bg);
    color: var(--button-primary-hover-text);
  }
</style>