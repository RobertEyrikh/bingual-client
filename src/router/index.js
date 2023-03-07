import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../store/UserStore";

const routes = [
  {
    path: "/",
    component: HomeView,
    beforeEnter: redirectIfGuest,
  },
  {
    path: "/:id/card",
    component: () => import("../views/CardView.vue"),
    beforeEnter: redirectIfGuest,
  },
  {
    path: "/:id/study",
    component: () => import("../views/StudyView.vue"),
    beforeEnter: redirectIfGuest,
  },
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: redirectIfAuth,
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/RegistrationView.vue"),
    beforeEnter: redirectIfAuth,
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

function redirectIfAuth(to, from, next) {
  const userStore = useUserStore();
  const isAuth = userStore.isTokenExist();
  if (isAuth) {
    next("/");
  } else {
    next();
  }
}
function redirectIfGuest(to, from, next) {
  const userStore = useUserStore();
  const isAuth = userStore.isTokenExist();
  if (!isAuth) {
    if (from.name == "registration") {
      next("/registration");
    } else {
      next("/login");
    }
  } else {
    next();
  }
}

export default router;
