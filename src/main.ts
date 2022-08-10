import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "../sw.js";
import "./main.scss";
createApp(App).use(router).mount("#app");
