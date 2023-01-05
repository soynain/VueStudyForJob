import LoginViewVue from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardViewVue from '@/views/DashboardView.vue'
import ModifyProductView from '@/views/ModifyProductView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component:DashboardViewVue
    },
    {
      path:'/dashboard/edit/:id',
      name:'edit-user',
      component:ModifyProductView
    }
   /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

export default router
