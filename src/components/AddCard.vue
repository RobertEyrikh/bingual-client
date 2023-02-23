<script setup></script>
<template>
  <section class="add-card">
    <button class="add-button">
      <svg class="add-button__image"
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
  </section>
</template>
<style scoped>
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
</style>
