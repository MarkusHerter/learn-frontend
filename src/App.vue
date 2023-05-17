<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<template>
  <div class="main_app">
    <RouterView style="margin: auto" v-slot="{ Component }">
      <Transition :name="'slide-left'">
        <Component :is="Component" :key="$route.path"></Component>
      </Transition>
    </RouterView>
  </div>
</template>
<style>
.main_app {
  display: flex;
  justify-content: center;
  width: 100vw;
}
</style>
