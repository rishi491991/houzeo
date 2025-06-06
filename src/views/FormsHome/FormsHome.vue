<script setup lang="ts">
import { ref, reactive } from "vue";
import UserForm from "./components/UserForm.vue";
import UserTable from "./components/UserTable.vue";

interface UserData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  languages: string[];
  city: string;
  file: File | null;
  fileUrl: string | null;
}

const users = reactive<UserData[]>([]);
const savedUsers = reactive<UserData[]>([]);

let nextId = 1;

const addUser = () => {
  users.push({
    id: nextId++,
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    languages: [],
    city: "",
    file: null,
    fileUrl: null,
  });
};

const deleteUser = (id: number) => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) users.splice(index, 1);

  const savedIndex = savedUsers.findIndex((u) => u.id === id);
  if (savedIndex !== -1) savedUsers.splice(savedIndex, 1);
};

const updateUser = (updatedUser: UserData) => {
  const index = users.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) users[index] = updatedUser;
};

const saveUser = (user: UserData) => {
  const index = savedUsers.findIndex((u) => u.id === user.id);
  if (index === -1) {
    savedUsers.push({ ...user });
  } else {
    savedUsers[index] = { ...user };
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <button
      @click="addUser"
      class="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition"
    >
      Add User Form
    </button>
    <!-- looping throught the forms array -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
      <UserForm
        v-for="user in users"
        :key="user.id"
        :user="user"
        @update:user="updateUser"
        @delete:user="deleteUser"
        @save:user="saveUser"
      />
    </div>
    <!-- renders users in table -->
    <UserTable :users="savedUsers" />
  </div>
</template>
