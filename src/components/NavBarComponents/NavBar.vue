<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { mostrarNavLinks } from "../../stores/showNavDashboardLinks";
let firstNavElemsState = ref(false);
let secondNavElemsState = ref(false);
onBeforeMount(() => {
    let estadoNavHandler = mostrarNavLinks();
    let estadoNav = estadoNavHandler.getEstadoNavValue();
    switch (estadoNav) {
        case 1:
            firstNavElemsState.value = true;
            secondNavElemsState.value = false;
            break;
        case 2:
            firstNavElemsState.value = false;
            secondNavElemsState.value = true;
            break;

    }
});
</script>
<template>
    <b-navbar variant="faded" type="secondary">
        <b-navbar-brand tag="h1" class="mb-0">Crud PHP Y Vue3 JS</b-navbar-brand>
        <NavElementsDashboard v-if="firstNavElemsState === true" />
    </b-navbar>
</template>

<style scoped>
li {
    list-style: none;
}
</style>