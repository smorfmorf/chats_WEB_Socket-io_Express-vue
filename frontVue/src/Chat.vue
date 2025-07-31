<template>
  <div class="grid grid-cols-[200px_1fr] border">
    <div class="flex flex-col gap-4 p-8 border-r-2">
      <h3 class="text-2xl font-black">users:</h3>
      <ul>
        <li>user1</li>
        <li>user2</li>
        <li>user3</li>
      </ul>
    </div>

    <!-- main -->
    <main class="flex flex-col h-[500px] p-8 bg-fuchsia-200">
      <div class="flex-1 relative">
        <button class="absolute top-0 right-0 hover:bg-fuchsia-300">
          Покинуть чат
        </button>

        <div class="wrapper-chats mt-20 grid gap-5">
          <div class="app-chats-message self">
            <p class="text-purple-500"><img src="./assets/vue.svg" alt="" /></p>
            <div class="chats">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Corporis, magnam!
              </p>
            </div>
          </div>

          <div class="app-chats-message">
            <p class="text-purple-500"><img src="./assets/vue.svg" alt="" /></p>
            <div class="chats">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Corporis, magnam!
              </p>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <!-- message-block -->
      <div class="h-[100px]">
        <form class="grid gap-2">
          <input type="text" class="p-2 rounded-xl" />
          <button type="button" class="justify-self-end">Отправить</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss">
.app-chats-message {
  display: grid;
  grid-template-columns: 32px 1fr;
  align-items: center;
  gap: 16px;
  border: 1px solid black;
  padding: 8px;
  width: fit-content;
}
.self {
  grid-template-columns: max-content 32px;
  justify-self: end;

  .chats {
    order: -1;
  }
}
.chats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>

<!-- <script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script> -->
