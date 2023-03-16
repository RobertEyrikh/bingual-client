<script setup>
import { ref, computed } from "vue";
import TheHeader from "../components/TheHeader.vue";
import MyButton from "../components/UI/MyButton.vue";
import AddImage from "../components/UI/AddImage.vue";
import useGetCard from "../composables/useGetCard";
import { useCardStore } from "../store/CardStore";
import { useRoute } from "vue-router";
import LoadingComponent from "../components/UI/LoadingComponent.vue";
import useValidation from "../composables/useValidation";
import CardService from "../services/CardService";

const { errors, validateWordField } = useValidation();
const route = useRoute();
const cardStore = useCardStore();
const { title, cardWords } = useGetCard();
const editWordIndex = ref(null);
const isTitleEdit = ref(false);
const currentTitle = ref("");
const cardId = route.params.id;
const currentWords = ref({});
const isNewWordSent = ref(true);

const setCurrentTitle = () => {
  currentTitle.value = title.value;
};
const setCurrentWords = (index) => {
  currentWords.value.word = cardWords.value[index].word;
  currentWords.value.translation = cardWords.value[index].translation;
  currentWords.value.index = index;
};

const changeTitle = () => {
  if (currentTitle.value === title.value || !title.value) {
    title.value = currentTitle.value;
    return;
  }
  cardStore
    .changeCardTitle(route.params.id, title.value)
    .then(() => (currentTitle.value = ""));
};

const deleteWord = (index, wordId) => {
  if (cardWords.value.length === 1) {
    return;
  }
  if (wordId) {
    cardStore.deleteWord(cardId, wordId);
  } else {
    isNewWordSent.value = true;
  }
  cardWords.value.splice(index, 1);
};

const addWord = () => {
  if (isNewWordSent.value) {
    cardWords.value.push({ word: "", translation: "" });
    editWord(cardWords.value.length - 1);
  }
  isNewWordSent.value = false;
};

const editWordInCard = (index, word, translation) => {
  validateWordField(index, cardWords.value[index].word);
  validateWordField(index, cardWords.value[index].translation);
  if (!cardWords.value[index]._id) {
    if (errors[index]) {
      return;
    }
    isNewWordSent.value = true;
    const createNewWord = CardService.createNewWord(cardId, word, translation);
    createNewWord.then((res) => {
      cardWords.value = res.data.words;
      cardStore.increaseWordsQty(cardId);
    });
    currentWords.value = {};
    editWordIndex.value = null;
    return;
  }
  const wordId = cardWords.value[index]._id;
  if (
    cardWords.value[index].word === currentWords.value.word &&
    cardWords.value[index].translation === currentWords.value.translation
  ) {
    editWordIndex.value = null;
    return;
  }
  if (errors[index]) {
    return;
  }
  const changeWord = CardService.changeWordInCard(
    cardId,
    wordId,
    word,
    translation
  );
  changeWord.then(() => (editWordIndex.value = null));
  currentWords.value = {};
};
const cancelWordEdit = (index) => {
  if (!isNewWordSent.value && cardWords.value.length - 1 === index) {
    cardWords.value.pop();
    isNewWordSent.value = true;
    currentWords.value = {};
    errors[index] = "";
    editWordIndex.value = null;
    return;
  }
  cardWords.value[index].word = currentWords.value.word;
  cardWords.value[index].translation = currentWords.value.translation;
  currentWords.value = {};
  errors[index] = "";
  editWordIndex.value = null;
};

const isEdit = (index) => {
  return index === editWordIndex.value;
};
const editWord = (index) => {
  if (currentWords.value.word) {
    const index = currentWords.value.index;
    cardWords.value[index].word = currentWords.value.word;
    cardWords.value[index].translation = currentWords.value.translation;
  }
  setCurrentWords(index);
  if (isEdit(index)) {
    return;
  }
  editWordIndex.value = index;
};
</script>

<template>
  <the-header></the-header>
  <div class="card-view">
    <header class="card-header">
      <h1 v-if="!isTitleEdit" @click="isTitleEdit = true" class="card-title">
        {{ title }}
      </h1>
      <input
        v-if="isTitleEdit"
        type="text"
        class="title-edit"
        v-model.trim="title"
        @focus="setCurrentTitle"
        @blur="changeTitle"
      />
    </header>
    <my-button
      @click="this.$router.push(`/${$route.params.id}/study`)"
      class="study-button"
      >Study</my-button
    >
    <div class="words-container">
      <loading-component v-if="cardWords?.length == 0"></loading-component>
      <div class="word-wrapper" v-for="(word, index) of cardWords">
        <div class="word-content" v-if="!isEdit(index)">
          <p class="word">{{ word.word }}</p>
          <p class="translation">
            {{ word.translation }}
          </p>
        </div>
        <div class="word-content" v-if="isEdit(index)">
          <input

          v-model="cardWords[index].word"
          @blur="validateWordField(index, cardWords[index].word)"
          type="text"
          :class="{ error: errors[index] }"
          class="word-edit margin"
        />
        <input

          v-model="cardWords[index].translation"
          @blur="validateWordField(index, cardWords[index].translation)"
          type="text"
          :class="{ error: errors[index] }"
          class="word-edit"
        />
        </div>
        <div class="word-ulits">
          <button
            @click="editWord(index)"
            v-if="!isEdit(index)"
            class="utils-image__wrapper"
          >
            <img class="utils-image edit" src="../assets/edit.svg" />
          </button>
          <button
            @click="
              editWordInCard(
                index,
                cardWords[index].word,
                cardWords[index].translation
              )
            "
            v-if="isEdit(index)"
            class="utils-image__wrapper"
          >
            <img class="utils-image edit" src="../assets/confirm.svg" />
          </button>
          <button
            @click="cancelWordEdit(index)"
            v-if="isEdit(index)"
            class="utils-image__wrapper"
          >
            <img class="utils-image edit" src="../assets/cancel.svg" />
          </button>
          <button
            @click="deleteWord(index, word._id)"
            v-if="!isEdit(index)"
            class="utils-image__wrapper"
          >
            <img class="utils-image delete" src="../assets/delete.svg" />
          </button>
        </div>
      </div>
      <p v-if="!isNewWordSent" class="not-sent-message">
        Сonfirm the addition of the word
      </p>
    </div>
    <button @click="addWord" class="add-button">
      <add-image />
    </button>
  </div>
</template>

<style scoped>
.card-view {
  min-height: 100vh;
  padding: 20px 20px 50px 20px;
  background-color: #1a1a1a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='107' height='107' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23171717' fill-opacity='0.93'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.93'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
}
.card-title {
  word-wrap: break-word;
  font-size: 20px;
  margin-bottom: 30px;
  color: aliceblue;
}
.card-header {
  display: flex;
  justify-content: center;
}
.title-edit {
  background-color: inherit;
  font-size: 20px;
  color: aliceblue;
  margin-bottom: 30px;
  text-align: center;
  min-height: 10px;
}
.study-button {
  background-color: #ffa500;
  font-size: 20px;
}
.words-container {
  min-height: 10px;
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(146, 146, 146, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(8px);
}
.word-wrapper {
  display: grid;
  height: 50px;
  grid-template-columns: 6fr 1fr;
  margin-bottom: 10px;
}
.word-content {
  display: grid;
  margin-bottom: 10px;
  grid-template-columns: 1fr 1fr
}
.word,
.translation {
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.word-edit {
  font-size: 20px;
  padding-left: 10px;
  margin: 0 20px 0 10px;
  background-color: #1a1a1a;
  border-radius: 5px;
}
.word {
  border-right: 1px solid black;
}
.word-ulits {
  display: flex;
  padding: 0 5px;
}
.utils-image__wrapper {
  background-color: inherit;
  height: 40px;
  flex: 1 1 auto;
  margin: 0 5px;
  width: 40px;
}
.utils-image {
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
.add-button {
  margin-top: 10px;
  background-color: inherit;
  height: 60px;
}
.error {
  border: 1px solid red;
  box-sizing: border-box;
}
.not-sent-message {
  margin: 10px;
  color: #ffa500;
}
.delete:hover {
  filter: invert(48%) sepia(54%) saturate(1960%) hue-rotate(328deg)
    brightness(97%) contrast(107%);
}
.edit:hover {
  filter: invert(77%) sepia(23%) saturate(7414%) hue-rotate(359deg)
    brightness(99%) contrast(109%);
}
@media screen and (max-width: 800px) {
  .utils-image__wrapper {
    height: 30px;
    width: 30px;
  }
  .word-edit,
  .word,
  .translation {
    font-size: 16px;
  }
}
@media screen and (max-width: 600px) {
  .word-wrapper {
    display: flex;
    flex-direction: column;
    height: auto;
    box-sizing: border-box;
  }
  .word-content {
    display: flex;
    flex-direction: column;
    min-height: 90px;
    margin-bottom: 0;
  }
  .word-edit {
    border-right: none;
  }
  .margin {
    margin-bottom: 20px;
  }
  .word {
    border-right: none;
    margin-bottom: 20px;
  }
  .word-ulits {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 20px 0;
    border-bottom: 1px solid black;
  }
  .utils-image__wrapper {
    flex: none;
    width: 40px;
    margin-bottom: 10px;
  }
  .word-edit,
  .title-edit,
  .word,
  .translation {
    padding: 5px;
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
