<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import { io } from "socket.io-client";
// адрес по которому подкл к серверу
const socket = io("http://localhost:4444");
provide("socketIO", socket);

// Переключить тему
const isDark = ref(false);
onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});
function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle("dark");
  isDark.value = html.classList.contains("dark");
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}
</script>

<template>
  <button @click="toggleTheme">Переключить тему</button>
  <div class="bg-white dark:bg-black text-black dark:text-white">
    <div class="p-4 mt-2 border-y-2">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
