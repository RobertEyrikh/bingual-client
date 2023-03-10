<script setup>
import MyModal from "./UI/MyModal.vue";
import MyButton from "./UI/MyButton.vue";

const modalName = "accept";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  error: {
    type: String,
    required: false,
  }
});
const emit = defineEmits(["close", "accept"]);
</script>

<template>
  <my-modal :modalName="modalName" @close="emit('close')" v-if="isOpen">
    <template #body
      ><p class="modal-text">Deleted card cannot be recovered</p>
        <p class="modal-error">{{ props?.error }}</p>
      </template
    >
    <template #footer>
      <div class="button-container">
        <my-button @click="emit('close')" class="cancel-button" type="button">Cancel</my-button>
        <my-button @click="emit('accept')" class="confirm-button" type="button">Confirm</my-button>
      </div></template
    >
  </my-modal>
</template>

<style scoped>
.modal-text {
  color: aliceblue;
  font-size: 18px;
}
.modal-error {
  color: red;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
.cancel-button {
  background-color: #712424;
  margin-right: 20px;
  width: 100px;
}
.confirm-button {
  background-color: #ffa500;
  margin-left: 20px;
  width: 100px;
}
</style>
