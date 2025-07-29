import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";

const routes = [
  { path: "/home", component: Home },
  // Можно добавить другие роуты сюда
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App); // передаём корневой компонент App
app.use(router);
app.mount("#app");
