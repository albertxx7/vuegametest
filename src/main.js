
// 元件....
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Login from "@/components/Login.vue";
import AddToCart from "../src/components/frontend/AddToCart.vue";
import MiniCart from "../src/components/frontend/Minicart.vue";

// firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

// 讀取效果
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'


// 套件
import Swal from "sweetalert2";
window.Swal = Swal;
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "./assets/all.scss";


// render

let newRender = "";

const auth = getAuth();
onAuthStateChanged(auth, () => {
  if (!newRender) {
    const app = createApp(App);
    app.component("Login",Login);
    app.component("add-to-cart",AddToCart)
    app.component('Loading', Loading)
    app.component('MiniCart',MiniCart)
    app.use(store);
    app.use(router);
    app.mount("#app");
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// createApp(App)
// .use(store)
// .use(router)
// .mount('#app')
