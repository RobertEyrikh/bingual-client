<script setup>
import MyButton from "../components/UI/MyButton.vue";
</script>

<template>
  <form class="password-reset-page">
    <div class="reset-form">
      <header class="reset-header">
        <h1 class="reset-header__title">Forgot your password?</h1>
      </header>
      <div class="reset-fields">
        <p class="reset-fields__description">
          Enter the email address you use to sign in, and we’ll send you a link
          to reset your password.
        </p>
        <input placeholder="Your Email" type="text" class="email" />
      </div>
      <footer class="reset-footer">
        <my-button class="reset-button">Send Link</my-button>
        <my-button
          @click="this.$router.push('/login')"
          class="reset-button red"
          >Cancel</my-button
        >
      </footer>
    </div>
  </form>
</template>

<style scoped>
.password-reset-page {
  background-color: #1a1a1a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='107' height='107' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23171717' fill-opacity='0.93'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.93'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
  min-height: 100vh;
  color: aliceblue;
  padding-top: 50px;
}
.reset-form {
  width: 35rem;
  margin: auto;
  padding-top: 100px;
  border-radius: 5px;
  padding: 20px;
  background-color: rgba(146, 146, 146, 0.2);
  backdrop-filter: blur(8px);
}
.reset-header__title {
  font-size: 20px;
  margin-bottom: 10px
}
.reset-header__title {
  text-align: center;
}
.reset-fields {
  margin: 30px 0;
}
.reset-fields__description {
  font-size: 18px;
  padding-bottom: 20px;
}
.email {
  background-color: inherit;
  font-size: 20px;
  color: aliceblue;
  width: 100%;
  margin: 10px 0;
  border-bottom: 2px solid aliceblue;
  padding: 15px 18px;
  box-sizing: border-box;
}
.reset-footer {
  margin-top: 30px;
  display: flex;
  margin: 0 -10px;
}
.reset-button {
  width: 100%;
  background-color: #ffa500;
  margin: 0 10px
}
.red {
  background-color: rgb(255, 67, 67);
}
@media screen and (max-width: 576px) {
  .reset-form {
    width: 25rem;
  }
}
@media screen and (max-width: 450px) {
  .reset-form {
    width: 20rem;
  }
}
</style>