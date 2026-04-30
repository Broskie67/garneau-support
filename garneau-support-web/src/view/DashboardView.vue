<script setup>
import { useAuthStore } from '@/stores/authStore'
import DashboardClient from '@/components/DashboardClient.vue'
import dashboardTech from '@/components/DashboardTech.vue';

const authStore = useAuthStore()
</script>

<template>
  <div class="dashboard-page" v-if="authStore.user.role === 'client'">
    <div>
      <dashboard-client />
    </div>
  </div>
  <div class="dashboard-page" v-if="authStore.user.role === 'technicien'">
    <div>
      <dashboard-tech />
    </div>
  </div>

</template>

<style scoped>
  .dashboard-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 40px;
    padding-bottom: 100px;
  }

  
</style>