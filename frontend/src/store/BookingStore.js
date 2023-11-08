import { defineStore } from "pinia";
import http from "@/axios-http";

export const useBookingStore = defineStore("booking", {
  state: () => {
    return {
      errors: "",
    };
  },
  actions: {
    async booking(booking) {
      await http
        .post("/booking", booking)
        .then(() => {})
        .catch((err) => {
          this.errors = err.response.data;
        });
    },
  },
});
