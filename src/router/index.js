import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue"
const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/:id/card",
    component: () => import("../views/CardView.vue")
  },
  {
    path: "/:id/study",
    component: () => import("../views/StudyView.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
