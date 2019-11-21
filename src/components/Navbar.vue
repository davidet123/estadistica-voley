<template>
  <nav>
    <v-app-bar
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to='/' tag='span' style='cursor: pointer'>
          <span>Estadística</span>
          <span class="font-weight-light">Voleibol</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text
      v-for="item in links"
      :key="item.titulo"
      @click="goTo(item.link)"
      class="white--text"
      >
      {{ item.titulo }}
      </v-btn>





    </v-app-bar>








    <!-- <v-app-bar app class="orange lighten-1 white--text" >
    <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text hidden-sm-and-up"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline text-uppercase">
      <router-link to='/' tag='span' style='cursor: pointer'>
        <span>Estadística</span>
        <span class="font-weight-light">Voleibol</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-app-bar-items class="hidden-xs-only">
      <v-btn text
      v-for="item in links"
      :key="item.titulo"
      @click="goTo(item.link)"
      class="white--text"
      >
      {{ item.titulo }}
      </v-btn>
    </v-app-bar-items>
  </v-app-bar> -->
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      user: null
    }
  },
  computed: {
    /* cargando() {
      //return this.$store.getters.loading
    }, */
    links() {
      //let menuItems = [{icon: 'lock_open', titulo: 'log In', link: '/login'}]
     /*  if(this.user) {
        menuItems = [
        {icon: 'control_point', titulo: 'Crear Partida', link: '/crearpartida'},
        {icon: 'control_point', titulo: 'Eliminar Partida', link: '/borrarpartida'},
        {icon: 'control_point', titulo: 'Campeonatos', link: '/campeonatos'},
        {icon: 'exit_to_app', titulo: 'log Out', link: 'logout'}]
        if(this.rolUser === 'admin') {
          menuItems.push({icon: 'how_to_reg', titulo: 'Crear Usuario', link: '/signin'})
        }
      }  */
      let menuItems = [
        {icon: 'control_point', titulo: 'Equipo', link: '/equipo/VMUWjBBeY5g1Av18oLDY'},
        {icon: 'control_point', titulo: 'Partidos', link: '/partidos'},
        {icon: 'control_point', titulo: 'Curva de registro', link: '/curvaRegistro'}
        ]
      return menuItems
    }
    /* rolUser() {
      if(this.user) {
        return this.$store.getters.rolUser
      } else {
        return null
      }
    } */
  },
  methods: {
    goTo(link) {
      /* if(link !== 'logout'){
        this.$router.push(link)
      } else if (link === 'logout') {
        this.$store.dispatch('logOut')
        this.$router.go()
      } */
      this.$router.push(link)
      .catch(err=> {
        console.log(err)
      })
      this.drawer = false
    }
  }/* ,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = firebase.auth().currentUser
      } else {
        this.user = null
      }
    })
  } */
}
</script>

<style>

</style>