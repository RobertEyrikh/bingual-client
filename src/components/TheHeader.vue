<script setup>
import { useUserStore } from "../store/UserStore";
import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const logout = () => {
  userStore.logout().then(() => router.push("/login"));
};

</script>

<template>
  <header class="header">
    <div class="header-logo">
      <img
        class="logo-image"
        @click="this.$router.push('/')"
        src="../assets/logo.svg"
      />
      <p class="logo-name">Bingual</p>
    </div>
    <div v-if="userStore.getActivatedStatus === false" class="email-alert">
      <p class="email-alert__title">Please confirm your email</p>
    </div>
    <button @click="logout" class="header-user-button">Logout</button>
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
  cursor: pointer;
  object-fit: cover;
  height: 80%;
}
.logo-name {
  color: #ffa500;
}
.email-alert {
  background-color: rgba(255, 165, 0, 0.5);
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
}
.email-alert__title {
  color: aliceblue
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
