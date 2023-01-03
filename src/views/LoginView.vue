<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { authStore } from "../stores/authStore";
const usertxt = ref("");
const passtxt = ref("");
const badCredentials = ref(false);
const updateWarning = ref(0);

let jwtTokenStore = authStore();

async function validateInput() {
  console.log(usertxt.value, passtxt.value);
  // let jwtAnswer: any = usertxt.value.trim() !== "" && passtxt.value.trim() !== "" ? await loginCall(usertxt.value, passtxt.value) : badCredentials.value = false;
  if (usertxt.value.trim() === "" && passtxt.value.trim() === "") {
    badCredentials.value = true;
    updateWarning.value++;
    console.log(updateWarning.value, badCredentials.value);
  }else{
    let jwtTokenRes=await loginCall(usertxt.value, passtxt.value);
    //authStore logic
  }
}

async function loginCall(username: string, passtxt: string) {
  let jwtInfo = await fetch("http://localhost/vuebackend/login", {
    method: "POST",
    body: JSON.stringify({ username, passtxt })
  });
  let jsonResponse = await jwtInfo.json();
  return jsonResponse;
}
</script>

<template>
  <NavBar />
  <main>

    <section class="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div class="alert alert-warning" role="alert" v-if="badCredentials === true">Revise sus credenciales e intente de
        nuevo.</div>
      <form class="form-login">
        <div class="mb-3">
          <label for="usertxt">Usuario</label>
          <b-form-input v-model="usertxt" type="text" placeholder="Ingresa tu usuario"></b-form-input>
        </div>
        <div class="mb-3">
          <label for="passtxt">Contrasena</label>
          <b-form-input v-model="passtxt" type="password" placeholder="Ingresa tu contrasena"></b-form-input>
        </div>
        <div class="mb-3">
          <b-button @click="validateInput()" variant="primary">Iniciar sesión</b-button>
        </div>
      </form>
    </section>
  </main>
</template>
