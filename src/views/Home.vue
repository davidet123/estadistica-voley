<template>
  <!-- <div class="home">
    <h1>Estadística Voley</h1> -->
    <!-- <v-list two-line subheader>
      <v-list-item
      v-for="partido in partidos"
      :key="partido.id_partido">
        <v-list-item-content @click="click(partido.id_partido)">
          <v-list-item-title v-text="partido.contrincante"></v-list-item-title>
          <v-list-item-subtitle v-text="resultado(partido.id_partido)"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list> -->
  <v-app>
    <v-content>
      <v-container fluid class="main" width="100%">
        <h1>Estadistica voleibol</h1>
        <v-row no-gutters>
          <v-col cols="12" xs="12" sm="6">
            <v-btn width="90%" height="120px">
              EQUIPO
            </v-btn>
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <v-btn width="90%" height="120px">
              partidos
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
  
<!-- 
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




  </div> -->
</template>

<script>
// @ is an alias to /src


export default {
  //name: 'home',
  components: {
  },
  data() {
    return {
      color: '#FFFFFF'
    }
  },
  computed: {
    partidos() {
      return this.$store.getters.cargarPartidos
    },
    
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

<style scoped>
/* .resultado{
  display: inline !important;
} */

</style>
