<template>
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />
 <div id="nav">
    <router-link to=/>Main</router-link> <template v-if="deck">|</template>
    <template v-if="deck"><router-link to=/StartHand>Starthand</router-link> |</template>
    <template v-if="deck"><router-link to=/Combos>Combos</router-link> |</template>
    <template v-if="deck"><router-link to=/CardGroups>Cardgroups</router-link></template>
  </div>
  
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import {  deck } from '@/global'
export default defineComponent({
  setup(){
    return{deck}
  }

})
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #ffa107;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
      text-decoration: underline;
    }
  }
}
</style>
