import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";

export const useUserStore = defineStore("userStore", () => {
  const user = ref({});
  const isAuth = ref(false);

  const setAuth = (bool) => {
    isAuth.value = bool;
  };
  const setUser = (userData) => {
    user.value = userData;
  };
  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      setAuth(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
  const registration = async (email, password) => {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      setAuth(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      setAuth(false);
      setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      console.log(response.data.user)
      setAuth(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e)
    }
  };

  const getUser = computed(() => {
    return user.value;
  });
  const getAuth = computed(() => {
    return isAuth.value;
  });
  const isTokenExist = () => {
    return !!localStorage.getItem('token')
  }
  const getActivatedStatus = computed(() => {
    return user.value.isActivated
  })

  return {
    login,
    registration,
    logout,
    checkAuth,
    isTokenExist,
    getUser,
    getAuth,
    getActivatedStatus,
  };
});
