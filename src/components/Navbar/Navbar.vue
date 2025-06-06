<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const email = computed(
  () => auth.userEmail || localStorage.getItem("userEmail") || ""
);
const userInitial = computed(() =>
  email.value ? email.value.charAt(0).toUpperCase() : "U"
);

const handleLogout = () => {
  auth.logout();
  toggleDropdown();
  router.push("/login");
};

// Close dropdown if clicking outside
const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <div class="text-3xl font-bold text-indigo-700 tracking-wide">Houzeo</div>

      <div class="relative" ref="dropdownRef" v-if="auth.token">
        <button
          @click="toggleDropdown"
          class="w-10 h-10 rounded-full bg-indigo-500 text-white font-semibold flex items-center justify-center text-lg hover:bg-indigo-600 transition"
        >
          {{ userInitial }}
        </button>

        <transition name="fade">
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div class="p-4 border-b">
              <p class="font-semibold text-gray-800">{{ email }}</p>
              <p class="text-sm text-gray-500">Signed in</p>
            </div>
            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
