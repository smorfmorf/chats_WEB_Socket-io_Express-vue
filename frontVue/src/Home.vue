<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user";

const store = useUserStore();
const router = useRouter();
const socket = inject<any>("socketIO");

const user = ref("");
const error = ref("");

function handleSubmit() {
  store.setName(user.value);
  localStorage.setItem("user", user.value);
  socket.emit("newUser", { user: user.value, socketID: socket.id });

  if (!user.value) {
    error.value = "Введите имя";
    return;
  }
  router.push("/chat");
}

// ✅ следим за вводом
watch(user, (newVal) => {
  if (newVal) error.value = "";
});
</script>

<template>
  <form @submit.prevent="handleSubmit" class="border p-8 grid">
    <h2>Вход в чат</h2>
    <input type="text" v-model="user" />
    {{ user }}

    <span v-if="error" style="color: red">
      {{ error }}
    </span>

    <button>Войти</button>
  </form>
</template>
