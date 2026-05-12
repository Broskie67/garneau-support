<script setup>
</script>

<template>
  <form @submit.prevent="createComment">
    <div class="field">
      <textarea
        id="content"
        v-model="content"
        placeholder="Écrivez un commentaire..."
        @blur="validateContent"></textarea>
      <span v-if="contentError" class="error">{{ contentError }}</span>
    </div>
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">Publier</button>
    </div>
  </form>
</template>

<style scoped>
  form {
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    min-height: 95px;
    resize: vertical;
    background-color: #f1f5f9;
    border: none;
    border-radius: 22px;
    padding: 18px 20px;
    font-size: 0.95rem;
    font-family: inherit;
    color: #1f2937;
    outline: none;
    box-sizing: border-box;
  }

  textarea::placeholder {
    color: #6b7280;
  }

  textarea:focus {
    box-shadow: 0 0 0 2px rgba(22, 101, 52, 0.25);
  }

  .btn-primary {
    background-color: #22c55e;
    color: #111827;
    border: none;
    border-radius: 10px;
    padding: 10px 18px;
    font-weight: 600;
    cursor: pointer;
    align-items: end;
  }

  .btn-primary:hover {
    background-color: #16a34a;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
  }

  .error {
    display: block;
    margin-top: 0.4rem;
    color: #dc2626;
    font-size: 0.875rem;
  }
</style>