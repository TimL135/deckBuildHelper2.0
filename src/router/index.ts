import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Main from "@/components/Main.vue";
import StartHand from "@/components/StartHand.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/StartHand",
    name: "StartHand",
    component: StartHand,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
