<script setup>
import { ref } from "vue";
import TheHeader from "../components/TheHeader.vue";
import MyButton from "../components/UI/MyButton.vue";
const editWordId = ref(null)
const words = ref([
  { word: "hello", translate: "привет" },
  { word: "stay", translate: "оставаться" },
  { word: "outside", translate: "снаружи" },
  { word: "array", translate: "массив" },
  { word: "srar", translate: "звезда" },
  { word: "gamble", translate: "азартная игра" },
  { word: "pill", translate: "таблетка" },
]);
const isEdit = (id) => {
  return id === editWordId.value
}
const editWord = (id) => {
  if(isEdit(id)) {
    return
  }
  editWordId.value = id
  console.log(id)
}
</script>

<template>
  <the-header></the-header>
  <div class="card-view">
    <my-button class="study-button">Study</my-button>
    {{ $route.params.id }}
    <div class="words-container">
      <div class="word-wrapper" v-for="(word, index) of words">
        <p v-if="!isEdit(index)" class="word">{{ word.word }}</p>
        <p v-if="!isEdit(index)" class="translate">{{ word.translate }}</p>
        <input v-if="isEdit(index)" v-model="words[index].word" type="text" class="word-edit">
        <input v-if="isEdit(index)" v-model="words[index].translate" type="text" class="word-edit">
        <div class="word-ulits">
          <div class="utils-image__wrapper">
            <img class="utils-image edit" @click="editWord(index)" src="../assets/edit.svg" />
          </div>
          <div class="utils-image__wrapper">
            <img class="utils-image delete" src="../assets/delete.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-view {
  min-height: 100vh;
  padding: 20px 20px 50px 20px;
  background-image: url("../assets/background.jpg");
}
.study-button {
  background-color: #ffa500;
  font-size: 20px;
}
.words-container {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(78, 78, 78, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(8px);
}
.word-wrapper {
  display: grid;
  height: 50px;
  grid-template-columns: 3fr 3fr 1fr;
  margin-bottom: 10px;
}
.word-edit,
.word,
.translate {
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
}
.word-edit {
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
  .translate {
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
