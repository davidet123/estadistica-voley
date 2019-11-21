<template>
  <v-container class="main">
    <v-row class="justify-center ma-0">
        <h3 class="d-block ma-0" cols="12" >Introducir estadistica </h3> 
        <!-- <p>{{ estadistica }}</p> -->  
    </v-row>
    <div class="carga" align="center" v-if="cargando">
      <v-progress-circular
      indeterminate
      color="primary"
      ></v-progress-circular>
    </div>
    <div class="main" v-if="!cargando">
      <v-row>
        <v-col cols="12" align="center">
          <p>Partido contra {{ partidoCargado.contrincante }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs-4 >
          <v-row class=" ma-0 justify-center">
            <v-col
            v-for="i in 5"
            :key="i"
            align="center">
            <p>Set {{ i }}</p>
            <p>{{ puntosLocal[i - 1] }} - {{ puntosVisitante[i - 1]}}</p>

            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-3">
        <v-col xs-4 >
          <v-row class=" ma-0 justify-center">
            <p align="right">{{ equipoCargado.nombre_equipo }}</p>
          </v-row>
          <v-row class="ma-0 justify-center" >
            <p>{{ puntosLocal[setActivo] }}</p>
          </v-row>
        </v-col>
        <v-col xs-1>
          <p align="center" class="font-weight-black">SET</p>
          <p align="center" class="font-weight-black">{{ setActivo + 1}}</p>
        </v-col>
        <v-col xs-4 >
          <v-row class="ma-0 justify-center">
            <p align="right">{{ partidoCargado.contrincante }}</p>
          </v-row>
          <v-row class="ma-0 justify-center" >
            <p>{{ puntosVisitante[setActivo] }}</p>
          </v-row>
        </v-col>
        
      </v-row>
      <v-row align="center">
          <v-flex d-flex>
            <v-layout wrap>
              <v-btn-toggle v-model="toggleNum" class="mx-auto">
                <v-flex xs-1>
                  <v-btn small class="mb-2"
                  @click="numJugadora(i)"
                  v-for="i in 18"
                  :key="i">{{ i }}</v-btn>
                </v-flex> 
              </v-btn-toggle>
            </v-layout>
          </v-flex>
      </v-row>
      <v-row align="center" class="d-flex xs-12 justify-center">
        <v-btn-toggle v-model="toggleAccion">
            <v-btn small width="10px"
            v-for="(accion, i) in acciones"
            :key="i"
            @click="accionVal(accion)">
              <p>{{ accion }}</p>
            </v-btn>
          </v-btn-toggle>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-btn-toggle v-model="toggleEficacia">
            <v-btn small width="10px"
            v-for="i in 4"
            :key="i"
            @click="eficaciaVal(i - 1)">
              <p>{{ i - 1 }}</p>
            </v-btn>
          </v-btn-toggle>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-card width="100" align="center" @click="enviarEstadistica">
          <p class="px-2 pt-2">{{ textoEstadistica }}</p>
        </v-card>
      </v-row>
      <v-row align="center">
        <v-col class="text-center mx-auto" width="100px">
          <p>PUNTO GANDIA</p>
          <v-btn class="mb-2" @click="punto(0, 1)">+</v-btn>
          <br>
          <v-btn @click="punto(0, -1)">-</v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn @click="enviarEstadistica">VALIDAR</v-btn>
        </v-col>
        <v-col class="text-center mx-auto">
          <p>PUNTO {{ partidoCargado.contrincante.toUpperCase() }}</p>
          <v-btn class="mb-2" @click="punto(1, 1)">+</v-btn>
          <br>
          <v-btn @click="punto(1, -1)">-</v-btn>
        </v-col>
      </v-row>
      <v-row >
        <v-col>
          <p align="center">CAMBIAR SET</p>
            <v-btn-toggle v-model="setActivo" class="d-flex justify-center">
              <v-btn small width="10px"
              v-for="i in 5"
              :key="i"
              @click="cambiarSet(i)">
                <p>{{ i }}</p>
              </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn small
        @click="irCurva()">CURVA DE REGISTRO</v-btn>
      </v-row>
    </div>
    
  </v-container>
</template>

<script>
import Vue from 'vue'
export default {
  props: ['id'],
  data() {
    return {
      acciones: ['S', 'R', 'C', 'K', 'B', 'D', 'EG',],
      estadistica: null,
      numero: null,
      accion: '',
      eficacia: '',
      equipo: '',
      contrincante: '',
      toggleNum: null,
      toggleAccion: false,
      toggleEficacia: false,
      setActivo: 0,
      puntosLocal: [0,0,0,0,0],
      puntosVisitante: [0,0,0,0,0],
      idEquipoLocal: "VMUWjBBeY5g1Av18oLDY",
      carga: true

    }
  },
  computed: {
    equipoCargado() {
      let data =  this.$store.getters.equipoCargado(this.idEquipoLocal)
      //this.cargarEquipo(data)
      return data
    },
    partidoCargado() {
      let data =  this.$store.getters.partidoCargado(this.$route.params.id)
      console.log('Cargar DAtos')
      if (this.carga) this.cargarDatos(data)
      return data
    },
    textoEstadistica() {
      if (this.accion == 'EG') return '0-EG-0'
      if(this.numero == null || this.numero == undefined) {
        return ''
      }
      let temp = this.numero + '-' +  this.accion + '-' + this.eficacia
      
      return temp
    },
    puntos() {
      return this.puntosLocal[this.setActivo]
    },
    cargando() {
      return this.$store.getters.cargando
    }
  },
  methods: {
    numJugadora(i) {
      this.numero = i
  
    },
    accionVal(i) {
      this.accion = i
    },
    eficaciaVal(i) {
      this.eficacia = i
    },
    enviarEstadistica() {
      let set = 'set' + (this.setActivo + 1)
      if(this.numero != null || this.accion == 'EG') {
        
        this.estadistica[set].push(this.textoEstadistica)
        //this.estadistica[set][this.setActivo].push(this.textoEstadistica)
        this.toggleNum = false
      this.numero = null
      this.toggleAccion = ''
      this.toggleEficacia = ''
      this.update()
      }
    },
    cambiarSet(i) {
      this.setActivo = i + 1
    },
    punto(equipo, valor) {
      let str = (valor > 0 ? '+' : '-')
      let set = 'set' + (this.setActivo + 1)
      
      if (equipo == 0) {
        let nuevoValor = this.puntosLocal[this.setActivo] += valor
        Vue.set(this.puntosLocal, this.setActivo, nuevoValor)
        console.log(this.puntosLocal[this.setActivo])
        this.estadistica[set].push('PL' + str)
      } else if (equipo == 1) {
        let nuevoValor = this.puntosVisitante[this.setActivo] += valor
        Vue.set(this.puntosVisitante, this.setActivo, nuevoValor)
        this.estadistica[set].push('PV' + str)
      }
      this.update()
    },
    irCurva() {
      this.$router.push('/curvaregistro/' + this.$route.params.id)
    },
    update() {
      let partido = {
        id_partido: this.partidoCargado.id_partido,
        id_equipo: 1,
        contrincante: 'xativa',
        resultado: {
                set1: this.puntosLocal[0] + '-' + this.puntosVisitante[0],
                set2: this.puntosLocal[1] + '-' + this.puntosVisitante[1],
                set3: this.puntosLocal[2] + '-' + this.puntosVisitante[2],
                set4: this.puntosLocal[3] + '-' + this.puntosVisitante[3],
                set5: this.puntosLocal[4] + '-' + this.puntosVisitante[4]
            },
        estadistica: {
                set1: this.estadistica.set1,
                set2: this.estadistica.set2,
                set3: this.estadistica.set3,
                set4: this.estadistica.set4,
                set5: this.estadistica.set5
            }
        

      }
      this.$store.dispatch('updatePartido', partido)
     },
     cargarDatos(partido) {

        //let partido =  this.$store.getters.partidoCargado(this.$route.params.id)
        //let equipo = this.$store.getters.equipoCargado(partido.id_equipo)
        //this.equipo = equipo.nombre_equipo
        //this.contrincante = partido.contrincante
        this.marcador = partido.resultado
        this.estadistica = partido.estadistica
        for(let i = 1; i < 6; i++) {
          let x = 'set' + i 
          this.puntosLocal[i-1] = parseInt(partido.resultado[x].split('-')[0])
          this.puntosVisitante[i-1] = parseInt(partido.resultado[x].split('-')[1])
        }
        this.carga = false
     },
     cargarEquipo(equipo) {
       this.equipo = equipo.nombre_equipo
     }

  },
  actions: {

  }
}
</script>

<style>

</style>