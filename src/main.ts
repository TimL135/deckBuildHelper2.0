import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./registerServiceWorker";

// window.onclick = function(event:Event) {
//     if (event.target == document.getElementById("cardEditModal")) {
//         document.getElementById("cardEditModal")!.style.display = "none";

//     }
//   }
createApp(App).use(router).mount("#app");
