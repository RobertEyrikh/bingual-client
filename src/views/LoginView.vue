<script setup>
import { ref } from "vue";
import MyButton from "../components/UI/MyButton.vue";
import { useUserStore } from "../store/UserStore";
import { useRouter } from "vue-router";
import useValidation from "../composables/useValidation";

const { validateByFieldName, errors } = useValidation();
const router = useRouter();
const userStore = useUserStore();
const form = ref({});
const responseError = ref("");

const signIn = () => {
  validateByFieldName("email", form.value.email);
  validateByFieldName("password", form.value.password);
  if (!errors.email && !errors.password) {
    const login = userStore.login(form.value.email, form.value.password);
    login.then(() => {
      router.push("/");
      form.value = {};
    });
    login.catch(() => {
      responseError.value = "Invalid login or password";
    });
  }
};
const toRegistration = () => {
  errors.email = "";
  errors.password = "";
  router.push("/registration");
};
</script>

<template>
  <div class="login-page">
    <div class="login-form">
      <header class="login-header">
        <h1 class="login-header__title">Bingual</h1>
        <!-- <my-button class="login-header__button">Sign in with Google</my-button> -->
      </header>
      <!-- <p class="line"><span class="line__or">or</span></p> -->
      <div class="login-fields">
        <input
          @blur="validateByFieldName('email', form.email)"
          v-model="form.email"
          placeholder="Your email"
          type="text"
          class="email-field"
        />
        <div class="error">
          <label class="error-message">{{ errors.email }}</label>
        </div>
        <input
          @blur="validateByFieldName('password', form.password)"
          v-model="form.password"
          placeholder="Your password"
          type="password"
          class="password-field"
        />
        <div class="error">
          <label class="error-message">{{ errors.password }}</label>
        </div>
        <div class="server-response-container">
        <Transition >
          <div v-if="responseError" class="response-error">
            <p class="server-response">{{ responseError }}</p>
          </div>
        </Transition>
      </div>
      </div>
      <footer class="login-footer">
        <my-button @click="signIn" class="footer-button">Sign in</my-button>
        <div class="login-footer__links">
          <a @click="toRegistration" class="link">Registration</a>
          <a @click="router.push('/reset_password')" class="link"
            >Forgot your password?</a
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
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
.response-error {
  border-radius: 5px;
  height: 40px;
  background-color: rgb(118, 3, 3);
}
.server-response-container {
  height: 40px;
  border-radius: 5px;
}
.server-response {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  font-size: 17px;
  color: aliceblue;
}
.login-footer__links {
  display: flex;
  justify-content: space-between;
}
.link {
  border-bottom: 1px solid aliceblue;
  cursor: pointer;
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
