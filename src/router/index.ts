import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Main from "../components/Main.vue";
import StartHand from "../components/StartHand.vue";
import Combos from "../components/Combos.vue";
import CardGroups from "../components/CardGroups.vue";
import Traning from "../components/Traning.vue";
import Logs from "../components/Logs.vue";
import BanList from "../components/BanList.vue";
import LifePoints from "../components/LifePoints.vue";
import OwnCards from "../components/OwnCards.vue";
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
  {
    path: "/Traning",
    name: "Traning",
    component: Traning,
  },
  {
    path: "/Logs",
    name: "Logs",
    component: Logs,
  },
  {
    path: "/BanList",
    name: "BanList",
    component: BanList,
  },
  {
    path: "/LifePoints",
    name: "LifePoints",
    component: LifePoints,
  },
  {
    path: "/OwnCards",
    name: "OwnCards",
    component: OwnCards,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
