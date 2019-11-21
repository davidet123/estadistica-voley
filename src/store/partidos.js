import db from '@/firebase/init.js'
//import Vue from 'vue'


export default {
  state: {
    partidos: [],
    contrincantes: [],
    estadistica: []
     /* partidos: [
        {id_partido: 1,
            id_equipo: 1,
            contrincante: 'oliva',
            resultado: {
                set1: '25-20',
                set2: '25-18',
                set3: '25-19',
                set4: '0-0',
                set5: '0-0'
            },
            estadistica: {
                set1: [],
                set2: [],
                set3: [],
                set4: [],
                set5: []
            }
        },
        {id_partido: 2,
            id_equipo: 1,
            contrincante: 'xativa',
            resultado: {
                set1: '5-20',
                set2: '7-18',
                set3: '9-19',
                set4: '0-0',
                set5: '0-0'
            },
            estadistica: {
                set1: [],
                set2: [],
                set3: [],
                set4: [],
                set5: []
            }
        }
     ] */

  },
  getters: {
      cargarPartidos: state=> {
          return state.partidos
      },
      partidoCargado: state => {

        return (partidoId) => {
          return state.partidos.find((partido) => {
            return partido.id_partido === partidoId
          })
        }
      },
      
  },
  mutations: {
    updatePartido (state, payload) {
      let partido =  state.partidos.find((partido) => {
        return partido.id_partido === payload.id_partido

      })
      //console.log(partido)
      partido.resultado = payload.resultado
      partido.estadistica = payload.estadistica
    },
    cargarPartidos (context, payload) {
      context.partidos.push(payload)
    }
  },
  actions: {
    cargarPartidos: ({commit})=> {
      commit('cargando', true)
      db.collection('partidos').get()
      .then (data => {
        data.forEach(doc => {
          let partido = doc.data()
          partido.id_partido =  doc.id
          commit('cargarPartidos', partido)
          commit('cargando', false)
        })
      })
    },
    updatePartido: ({commit}, payload) => {
      commit('updatePartido', payload)
    }
  }
}
