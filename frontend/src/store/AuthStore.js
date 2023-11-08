import { defineStore } from "pinia";
import Cookies from "js-cookie";
import http from '@/axios-http.js'

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
    // Register
    async register(user) {
      await http
        .post("/register", user)
        .then((res) => {
          this.setUserData(
            res.data.user.username,
            res.data.user.image,
            res.data.user.role,
            user.email,
            res.data.user.id,
            res.data.token
          );
          this.role = res.data.user.role;
          this.user_id = res.data.user.id;
          this.token = res.data.token;
          this.profile = res.data.user.image;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Login
    async login(user) {
      await http
        .post("/login", user)
        .then((res) => {
          this.setUserData(
            res.data.user.username,
            res.data.user.image,
            res.data.user.role,
            user.email,
            res.data.user.id,
            res.data.token
          );
          this.role = res.data.user.role;
          this.user_id = res.data.user.id;
          this.token = res.data.token;
          this.profile = res.data.user.image;
        })
        .catch((err) => {
          this.errors = err.response.data.message;
        });
    },

    // Log out
    async logout() {
      await http
        .post("/logout", null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.resetUserData();
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },

    async sendEmail() {
      await http
        .post("/reset_password_request", { email: this.emailSend })
        .then((res) => {
          console.log(res);
          localStorage.setItem("email", this.emailSend);
          setTimeout(() => {
            alert.value = true;
            setTimeout(() => {
              alert.value = false;
            }, 3000);
          }, 1000);
          // this.router.push({name:'Code'});
        })
        .catch((error) => {
          this.message = error.response.data.message;
        });
    },

    async resetPassword() {
      const data = {
        verification_code: this.verificationCode,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      this.emailLocalStorage = localStorage.getItem("email");
      await http
        .post("/reset_password", data)
        .then((response) => {
          console.log(response.data);
          let user = {
            email: this.emailLocalStorage,
            password: this.password,
          };
          this.login(user);
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    },
    async getUsers() {
      await http
        .get(`/users`)
        .then((res) => {
          this.allUsers = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCustomers() {
      await http
        .get(`/customers`)
        .then((res) => {
          this.allCustomers = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getLandlords() {
      await http
        .get(`/landlords`)
        .then((res) => {
          this.allLandlords = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    isLoggedIn: (state) => state.token && state.user_id,
    userCount: (state) => state.allUsers.length,
    customerCount: (state) => state.allCustomers.length,
    landlordCount: (state) => state.allLandlords.length,
  },
});
