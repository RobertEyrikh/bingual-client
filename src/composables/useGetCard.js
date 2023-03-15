import CardService from "../services/CardService";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

export default function () {
  const route = useRoute();
  const getCard = CardService.getCardById(route.params.id);
  const title = ref("Card name");
  const cardWords = ref([]);
  getCard.then((res) => {
    title.value = res.data.title;
    cardWords.value = res.data.words
  });
  return { cardWords, title };
}
