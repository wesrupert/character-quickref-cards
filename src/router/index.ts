import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

export const Routes = {
  home: "home",
  print: "print",
  cards: "cards",
  import: "import",
} as const;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: Routes.home,
    component: HomeView,
  },
  {
    path: "/print",
    name: Routes.print,
    component: () => import("@/views/PrintView.vue"),
  },
  {
    path: "/cards",
    name: Routes.cards,
    component: () => import("@/views/CardsView.vue"),
  },
  //   TODO: Add
  //   {
  //     path: "new",
  //     name: Routes.new,
  //     component: () => import("@/views/AddCardView.vue"),
  //   },
  {
    path: "/cards/import",
    name: Routes.import,
    component: () => import("@/views/ImportView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
