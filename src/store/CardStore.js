import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import CardService from "../services/CardService";

export const useCardStore = defineStore("cardStore", () => {
  const cardList = reactive([]);
  const error = ref("");

  const increaseWordsQty = (cardId) => {
    const card = cardList.find((card) => card.id == cardId);
    card.qty += 1;
  };
  const decreaseWordsQty = (cardId) => {
    const card = cardList.find((card) => card.id == cardId);
    card.qty -= 1;
  }
  const setCardsIdToSessionStorage = () => {
    sessionStorage.setItem("cardsId", JSON.stringify(refreshCardsId()));
  };
  const refreshCardsId = () =>
    cardList.reduce((acc, { id }) => {
      acc.push(id);
      return acc;
    }, []);
  const setCards = (res) => {
    let cards = res.data;
    for (let cardInfo of cards) {
      let card = {
        id: cardInfo._id,
        title: cardInfo.title,
        qty: cardInfo.words.length,
      };
      cardList.push(card);
    }
    setCardsIdToSessionStorage();
  };
  const addNewCard = (card) => {
    cardList.push(card);
    setCardsIdToSessionStorage();
  };

  const deleteCard = async (deletionCard) => {
    const deleteCard = CardService.deleteCard(deletionCard);
    deleteCard.then(
      () => {
        cardList.splice(
          0,
          cardList.length,
          ...cardList.filter((n) => n.id !== deletionCard)
        );
        setCardsIdToSessionStorage();
      },
      (reason) => {
        error = reason.message;
      }
    );
  };
  const getCardListFromApi = async () => {
    const getCards = CardService.getCards();
    getCards.then((res) => {
      setCards(res);
    });
  };

  const setNewTitle = (cardId, newTitle) => {
    for (let card of cardList) {
      if (card.id === cardId) {
        card.title = newTitle;
      }
    }
  };
  const changeCardTitle = async (cardId, newTitle) => {
    const changeCardTitle = CardService.changeCardTitle(cardId, newTitle);
    changeCardTitle
      .then(() => setNewTitle(cardId, newTitle))
      .catch((e) => console.log(e));
  };

  const deleteWord = async (cardId, wordId) => {
    const deleteWord = CardService.deleteWord(cardId, wordId);
    deleteWord
      .then(() => {
        decreaseWordsQty(cardId)
      })
      .catch((e) => console.log(e));
  };

  const getError = computed(() => error.value);
  const getCardList = computed(() => cardList);
  const getCardsId = () => JSON.parse(sessionStorage.getItem("cardsId"));

  return {
    getCardListFromApi,
    deleteCard,
    addNewCard,
    changeCardTitle,
    deleteWord,
    increaseWordsQty,
    getCardList,
    getError,
    getCardsId,
  };
});
