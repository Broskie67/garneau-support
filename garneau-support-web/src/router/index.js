import HomeView from '@/view/HomeView.vue'
import SigninView from '@/view/SigninView.vue'
import SignupView from '@/view/SignupView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
    },
    {
      path:'/signup',
      name: 'signup',
      component: SignupView
    }

  ],
})

export default router
