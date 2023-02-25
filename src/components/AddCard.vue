<script setup>
import { ref, reactive } from "vue";
import MyButton from "../components/UI/MyButton.vue";
const isOpen = ref(false);
const words = ref([]);
const deleteWord = (id) => {
  words.value.splice(id, 1);
};
const addWord = () => {
  let word = {
    word: "",
    translate: "",
  };
  words.value.push(word);
};
const check = () => {
  console.log(words.value);
};
</script>
<template>
  <section class="add-card">
    <button @click="isOpen = true" class="add-button">
      <svg
        class="add-button__image"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="inherit"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <Transition name="modal">
      <div @click.stop="isOpen = false" v-if="isOpen" class="modal-wrapper">
        <div @click.stop class="modal-container">
          <div class="modal-header">
            <h1 class="modal-header__title">
              Write the words to study and the translation for them.
            </h1>
          </div>
          <div class="modal-body">
            <div class="modal-body__info">
              <p class="card-name">Enter the title</p>
              <input type="text" class="field name-field" />
            </div>
            <div v-if="words.length != 0" class="modal-body__words">
              <div class="words-title">
                <p class="words-title__p">Enter a word</p>
                <p class="words-title__p">Enter translation</p>
              </div>
              <transition-group name="list" tag="div">
                <div
                  v-for="(word, index) of words"
                  :key="word"
                  class="words-container"
                >
                  {{ index + 1 }}
                  <input v-model="words[index].word" class="field word-field" />
                  <div>
                    <input
                      v-model="words[index].translate"
                      class="field translate-field"
                    />
                    <p class="translate-word">word</p>
                  </div>
                  <button @click="deleteWord(index)" class="delete-card">
                    <img
                      class="delete-card__image"
                      src="../assets/delete.svg"
                    />
                  </button>
                </div>
              </transition-group>
            </div>
            <button class="plus-word">
              <svg
                @click="addWord"
                class="plus-word__image"
                src="../assets/plus.svg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="inherit"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div class="modal-footer">
            <my-button @click="check" class="cancel-button">Cancel</my-button>
            <my-button class="create-button">Create</my-button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.add-card {
  background-color: #111111;
  height: 60px;
  padding: 20px;
}
.add-button {
  height: 60px;
  background-color: inherit;
}
.add-button__image {
  object-fit: cover;
  height: 100%;
  transition: all 0.2s;
  stroke: #a4a4a5;
  cursor: pointer;
}
.add-button__image:hover {
  stroke: #ffa500;
}
.modal-wrapper {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
.modal-container {
  border-radius: 10px;
  width: 330px;
  min-height: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: rgb(13, 13, 13);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  /* overflow: scroll; */
}
.modal-container::-webkit-scrollbar {
  width: 7px;
  background-color: inherit;
}
.modal-container::-webkit-scrollbar-thumb {
  background-color: #223c50;
}
.modal-header {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #2e2e2e;
}
.modal-header__title {
  text-align: center;
  font-size: 20px;
  color: #ffa500;
}
.modal-enter-from {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-body {
  margin-bottom: 20px;
}
.card-name,
.words-qty {
  margin-bottom: 10px;
}
.name-field,
.qty-field {
  margin-bottom: 20px;
}
.words-title {
  padding-bottom: 10px;
}
.words-title,
.words-container {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.word-field,
.translate-field {
  width: 120px;
}
.translate-word {
  font-size: 13px;
  position: absolute;
}
.field {
  background-color: #1a1a1a;
  height: 30px;
  color: aliceblue;
  border-radius: 5px;
}
.plus-word {
  height: 50px;
  width: 50px;
  background-color: inherit;
}
.delete-card {
  height: 30px;
  width: 30px;
  background-color: inherit;
}
.delete-card__image {
  object-fit: cover;
  height: 100%;
  transition: all 0.2s;
  cursor: pointer;
  filter: invert(71%) sepia(6%) saturate(32%) hue-rotate(202deg) brightness(94%)
    contrast(83%);
}
.delete-card__image:hover {
  filter: invert(21%) sepia(32%) saturate(2440%) hue-rotate(329deg)
    brightness(81%) contrast(94%);
}
.plus-word__image {
  object-fit: cover;
  height: 100%;
  transition: all 0.2s;
  cursor: pointer;
  stroke: #a4a4a5;
}
.plus-word__image:hover {
  stroke: #ffa500;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
}
.cancel-button {
  background-color: #712424;
  margin-right: 20px;
}
.create-button {
  background-color: #ffa500;
  margin-left: 20px;
}
</style>
