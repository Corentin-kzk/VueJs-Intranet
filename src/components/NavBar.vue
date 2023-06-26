<script setup lang="ts">
import { computed, unref } from 'vue'
import { useDisplay } from 'vuetify'

const display = useDisplay()

const isSmartPhone = computed(() => {
  return unref(display.xs)
})

const pageList = [
  {
    name: "Accueil",
    link: "/"
  },
  {
    name: "Liste",
    link: "/userList"
  },
  {
    name: "Ajout d'un utilisateur",
    link: "/user/add"
  }
]
</script>

<template>
  <v-app-bar color="teal" scroll-behavior="elevate">
    <v-app-bar-title>Vue Intranet</v-app-bar-title>

    <!-- Menu Mobile -->
    <v-menu v-if="isSmartPhone">
      <template v-slot:activator="{ props }">
        <v-app-bar-nav-icon v-bind="props" />
      </template>

      <v-list>
        <v-list-item v-for="{name, link} in pageList" :to="link" :key="link">
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Menu Desktop -->
    <v-toolbar-items v-else>
      <template v-for="{name, link} in pageList" :key="link">
        <v-btn :to="link" variant="text">{{ name }}</v-btn>
        <v-divider vertical></v-divider>
      </template>
    </v-toolbar-items>
  </v-app-bar>
</template>
