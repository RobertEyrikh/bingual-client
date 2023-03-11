<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./store/UserStore";
import { useCardStore } from "./store/CardStore";

const userStore = useUserStore();
const cardStore = useCardStore()
onMounted(() => {
  if (localStorage.getItem("token")) {
    const checkAuth = userStore.checkAuth();
    checkAuth.then(() => cardStore.getCardListFromApi())
  }
});
</script>

<template>
    <router-view></router-view>
</template>

<style scoped>
</style>
