<script setup lang="ts">
import Navbar from "@/components/Navbar/Navbar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const contentPadding = computed(() => {
  return route.path === "/login" || route.path === "/signup" ? "" : "p-10";
});
</script>
<template>
  <Navbar />
  <div :class="contentPadding">
    <router-view />
  </div>
</template>
