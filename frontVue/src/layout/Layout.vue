<script setup lang="ts">
import { nextTick, onMounted, provide, ref, watch } from "vue";
import { io } from "socket.io-client";
// адрес по которому подкл к серверу
const socket = io("http://localhost:4444");
provide("socketIO", socket);

const drawwer = ref(false);
const overlay = ref<HTMLElement | null>(null);

//  === Функции модалки ===
function toggleDrawer() {
  drawwer.value = !drawwer.value;
}

function handleClickOutSide(event: MouseEvent) {
  if (event.target === overlay.value) {
    toggleDrawer();
  }
}

watch(drawwer, async (newVal) => {
  if (newVal) {
    await nextTick(); // Ждём рендер (пока Vue обновит DOM)
    console.log("Overlay готов:", overlay.value);

    window.addEventListener("click", handleClickOutSide);
  } else {
    console.log("Overlay убран");
    window.removeEventListener("click", handleClickOutSide);
  }
});
</script>

<template>
  <div class="grid grid-cols-[200px_1fr] gap-10 h-screen">
    <div class="border-r bg-black/20">sideBar</div>

    <!-- rightContent -->
    <div>
      <button @click="toggleDrawer">Модалка</button>
      <div class="bg-white dark:bg-black text-black dark:text-white">
        <div class="p-4 mt-2 border-y-2">
          <router-view />
        </div>
      </div>
    </div>

    <!-- Портал -->
    <transition name="fade">
      <teleport to="#modal-root" v-if="drawwer">
        <div class="fixed top-0 left-0 w-full h-full bg-black/50" ref="overlay">
          <div class="bg-white p-6 w-1/2 mx-auto mt-20 rounded">
            <h2>Это модальное окно</h2>
            <p>Оно отрендерено вне текущего DOM-узла</p>
          </div>
        </div>
      </teleport>
    </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
