<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useTicketStore } from '@/stores/ticketStore'
import { useRoute } from 'vue-router';
import TicketClientEditForm from '@/components/TicketClientEditForm.vue';
import TicketTechEditForm from '@/components/TicketTechEditForm.vue';

const route = useRoute()
const authStore = useAuthStore()
const ticketStore = useTicketStore()
 

const errorMessage = ref('')

const getTicket = async () => {
  if (!authStore.token) {
    return
  }

  try {
    await ticketStore.getTicket(route.params.id, authStore.token)
  } catch (error) {
    errorMessage.value = error.message
  }
}



onMounted(async() => {
  await getTicket()
})
</script>

<template>
  
  <div class="edit-page">
    <h2>Modifier l'incident</h2>
    <div class="edit-card">
      <TicketClientEditForm 
        v-if="authStore.user?.role === 'client' &&  ticketStore.selectedTicket"
        :ticket="ticketStore.selectedTicket"/>
      <TicketTechEditForm 
        v-if="authStore.user?.role === 'technicien' && ticketStore.selectedTicket"
        :ticket="ticketStore.selectedTicket"/>
    </div>
  </div>
</template>

<style scoped>

  .edit-page h2 {
    width: 800px;
    margin-bottom: 16px;
    text-align: left;
  }
  
  .edit-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    padding-bottom: 100px;
  }

  .edit-card{
    margin-bottom: 3rem;
    background: #ffffff;
    width: 800px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }
</style>

