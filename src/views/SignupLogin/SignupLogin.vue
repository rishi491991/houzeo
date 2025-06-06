<script setup lang="ts">
import { watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth.ts";
import LoginForm from "./components/LoginForm.vue";
import SignupForm from "./components/SignupForm.vue";
const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const currentTab = computed(() => {
  if (route.path === "/signup") return "signup";
  return "login";
});

const switchTab = (tab: "login" | "signup") => {
  router.push(tab === "login" ? "/login" : "/signup");
  auth.resetState();
};

const onLoginSuccess = () => {
  router.push("/form");
};

const onSignupSuccess = () => {
  console.log("after signing up");
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-tr from-blue-600 via-indigo-700 to-purple-700 flex items-center justify-center px-4"
  >
    <transition name="fade-scale" appear>
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <div class="flex gap-2 justify-center my-2 items-center">
          <img
            src="@/assets/images/Houzeo.jpg"
            width="60"
            height="10"
            alt="Houzeo Logo"
          />
          <div>
            <h2
              class="text-4xl font-extrabold text-gray-800 text-center leading-4"
            >
              Houzeo
            </h2>
            <h6 class="text-lg font-semibold text-gray-600 text-center mt-1">
              welcomes you!
            </h6>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center mt-6 mb-6 border-b border-gray-300">
          <button
            :class="[
              'px-6 py-2 font-semibold text-lg',
              currentTab === 'login'
                ? 'border-b-4 border-indigo-600 text-indigo-700'
                : 'text-gray-500 hover:text-indigo-600',
            ]"
            @click="switchTab('login')"
          >
            Login
          </button>
          <button
            :class="[
              'px-6 py-2 font-semibold text-lg',
              currentTab === 'signup'
                ? 'border-b-4 border-indigo-600 text-indigo-700'
                : 'text-gray-500 hover:text-indigo-600',
            ]"
            @click="switchTab('signup')"
          >
            Signup
          </button>
        </div>

        <!-- components based on routes -->
        <LoginForm v-if="currentTab === 'login'" :onSuccess="onLoginSuccess" />
        <SignupForm v-else :onSuccess="onSignupSuccess" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
