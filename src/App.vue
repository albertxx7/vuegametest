
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
 
<style lang="scss">
// 圓體
@import url(https://fonts.googleapis.com/earlyaccess/cwtexyen.css);


#app {
  font-family:'cwTeXYen', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
 
#nav {
  padding: 30px;
 
  a {
    font-weight: bold;
    color: #2c3e50;
 
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>