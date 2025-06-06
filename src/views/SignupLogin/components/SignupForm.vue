<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth.ts";
const props = defineProps({
  onSuccess: Function,
});

const signupData = ref({
  email: "",
  password: "",
});
const auth = useAuthStore();
const signupSuccess = ref(false);
const handleSignup = async () => {
  if (auth.loading) return;
  signupSuccess.value = false;

  try {
    // TODO: replace with real signup API call
    await auth.register(signupData.value.email, signupData.value.password);
    if (!auth.error) {
      signupSuccess.value = true;
      props.onSuccess?.();
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <form @submit.prevent="handleSignup" class="space-y-6" novalidate>
    <div>
      <label for="signup-email" class="block mb-2 font-medium text-gray-700"
        >Email</label
      >
      <input
        v-model="signupData.email"
        type="email"
        id="signup-email"
        required
        placeholder="you@example.com"
        class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
    <div>
      <label for="signup-password" class="block mb-2 font-medium text-gray-700"
        >Password</label
      >
      <input
        v-model="signupData.password"
        type="password"
        id="signup-password"
        required
        placeholder="••••••••"
        class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
    <button
      :disabled="auth.loading || !signupData.email || !signupData.password"
      type="submit"
      class="w-full bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
    >
      <span v-if="!auth.loading">Sign Up</span>
      <span v-else>Signing up...</span>
    </button>

    <p
      v-if="signupSuccess"
      class="mt-4 text-center text-green-600 font-semibold"
    >
      User has been created successfully. Please switch to login tab to log in.
    </p>
    <p v-if="auth.error" class="mt-4 text-center text-red-600 font-semibold">
      {{ auth.error }}
    </p>
  </form>
</template>
