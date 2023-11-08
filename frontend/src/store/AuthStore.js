import { defineStore } from "pinia";
import Cookies from "js-cookie";
import {
  register,
  login,
  logout,
  fetchLandlords,
  fetchCustomers,
  fetchUsers,
  sendEmail,
  resetPassword,
} from "@/api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    errors: "",
    token: localStorage.getItem("token"),
    emailSend: "",
    message: "",
    profile: "",
    user_id: localStorage.getItem("user_id"),
    role: Cookies.get("role"),
    verificationCode: "",
    password: "",
    passwordConfirmation: "",
    emailLocalStorage: "",
    alert: false,
    allUsers: [],
    allCustomers: [],
    allLandlords: [],
  }),
  actions: {
    setUserData(username, image, role, email, user_id, token) {
      Cookies.set("username", username, { expires: 30 });
      Cookies.set("image", image, { expires: 30 });
      Cookies.set("role", role, { expires: 30 });
      Cookies.set("email", email, { expires: 30 });
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("token", token);
    },
    resetUserData() {
      Cookies.remove("email");
      Cookies.remove("role");
      Cookies.remove("username");
      Cookies.remove("image");
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("wishListData");
      this.user_id = null;
      this.token = null;
      this.profile = null;
      this.role = null;
    },
    async register(user) {
      const authData = await register(user);
      this.setUserData(
        authData.user.username,
        authData.user.image,
        authData.user.role,
        user.email,
        authData.user.id,
        authData.token
      );
      this.role = authData.user.role;
      this.user_id = authData.user.id;
      this.token = authData.token;
      this.profile = authData.user.image;
    },
    async login(user) {
      const authData = await login(user);
      this.setUserData(
        authData.user.username,
        authData.user.image,
        authData.user.role,
        user.email,
        authData.user.id,
        authData.token
      );
      this.role = authData.user.role;
      this.user_id = authData.user.id;
      this.token = authData.token;
      this.profile = authData.user.image;
    },
    async logout() {
      await logout();
      this.resetUserData();
    },
    async sendEmail() {
      await sendEmail({ email: this.emailSend });
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    },
    async resetPassword() {
      const data = {
        verification_code: this.verificationCode,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      this.emailLocalStorage = localStorage.getItem("email");
      await resetPassword(data);
      const user = {
        email: this.emailLocalStorage,
        password: this.password,
      };
      await this.login(user);
    },
    async getUsers() {
      this.allUsers = await fetchUsers();
    },
    async getCustomers() {
      this.allCustomers = await fetchCustomers();
    },
    async getLandlords() {
      this.allLandlords = await fetchLandlords();
    },
  },
  getters: {
    isLoggedIn: (state) => state.token && state.user_id,
    userCount: (state) => state.allUsers.length,
    customerCount: (state) => state.allCustomers.length,
    landlordCount: (state) => state.allLandlords.length,
  },
});
