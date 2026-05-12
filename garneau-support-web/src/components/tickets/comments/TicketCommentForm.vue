<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import { useCommentStore } from '@/stores/commentStore';

const emit = defineEmits(['comment-created'])

const authStore = useAuthStore()
const commentStore = useCommentStore()

const route = useRoute()

const content = ref('')
const attachment = ref(null)
const type = ref('Public')

const contentError = ref('')

const handleFileSelection = (event) => {
  attachment.value = event.target.files[0]
}

const canChooseType = computed(() => {
  return authStore.user?.role === 'technicien' || authStore.user?.role === 'admin'
})

const validateContent = () => {
  contentError.value = ''

  if(!content.value){
    contentError.value = 'un commentaire ne peut être vide'
    return false
  } else if (content.value.length < 3) {
    contentError.value = 'Le commmentaire doit contenir au moins 3 caractères'
    return false
  }

  return true
}

const validateForm = () => {
  let isValid = true

  if(!validateContent()) isValid = false

  return isValid
}

const createComment = async () => {
  if(!authStore.token) return

  if(!validateForm()) return

  try {
    await commentStore.createComment(
      route.params.id,
      content.value,
      attachment.value,
      type.value,
      authStore.token
    )
    content.value = ''
    attachment.value = null


    emit('comment-created')
  } catch (error) {
    contentError.value = error.message
  }
}
</script>

<template>
  <form @submit.prevent="createComment">
    <div v-if="canChooseType" class="visibility-toggle">
      <span class="toggle-label">Visibilité :</span>

      <button
        type="button"
        class="toggle-btn"
        :class="{ active: type === 'Public' }"
        @click="type = 'Public'">
        Public
      </button>

      <button
        type="button"
        class="toggle-btn"
        :class="{ active: type === 'Interne' }"
        @click="type = 'Interne'">
        Interne
      </button>
    </div>
    <div class="field">
      <textarea
        id="content"
        v-model="content"
        placeholder="Écrivez un commentaire..."
        @blur="validateContent"></textarea>
      <span v-if="contentError" class="error">{{ contentError }}</span>
    </div>
    <div class="field">
      <input 
        type="file"
        class="upload-input" 
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        @change="handleFileSelection"
      />
    </div>
    
    <p v-if="type === 'Interne'" class="internal-info">
      Ce commentaire sera caché au client.
    </p>
    <span v-if="succesMessage">{{ succesMessage }}</span>
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

  .upload-input {
    width: 100%;
    font-size: 0.95rem;
    color: #374151;
    margin-top: 0.5rem;
    cursor: pointer;
  }

  .upload-input::file-selector-button {
    background-color: #f3f4f6;
    color: #111827;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 9px 14px;
    margin-right: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .upload-input::file-selector-button:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
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

  .visibility-toggle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin: 0.75rem 0;
}

.toggle-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-right: 0.25rem;
}

.toggle-btn {
  border: 1px solid #d1d5db;
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.toggle-btn:hover {
  background-color: #e5e7eb;
}

.toggle-btn.active {
  background-color: #22c55e;
  border-color: #22c55e;
  color: white;
}

.internal-info {
  text-align: right;
  font-size: 0.9rem;
  color: #6b7280;
  margin: -0.25rem 0 0.75rem 0;
}
</style>