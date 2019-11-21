<template>
<v-content>
  <v-container fluid class="main">
    <div>
      <div class="carga" align="center" v-if="cargando">
        <v-progress-circular
        indeterminate
        color="primary"
        ></v-progress-circular>
        </div>
      <div v-if="!cargando">
        <p>{{ partidoCargado }}</p>
        <p>{{ equipoCargado }}</p>
      </div>
    </div>
  </v-container>
</v-content>
    
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {

      }
    },
    computed: {
      equipoCargado() {
        let data =  this.$store.getters.equipoCargado(this.$route.params.id)
        //this.cargarEquipo(data)
        //console.log('computed test equipo ' + data)
        return data
      },
      partidoCargado() {
        let data =  this.$store.getters.partidoCargado(this.$route.params.id)
        //this.cargarDatos(data)
        //console.log('computed test partido ' + data)
        return data
      },
      cargando() {
        return this.$store.getters.cargando
      }
    }

  }
</script>

<style>


</style>