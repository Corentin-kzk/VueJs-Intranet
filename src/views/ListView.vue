<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import { useCollaborators } from '@/composables/collaborators'
import { removeAccents } from '@/lib/helpers'
import type { APIError, User } from '@/services/users.types'
import { remove } from '@/services/users'
import { useTitle } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import router from '@/router';

useTitle('Liste des collaborateurs - Vue Intranet')

const { users, isLoading, error } = useCollaborators()

const searchText = ref('')
const filterBy: Ref<'name' | 'localisation'> = ref('name')
const onDeleteState: Ref<{ error: boolean, message: string }> = ref({ error: false, message: '' })


function compare(a: string, b: string) {
  return removeAccents(a).toLowerCase().includes(removeAccents(b).toLowerCase())
}

const filteredUsers = computed(() => {
  return users.value?.filter((user) => {
    switch (filterBy.value) {
      case 'name':
        return compare(`${user.firstname} ${user.lastname}`, searchText.value)
      case 'localisation':
        return compare(`${user.city} ${user.country}`, searchText.value)
    }
  })
})

const onDeleteUser = async (removeUser: User | null) => {
  if (removeUser) {
    try {
      await remove(removeUser.id)
      users.value = users.value?.filter((user) => user.id !== removeUser.id)
      onDeleteState.value = { error: false, message: "all is good" }
    } catch (error) {
      onDeleteState.value = { error: true, message: (error as APIError).message }
    }
  }
  else {
    onDeleteState.value = { error: true, message: 'retry later' }
  }
}


const onUpdateUser = async (user: User) => {
  router.push({ name: 'update-user', params: { userId: user.id } })
}


const dialog: Ref<boolean> = ref(false)
const deletedUser: Ref<User | null> = ref(null)
const onDeleteIsclicked = (user: User) => {
  deletedUser.value = user
  dialog.value = true
}



</script>

<template>
  <h1 class="text-h3 my-4">Liste des collaborateurs</h1>

  <!-- Filtres de recherche -->
  <v-row justify="center" align="center">
    <v-col cols="12" sm="5" md="4">
      <v-text-field class="mb-2" density="comfortable" label="Rechercher" v-model="searchText" />
    </v-col>
    <v-col cols="12" sm="5" md="4">
      <v-select class="mb-2" density="comfortable" label="Filtrer par :" v-model="filterBy" :items="[
        { title: 'Nom', value: 'name' },
        { title: 'Localisation', value: 'localisation' }
      ]" />
    </v-col>
  </v-row>

  <!-- Séparateur -->
  <v-divider class="mb-8" />

  <!-- Liste des collaborateurs -->
  <v-row justify="center" v-if="users">
    <v-col cols="12" md="6" lg="4" v-for="user in filteredUsers" :key="user.id">
      <UserCard :user="user" @delete="onDeleteIsclicked" @update="onUpdateUser" />
    </v-col>
  </v-row>
  <v-row justify="center" v-else-if="isLoading">
    <v-col cols="12" md="6" lg="4" v-for="n in 12" :key="n">
      <v-skeleton-loader type="card" class="ma-auto" :style="{ maxWidth: '30rem' }" />
    </v-col>
  </v-row>
  <v-alert type="error" v-else-if="error" :text="error" />
  <v-alert v-if="!!onDeleteState.message" :type="onDeleteState.error ? 'error' : 'success'"
    :text="onDeleteState.message" />
  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <v-row no-gutters align="center">
        <v-col>
          <v-card-text>
            Êtes-vous sur de vouloir supprimer {{ deletedUser?.firstname }} {{ deletedUser?.lastname }} ?
          </v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters align="center">
        <v-col cols="12" sm="8" offset="2">
          <v-card-actions class="justify-center">
            <v-btn color="success" block @click="() => { onDeleteUser(deletedUser); dialog = false }">OUI</v-btn>
            <v-btn color="errors" block @click="() => { dialog = false; deletedUser = null }">NON</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
