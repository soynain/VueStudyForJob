<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!--<LoginView />-->
  <!--<nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    <RouterView />
    -->
    <Suspense>
      <RouterView />
    </Suspense>
    
</template>

<style scoped>

</style>
