<template>
    <div class="col-12 col-md-4 p-3 d-flex justify-content-center" 
    v-if="(this.domain == 'imgur.com' || this.domain == 'i.redd.it' || this.domain == 'i.imgur.com') && (!isAlbum && !isGallery && !isRequest)"
    >
        <img :src="newSrc" :alt="altText" :data-domain="daDomain" class="img-fluid align-self-center">
    </div>        
</template>


<script>
export default {
    props: ['daImage', 'daAlt', 'daDomain'],
    data() {
        return {
            imageSrc: '',
            altText: '',
            domain: '',
            formattedSrc: ''
        }
    },
    
  
    methods: {
           
    },
    computed: {
        isImgur: function() {
            if (this.domain == 'imgur.com' || this.domain == 'i.imgur.com') {
                return true;
            } else {
                return false;
            }
        },
        isAlbum: function() {
            if(this.isImgur) {                
                return this.daImage.includes('/a/');                
            } else {
                return false;
            }
        },
        isGallery: function() {
            if(this.isImgur) {                
                return this.daImage.includes('/gallery/');                
            } else {
                return false;
            }
        },
        newSrc: function() {
            if(this.isImgur && !this.isAlbum && !this.isGallery) {
                if(!this.daImage.includes('.jpg')) {
                    return this.daImage.replace('imgur.com', 'i.imgur.com') + '.jpg';
                } else {
                    return this.daImage;
                }
            } else {
                return this.daImage;
            }
        },
        isRequest: function() {
            if (this.altText.includes('Request') || this.altText.includes('request')) {
                return true;
            } else {
                return false;
            }
        }
    },
    beforeMount() {
        this.imageSrc = this.daImage;
        this.altText = this.daAlt;
        this.domain = this.daDomain;
    }
}
</script>