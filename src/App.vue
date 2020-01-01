<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="">     
           
        <Gallery></Gallery>
        <Modal></Modal>
    </div>
      
      
  </div>

 
</template>

<script>


import Images from './components/Images.vue'
import Gallery from './components/Gallery.vue'
import Trigger from './components/Trigger.vue'
import Modal from './components/Modal.vue'

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
    Trigger,
    Modal
  },
  created() {
    // Had an bug where on reloading of the page the viewport would be at the bottom of the page.
    // This timeout scolls to the top of the page just before the images load.
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 200)
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
