<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import type { APIError, User } from '@/services/users.types';
import { update } from '@/services/users';
import router from '@/router';
import { ref,  toRefs } from 'vue';
import { useCollaborator } from '@/composables/collaborators';
import UserCard from '@/components/UserCard.vue';

const props = defineProps<{userId : string}>()
const {userId} = toRefs(props)
const errorMessage = ref<null | string>()
const { user, isLoading, error} = useCollaborator(userId.value)

async function  updateUser(user: Partial<User>) {
  try {
    await update(user)
    router.push('/list')
  } catch (error) {
    errorMessage.value = (error as APIError).message
  }
}




</script>

<template>
  <h1 class="text-h3 my-4">Modification d'un collaborateur</h1>

  <v-divider class="mb-8" />

  <UserCard v-if="user" :user="user" class="mb-8"/>
  <VSkeletonLoader type="card" v-else-if="isLoading" :style="{maxWidth: '30rem'}" class="ma-auto"/>
  <!-- Formulaire-->
  <UserForm @validate="updateUser" :user="user" v-if="user" />
  <v-row v-else-if="isLoading">
    <v-col cols="12" md="6" offset-md="3">
      <v-skeleton-loader v-for="n in 9" :key="n" type="heading" class="mb-6" />
      <v-skeleton-loader type="button" />
    </v-col>
  </v-row>
  <v-alert v-if="errorMessage" :text="errorMessage" />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
