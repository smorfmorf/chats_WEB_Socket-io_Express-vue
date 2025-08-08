<template>
  <div class="grid grid-cols-[minmax(200px,auto)_1fr] border">
    <!-- sidebar -->
    <div class="flex flex-col gap-4 p-4 border-r-2">
      <div
        class="text-2xl text-center font-bold shadow-black shadow-lg p-1 rounded-xl cursor-pointer hover:bg-fuchsia-200 hover:-translate-y-0.5 transition"
      >
        {{ me ?? "undefined user" }}
      </div>
      <div>
        <h3 class="text-2xl font-black">users:</h3>
        <ul>
          <li
            v-for="item in store.users"
            :key="item.socketID"
            :class="{ 'bg-fuchsia-200': item.user === me }"
          >
            {{ item.user }}
          </li>
        </ul>
      </div>
    </div>

    <!-- main -->
    <main class="flex flex-col h-[600px] p-6 bg-fuchsia-200">
      <div
        ref="scrollContainer"
        class="flex-1 relative overflow-y-scroll border-2 rounded-lg p-2 border-red-500"
      >
        <!-- body_chats -->
        <div class="wrapper-chats mt-20 grid gap-5">
          <template v-for="message in messages" :key="message.id">
            <div class="app-chats-message self" v-if="message.user === me">
              <p class="text-purple-500 truncate">
                {{ message.user }}
                <img src="./assets/vue.svg" alt="" />
              </p>
              <div class="chats">
                <p class="text-right truncate">
                  {{ message.message }}
                </p>
              </div>
            </div>
            <div class="app-chats-message" v-else>
              <p class="text-purple-500">
                {{ message.user }}
                <img src="./assets/vue.svg" alt="" />
              </p>
              <div class="chats">
                <p class="text-left truncate">
                  {{ message.message }}
                </p>
              </div>
            </div>
          </template>

          <div class="absolute italic bottom-5">
            <p>{{ !isMyMessage ? store.statusType : "" }}</p>
          </div>
        </div>
      </div>

      <!-- message-block -->
      <div class="h-[80px] mt-2 flex justify-between items-start gap-10">
        <button
          type="button"
          @click="leaveFromChat"
          class="hover:bg-fuchsia-300"
        >
          Покинуть чат {{ me }}
        </button>
        <form class="grid gap-2 flex-1" @submit.prevent="handleSubmit">
          <input
            type="text"
            class="p-2 rounded-xl"
            v-model="message"
            @keydown="isTyping"
          />
          <button type="submit" class="justify-self-end">Отправить</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "./store/user";
import { inject, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
// =>
const router = useRouter();
const scrollContainer = ref<HTMLElement | null>(null);
const socket = inject<any>("socketIO");
const isMyMessage = ref(false);
let typingTimeout: number;

//*store - это объект, обернутый через reactive, то есть нет необходимости писать .value после геттеров, но, как и props в setup, мы не можем его деструктурировать
const store = useUserStore();
//Чтобы извлечь свойства из хранилища, сохраняя их реактивность
const { messages, name: me } = storeToRefs(store);
const message = ref("");

function leaveFromChat() {
  localStorage.removeItem("user");
  socket.emit("disconect");
  router.push("/");
}

function isTyping() {
  socket.emit("typing", {
    socketID: socket.id,
    text: `${me.value} is typing...`,
  });
}

// как только будет сабмит формы отправить сообщение на сервер, а сервер отправит его всем пользователям
function handleSubmit() {
  if (message.value.trim() && me) {
    socket.emit("message", {
      user: me,
      message: message.value,
      id: `${socket.id}-${Date.now()}`,
      socketId: socket.id,
    });
  }

  console.log({
    user: me,
    message: message.value,
  });
}

onMounted(() => {
  console.log("on Mounted ");
  socket.on("response", (data: any) => {
    console.log(data);
    store.addMessage(data);
  });

  socket.on("responseNewUser", (data: any) => {
    store.addUsers(data);
  });

  socket.on("responseTyping", (data: any) => {
    store.setStatusType(data.text);
    isMyMessage.value = data.socketID === socket.id;

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      store.setStatusType("");
    }, 1000);
  });
});

// удаляем все слушатели response для этого сокета
onUnmounted(() => {
  socket.off("response");
  socket.off("responseNewUser");
});

watch(messages, (newVal, oldVal) => {
  console.log("Изменилось:", oldVal, "=>", newVal);
  // Подождать обновления DOM, затем прокрутить вниз
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
      console.log("✌️scrollContainer --->", scrollContainer.value.scrollHeight);
    }
  });
});

watch(
  () => store.users,
  (newUsers) => {
    console.log("Users updated (watch):", newUsers);
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.app-chats-message {
  display: grid;
  grid-template-columns: auto (minmax(100px, 400px));
  align-items: center;
  gap: 20px;
  padding: 8px;
  width: fit-content;
  background-color: rgb(209, 199, 209);
  border-radius: 10px;
}
.self {
  grid-template-columns: (minmax(100px, 400px)) auto;
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

<!-- 
defineProps<{ msg: string }>();
const count = ref(0);
-->
