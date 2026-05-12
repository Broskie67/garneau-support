<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import { useRoute } from 'vue-router';
import TicketDetailInfo from '../tickets/TicketDetailInfo.vue';
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
  <h2>Détails de l'incident</h2>
  <div class="detail-card">
    <TicketDetailInfo
      v-if="ticketStore.selectedTicket"
      :ticket="ticketStore.selectedTicket"
      :isAdmin = "true"/>
  </div>
</template>

<style scoped>
  .detail-card{
    margin-bottom: 3rem;
    background: #ffffff;
    width: 100%;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  @media screen and (max-width: 768px) {
    h2 {
      text-align: center;
      font-size: 1.5rem;
    }

    .detail-card {
      width: 100%;
      padding: 22px 18px;
      border-radius: 14px;
    }
  }
</style>