<script setup></script>

<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.my-button {
  border: none;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.2s;
  color: aliceblue;
  cursor: pointer;
  height: 100%;
  width: 100%;
}
.my-button:hover {
  -webkit-filter: saturate(4);
}
</style>