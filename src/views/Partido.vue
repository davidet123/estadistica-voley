<template>
  <div class="main">
    <h1>Partido</h1>
    {{ partido }}
  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    partido() {
      let temp =  this.$store.getters.partidoCargado(this.$route.params.id)
      return temp
    }
  }

}
</script>

<style>

</style>