import HomeView from '@/view/HomeView.vue'
import PasswordView from '@/view/PasswordView.vue'
import ProfileView from '@/view/ProfileView.vue'
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
    },
    {
      path:'/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path:'/profile/password',
      name: 'password',
      component: PasswordView
    }
  ],
})

export default router
