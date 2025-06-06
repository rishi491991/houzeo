<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/store/auth";
const props = defineProps({
  onSuccess: Function,
});

const loginData = ref({
  email: "",
  password: "",
});

const auth = useAuthStore();

const handleLogin = async () => {
  if (auth.loading) return;
  try {
    await auth.login(loginData.value.email, loginData.value.password);
    props.onSuccess?.();
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin" class="space-y-6" novalidate>
    <div>
      <label for="login-email" class="block mb-2 font-medium text-gray-700"
        >Email</label
      >
      <input
        v-model="loginData.email"
        type="email"
        id="login-email"
        required
        placeholder="you@example.com"
        class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
    <div>
      <label for="login-password" class="block mb-2 font-medium text-gray-700"
        >Password</label
      >
      <input
        v-model="loginData.password"
        type="password"
        id="login-password"
        required
        placeholder="••••••••"
        class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
    <button
      :disabled="auth.loading || !loginData.email || !loginData.password"
      type="submit"
      class="w-full bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
    >
      <span v-if="!auth.loading">Log In</span>
      <span v-else>Logging in...</span>
    </button>
    <p v-if="auth.error" class="mt-4 text-center text-red-600 font-semibold">
      {{ auth.error }}
    </p>
  </form>
</template>
