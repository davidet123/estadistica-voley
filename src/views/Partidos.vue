<template>
  <v-content>
      <h1>Partidos</h1>
      <v-card class="pt-2 px-2"
      v-for="partido in partidos"
      :key="partido.id_partido"
    > 
    
    <span class="mt-2 pa-2">
      VS {{ partido.contrincante }}
    </span>
      
      <div class="resultados xs-12">
        <v-row>
          <v-col>
            <span
              v-for="(set, index) in partido.resultado"
              :key="index"
              class="font-weight-light ml-2 float-left"
              >
              {{ set }}
            </span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <span class="xs-3 float-right align-self-center">
          <v-btn text @click="irPartido(partido.id_partido)">IR PARTIDO</v-btn>
          <v-btn text @click="irEstadistica(partido.id_partido)">ESTADISTICA</v-btn>

        </span>
          </v-col>

        </v-row>
        
        
        
      </div>
      

    </v-card>
      
        
        
  </v-content>
</template>

<script>
export default {
    data() {
        return{
        }
    }, 
computed: {
    partidos() {
        return this.$store.getters.cargarPartidos
    }
},
methods: {
    irPartido(id) {
      this.$router.push('/test/' + id)
    },
    irEstadistica(id) {
      this.$router.push('/estadistica/' + id)
    },
}

}
</script>

<style>

</style>