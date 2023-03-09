import axios from "axios";
const API_URL = "https://libretranslate.de/translate";
import isCyrillic from "../helpers/isCyrillic";

export default class TranslateService {
  static async getTranslate(word) {
    if (isCyrillic(word)) {
      const response = await axios.post(`${API_URL}`, {
        q: word,
        source: "ru",
        target: "en",
        format: "text",
        api_key: "",
      });
      return response.data.translatedText.match(/[\p{Ll}\p{Lu}\p{Lt}\p{Lo}\p{Lm}\p{Mn}\p{Nd}\p{Pc}']+/u)[0];
    } else {
      const response = await axios.post(`${API_URL}`, {
        q: word,
        source: "en",
        target: "ru",
        format: "text",
        api_key: "",
      });
      return response.data.translatedText.match(/[\p{Ll}\p{Lu}\p{Lt}\p{Lo}\p{Lm}\p{Mn}\p{Nd}\p{Pc}']+/u)[0];
    }
  }
}
