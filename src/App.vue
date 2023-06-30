<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>


<template>
  <v-layout>
    <header>
      <!-- Navbar -->
      <NavBar/>
    </header>

    <v-main>
      <v-container>
        <!-- Contenu -->
        <router-view  />
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
header {
  background-color: teal;
}
</style>
