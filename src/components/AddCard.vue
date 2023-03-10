<script setup>
import { ref, reactive } from "vue";
import MyButton from "../components/UI/MyButton.vue";
import TranslateService from "../services/TranslateService";
import CardService from "../services/CardService";
import LoadingModal from "./LoadingModal.vue";
import AddImage from "../components/UI/AddImage.vue";

const isOpen = ref(false);
const words = ref([{ word: "", translate: "", apiTranslate: "" }]);
const title = ref("");
const dragItem = ref({});
const dragOverItem = ref({});
const error = ref("");
const isOpenLoadingModal = ref(false);

const emit = defineEmits(["newCard"]);

const closeModal = () => {
  isOpen.value = false;
  error.value = "";
};
const transferWord = (index) => {
  words.value[index].translate = words.value[index].apiTranslate;
  words.value[index].apiTranslate = "";
};
const checkTranslateForMatch = (index, word) => {
  const wordObj = words.value[index];
  if (wordObj.apiTranslate.startsWith(word)) {
    if (wordObj.apiTranslate === wordObj.translate) {
      wordObj.apiTranslate = "";
    }
  } else {
    wordObj.apiTranslate = "";
  }
};
const getTranslate = async (index, word) => {
  if (word) {
    const translatedText = await TranslateService.getTranslate(word);
    words.value[index].apiTranslate = translatedText;
  }
};
const deleteWord = (id) => {
  words.value.splice(id, 1);
  error.value = "";
};
const addWord = () => {
  let word = {
    word: "",
    translate: "",
    apiTranslate: "",
  };
  words.value.push(word);
  error.value = "";
};
const addNewCard = () => {
  const card = {
    title: title.value,
    words: [],
  };
  for (let word of words.value) {
    if (!word.word || !word.translate || !title.value) {
      error.value = "fill all fields";
      return;
    }
    delete word.apiTranslate;
    card.words.push(word);
  }
  isOpenLoadingModal.value = true;
  const addCard = CardService.addNewCard(card);
  addCard.then(
    (res) => {
      isOpenLoadingModal.value = false;
      closeModal();
      words.value = [{ word: "", translate: "", apiTranslate: "" }];
      title.value = "";
      emit("newCard", { id: res.data._id, title: res.data.title, qty: res.data.words.length })
    },
    (reason) => {
      error.value = reason.message;
    }
  );
};
const handleSord = () => {
  let _words = [...words.value];
  const draggedWords = _words.splice(dragItem.value.current, 1)[0];
  _words.splice(dragOverItem.value.current, 0, draggedWords)[0];
  dragItem.value.current = null;
  dragOverItem.value.current = null;
  words.value = _words;
};
const entering = () => {
  const elementsList = document.getElementsByClassName("words-container");
  for (let i = 0; i < elementsList.length; i++) {
    elementsList[i].setAttribute("draggable", "false");
  }
};
const leaving = () => {
  const elementsList = document.getElementsByClassName("words-container");
  for (let i = 0; i < elementsList.length; i++) {
    elementsList[i].setAttribute("draggable", "true");
  }
};
</script>
<template>
  <loading-modal :isOpen="isOpenLoadingModal" />
  <section class="add-card">
    <button @click="isOpen = true" class="add-button">
      <add-image />
    </button>
    <Transition name="modal">
      <div @click.stop="closeModal" v-if="isOpen" class="modal-wrapper">
        <div @click.stop class="modal-container">
          <div class="modal-header">
            <h1 class="modal-header__title">
              Write the words to study and the translation for them.
            </h1>
          </div>
          <div class="modal-body">
            <div class="modal-body__info">
              <p class="card-name">Enter the title</p>
              <input v-model="title" type="text" class="field name-field" />
            </div>
            <div v-if="words.length != 0" class="modal-body__words">
              <div class="words-title">
                <p class="words-title__p">Enter a word</p>
                <p class="words-title__p">Enter translation</p>
              </div>
              <transition-group name="list">
                <div
                  id="dragElement"
                  draggable="true"
                  @dragstart="dragItem.current = index"
                  @dragenter="dragOverItem.current = index"
                  @dragend="handleSord"
                  @dragover.prevent
                  v-for="(word, index) of words"
                  :key="index"
                  class="words-container my-handle"
                >
                  {{ index + 1 }}
                  <input
                    @focus="entering()"
                    @blur="leaving(), getTranslate(index, word.word)"
                    v-model="word.word"
                    class="field word-field"
                  />
                  <div>
                    <input
                      @input="checkTranslateForMatch(index, word.translate)"
                      @focus="entering()"
                      @blur="leaving()"
                      v-model="word.translate"
                      class="field translate-field"
                    />
                    <p @click="transferWord(index)" class="api-translate-word">
                      {{ word.apiTranslate }}
                    </p>
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
            <p class="api-error">{{ error }}</p>
            <div class="buttons-container">
              <my-button @click.stop="closeModal" class="cancel-button"
                >Cancel</my-button
              >
              <my-button @click="addNewCard" class="create-button"
                >Create</my-button
              >
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>
<style scoped>
.my-handle {
  cursor: move;
  cursor: -webkit-grabbing;
  display: inline-block;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.list-leave-active {
  position: absolute;
}
.add-card {
  background-color: #1a1a1a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='107' height='107' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23171717' fill-opacity='0.93'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.93'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
  height: 60px;
  padding: 20px;
}
.add-button {
  height: 60px;
  background-color: inherit;
}
.modal-wrapper {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  max-height: 600px;
  margin: auto;
  padding: 20px 30px;
  background-color: rgba(13, 13, 13, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: auto;
}
.modal-container::-webkit-scrollbar {
  width: 7px;
  background-color: inherit;
}
.modal-container::-webkit-scrollbar-thumb {
  background-color: #835502;
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
.api-translate-word {
  cursor: pointer;
  font-size: 13px;
  position: absolute;
}
.field {
  background-color: inherit;
  height: 30px;
  color: aliceblue;
  border-bottom: 1px solid aliceblue;
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
.api-error {
  color: red;
  margin-bottom: 10px;
  height: 20px;
  text-align: center;
}
.buttons-container {
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
