import { useAuthStore } from '@/stores/authStore'
import { useTicketStore } from '@/stores/ticketStore'
import CreateTechView from '@/view/CreateTechView.vue'
import CreateTicketView from '@/view/CreateTicketView.vue'
import DashboardView from '@/view/DashboardView.vue'
import ForbiddenView from '@/view/ForbiddenView.vue'
import HomeView from '@/view/HomeView.vue'
import NotFoundView from '@/view/NotFoundView.vue'
import PasswordView from '@/view/PasswordView.vue'
import ProfileView from '@/view/ProfileView.vue'
import SigninView from '@/view/SigninView.vue'
import SignupView from '@/view/SignupView.vue'
import TicketDetailView from '@/view/TicketDetailView.vue'
import TicketEditView from '@/view/TicketEditView.vue'
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
      path:'/dashboard',
      name: 'dashboard',
      component: DashboardView,
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
      path: '/tickets/create',
      name: 'create-ticket',
      component: CreateTicketView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if(authStore.isConnected) {
          if(authStore.user.role !== 'client'){
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
      path:'/details/:id',
      name: 'ticketId',
      component: TicketDetailView,
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore()
        const ticketStore = useTicketStore()
        if(authStore.isConnected) {
          await ticketStore.getTicket(to.params.id, authStore.token)

          if(authStore.user.role === 'admin'){
            next()
          }
          if (
            ticketStore.selectedTicket.assigned_to !== null &&
            ticketStore.selectedTicket.assigned_to !== authStore.user.id
            && ticketStore.selectedTicket.created_by !== authStore.user.id
          ){
            next('/forbidden')
          }
          else{
            next()
          }
          
        } else {
          next('/signin')
        }
      }
    },
    {
      path: '/tickets/:id/edit',
      name: 'edit-ticket',
      component: TicketEditView,
      beforeEnter: async (to, from, next) => {
        const authStore = useAuthStore()
        const ticketStore = useTicketStore()
        if(authStore.isConnected) {
          await ticketStore.getTicket(to.params.id, authStore.token)

          if(authStore.user.role === 'admin'){
            next()
          }
          if (
            ticketStore.selectedTicket.assigned_to !== null &&
            ticketStore.selectedTicket.assigned_to !== authStore.user.id
            && ticketStore.selectedTicket.created_by !== authStore.user.id
          ){
            next('/forbidden')
          }
          else{
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
