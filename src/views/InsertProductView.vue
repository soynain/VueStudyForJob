<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { savedDataAlertStore } from '@/stores/savedDataState';
import { authStore } from '@/stores/authStore';

interface ResponseProducts {
    status: number,
    body: string
}

let savedDataStore=savedDataAlertStore();
let jwtTokenStore = authStore();

let booleanValidacionCamposRender = ref(false),
    booleanServerErrorAlertRender = ref(false);

let nombretxt = ref<string>(""),
    descripcionTxt = ref<string>(""),
    preciotxt = ref<string>(""),
    fabricantetxt = ref<string>("");

    async function updateDataFunctionPayload() {
    //console.log("forms dsta: ",nombretxt.value.trim(),descripcionTxt.value.trim(),preciotxt.value.trim(),fabricantetxt.value.trim());
    let updatePayload = await fetch(`/crudjwtphp/public/productos/saveprod`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "bearer-token": jwtTokenStore.getJwt()
        },
        body: JSON.stringify({
            "nombretxt": nombretxt.value.trim(),
            "descripciontxt": descripcionTxt.value.trim(),
            "preciotxt": preciotxt.value.trim(),
            "fabricantetxt": fabricantetxt.value.trim()
        })
    });
    let responseDetails = updatePayload.json();
    return responseDetails;
}

function validateInputs() {
    return nombretxt.value.trim() !== "" && descripcionTxt.value.trim() !== "" && preciotxt.value.trim() !== "" && fabricantetxt.value.trim() !== "" ? true : false;
}

async function updateData() {
    booleanValidacionCamposRender.value = false;
    booleanServerErrorAlertRender.value = false;
    if (validateInputs() === true) {
        let responseDetails: ResponseProducts = await updateDataFunctionPayload();
        if (responseDetails.status === 200) {
            savedDataStore.setSavedDataState(true);
            router.push({ name: 'dashboard' });
        } else {
            booleanServerErrorAlertRender.value = true;
        }
    } else {
        booleanValidacionCamposRender.value = true;
        setTimeout(()=>{
            booleanValidacionCamposRender.value = false;
        },5000)
    }
}
</script>
<template>
    <NavBar />
    <header class="h2 text-center">Registrar nuevo producto</header>
    <section class="d-flex flex-column justify-content-center align-items-center">
        <div v-if="booleanServerErrorAlertRender === true" class="alert alert-danger w-75">Hubo un error al guardar sus
            datos, intentelo más tarde.</div>
        <div v-if="booleanValidacionCamposRender === true" class="alert alert-warning w-75">Complete todos los campos e
            intentelo de nuevo</div>
        <ProductInputsComponent 
            :nombreTxt="nombretxt" 
            :descripcionTxt="descripcionTxt" 
            :preciotxt="preciotxt"
            :fabricantetxt="fabricantetxt" 
            @update-data="updateData()"
            @update:nombretxt="getNombre => nombretxt = new String(getNombre).valueOf()"
            @update:descripcionTxt="getDescripcion => descripcionTxt = new String(getDescripcion).valueOf()"
            @update:fabricantetxt="getFabricante => fabricantetxt = new String(getFabricante).valueOf()"
            @update:preciotxt="getPrecio => preciotxt = new String(getPrecio).valueOf()" 
        />
    </section>
</template>