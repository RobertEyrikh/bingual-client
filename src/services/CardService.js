import $api from "../http";

export default class CardService {
  static async getCards() {
    return $api.get("/getCardsByUser");
  }
  static async getCardById(cardId) {
    return $api.post("/getCardById", { cardId });
  }
  static async addNewCard(card) {
    return $api.post("/addCard", card);
  }
  static async deleteCard(cardId) {
    return $api.post("/deleteCard", { cardId });
  }
  static async changeCardTitle(cardId, title) {
    return $api.post("/changeCardTitle", { cardId, title });
  }
}
