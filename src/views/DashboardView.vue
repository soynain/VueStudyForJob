<script setup lang="ts">
import { authStore } from '@/stores/authStore';
import { onMounted, ref, type Ref } from 'vue';
import router from '@/router';
import { savedDataAlertStore } from '@/stores/savedDataState';

let savedDataStore = savedDataAlertStore();
let deletedProductoAlert = ref(false),
    errorAlBorrarProductoAlert = ref(false);

let listaProductos = ref([]) as Ref<ProductsArray[]>;
let renderAgainTable = ref(0);

interface ResponseProducts {
    status: number,
    body: string
}

interface ProductsArray {
    idProducto: number,
    nombreProducto: string,
    descripcionProducto: string,
    precioProducto: number,
    fabricante: string
}


async function fetchListOfProducts() {
    let jwtTokenStore = authStore();
    let fetchListOfProducts = await fetch("/crudjwtphp/public/productos/get", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "bearer-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCIsImlhdCI6MTM1Njk5OTUyNCwibmJmIjoxMzU3MDAwMDAwLCJpZCI6IjEiLCJ1c2VyIjoibWFyaW9uaWNlIn0.5HqEeJex2vZvWlhzj3KUTwvt8TYpCLsiHneNa5mlKqw"
        }
    });
    let response = fetchListOfProducts.json();
    return response;
}

async function fetchDeleteProduct(idProducto: number) {
    let responsePayload = await fetch(`/crudjwtphp/public/productos/deleteprod/${idProducto}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "bearer-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCIsImlhdCI6MTM1Njk5OTUyNCwibmJmIjoxMzU3MDAwMDAwLCJpZCI6IjEiLCJ1c2VyIjoibWFyaW9uaWNlIn0.5HqEeJex2vZvWlhzj3KUTwvt8TYpCLsiHneNa5mlKqw"
        }
    });
    let responseDetails = responsePayload.json();
    return responseDetails;
}

function insertarProductoOpen() {
    router.push({ name: "insert-producto" });
}

function modificarProducto(idProducto: number) {
    router.push({ name: "edit-producto", params: { id: idProducto } });
}

async function borrarProducto(idProducto: number) {
    let responseDetails: ResponseProducts = await fetchDeleteProduct(idProducto);
    if (responseDetails.status === 200) {
        deletedProductoAlert.value = true;
        setTimeout(() => {
            deletedProductoAlert.value = false;
        }, 5000);
    } else {
        errorAlBorrarProductoAlert.value = true;
        setTimeout(() => {
            errorAlBorrarProductoAlert.value = false;
        }, 5000);
    }

    let bodyGetData: ResponseProducts = await fetchListOfProducts();
    listaProductos.value = JSON.parse(bodyGetData.body);
    renderAgainTable.value++;
}


let bodyGetData: ResponseProducts = await fetchListOfProducts();
listaProductos.value = JSON.parse(bodyGetData.body);

onMounted(() => {
    setTimeout(() => {
        savedDataStore.setSavedDataState(false);
    }, 5000);
});
</script>
<template>
    <NavBar />
    <div v-if="errorAlBorrarProductoAlert === true" class="alert alert-warning">Hubo un error al querer borrar el
        registro, intentelo más tarde.</div>
    <div v-if="savedDataStore.getSavedDataState() === true" class="alert alert-success">Se han guardado los datos
        correctamente.</div>
    <div v-if="deletedProductoAlert === true" class="alert alert-success">Se ha borrado el registro correctamente.</div>
    <header class="h2 text-center">
        Lista de productos listados en el sistema
    </header>
    <button @click="insertarProductoOpen()" class="btn btn-success mb-2">Añadir nuevo producto</button>
    <div class="d-flex flex-column justify-content-start align-items-center ">
        <div class="wrapper-scroll w-100">
            <table :key="renderAgainTable" class="table bordered position-relative">
                <thead>
                    <tr>
                        <th class="position-sticky top-0 bg-light">Id</th>
                        <th class="position-sticky top-0 bg-light">Nombre</th>
                        <th class="position-sticky top-0 bg-light">Descripción</th>
                        <th class="position-sticky top-0 bg-light">Precio</th>
                        <th class="position-sticky top-0 bg-light">Fabricante</th>
                        <th class="position-sticky top-0 bg-light">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="items.idProducto" v-for="items in listaProductos">
                        <th>{{ items.idProducto }}</th>
                        <th>{{ items.nombreProducto }}</th>
                        <td>{{ items.descripcionProducto }}</td>
                        <td>{{ items.precioProducto }}</td>
                        <td>{{ items.fabricante }}</td>
                        <td>
                            <button @click="modificarProducto(items.idProducto)"
                                class="btn btn-primary">Modificar</button>
                            <button @click="borrarProducto(items.idProducto)" class="btn btn-danger">Borrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.wrapper-scroll {
    position: relative;
    height: 65vh;
    overflow: auto;
}
</style>