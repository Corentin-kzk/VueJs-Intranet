<script setup lang="ts">
import type { User } from '@/services/users.types'
import { reactive } from 'vue'

const formUser: Omit<User, 'id'> = reactive({
  gender: 'male',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  birthdate: '',
  city: '',
  country: '',
  photo: ''
})

const rules = {
  required: (value: string) => {
    if (value.trim() !== '') return true
    else return 'Champs obligatoire'
  }
}
</script>

<template>
  <v-form validate-on="blur" class="mb-8">
    <v-row no-gutters>
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
        <!-- Civilité -->
        <v-select
          class="mb-2"
          density="comfortable"
          label="Civilité"
          :items="[
            { title: 'Homme', value: 'male' },
            { title: 'Femme', value: 'female' }
          ]"
          v-model="formUser.gender"
          :rules="[rules.required]"
        />

        <!-- Nom -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Nom"
          v-model="formUser.lastname"
          :rules="[rules.required]"
        />

        <!-- Prénom -->
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Prénom"
          v-model="formUser.firstname"
          :rules="[rules.required]"
        />

        <!-- Email -->
        <v-text-field
          type="email"
          class="mb-2"
          density="comfortable"
          label="Email"
          v-model="formUser.email"
        />

        <!-- Téléphone -->
        <v-text-field
          type="tel"
          class="mb-2"
          density="comfortable"
          label="Téléphone"
          v-model="formUser.phone"
        />

        <!-- Date de naissance -->
        <v-text-field
          type="date"
          class="mb-2"
          density="comfortable"
          label="Date de naissance"
          v-model="formUser.birthdate"
        />

        <!-- Ville -->
        <v-text-field class="mb-2" density="comfortable" label="Ville" v-model="formUser.city" />

        <!-- Pays -->
        <v-text-field class="mb-2" density="comfortable" label="Pays" v-model="formUser.country" />

        <!-- Photo (facultatif) -->
        <v-text-field
          type="url"
          class="mb-2"
          density="comfortable"
          label="URL de la photo"
          v-model="formUser.photo"
        />

        <!-- VALIDATION -->
        <v-btn type="submit" block color="teal" variant="flat"> Envoyer </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
