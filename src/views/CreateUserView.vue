<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import type { APIError, User } from '@/services/users.types';
import { create } from '@/services/users';
import router from '@/router';
import { ref } from 'vue';


const errorMessage = ref<null | string>()

async function  addUser(user: Partial<User>) {
  try {
    await create(user)
    router.push('/list')
  } catch (error) {
    errorMessage.value = (error as APIError).message
  }
}


</script>

<template>
  <h1 class="text-h3 my-4">Création d'un collaborateur</h1>

  <v-divider class="mb-8" />

  <!-- Formulaire-->
  <UserForm @validate="addUser" />
  <v-alert v-if="errorMessage" :text="errorMessage" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
