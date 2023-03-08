<script setup>
import { ref } from "vue";
import MyButton from "../components/UI/MyButton.vue";
import { useUserStore } from "../store/UserStore";
import { useRouter } from "vue-router";
import useValidation from "../composables/useValidation";

const router = useRouter();
const userStore = useUserStore();
const form = ref({});
const { validatePasswordField, validateRepeatedPasswordField, validateEmailField, errors } = useValidation();

const signUp = () => {
  validateEmailField(form.value.email)
  validatePasswordField(form.value.password)
  validateRepeatedPasswordField(form.value.password, form.value.repeatedPassword)
  if(!errors.email && !errors.password && !errors.repeatedPassword) {
    userStore.registration(form.value.email, form.value.password).then(() => {router.push("/")}, (e) => console.log(e));
    form.value = {}
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-form">
      <header class="login-header">
        <h1 class="login-header__title">Bingual</h1>
      </header>
      <div class="login-fields">
        <input
          @keyup="validateEmailField(form.email)"
          @blur="validateEmailField(form.email)"
          v-model="form.email"
          placeholder="Your email"
          type="text"
          class="email-field"
        />
        <div class="error">
          <label class="error-message">{{ errors.email }}</label>
        </div>
        <input
          @blur="validatePasswordField(form.password)"
          v-model="form.password"
          placeholder="Your password"
          type="password"
          class="password-field"
        />
        <div class="error">
          <label class="error-message">{{errors.password}}</label>
        </div>
        <input
          @keyup="validateRepeatedPasswordField(form.password, form.repeatedPassword)"
          @blur="validateRepeatedPasswordField(form.password, form.repeatedPassword)"
          v-model="form.repeatedPassword"
          placeholder="Repeat your password"
          type="password"
          class="password-field"
        />
        <div class="error">
          <label class="error-message">{{errors.repeatedPassword}}</label>
        </div>
        <div class="server-response"></div>
      </div>
      <footer class="login-footer">
        <my-button @click="signUp" class="footer-button"
          >Registration</my-button
        >
        <div class="login-footer__links">
          <router-link to="/login" class="link">Login</router-link>
          <router-link to="/reset_password" class="link"
            >Forgot your password?</router-link
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  padding-top: 40px;
  background-color: #1a1a1a;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='107' height='107' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23171717' fill-opacity='0.93'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.93'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
}
.login-form {
  width: 35rem;
  margin: auto;
  padding: 50px 20px 50px 20px;
  background-color: rgba(146, 146, 146, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(8px);
}
.login-header__title {
  color: #ffa500;
  font-size: 25px;
  text-align: center;
}
.login-header__button {
  color: aliceblue;
  background-color: #4bb97e;
  height: 40px;
  font-size: 20px;
  margin: 20px 0;
}
.line {
  text-align: center;
  position: relative;
}
.line__or {
  background-color: #2f2f2f;
  font-size: 20px;
  position: relative;
  z-index: 1;
  padding: 0px 10px;
}
.line:after {
  background-color: rgb(29, 29, 29);
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  top: 50%;
  margin-top: -1px;
  z-index: 0;
}
.login-fields {
  margin: 20px 0;
}
.email-field,
.password-field {
  color: aliceblue;
  width: 100%;
  margin: 10px 0;
  font-size: 20px;
  border-bottom: 2px solid rgb(255, 255, 255);
  background-color: inherit;
  padding: 8px 8px;
  box-sizing: border-box;
}
.error {
  height: 30px;
  padding: 0 10px;
}
.error-message {
  color: red;
  font-size: 14px;
}
.footer-button {
  color: aliceblue;
  height: 40px;
  font-size: 20px;
  margin: 20px 0;
  background-color: #ffa500;
}
.server-response {
  height: 40px;
  border-radius: 5px;
}
.login-footer__links {
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 800px) {
  .login-form {
    width: 25rem;
  }
}
@media screen and (max-width: 450px) {
  .login-form {
    width: 20rem;
  }
}
</style>
