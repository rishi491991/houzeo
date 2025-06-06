<script setup lang="ts">
import { ref, watch, toRefs, computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:user", "delete:user", "save:user"]); // define the emits

const {
  id,
  name: propName,
  email: propEmail,
  mobile: propMobile,
  dob: propDob,
  gender: propGender,
  languages: propLanguages,
  city: propCity,
  file: propFile,
  fileUrl: propFileUrl,
} = toRefs(props.user);

const name = ref(propName.value);
const email = ref(propEmail.value);
const mobile = ref(propMobile.value);
const dob = ref(propDob.value);
const gender = ref(propGender.value);
const languages = ref([...propLanguages.value]);
const city = ref(propCity.value);
const file = ref<File | null>(propFile.value);
const fileUrl = ref<string | null>(propFileUrl.value);

const errors = ref<Record<string, string>>({}); //created to track validation errors

watch(
  () => [
    name.value,
    email.value,
    mobile.value,
    dob.value,
    gender.value,
    languages.value,
    city.value,
    file.value,
  ],
  () => {
    emit("update:user", {
      id: id.value,
      name: name.value,
      email: email.value,
      mobile: mobile.value,
      dob: dob.value,
      gender: gender.value,
      languages: languages.value,
      city: city.value,
      file: file.value,
      fileUrl: fileUrl.value,
    });
  },
  { deep: true }
); // will send updated users emit

const genderOptions = ["Male", "Female", "Other"];
const languageOptions = ["Angular", "React", "Vue", "Svelte", "Ember"];
const cityOptions = [
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Solapur",
  "Amravati",
  "Nanded",
  "Kolhapur",
  "Jalgaon",
];

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const selectedFile = target.files?.[0] ?? null;
  if (!selectedFile) {
    file.value = null;
    fileUrl.value = null;
    return;
  }

  const validTypes = ["image/jpeg", "application/pdf"];
  if (!validTypes.includes(selectedFile.type)) {
    alert("Only JPEG images and PDF files are allowed.");
    target.value = "";
    return;
  }

  file.value = selectedFile;
  fileUrl.value = URL.createObjectURL(selectedFile);
};

const removeFile = () => {
  file.value = null;
  fileUrl.value = null;
};

const validate = () => {
  const newErrors: typeof errors.value = {};
  if (!name.value) newErrors.name = "Name is required.";
  if (!email.value) newErrors.email = "Email is required.";
  if (!mobile.value) newErrors.mobile = "Mobile number is required.";
  if (!dob.value) newErrors.dob = "Date of Birth is required.";
  if (!gender.value) newErrors.gender = "Gender is required.";
  if (!languages.value.length)
    newErrors.languages = "At least one language is required.";
  if (!city.value) newErrors.city = "City is required.";
  if (!file.value) newErrors.file = "File upload is required.";
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const onSave = () => {
  if (validate()) {
    emit("save:user", props.user);
  }
};
</script>

<template>
  <div class="relative border rounded-md p-5 shadow-sm bg-white">
    <button
      @click="$emit('delete:user', id)"
      class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
      type="button"
    >
      &times;
    </button>

    <form @submit.prevent="onSave" class="space-y-4">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          v-model="name"
          type="text"
          class="w-full border rounded px-3 py-2"
        />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">
          {{ errors.name }}
        </p>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Email</label
        >
        <input
          v-model="email"
          type="email"
          class="w-full border rounded px-3 py-2"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">
          {{ errors.email }}
        </p>
      </div>

      <!-- Mobile -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Mobile</label
        >
        <input
          v-model="mobile"
          type="tel"
          class="w-full border rounded px-3 py-2"
        />
        <p v-if="errors.mobile" class="text-red-500 text-sm mt-1">
          {{ errors.mobile }}
        </p>
      </div>

      <!-- DOB -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Date of Birth</label
        >
        <input
          v-model="dob"
          type="date"
          class="w-full border rounded px-3 py-2"
        />
        <p v-if="errors.dob" class="text-red-500 text-sm mt-1">
          {{ errors.dob }}
        </p>
      </div>

      <!-- Gender -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Gender</label
        >
        <select v-model="gender" class="w-full border rounded px-3 py-2">
          <option value="" disabled>Select Gender</option>
          <option v-for="g in genderOptions" :key="g" :value="g">
            {{ g }}
          </option>
        </select>
        <p v-if="errors.gender" class="text-red-500 text-sm mt-1">
          {{ errors.gender }}
        </p>
      </div>

      <!-- Languages (Checkbox) -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Languages</label
        >
        <div class="grid grid-cols-2 gap-2">
          <label
            v-for="lang in languageOptions"
            :key="lang"
            class="inline-flex items-center space-x-2"
          >
            <input
              type="checkbox"
              :value="lang"
              v-model="languages"
              class="form-checkbox"
            />
            <span>{{ lang }}</span>
          </label>
        </div>
        <p v-if="errors.languages" class="text-red-500 text-sm mt-1">
          {{ errors.languages }}
        </p>
      </div>

      <!-- City -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
        <select v-model="city" class="w-full border rounded px-3 py-2">
          <option value="" disabled>Select City</option>
          <option v-for="c in cityOptions" :key="c" :value="c">{{ c }}</option>
        </select>
        <p v-if="errors.city" class="text-red-500 text-sm mt-1">
          {{ errors.city }}
        </p>
      </div>

      <!-- File Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Upload File (JPEG/PDF)</label
        >
        <input
          type="file"
          accept=".jpeg,.jpg,.pdf"
          @change="onFileChange"
          class="w-full"
        />
        <div v-if="fileUrl" class="mt-2 flex items-center justify-between">
          <span class="text-sm text-gray-700 truncate max-w-xs">{{
            file?.name
          }}</span>
          <button
            type="button"
            @click="removeFile"
            class="text-red-600 hover:text-red-800 text-sm font-semibold"
          >
            Remove
          </button>
        </div>
        <p v-if="errors.file" class="text-red-500 text-sm mt-1">
          {{ errors.file }}
        </p>
      </div>

      <!-- Save Button -->
      <div class="text-right pt-4">
        <button
          type="submit"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded shadow"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
