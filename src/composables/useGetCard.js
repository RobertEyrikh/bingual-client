import CardService from "../services/CardService";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

export default function () {
  const route = useRoute();
  const getCard = CardService.getCardById(route.params.id);
  const title = ref("Card name");
  const cardWords = ref([]);
  getCard.then((res) => {
    const wordsData = res.data.words;
    title.value = res.data.title;
    for (let wordData of wordsData) {
      let word = {
        id: wordData._id,
        word: wordData.word,
        translation: wordData.translate,
      };
      cardWords.value.push(word);
    }
  });
  return { cardWords, title };
}
