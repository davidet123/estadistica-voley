import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CurvaRegistro from '../views/CurvaRegistro.vue'
import Partidos from '../views/Partidos.vue'
import Partido from '../views/Partido.vue'
import Equipo from '../views/Equipo.vue'
import Jugador from '../views/Jugador.vue'
import Test from '../views/Test.vue'
import IntroducirEstadistica from '../views/IntroducirEstadistica.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/curvaregistro/:id',
    name: 'curvaregistro',
    props: true,
    component: CurvaRegistro
  },
  {
    path: '/partidos',
    name: 'partidos',
    component: Partidos
  },
  {
    path: '/equipo/:id',
    name: 'equipo',
    props: true,
    component: Equipo
  },
  {
    path: '/partido/:id',
    name: 'partido',
    props: true,
    component: Partido
  },
  {
    path: '/test/:id',
    name: 'test',
    props: true,
    component: Test
  },
  {
    path: '/jugador/:id',
    name: 'jugador',
    props: true,
    component: Jugador
  },
  {
    path: '/estadistica/:id',
    name: 'estadistica',
    props: true,
    component: IntroducirEstadistica
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
