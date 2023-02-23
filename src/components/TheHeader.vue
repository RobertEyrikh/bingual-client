<script setup></script>

<template>
  <header class="header">
    <div class="header-logo">
      <img class="logo-image" src="../assets/logo.svg">
      <p class="logo-name">Bilingual</p>
    </div>
    <button class="header-user-button">Logout</button>
  </header>
</template>

<style scoped>
.header {
  height: 60px;
  background-color: rgb(13, 13, 13);
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.header-logo {
  height: 60px;
}
.logo-image {
  object-fit:cover;
  height: 80%;
}
.logo-name {
  color: #ffa500;
}
.header-user-button {
  background-color: inherit;
  cursor: pointer;
  transition: all 0.2s;
}
.header-user-button:hover {
  color: aliceblue;
}
</style>
