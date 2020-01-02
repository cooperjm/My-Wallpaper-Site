<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="">     
           
        <Gallery></Gallery>
        <Modal></Modal>
        <div id="toTopContainer">
            <i id="toTop" class="fas fa-chevron-circle-up" @click="scrollTop"></i>
        </div>
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
    scrollTop() {
        // window.scrollTo(0, 0);
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();
    }
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
  overflow-x: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 95%;
  margin: 0 auto;
  position: relative;
}
#toTopContainer {
    position: fixed;
    top: 84%;
    right: 3%;
    font-size: 5rem;
    color: rgba(209, 209, 209, .5);
    cursor: pointer;
}

</style>
