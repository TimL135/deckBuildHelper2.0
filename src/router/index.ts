import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Main from "@/components/Main.vue";
import StartHand from "@/components/StartHand.vue";
import Combos from "@/components/Combos.vue";
import CardGroups from "@/components/CardGroups.vue"
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
  {
    path: "/Combos",
    name: "Combos",
    component: Combos,
  },
  {
    path: "/CardGroups",
    name: "CardGroups",
    component: CardGroups,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
