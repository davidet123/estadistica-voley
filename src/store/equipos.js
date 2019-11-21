import db from '@/firebase/init.js'
//import Vue from 'vue'


export default {
  state: {
    equipos: [],
    jugadores: []



  /*    equipos: [
        {
          equipo_id: 'nbUEFwRCDyq0KBhwtLtw',
          nombre_equipo: 'Gandia',
          componentes_equipo: [
            {jugador_id: 1,
            numero: 1,
            nombre: 'Maria',
            posicion: 'receptora',
            partidos_jugados: []},
            {jugador_id: 2,
            numero: 2,
            nombre: 'Ana',
            posicion: 'central',
            partidos_jugados: []},
          ],
          partidos: [1]
        },
        {
          equipo_id: 2,
          nombre_equipo: 'Oliva',
          componentes_equipo: [
            {jugador_id: 3,
            numero: 1,
            nombre: 'Luisa',
            posicion: 'receptora',
            partidos_jugados: []},
            {jugador_id: 4,
            numero: 2,
            nombre: 'Antonia',
            posicion: 'central',
            partidos_jugados: []},
          ],
          //Id de los partidos que juega el equipo
          partidos: [1]
        }


     ] */

  },
  getters: {
      cargarEquipos: (state, payload) => {
          return state.equipos.find(equipo => {
            equipo.equipo_id === payload
          })
      },
      equipoCargado: state => {
        return (equipoId) => {
          return state.equipos.find((equipo) => {
            let temp =  equipo.id_equipo === equipoId
            //console.log(temp)
            return temp

          })
        }
      },
      equipoLocal: state => {
        return (equipoId) => {
          return state.equipos.find((equipo) => {
            let temp =  equipo.equipo_id === equipoId
            //console.log(temp)
            return temp

          })
        }
      },
      cargarJugadores: state => {
        return state.jugadores
      },
      cargarJugador: state=> {
        return (jugadorId) => {
          return state.equipos.find((equipo)=> {
            return equipo.componentes_equipo.find((jugador) => { 
              return jugador.jugador_id === parseInt(jugadorId)
            })
          })
        }
      }
      
  },
  mutations: {
    addJugador: (context, payload) => {
      let temp = context.equipos.find(equipo => {
        return equipo.equipo_id === payload.equipo
      })
      //Id temporal hasta conectar con base de datos
      //let id = context.equipos.length + 1

      let jugador = {
        numero: payload.numero,
        nombre: payload.nombre,
        posicion: payload.posicion,
        id_jugador: payload.jugador_id
      }
      temp.componentes_equipo.push(jugador)
    },
    cargarEquipos: (context, payload) => {
      let jugadores = []
      payload.id_componentes.forEach(id => {
         const data = context.jugadores.find(jugador => {
          return jugador.id_jugador === id
        })
        if (data) jugadores.push(data)
      })
      payload.componentes_equipo = jugadores
      context.equipos.push(payload)
    },
    cargarJugadores: (context, payload) => {
      context.jugadores.push(payload)
    },
    text: (payload) => {
      console.log('commit' + payload)
    }
  },
  actions: {
    cargarEquipos: ({commit})=> {
      commit('cargando', true)
      db.collection('equipos').get()
      .then (data => {
        data.forEach(doc => {
          let equipo = doc.data()
          equipo.id_equipo =  doc.id
          commit('cargarEquipos', equipo)
          commit('cargando', false)
        })
      })
    },
    cargarJugadores: ({commit}) => {
      commit('cargando', true)
      db.collection('jugador').get()
      .then (data => {
        data.forEach(doc => {
          let jugador = doc.data()
          jugador.id_jugador =  doc.id
          commit('cargarJugadores', jugador)
          commit('cargando', false)
        })
      })
    },
    addJugador: ({commit}, payload) => {
      if (payload.id_equipo) {
        let jugador = payload
        db.collection('jugador').add(payload)
        .then(data => {
          const id = data.id
          commit('text', {
            ...jugador,
            id_jugador: id

          })
        })
        /* console.log(payload)
        commit('text', payload) */
      }
      
    }
  }
}
