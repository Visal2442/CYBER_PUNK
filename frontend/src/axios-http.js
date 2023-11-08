import axios from "axios";

const user = localStorage.getItem("user");
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((cf) => {
  const config = cf;
  if (user) {
    config.headers.Authorization = user.token;
  } else {
    config.headers.Authorization = null;
  }
  return config;
});
http.interceptors.response.use((response) => {
  return response.data; 
});

export default http;
