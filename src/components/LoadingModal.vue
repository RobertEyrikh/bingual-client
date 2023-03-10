<script setup>
import MyModal from "./UI/MyModal.vue";

const modalName = "loading"
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  }
})
</script>

<template>
  <my-modal :modalName="modalName" v-if="isOpen">
    <template #body><p class="loading">Loading...</p></template>
  </my-modal>
</template>

<style scoped>
.loading {
  display:inline-block;
  font-family: monospace;
  font-size: 20px;
  clip-path: inset(0 3ch 0 0);
  animation: l 1s steps(4) infinite;
}
@keyframes l {
  to {
    clip-path: inset(0 -1ch 0 0)
  }
}
</style>