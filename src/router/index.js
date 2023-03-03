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
  {
    path: "/login",
    component: () => import("../views/LoginView.vue")
  },
  {
    path: "/registration",
    component: () => import("../views/RegistrationView.vue")
  },
  {
    path: "/reset_password",
    component: () => import("../views/ResetPassword.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
