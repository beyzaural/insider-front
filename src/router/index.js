import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RacePage from "../views/RacePage.vue";

const routes = [
  { path: "/", name: "HomeView", component: HomeView },
  { path: "/race", name: "RacePage", component: RacePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
