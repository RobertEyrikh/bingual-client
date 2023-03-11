<script setup>
import MyButton from "../components/UI/MyButton.vue";
</script>

<template>
  <div class="page-not-found">
    <div class="page-not-found__content">
      <h1 class="error-text">Oops, page not found</h1>
      <my-button @click="this.$router.push('/')" class="home-button">Go back to home page</my-button>
    </div> 
  </div>
</template>

<style scoped>
.page-not-found {
  background-color: #1a1a1a;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error-text {
  color: aliceblue;
  font-size: 30px;
}
.home-button {
  margin-top: 30px;
  background-color: #ffa500;
  height: 100px;
}
</style>
