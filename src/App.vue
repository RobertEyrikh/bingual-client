<script setup>
import { onMounted } from 'vue'
import { useUserStore } from "./store/UserStore";

const userStore = useUserStore();
onMounted(() => {
  if(localStorage.getItem("token")) {
    userStore.checkAuth()
  }
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
