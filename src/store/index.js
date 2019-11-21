import Vue from 'vue'
import Vuex from 'vuex'
import partidos from './partidos.js'
import equipos from './equipos.js'
//import campeonatos from './campeonatos.js'
//import users from './users.js'
//import test from './test.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    partidos,
    equipos
  },
  state: {
    cargando: false
  },
  getters: {
    cargando: state=> {
      return state.cargando
    }
  },
  mutations: {
    cargando: (context, payload) => {
      context.cargando = payload
    }
  }
});

export default store
