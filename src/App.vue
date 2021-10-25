<template>
<link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />
 <div id="nav">
    <router-link to=/Main>Main</router-link> |
    <router-link to=/StartHand>StartHand</router-link>
  </div>
  
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:0px ;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #42b983;
    text-decoration: none;
    &.router-link-exact-active {
      color: #2c3e50;
      text-decoration: underline;
    }
  }
}

</style>
