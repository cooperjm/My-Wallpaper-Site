<template>
    <div class="col-12 col-md-4 p-3 d-flex">
        <img :src="imageSrc" :alt="altText" class="img-fluid align-self-center">
    </div>        
</template>


<script>
export default {
    name: 'images',
    props: ['daImage', 'daAlt'],
    data() {
        return {
            imageSrc: '',
            altText: '',
        }
    },
    
  
    methods: {
           
    },
    beforeMount() {
        this.imageSrc = this.daImage;
        this.altText = this.daAlt;
    }
}
</script>