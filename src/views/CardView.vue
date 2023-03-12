<script setup>
import { ref, watchEffect } from "vue";
import TheHeader from "../components/TheHeader.vue";
import MyButton from "../components/UI/MyButton.vue";
import AddImage from "../components/UI/AddImage.vue";
import useGetCard from "../composables/useGetCard";
import { useCardStore } from "../store/CardStore";
import { useRoute } from "vue-router";

const route = useRoute()
const cardStore = useCardStore();
const { title, cardWords } = useGetCard();
const editWordIndex = ref(null);
const errorElementId = ref("");
const isTitleEdit = ref(false)
const currentTitle = ref("")

const setCurrentTitle = () => {
  currentTitle.value = title.value
}
const changeTitle = () => {
  if(currentTitle.value === title.value || !title.value) {
    title.value = currentTitle.value
    return
  }
  cardStore.changeCardTitle(route.params.id, title.value).then(() => currentTitle.value = "")
}
const deleteWord = (index, id) => {
  //нельзя удалять последнее слово
  cardWords.value.splice(index, 1)
};
const changeCardWords = () => {

}
const addWord = () => {
  if(errorElementId.value) {
    return
  }
  cardWords.value.push({ word: "", translation: "" });
  editWord(cardWords.value.length - 1);
};
const confirm = (index, word, translation) => {
  if (!word && !translation) {
    errorElementId.value = index;
    return;
  }
  errorElementId.value = "";
  console.log(word, translation);
  editWordIndex.value = null;
};
const isEdit = (index) => {
  return index === editWordIndex.value;
};
const editWord = (index) => {
  if (isEdit(index) || errorElementId.value) {
    return;
  }
  editWordIndex.value = index;
};
</script>

<template>
  <the-header></the-header>
  <div class="card-view">
    <header class="card-header">
      <h1 v-if="!isTitleEdit" @click="isTitleEdit = true" class="card-title">{{ title }}</h1>
      <input
          v-if="isTitleEdit"
          type="text"
          class="title-edit "
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
      <div class="word-wrapper" v-for="(word, index) of cardWords">
        <p v-if="!isEdit(index)" class="word">{{ word.word }}</p>
        <p v-if="!isEdit(index)" class="translation">{{ word.translation }}</p>
        <input
          v-if="isEdit(index)"
          v-model="cardWords[index].word"
          type="text"
          :class="{ error: (errorElementId = index) }"
          class="word-edit margin"
        />
        <input
          v-if="isEdit(index)"
          v-model="cardWords[index].translation"
          type="text"
          :class="{ error: (errorElementId = index) }"
          class="word-edit"
        />
        <div class="word-ulits">
          <button
            @click="editWord(index)"
            v-if="!isEdit(index)"
            class="utils-image__wrapper"
          >
            <img class="utils-image edit" src="../assets/edit.svg" />
          </button>
          <button
            @click="confirm(index, cardWords[index].word, cardWords[index].translation)"
            v-if="isEdit(index)"
            class="utils-image__wrapper"
          >
            <img class="utils-image edit" src="../assets/confirm.svg" />
          </button>
          <button @click="deleteWord(index, word.id)" class="utils-image__wrapper">
            <img class="utils-image delete" src="../assets/delete.svg" />
          </button>
        </div>
      </div>
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
  grid-template-columns: 3fr 3fr 1fr;
  margin-bottom: 10px;
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
    display: inline;
    padding-bottom: 40px;
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
  }
}
</style>
