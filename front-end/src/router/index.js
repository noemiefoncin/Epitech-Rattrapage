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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// function parseJwt(token) {
//   var base64Url = token.split(".")[1];
//   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   var jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(function(c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// }

// router.beforeEach((to, from, next) => {
//   if (localStorage.token) {
//     const jwtPayload = parseJwt(localStorage.token);
//     if (jwtPayload.exp < Date.now() / 1000) {
//       // token expired
//       localStorage.removeItem("token");
//     }
//     next();
//   } else {
//     console.log(to.path);
//     if (to.path === "/disconnect") {
//       next();
//     } else {
//       next("/disconnect");
//     }
//     //next("/");
//   }
// });

export default router;
