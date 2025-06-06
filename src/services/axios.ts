import axios from "axios";
import { useAuthStore } from "@/store/auth";

const api = axios.create({
  baseURL: "https://reqres.in/api",
});

api.interceptors.request.use((config) => {
  const auth = useAuthStore();

  config.headers = {
    ...config.headers,
    "x-api-key": "reqres-free-v1",
  };

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

export default api;
