<script setup lang="ts">
import ProductInputsComponent from '@/components/ProductInputsComponent.vue';
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

interface ResponseProducts {
    status: number,
    body: string
}

let idUserPathParam = useRoute();

let booleanValidacionCamposRender=ref(false);

let nombretxt = ref<string>(""),
    descripcionTxt = ref<string>(""),
    preciotxt = ref<string>(""),
    fabricantetxt = ref<string>("")

async function updateDataFunctionPayload() {
    console.log("forms dsta: ",nombretxt.value.trim(),descripcionTxt.value.trim(),preciotxt.value.trim(),fabricantetxt.value.trim());
    let updatePayload = await fetch(`/crudjwtphp/public/productos/updateprod/${idUserPathParam.params.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "bearer-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCIsImlhdCI6MTM1Njk5OTUyNCwibmJmIjoxMzU3MDAwMDAwLCJpZCI6IjEiLCJ1c2VyIjoibWFyaW9uaWNlIn0.5HqEeJex2vZvWlhzj3KUTwvt8TYpCLsiHneNa5mlKqw"
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
    if (validateInputs()===true) {
       let responseDetails: ResponseProducts= await updateDataFunctionPayload();
       //await updateDataFunctionPayload();
        console.log(responseDetails);
    }else{
        booleanValidacionCamposRender.value=true;
    }
}
</script>
<template>
    <NavBar />
    <section class="d-flex flex-column justify-content-center align-items-center">
        <div v-if="booleanValidacionCamposRender===true" class="alert alert-warning w-75">Complete todos los campos e intentelo de nuevo</div>
        <ProductInputsComponent 
            :nombreTxt="nombretxt" 
            :descripcionTxt="descripcionTxt" 
            :preciotxt="preciotxt"
            :fabricantetxt="fabricantetxt" 
            @update-data="updateData()"
            @update:nombretxt="getNombre => nombretxt = new String(getNombre).valueOf()" 
            @update:descripcionTxt="getDescripcion=> descripcionTxt= new String(getDescripcion).valueOf()"
            @update:fabricantetxt="getFabricante=>fabricantetxt=new String(getFabricante).valueOf()"
            @update:preciotxt="getPrecio=>preciotxt=new String(getPrecio).valueOf()"
        />
    </section>
</template>