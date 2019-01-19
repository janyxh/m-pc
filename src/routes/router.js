import login from "@/views/login/login.vue";
import workbench from "@/routes/workbench";
import content from "@/routes/content";
import channelCenter from "@/routes/channelCenter";
import audience from "@/routes/audience";
import thirdAuthorization from "@/routes/thirdAuthorization";
import distribution from "@/routes/distribution";
import event from "@/routes/event";
import calendar from "@/routes/calendar";

export const routes = [
  {
    path: "/",
    name: "login",
    component: login
  },

  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home"),
    children: [
      ...workbench,
      ...content,
      ...channelCenter,
      ...audience,
      ...thirdAuthorization,
      ...distribution,
      ...event,
      ...calendar
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404")
  },
  {
    path: "/*",
    name: "page404",
    component: () => import("@/views/error/404")
  }
];
