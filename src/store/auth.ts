import { defineStore } from "pinia";
import axios from "@/services/axios";

interface AuthState {
  token: string | null;
  userEmail: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("jwt") || null,
    userEmail: localStorage.getItem("userEmail") || null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("/login", {
          email,
          password,
        });
        // Response: { token: "QpwL5tke4Pnpja7X4" }
        this.token = response.data.token;
        this.userEmail = email;
        this.error = null;
        localStorage.setItem("jwt", this.token);
        localStorage.setItem("userEmail", email);
      } catch (error: any) {
        // Extract message from API error or fallback
        this.error = error.response?.data?.error || "Login failed";
        this.token = null;
        this.userEmail = null;
        localStorage.removeItem("jwt");
        localStorage.removeItem("userEmail");
      } finally {
        this.loading = false;
      }
    },

    async register(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        await axios.post("/register", {
          email,
          password,
        });
        // Response: { token: "QpwL5tke4Pnpja7X4" }
        // this.token = response.data.token;
        // this.userEmail = email;
        this.error = null;
        localStorage.setItem("jwt", this.token);
        localStorage.setItem("userEmail", email);
      } catch (error: any) {
        // Extract message from API error or fallback
        this.error = error.response?.data?.error || "Signup failed";
        this.token = null;
        this.userEmail = null;
        localStorage.removeItem("jwt");
        localStorage.removeItem("userEmail");
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.userEmail = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("userEmail");
    },
    resetState() {
      this.token = localStorage.getItem("jwt") || null;
      this.userEmail = localStorage.getItem("userEmail") || null;
      this.loading = false;
      this.error = null;
    },
  },
});
