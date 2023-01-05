<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { mostrarNavLinks } from '@/stores/showNavDashboardLinks';
import router from '@/router';
import { authStore } from "../stores/authStore";

const usertxt = ref("");
const passtxt = ref("");

const badCredentials = ref(false);
const updateWarning = ref(0);

let warningTxt = ref("");

let jwtTokenStore = authStore();
let estadoNavHandler = mostrarNavLinks();

function openLoginWarningModal(text: string) {
  badCredentials.value = true;
  updateWarning.value++;
  warningTxt.value = text;
}

function closeLoginWarningModal() {
  badCredentials.value = false;
  updateWarning.value++;
  warningTxt.value = "";
}

async function loginCall(usertxt: string, passtxt: string) {
  let jwtInfo = await fetch("/crudjwtphp/public/login/auth", {
    method: "POST",
    body: JSON.stringify({ usertxt, passtxt })
  });
  let jsonResponse = await jwtInfo.json();
  return jsonResponse;
}

async function validateInput() {
  //console.log(usertxt.value, passtxt.value);
  if (usertxt.value.trim() === "" || passtxt.value.trim() === "") {
    openLoginWarningModal("No puede haber campos vacios");
    setTimeout(() => { closeLoginWarningModal(); }, 5000);
  } else {
    let jwtTokenRes = await loginCall(usertxt.value, passtxt.value);
    if (jwtTokenRes.status !== 200) {
      openLoginWarningModal("Sus credenciales son incorrectas");
      setTimeout(() => { closeLoginWarningModal(); }, 5000);
    } else {
      let token = JSON.parse(jwtTokenRes.body);
      jwtTokenStore.setJwtToken(token["bearer-token"]);
      estadoNavHandler.setEstadoNav(1);
      router.push({ name: "dashboard" });
    }
  }
}
</script>

<template>
  <NavBar />
  <main>
    <section class="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div class="alert alert-warning" role="alert" v-if="badCredentials === true">{{ warningTxt }}</div>
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
