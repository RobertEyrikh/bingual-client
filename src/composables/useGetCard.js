import CardService from "../services/CardService";
import { ref } from "vue";
import { useRoute } from "vue-router";

export default function (words) {

  const route = useRoute();
  const getCard = CardService.getCardById(route.params.id);
  getCard.then((res) => {
    const wordsData = res.data.words;
    for (let wordData of wordsData) {
      let word = {
        id: wordData._id,
        word: wordData.word,
        translation: wordData.translate,
      };
      words.push(word);
    }
  });
  return words
}
