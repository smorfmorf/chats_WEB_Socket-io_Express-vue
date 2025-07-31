import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Chat from "./Chat.vue";
import FormZod from "./FormZod.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/chat", component: Chat },
  { path: "/form", component: FormZod },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App); // передаём корневой компонент App
app.use(router);
app.mount("#app");
