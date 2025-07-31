<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref("");

function handleSubmit() {
  localStorage.setItem("user", user.value);
  router.push("/chat");
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="border p-8 grid">
    <h2>Вход в чат</h2>
    <input type="text" v-model="user" />
    {{ user }}

    <button>Войти</button>
  </form>
</template>
