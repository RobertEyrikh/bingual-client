import $api from "../http";

export default class CardService {
  static async getCards() {
    return $api.get("/getCardsByUser");
  }
  static async getCardById(cardId) {
    return $api.post("/getCardById", { cardId });
  }
  static async addNewCard(card) {
    console.log(card)
    return $api.post("/addCard", card );
  }
}
