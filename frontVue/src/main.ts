import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Chat from "./Chat.vue";
import { createPinia } from "pinia";
import FormZod from "./testZod/Form-zod.vue";
import Layout from "./layout/Layout.vue";

const routes = [
  {
    //! Guardian
    // beforeEnter: (to, from, next) => {
    //   const isAuthenticated = localStorage.getItem("user");
    //   if (isAuthenticated) {
    //     next(); // доступ разрешен
    //   } else {
    //     next("/"); // редирект
    //   }
    // },
    path: "",
    component: Layout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "/chat",
        component: Chat,
      },
      { path: "/form", component: FormZod },
    ],
  },
  { path: "/test", component: FormZod },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

const app = createApp(App); // передаём корневой компонент App
app.use(router);
app.use(pinia);
app.mount("#app");
