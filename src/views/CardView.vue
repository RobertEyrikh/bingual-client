<script setup>
import { ref, onMounted } from "vue";
import TheHeader from "../components/TheHeader.vue";
import MyButton from "../components/UI/MyButton.vue";
import AddImage from "../components/UI/AddImage.vue";
import useGetCard from "../composables/useGetCard";

onMounted(() => {
  useGetCard(words.value);
});
const cardTitle = ref("");
const editWordIndex = ref(null);
const words = ref([]);
const errorElementId = ref("");

const deleteWord = () => {
  //при удалении последнего слова карточка автоматически удаляется
};
const addWord = () => {
  words.value.push({ word: "", translation: "" });
  editWord(words.value.length - 1);
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
  if (isEdit(index)) {
    return;
  }
  editWordIndex.value = index;
};
</script>

<template>
  <the-header></the-header>
  <div class="card-view">
    <h1 class="card-title">{{ cardTitle }}</h1>
    <my-button
      @click="this.$router.push(`/${$route.params.id}/study`)"
      class="study-button"
      >Study</my-button
    >
    <div class="words-container">
      <div class="word-wrapper" v-for="(word, index) of words">
        <p v-if="!isEdit(index)" class="word">{{ word.word }}</p>
        <p v-if="!isEdit(index)" class="translation">{{ word.translation }}</p>
        <input
          v-if="isEdit(index)"
          v-model="words[index].word"
          type="text"
          :class="{ error: (errorElementId = index) }"
          class="word-edit"
        />
        <input
          v-if="isEdit(index)"
          v-model="words[index].translation"
          type="text"
          :class="{ error: (errorElementId = index) }"
          class="word-edit"
        />
        <div class="word-ulits">
          <div v-if="!isEdit(index)" class="utils-image__wrapper">
            <img
              class="utils-image edit"
              @click="editWord(index)"
              src="../assets/edit.svg"
            />
          </div>
          <div v-if="isEdit(index)" class="utils-image__wrapper">
            <img
              class="utils-image edit"
              @click="
                confirm(index, words[index].word, words[index].translation)
              "
              src="../assets/confirm.svg"
            />
          </div>
          <div class="utils-image__wrapper">
            <img class="utils-image delete" src="../assets/delete.svg" />
          </div>
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
  text-align: center;
  margin-bottom: 30px;
  color: aliceblue;
}
.study-button {
  background-color: #ffa500;
  font-size: 20px;
}
.words-container {
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
  .word-edit,
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
