<template>
  <v-content class="curvaregistro">
      <h3>Curva de registro</h3>
      <!-- <p>{{ partido }}</p> -->
      
      <!-- <p>{{ estadistica }}</p> -->
      <v-container fluid>
          <v-row>
              <v-col cols="12" align="center">
                  <h6 class="ma-1"> Partido contra {{ partido.contrincante }}</h6>
                  <p class="ma-0">Marcador SET {{ setActivo + 1}} </p>
                  <p class="ma-0">{{ marcador }}</p>
              </v-col>
          </v-row>
          <v-row class="py-0 ma-0" >
              <v-col cols="3" align="center" class="py-0 my-0 borde">
                  <p>Saques</p>
              </v-col>
              <v-col cols="3" align="center" class="py-0 my-0 borde">
                  <p>Remates</p>
              </v-col>
              <v-col cols="3" align="center" class="py-0 my-0 borde">
                  <p>Recepción</p>
              </v-col>
              <v-col cols="3" align="center" class="py-0 my-0 borde">
                  <p>Error General</p>
              </v-col>
          </v-row>
          <v-row py-0 my-0>
              <v-col cols="3" align="center" py-o>
                  <v-row class="py-0 my-0 borde">
                      <v-col xs-6 >
                          <p>Aces</p>
                          <p>{{ ace }}</p>
                      </v-col>
                      <v-col xs-6>
                          <p>Errores</p>
                          <p>{{ sError }}</p>
                      </v-col>
                  </v-row>
              </v-col>
              <v-col cols="3" align="center">
                  <v-row class="py-0 my-0 borde">
                      <v-col xs-6>
                          <p>Puntos</p>
                          <p>{{ kill }}</p>
                      </v-col>
                      <v-col xs-6>
                          <p>Errores</p>
                          <p>{{ kError }}</p>
                      </v-col>
                  </v-row>
              </v-col>
              <v-col cols="3" align="center">
                  <v-row class="py-0 my-0 borde">
                      <v-col xs-6>
                          <p>Errores</p>
                          <p>{{ rError }}</p>
                      </v-col>
                  </v-row>
              </v-col>
              <v-col cols="3" align="center">
                  <v-row class="py-0 my-0 borde">
                      <v-col xs-6>{{ eg }}</v-col>
                  </v-row>
              </v-col>
              
          </v-row>
         
          <v-row class="justify-center">
              <v-btn align="center" @click="regresar">VOLVER PARTIDO</v-btn>
          </v-row>

      </v-container>
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
        <v-flex xs-12>
            <v-row>
                <v-col align="center">
                    <canvas class="grey lighten-2" ref="canvas" :width="width" :height="height"></canvas>
                </v-col>
            </v-row>
        </v-flex>
      
      
  </v-content>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return{
            canvas: null,
            context: null,
            startX: 0,
            startY: 0,
            width: 600,
            height: 800,
            puntos: [],
            color: "#c4c4c4",
            estadistica: [],
            setActivo: 0,
            ace: 0,
            sError: 0,
            kill: 0,
            kError: 0,
            rError: 0,
            eg: 0,
        }
    },
    computed: {
        partido() {
            //console.log(this.estadistica)
            return this.$store.getters.partidoCargado(this.$route.params.id)
        },
        marcador() {
            let set = 'set' + (this.setActivo + 1)
            const data =  this.partido.resultado[set]
            //console.log(data)
            return data
        }
    },
    mounted() {
        
        var vm = this
        vm.canvas = vm.$refs.canvas
        vm.context = vm.canvas.getContext("2d");
        /* vm.canvas.addEventListener('mousedown', vm.mousedown);
        vm.canvas.addEventListener('mousemove', vm.mousemove)
        document.addEventListener('mouseup', vm.mouseup); */
        window.addEventListener('resize', this.handleResize)
        
        
        this.updatePartido()
        this.handleResize()
    },
    methods: {
        updatePartido() {
            let partido = this.$store.getters.partidoCargado(this.$route.params.id)
            let estadistica = partido.estadistica
            let set = 'set' + (this.setActivo + 1)
            this.estadistica = estadistica
            this.updateEstadistica(set)
            
        },
        updateEstadistica(set) {
            this.ace = 0
            this.sError = 0
            this.kill = 0
            this.kError = 0
            this.rError = 0
            this.eg = 0
            this.puntos = []
            this.estadistica[set].forEach((valor) => {
                if (valor != ''){
                    if (valor === 'PL+') {
                        this.sumar()
                    } else if (valor === 'PV+') {
                        this.restar()
                    } else {
                        let item = valor.split('-')
                        //console.log(item)
                        if(item[1] == 'S') {
                            if (item[2] == 3) this.ace += 1
                            if (item[2] == 0) this.sError += 1
                        }
                        if(item[1] == 'K') {
                            if (item[2] == 3) this.kill += 1
                            if (item[2] == 0) this.kError += 1
                        }
                        if(item[1] == 'R') {
                            if (item[2] == 0) this.rError += 1
                        }
                        if(item[1] == 'EG') {
                            this.eg += 1
                        }
                    }
                }
            })

        },
        regresar() {
            this.$router.push('/estadistica/' + this.$route.params.id)
        },
        drawCanvas() {
            var vm = this
            this.clearCanvas()
            if (this.puntos.length != 0) {
                vm.context.beginPath()
                vm.context.lineWidth = 3
                vm.context.strokeStyle = "#ff0000"
                vm.context.moveTo(vm.width/2, 0)
                for(var i = 0; i < this.puntos.length; i++) {
                    vm.context.lineTo(this.puntos[i].x, this.puntos[i].y)                    
                } 
            vm.context.stroke()
            }
        },
        clearCanvas() {
            var vm = this
            vm.context.clearRect(0, 0, vm.width, vm.height);
            vm.context.beginPath()
            vm.context.moveTo(vm.width/2, 0)
            vm.context.lineTo(vm.width/2, vm.height)
            vm.context.lineWidth = 2
            vm.context.strokeStyle = "#000000"
            vm.context.stroke()
        },
        sumar() {
            var lastX = this.width/2
            var lastY = 0
            if (this.puntos.length != 0) {
                lastX = this.puntos[this.puntos.length-1].x
                lastY = this.puntos[this.puntos.length-1].y
            }
            var addX = lastX + 10
            var addY = lastY + 10
            this.puntos.push({x:addX, y:addY})
            this.drawCanvas()
        },
        restar() {
            var lastX = this.width/2
            var lastY = 0
            if (this.puntos.length != 0) {
                lastX = this.puntos[this.puntos.length-1].x
                lastY = this.puntos[this.puntos.length-1].y
            }
            var addX = lastX - 10
            var addY = lastY + 10
            this.puntos.push({x:addX, y:addY})
            this.drawCanvas()

        },
        cambiarSet(i) {
            this.setActivo = i + 1
            this.puntos = []
            let set = 'set' + (i)
        
            this.clearCanvas()
            if (this.estadistica[set].length > 0) {
            this.estadistica[set].forEach((valor) => {
                if (valor === 'PL+') {
                    this.sumar()
                } else if (valor === 'PV+') {
                    this.restar()
                }
            }) 
            this.updateEstadistica(set)
            }
  
            
        },
        handleResize() {
            if(window.innerWidth < 600) {
                this.width = window.innerWidth
            }
                    this.drawCanvas()
        },
            cargando() {
            return this.$store.getters.cargando
        }
    },
    created() {
       
    }
    

}
</script>

<style scoped>
   /*  .main {
        width: 100% !important
    }
    .borde {
        border: 1px solid black
    } */
</style>