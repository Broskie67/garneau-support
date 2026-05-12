<script setup>
import { useAuthStore } from '@/stores/authStore'
import DashboardClient from '@/components/dashboard/DashboardClient.vue'
import DashboardTech from '@/components/dashboard/DashboardTech.vue';
import DashboardAdmin from '@/components/dashboard/DashboardAdmin.vue';

const authStore = useAuthStore()
</script>

<template>
  <div class="dashboard-page">
    <DashboardClient v-if="authStore.user?.role === 'client'"/>
    <DashboardTech v-if="authStore.user?.role === 'technicien'"/>
    <DashboardAdmin v-if="authStore.user?.role === 'admin'"/>
  </div>
</template>

<style scoped>
  .dashboard-page {
    width: min(95%, 1200px);
    margin: 0 auto;
    padding: 2rem 1rem 100px;
  }

  @media (max-width: 768px) {
    .dashboard-page {
      width: 100%;
      padding: 1rem 0.75rem 80px;
    }
  }
</style>