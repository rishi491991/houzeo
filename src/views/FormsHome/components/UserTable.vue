<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const showPreview = ref(false);
const previewFileUrl = ref<string | null>(null);
const previewFileType = ref<string | null>(null);

const openPreview = (user: any) => {
  if (!user.fileUrl) return;
  previewFileUrl.value = user.fileUrl;
  previewFileType.value = user.file?.type || null;
  showPreview.value = true;
};

const closePreview = () => {
  showPreview.value = false;
  previewFileUrl.value = null;
  previewFileType.value = null;
};
</script>

<template>
  <div>
    <table class="min-w-full bg-white rounded shadow overflow-hidden">
      <thead class="bg-indigo-600 text-white">
        <tr>
          <th class="px-4 py-2 text-left">Name</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Mobile</th>
          <th class="px-4 py-2 text-left">DOB</th>
          <th class="px-4 py-2 text-left">Gender</th>
          <th class="px-4 py-2 text-left">Languages</th>
          <th class="px-4 py-2 text-left">City</th>
          <th class="px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="border-b hover:bg-indigo-50 transition"
        >
          <td class="px-4 py-2">{{ user.name }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">{{ user.mobile }}</td>
          <td class="px-4 py-2">{{ user.dob }}</td>
          <td class="px-4 py-2">{{ user.gender }}</td>
          <td class="px-4 py-2">
            <span
              v-for="(lang, idx) in user.languages"
              :key="lang"
              class="inline-block bg-indigo-200 text-indigo-800 rounded-full px-2 py-0.5 mr-1 text-xs"
            >
              {{ lang }}
            </span>
          </td>
          <td class="px-4 py-2">{{ user.city }}</td>
          <td class="px-4 py-2 text-center">
            <button
              :disabled="!user.fileUrl"
              @click="openPreview(user)"
              class="inline-flex items-center justify-center p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:bg-gray-300"
              title="View Uploaded File"
              aria-label="View Uploaded File"
            >
              📄
            </button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="8" class="text-center py-6 text-gray-500 italic">
            No users added yet.
          </td>
        </tr>
      </tbody>
    </table>

    <transition name="fade">
      <div
        v-if="showPreview"
        class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        @click.self="closePreview"
      >
        <div
          class="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto p-4 relative"
        >
          <button
            @click="closePreview"
            class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-2xl"
            aria-label="Close preview"
          >
            &times;
          </button>

          <div
            v-if="previewFileType?.startsWith('image')"
            class="flex justify-center"
          >
            <img
              :src="previewFileUrl"
              alt="Uploaded image preview"
              class="max-h-[70vh] rounded"
            />
          </div>

          <div v-else-if="previewFileType === 'application/pdf'">
            <iframe
              :src="previewFileUrl"
              class="w-full h-[70vh] rounded border"
              frameborder="0"
            ></iframe>
          </div>

          <div v-else class="text-center text-gray-500 py-10">
            <p>No preview available for this file type.</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
