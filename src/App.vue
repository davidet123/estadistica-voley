<template>
  <v-app>

    <v-content>
      <Navbar/>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar.vue'
//import firebase from 'firebase/app'

export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  }),
  created() {

    this.$store.dispatch('cargarPartidos')
    this.$store.dispatch('cargarJugadores')
    this.$store.dispatch('cargarEquipos')
    
  }
};
</script>
<style>
  .main {
    width: 100% !important
  }
</style>
