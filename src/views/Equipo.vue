<template>
  <div class="equipos">
    <h1>Equipo</h1>
    <div class="equipo">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="equipo.componentes_equipo"
        item-key="nombre"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ equipo.nombre_equipo }}</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Añadir jugadora</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ titulo }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container @click="irJugador()">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.numero" label="Numero"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.posicion" label="Posicion"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>





        <template v-slot:item.action="{ item }">
          <v-btn
            small
            class="mr-2"
            @click="irJugador(item)"
          >
            ESTADISTICA
          </v-btn>
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>

      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
   props: ['id'],
    data() {
        return{
            headers: [
              { text: 'Número', value: 'numero' },
              { text: 'Nombre', value: 'nombre' },
              { text: 'Posición', value: 'posicion' },
              { text: 'Actions', value: 'action', sortable: false }
            ],
            selected: [],
            dialog: false,
            editedIndex: -1,
            editedItem: {
              nombre: '',
              numero: 0,
              posicion: '',
              id_equipo: ''
            },
            defaultItem: {
              nombre: '',
              numero: 0,
              posicion: '',
              id_equipo: ''
            },
        }
    }, 
computed: {
  
 
  equipo() {
      const equipo = this.$store.getters.equipoCargado(this.$route.params.id)
      //console.log(equipo)
      return equipo
  },

   titulo() {
    return this.editedIndex === -1 ? 'Nueva jugadora' : 'Editar jugadora'
  }
},
methods: {
  irJugador(item) {
    //this.$router.push('/jugador/' + item.id_jugador)
    console.log(item)
  },
  initialize() {
    this.editedItem.id_equipo = this.equipo.id_equipo
    this.defaultItem.id_equipo = this.equipo.id_equipo
    //console.log(this.editedItem)
  },
  editItem(item) {
    this.editedIndex = this.equipo.componentes_equipo.indexOf(item)
    this.editedItem = Object.assign({}, item)
    // Modificar store
    this.dialog = true
  },
  deleteItem(item) {
    const index = this.equipo.componentes_equipo.indexOf(item)
    confirm('Are you sure you want to delete this item?') && this.equipo.componentes_equipo.splice(index, 1)
  },
  close() {
    this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
  },
  save() {
     if (this.editedIndex > -1) {
       //Editar jugador
          Object.assign(this.equipo.componentes_equipo[this.editedIndex], this.editedItem)
        } else {
      //Añadir jugador
          let jugador = this.editedItem
          //
          this.equipo.componentes_equipo.push(jugador)
          //console.log(this.editedItem)
          this.$store.dispatch('addJugador', jugador)
        }
        this.close()
      }
  },
    created() {
      this.initialize()
    }


}
</script>

<style>

</style>