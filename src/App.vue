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
import Trigger from './components/Trigger.vue'

export default {
  
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  components: {
    Images,
    Gallery,
    Trigger
  }
}




</script>

<style>
body {
  background: #2c3e50;
  min-height: 200vh;
  position: relative;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* background: black; */
  width: 95%;
  margin: 0 auto;
}


</style>
