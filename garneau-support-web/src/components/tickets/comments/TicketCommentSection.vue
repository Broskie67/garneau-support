<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useCommentStore } from '@/stores/commentStore';
import { useRoute } from 'vue-router'
import TicketCommentList from './TicketCommentList.vue';
import TicketCommentForm from './TicketCommentForm.vue';


const authStore = useAuthStore()
const commentStore = useCommentStore()

const route = useRoute()

const errorMessage = ref('')

const getTicketComments = async () => {
  if(!authStore.token) {
    return
  } 

  try {
    await commentStore.getTicketComments(route.params.id, authStore.token)
  } catch (error) {
    errorMessage.value = error.message
  }
}

onMounted(() => {
  getTicketComments()
})

</script>

<template>
  <div>
    <h3>Commentaires</h3>
    <div class="comment-card">
      <h4>Échanges sur l'incident</h4>
      <TicketCommentForm @comment-created="getTicketComments" /> 
      <TicketCommentList />
    </div>
    
  </div>
</template>

<style scoped>
  .comment-card {
    margin-bottom: 3rem;
    background: #ffffff;
    width: 100%;
    max-width: 800px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
    box-sizing: border-box;
  }
</style>