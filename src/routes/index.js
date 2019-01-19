import Vue from "vue";
import Router from "vue-router";
import { routes } from "./router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

// router.beforeEach((to, from, next) => {});

export default router;
