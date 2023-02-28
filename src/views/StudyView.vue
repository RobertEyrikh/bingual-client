<script setup>
import { ref, onMounted } from "vue";
import TheHeader from "../components/TheHeader.vue";
import MyButton from "../components/UI/MyButton.vue";
onMounted(() => {
  window.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      next();
    }
  });
  // const cardContainerHeight = document.getElementById("card-container").offsetHeight
  // console.log(cardContainerHeight)
});
const result = ref({ rightAnswer: 0, wrongAnswer: 0 });
const isError = ref(false);
const words = ref([
  { word: "hello", translation: "привет" },
  { word: "stay", translation: "оставаться" },
  { word: "outside", translation: "снаружи" },
  { word: "array", translation: "массив" },
  { word: "star", translation: "звезда" },
  { word: "gamble", translation: "азартная игра" },
  { word: "pill", translation: "таблетка" },
]);
const isDirectTranslation = ref(true);
const translation = ref({});
const next = () => {
  isError.value = false;
  let wordType = isDirectTranslation.value ? "translation" : "word";
  for (let phrase in words.value) {
    if (
      translation.value[words.value[phrase].word] !==
      words.value[phrase][wordType]
    ) {
      words.value[phrase].error = words.value[phrase][wordType];
      isError.value = true;
      result.value.wrongAnswer += 1;
    } else {
      words.value[phrase].error = null;
      result.value.rightAnswer += 1;
      if (!isError.value) {
        isError.value = false;
      }
    }
  }
  if (!isError.value) {
    isDirectTranslation.value = !isDirectTranslation.value;
    translation.value = {};
  }
  console.log(result.value)
};
const finish = () => {

}
</script>

<template>
  <the-header></the-header>
  <section class="study-view">
    <nav class="study-buttons">
      <my-button class="finish-button">Finish</my-button>
      <my-button class="next-button">Next</my-button>
    </nav>
    <div v-if="isDirectTranslation" class="card-container" id="card-container">
      <h1 class="card-title">Enter word transtation</h1>
      <div v-for="word in words" class="word-wrapper">
        <p class="word">{{ word.word }}</p>
        <input
          v-model="translation[word.word]"
          type="text"
          class="word-translation"
          :class="{ error: word.error }"
        />
        <p class="word-error">{{ word?.error }}</p>
      </div>
    </div>
    <div v-if="!isDirectTranslation" class="card-container">
      <h1 class="card-title">Enter word transtation</h1>
      <div v-for="word in words" class="word-wrapper">
        <p class="word">{{ word.translation }}</p>
        <input
          v-model="translation[word.word]"
          type="text"
          class="word-translation"
          :class="{ error: word.error }"
        />
        <p class="word-error">{{ word?.error }}</p>
      </div>
    </div>
    <nav class="study-buttons">
      <my-button class="finish-button">Finish</my-button>
      <my-button @click="next" class="next-button">Next</my-button>
    </nav>
  </section>
</template>

<style scoped>
.study-view {
  min-height: 100vh;
  padding: 20px 20px 50px 20px;
  background-color: #1a1a1a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='107' height='107' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23171717' fill-opacity='0.93'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.93'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
}
.card-container {
  margin: 20px 0;
  padding: 20px;
  background-color: rgba(146, 146, 146, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(8px);
}
.study-buttons {
  display: flex;
}
.finish-button {
  background-color: #ffa500;
  margin-right: 20px;
}
.next-button {
  background-color: #0062ff;
  margin-left: 20px;
}
.word-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 20px;
}
.word {
  font-size: 18px;
}
.card-title {
  color: #ffa500;
  font-size: 20px;
  margin-bottom: 20px;
}
.word-translation {
  background-color: #1a1a1a;
  border-radius: 5px;
  font-size: 16px;
  height: 24px;
  color: aliceblue;
  border: 1px solid #1a1a1a;
}
.word-error {
  color: rgb(160, 3, 3);
  padding-left: 20px;
}
.error {
  border: 1px solid red;
}
@media screen and (max-width: 800px) {
  .word-wrapper {
    display: block;
    margin-bottom: 20px;
    height: 80px;
  }
  .word {
    margin-bottom: 10px;
  }
  .word-error {
    padding-left: 0;
  }
}
</style>
