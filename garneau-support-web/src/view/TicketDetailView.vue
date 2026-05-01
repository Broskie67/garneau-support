<script setup>
import { useAuthStore } from '@/stores/authStore'
import TicketClientActions from '@/components/TicketClientActions.vue';
import TicketTechActions from '@/components/TicketTechActions.vue';

const authStore = useAuthStore()
</script>

<template>
  <div class="detail-page">
    <div>
      <TicketClientActions v-if="authStore.user?.role === 'client'"/>
    </div>
    <div>
      <TicketTechActions v-if="authStore.user?.role === 'technicien'"/>
    </div>
  </div>

</template>

<style scoped>
  .detail-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 2rem;
    padding-bottom: 100px;
  }
</style>