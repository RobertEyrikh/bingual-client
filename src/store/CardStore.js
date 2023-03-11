import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";
import CardService from "../services/CardService";

export const useCardStore = defineStore("cardStore", () => {
  const cardList = reactive([]);
  const error = ref("")

  const setCardsIdToSessionStorage = () => {
    sessionStorage.setItem("cardsId", JSON.stringify(refreshCardsId()))
  }
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
    setCardsIdToSessionStorage()
  };
  const addNewCard = (card) => {
    cardList.push(card)
    setCardsIdToSessionStorage()
  }
  

  const deleteCard = async (deletionCard) => {
    const deleteCard = CardService.deleteCard(deletionCard);
    deleteCard.then(
      () => {
        cardList.splice(
          0,
          cardList.length,
          ...cardList.filter((n) => n.id !== deletionCard)
        )
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
  const refreshCardsId = () => cardList.reduce((acc, { id }) => {
    acc.push(id)
    return acc
  }, [])

  const getError = computed(() => error.value)
  const getCardList = computed(() => cardList);
  const getCardsId = computed(() => JSON.parse(sessionStorage.getItem("cardsId")))

  return { getCardListFromApi, deleteCard, addNewCard, getCardList, getError, getCardsId };
});
