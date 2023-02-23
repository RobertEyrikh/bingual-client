<script setup>
import { ref } from "vue";
import TheHeader from "../components/TheHeader.vue";
import AddCard from "../components/AddCard.vue";

const cardList = ref([
  { name: "My first card", qty: 15 },
  { name: "My second card", qty: 20 },
  { name: "My third card", qty: 10 },
  { name: "My fourth card", qty: 12 },
  { name: "My fifth card", qty: 11 },
  { name: "My fifth card", qty: 11 },
  { name: "My fifth card", qty: 11 },
  { name: "My fifth card", qty: 11 },
]);
</script>

<template>
  <the-header></the-header>
  <add-card></add-card>
  <section class="page">
    <div class="cards-wrapper">
      <div v-for="card in cardList" class="card">
        <div class="card-info">
          <p class="card-info__name">{{ card.name }}</p>
          <p class="card-info__qty">{{ card.qty }}</p>
        </div>
        <button class="card-delete">
          <img class="card-delete__image" src="../assets/delete.svg" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  background-image: url("../assets/back.webp");
  padding: 0px 20px;
  padding-bottom: 50px;
  min-height: 100vh;
}
.cards-wrapper {
  background-color: rgba(81, 46, 46, 0.4);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}
.card {
  height: 110px;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.card:after {
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  width: 95%;
  border-top: 1px solid #2e2e2e;
  content: "";
}
.card:hover {
  background-color: rgb(66, 38, 38);
}
.card-info {
  margin-top: auto;
  margin-bottom: auto;
}
.card-info__name {
  font-size: 30px;
  margin-bottom: 10px;
  color: #ffa500;
}
.card-info__qty {
  font-size: 20px;
}
.card-delete {
  background-color: inherit;
}
.card-delete__image {
  object-fit: cover;
  height: 50%;
  transition: all 0.2s;
  cursor: pointer;
}
.card-delete__image:hover {
  filter: invert(48%) sepia(54%) saturate(1960%) hue-rotate(328deg)
    brightness(97%) contrast(107%);
}
</style>
