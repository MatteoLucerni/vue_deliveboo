import { createApp } from "vue";
import "./assets/scss/main.scss";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { router } from "./router";
import App from "./App.vue";
import AppAlert from "./components/AppAlert.vue";

createApp(App).use(router).mount("#app");
