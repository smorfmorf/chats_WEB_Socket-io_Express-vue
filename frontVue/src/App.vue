<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { io } from "socket.io-client";
import { useRouter } from "vue-router";
// адрес по которому подкл к серверу
const socket = io("http://localhost:4444");
provide("socketIO", socket);

const router = useRouter();

const user = ref("");

function handleSubmit() {
  localStorage.setItem("user", user.value);
  router.push("/home");
}

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
  <div class="bg-white dark:bg-black text-black dark:text-white">
    <button @click="toggleTheme" class="px-4 py-2 bg-blue-600">
      Переключить тему
    </button>
    <form @submit.prevent="handleSubmit" class="border p-8 grid">
      <h2>Вход в чат</h2>
      <input type="text" v-model="user" />
      {{ user }}

      <button>Войти</button>
    </form>

    <router-view />

    <hr class="mt-10" />
    <HelloWorld msg="Vite + Vue" />
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
