<script setup>
import { useAuthStore } from '@/stores/authStore'
import DashboardClient from '@/components/DashboardClient.vue'
import DashboardTech from '@/components/DashboardTech.vue';

const authStore = useAuthStore()
</script>

<template>
  <div class="dashboard-page">
    <div>
      <DashboardClient v-if="authStore.user?.role === 'client'"/>
    </div>
  </div>
  <div class="dashboard-page" >
    <div>
      <DashboardTech v-if="authStore.user?.role === 'technicien'"/>
    </div>
  </div>

</template>

<style scoped>
  .dashboard-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: 100px;
  }
</style>