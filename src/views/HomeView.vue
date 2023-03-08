<script setup>
import { ref } from "vue";
import TheHeader from "../components/TheHeader.vue";
import AddCard from "../components/AddCard.vue";

const cardList = ref([
  { id: 1, name: "My first card", qty: 15 },
  { id: 2, name: "My second card", qty: 20 },
  { id: 3, name: "My third card", qty: 10 },
  { id: 4, name: "My fourth card", qty: 12 },
  { id: 5, name: "My fifth card", qty: 11 },
]);
</script>

<template>
  <the-header></the-header>
  <add-card></add-card>
  <section class="page">
    <div class="cards-wrapper">
      <div
        @click="this.$router.push(`/${card.id}/card`)"
        v-for="card in cardList"
        class="card"
      >
        <div class="card-info">
          <p class="card-info__name">{{ card.name }}</p>
          <p class="card-info__qty">Word count: {{ card.qty }}</p>
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
  background-color: #1a1a1a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='107' height='107' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23171717' fill-opacity='0.93'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.93'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
  padding: 0px 20px;
  padding-bottom: 50px;
  min-height: 100vh;
}
.cards-wrapper {
  background-color: rgba(146, 146, 146, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(8px);
}
.card {
  height: 110px;
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
  background-color: rgb(65, 65, 65);
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
  cursor: pointer;
}
.card-delete__image:hover {
  filter: invert(48%) sepia(54%) saturate(1960%) hue-rotate(328deg)
    brightness(97%) contrast(107%);
}
</style>
