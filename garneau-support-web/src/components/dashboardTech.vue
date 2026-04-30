<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import TicketTable from '@/components/TicketTable.vue'
import FilterBar from './FilterBar.vue'

const authStore = useAuthStore()
const ticketStore = useTicketStore()

const errorMessage = ref('')
const successMessage = ref('')

const getTickets = async () => {
  if (!authStore.token) {
    return
  }

  try {
    await ticketStore.getTechTickets(authStore.token)
  } catch (error) {
    errorMessage.value = error.message
  }
}

const selfAssignTicket = async (ticketId) => {
   if (!authStore.token) {
    return
  }

  try {
    await ticketStore.selfAssignTicket(ticketId, authStore.token)
    successMessage.value = 'l\'incident vous a été attribué avec succès'
    setTimeout(() => {
      successMessage.value = ''
    }, 4000)

  } catch (error) {
    errorMessage.value = error.message
  }
}

const getAssignedActiveTicket = computed(() => {
  return ticketStore.ticketsList.filter(ticket =>
    (ticket.assigned_to === authStore.user.id || ticket.assigned_to === null) && 
    ticket.status !== 'Fermé' && ticket.status !== 'Archivé'
  )
})

const getAssignedClosedTicket = computed(() => {
  return ticketStore.ticketsList.filter(ticket => ticket.assigned_to === authStore.user.id && ticket.status === 'Fermé' )
})



onMounted(() => {
  getTickets()
})

</script>

<template>
  <h2>Tableau de bord</h2>

  <p v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </p>

  <p v-if="successMessage" class="success-message">
    {{ successMessage }}
  </p>

  <div class="table-active">
    <FilterBar/>
    <h3>Incidents actifs</h3>
    <TicketTable 
      :tickets="getAssignedActiveTicket" 
      :isTechnician="true"
      @self-assign-ticket="selfAssignTicket" />
  </div>
   
  
  <div class="table-closed" >
    <FilterBar
    @reset-filter="resetFilter"/>
    <h3>Incidents fermés</h3>
    <TicketTable :tickets="getAssignedClosedTicket" 
      />
  </div>

</template>

<style scoped>
.table-active {
    margin-bottom: 3rem;
    background: #ffffff;
    width: 1200px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .table-closed {
    margin-top: 1rem;
    background: #ffffff;
    width: 1200px;
    padding: 32px 38px;
    border-radius: 18px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }

  .success-message {
    background-color: #DCFCE7;
    color: #166534;
    border: 1px solid #86EFAC;
    padding: 12px 16px;
    border-radius: 10px;
    font-weight: 600;
    margin-bottom: 20px;
  }
</style>