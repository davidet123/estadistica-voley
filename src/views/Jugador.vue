<template>
  <v-container>
    <v-flex>
      <h2>Jugador</h2>
      <p>{{ jugador }}</p>
      <v-card class="mx-auto">
        <v-list-item>
          <v-list-item-content>
            <div class="headline mb-4"># {{ jugador.numero }}</div>
            <v-list-item-title class="headline">{{ jugador.nombre }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar
          tile size="80" color="grey">

          </v-list-item-avatar>
        </v-list-item>
        
        
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return{
      jugador: null
    }
  },
  computed: {

  },
  created() {
    let jugador = this.$store.getters.cargarJugador(this.$route.params.id)
    this.jugador = jugador.componentes_equipo.find((jug) => {
      return jug.jugador_id == this.$route.params.id
    })

  }

}
</script>

<style>

</style>