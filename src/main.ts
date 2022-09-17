import { createPinia } from "pinia";
import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router";
import { STORAGE_KEY } from "./store";

const pinia = createPinia();

watch(
  pinia.state,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    console.debug("Saving cards...");
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cards));
  },
  { deep: true }
);

createApp(App).use(router).use(pinia).mount("#app");
