<script setup>
import { ref, onMounted, computed } from "vue";
import TheHeader from "../components/TheHeader.vue";
import MyButton from "../components/UI/MyButton.vue";
import RoundDiagramm from "../components/UI/RoundDiagramm.vue";
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
const showResult = ref(false);
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
const successRate = computed(() => {
  const rate =
    (result.value.rightAnswer * 100) /
    (result.value.rightAnswer + result.value.wrongAnswer);
  return isFinite(rate) ? + rate.toFixed(0) : 100;
});
const checkErrorInWord = (index, word) => {
  let wordType = isDirectTranslation.value ? "translation" : "word";
  if (words.value[index][wordType] == word) {
    words.value[index].error = null
  }
};
const next = () => {
  isError.value = false;
  let wordType = isDirectTranslation.value ? "translation" : "word";
  for (let phrase in words.value) {
    if (
      translation.value[words.value[phrase].word]?.toUpperCase() !==
      words.value[phrase][wordType]?.toUpperCase()
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
};
const restart = () => {
  result.value.rightAnswer = 0;
  result.value.wrongAnswer = 0;
  showResult.value = false;
  isDirectTranslation.value = true;
}
const goToResult = () => {
  if (result.value.rightAnswer || result.value.wrongAnswer) {
    showResult.value = true;
    translation.value = {};
    isError.value = false;
    for (let phrase in words.value) {
      delete words.value[phrase].error
    }
  } else {
    console.log("enter the translation");
  }
};
</script>

<template>
  <the-header></the-header>
  <section class="study-view">
    <div
      v-if="isDirectTranslation && !showResult"
      class="card-container"
      id="card-container"
    >
      <h1 class="card-title">Enter word transtation</h1>
      <div v-for="(word, index) in words" class="word-wrapper">
        <p class="word">{{ word.word }}</p>
        <input
          v-model="translation[word.word]"
          type="text"
          class="word-translation"
          :class="{ error: word.error }"
          @change="checkErrorInWord(index, translation[word.word])"
        />
        <p class="word-error">{{ word?.error }}</p>
      </div>
    </div>
    <div v-if="!isDirectTranslation && !showResult" class="card-container">
      <h1 class="card-title">Enter word transtation</h1>
      <div v-for="(word, index) in words" class="word-wrapper">
        <p class="word">{{ word.translation }}</p>
        <input
          v-model="translation[word.word]"
          type="text"
          class="word-translation"
          :class="{ error: word.error }"
          @change="checkErrorInWord(index, translation[word.word])"
        />
        <p class="word-error">{{ word?.error }}</p>
      </div>
    </div>
    <div v-if="showResult" class="result-wrapper">
      <div class="card-container">
        <h1 class="card-title big-text">Your result</h1>
        <div class="statics">
          <div class="statics-diagram-container">
            <round-diagramm :successRate="successRate"></round-diagramm>
          </div>
          <div class="statics-numbers-container">
            <p class="statics-numbers">
              Right answer: {{ result.rightAnswer }}
            </p>
            <p class="statics-numbers">
              Wrong answer: {{ result.wrongAnswer }}
            </p>
          </div>
        </div>
      </div>
      <nav class="study-buttons">
        <my-button @click="this.$router.push('/')" class="finish-button">Finish</my-button>
        <my-button @click="restart" class="next-button">Restart</my-button>
      </nav>
    </div>
    <nav v-if="!showResult" class="study-buttons">
      <my-button @click="goToResult" class="finish-button">Result</my-button>
      <my-button @click="next" class="restart-button">Next</my-button>
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
.restart-button,
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
  width: 100%;
  height: 30px;
  color: aliceblue;
  border: 1px solid #1a1a1a;
}
.statics {
  display: flex;
}
.statics-diagram-container {
  margin-right: 20px;
}
.statics-numbers-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.statics-numbers {
  font-size: 20px;
  margin-bottom: 20px;
}
.word-error {
  color: rgb(160, 3, 3);
  padding-left: 20px;
}
.error {
  border: 1px solid red;
}
.big-text {
  font-size: 23px;
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
