import LoginViewVue from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardViewVue from '@/views/DashboardView.vue'
import ModifyProductView from '@/views/ModifyProductView.vue';
import InsertProductView from '@/views/InsertProductView.vue';
import PathNotFoundView from '@/views/PathNotFoundView.vue';
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
      name:'edit-producto',
      component:ModifyProductView
    },
    {
      path:'/dashboard/insert',
      name:'insert-producto',
      component:InsertProductView
    },{
      path: '/:pathMatch(.*)*', component: PathNotFoundView
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
