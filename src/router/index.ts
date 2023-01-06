import LoginViewVue from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardViewVue from '@/views/DashboardView.vue'
import ModifyProductView from '@/views/ModifyProductView.vue';
import InsertProductView from '@/views/InsertProductView.vue';
import PathNotFoundView from '@/views/PathNotFoundView.vue';
import { authStore } from '@/stores/authStore';
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
      component: DashboardViewVue
    },
    {
      path: '/dashboard/edit/:id',
      name: 'edit-producto',
      component: ModifyProductView
    },
    {
      path: '/dashboard/insert',
      name: 'insert-producto',
      component: InsertProductView
    }, {
      path: '/:pathMatch(.*)*', component: PathNotFoundView
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log("router");
  let jwtDataStore = authStore();
  console.log(jwtDataStore.getJwt());
  if (jwtDataStore.getJwt()?.trim() === "" || jwtDataStore.getJwt()?.trim() === undefined || jwtDataStore.getJwt()?.trim() === null) {
    console.log("tocando 1", jwtDataStore.getJwt())
    if (to.fullPath === "/") {
      console.log("tocando 1.1")
      next();
    } else {
      console.log("tocando 1.2")
      next({ name: "login" });
    }
  } else {
    console.log("tocando 2")
    if (to.fullPath !== "/") {
      console.log("tocando 2.1")
      next();
    } else {
      console.log("tocando 2.2")
      next({ name: "dashboard" });
    }
  }
});

export default router
