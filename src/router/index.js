import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import authMiddleware from "../middlewares/auth-middleware";
import notFoundMiddleware from "../middlewares/not-found-middleware";

const routes = [
  {
    path: "/",
    component: HomeView,
    beforeEnter: authMiddleware.redirectIfGuest,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/PageNotFound.vue"),
  },
  {
    path: "/:id/card",
    component: () => import("../views/CardView.vue"),
    beforeEnter: authMiddleware.redirectIfGuest && notFoundMiddleware.redirectIfNotFound,
  },
  {
    path: "/:id/study",
    component: () => import("../views/StudyView.vue"),
    beforeEnter: authMiddleware.redirectIfGuest,
  },
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: authMiddleware.redirectIfAuth,
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/RegistrationView.vue"),
    beforeEnter: authMiddleware.redirectIfAuth,
  },
  {
    path: "/reset_password",
    component: () => import("../views/ResetPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
