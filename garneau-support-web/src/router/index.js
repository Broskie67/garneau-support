import { useAuthStore } from '@/stores/authStore'
import CreateTechView from '@/view/CreateTechView.vue'
import ForbiddenView from '@/view/ForbiddenView.vue'
import HomeView from '@/view/HomeView.vue'
import NotFoundView from '@/view/NotFoundView.vue'
import PasswordView from '@/view/PasswordView.vue'
import ProfileView from '@/view/ProfileView.vue'
import SigninView from '@/view/SigninView.vue'
import SignupView from '@/view/SignupView.vue'
import UserListView from '@/view/UserListView.vue'
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
      component: ProfileView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if(authStore.isConnected) {
          next()
        } else {
          next('/signin')
        }
      }
    },
    {
      path:'/profile/password',
      name: 'password',
      component: PasswordView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if(authStore.isConnected) {
          if(authStore.user.role !== 'admin'){
            next('/forbidden')
          } else {
            next()
          }
        } else {
          next('/signin')
        }
      }
    },
    {
      path:'/admin/users',
      name: 'users',
      component: UserListView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if(authStore.isConnected) {
          if(authStore.user.role !== 'admin'){
            next('/forbidden')
          } else {
            next()
          }
        } else {
          next('/signin')
        }
      }
    },
    {
      path:'/admin/technicians/create',
      name: 'createTech',
      component: CreateTechView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if(authStore.isConnected) {
          if(authStore.user.role !== 'admin'){
            next('/forbidden')
          } else {
            next()
          }
          
        } else {
          next('/signin')
        }
      }
    },
    {
      path:'/forbidden',
      name: 'forbidden',
      component: ForbiddenView
    },
    {
      path:'/notfound',
      name: 'notfound',
      component: NotFoundView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'CatchAll',
      component: NotFoundView,
    },

  ],
})

export default router
