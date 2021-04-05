import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Disconnect from "../views/Disconnect.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/disconnect",
    name: "Disconnect",
    component: Disconnect,
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
