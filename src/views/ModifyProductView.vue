<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

interface ResponseProducts {
    status: number,
    body: string
}

let nombretxt = ref(""),
    descripcionTxt = ref(""),
    preciotxt = ref(""),
    fabricantetxt = ref("");

async function updateDataFunctionPayload() {
    let idUserPathParam = useRoute();
    let updatePayload = await fetch(`/crudjwtphp/public/productos/updateprod/${idUserPathParam.params.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "bearer-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCIsImlhdCI6MTM1Njk5OTUyNCwibmJmIjoxMzU3MDAwMDAwLCJpZCI6IjEiLCJ1c2VyIjoibWFyaW9uaWNlIn0.5HqEeJex2vZvWlhzj3KUTwvt8TYpCLsiHneNa5mlKqw"
        },
        body: JSON.stringify({
            nombretxt: nombretxt.value,
            descripcionTxt: descripcionTxt.value,
            preciotxt: preciotxt.value,
            fabricantetxt: fabricantetxt.value
        })
    });
    let responseDetails = updatePayload.json();
    return responseDetails;
}

async function updateData(){
    let responseDetails:ResponseProducts=await updateDataFunctionPayload();
    console.log(responseDetails);
}
</script>
<template>
    <NavBar />
    <section class="d-flex justify-content-center align-items-center">
        <section class="w-75">
            <div class="mb-3">
                <label for="" class="form-label">Nombre del producto</label>
                <input v-model="nombretxt" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Descripción del producto</label>
                <textarea v-model="descripcionTxt" style="resize: none;" class="form-control"></textarea>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Precio del producto</label>
                <input v-model="preciotxt" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Fabricante</label>
                <input v-model="fabricantetxt" type="text" class="form-control">
            </div>
            <button @click="updateData()" class="btn btn-primary">Actualizar datos de producto</button>
        </section>
    </section>
</template>