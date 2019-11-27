<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="">
      
              
        
        <Gallery></Gallery>
      
    </div>
      
      
  </div>

 
</template>

<script>
import Images from './components/Images.vue'
import Gallery from './components/Gallery.vue'

export default {
  
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  components: {
    Images,
    Gallery
  }
}
</script>

<style>
body {
  background: #2c3e50;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* background: black; */
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.wp {
  width: 100%;
}
</style>
