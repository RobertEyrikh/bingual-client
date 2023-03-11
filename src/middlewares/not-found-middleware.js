import { useCardStore } from "../store/CardStore";

export default class notFoundMiddleware {
  static redirectIfNotFound(to, from, next) {
    const cardStore = useCardStore();
    const existPaths = cardStore.getCardsId
    if(existPaths.includes(to.params.id)) {
      next()
    } else {
      next("/error")
    }
  }
}