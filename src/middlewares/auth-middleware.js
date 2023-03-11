import { useUserStore } from "../store/UserStore";

export default class authMiddleware {
  static redirectIfAuth(to, from, next) {
    const userStore = useUserStore();
    const isAuth = userStore.isTokenExist();
    if (isAuth) {
      next("/");
    } else {
      next();
    }
  }
  static redirectIfGuest(to, from, next) {
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
}