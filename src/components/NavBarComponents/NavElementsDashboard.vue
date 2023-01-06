<script setup lang="ts">
import { authStore } from "@/stores/authStore";
import router from '@/router';
import { mostrarNavLinks } from "@/stores/showNavDashboardLinks";
function logout(){
    console.log("ira")
    let deleteJwt=authStore();
    let restoreNavBar=mostrarNavLinks();
    deleteJwt.setJwtToken("");
    restoreNavBar.setEstadoNav(2);
    router.push({name:"login"});
}
</script>
<template>
    <b-nav-item @click="logout()">Cerrar sesión</b-nav-item>
</template>

<style scoped>
li{
    list-style: none;
}
</style>