<script setup>
const props = defineProps({
  modalName: {
    type: String,
    default() {
      return "";
    },
  },
});
const emit = defineEmits(["close"]);

const isLoadingModal = () => {
  return props.modalName == "loading";
};
const closeModal = () => {
  if (!isLoadingModal()) {
    emit("close");
  }
};
</script>

<template>
  <transition name="modal">
    <div class="modal-backdrop" @click="closeModal()">
      <div class="modal-container">
        <div @click.stop class="modal-content">
          <header v-if="!isLoadingModal()" class="modal-header">
            <slot name="header"></slot>
          </header>
          <section class="modal-body">
            <slot name="body"></slot>
          </section>
          <footer v-if="!isLoadingModal()" class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  z-index: 9999;
}
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: auto;
  margin: 16px;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 330px;
  margin: 40% auto;
  padding: 20px;
  border-radius: 5px;
  color: #000;
  background-color: #373737;
  transform: translate(0, 0);
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.modal-header {
  font-size: 25px;
  text-align: center;
}
.modal-footer {
  margin-top: 30px;
  height: 30px;
  display: flex;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
