<script setup lang="ts">
import { onBeforeMount,ref } from 'vue';
import {mostrarNavLinks} from "../../stores/showNavDashboardLinks";
let firstNavElemsState=ref(false);
onBeforeMount(()=>{
    let estadoNavHandler=mostrarNavLinks();
    let estadoNav=estadoNavHandler.getEstadoNavValue();
    if(estadoNav===0){
        firstNavElemsState.value=true;
    }
})
</script>
<template>
    <b-navbar variant="faded" type="secondary">
        <b-navbar-brand tag="h1" class="mb-0">Crud PHP Y Vue3 JS</b-navbar-brand>
        <NavElementsDashboard v-if="firstNavElemsState===true"/>
    </b-navbar>
</template>

<style scoped>
li {
    list-style: none;
}
</style>