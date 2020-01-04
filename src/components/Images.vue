<template>
    
    <div 
    class="m-3 d-flex justify-content-center m-height" 
    v-if="(hasPreview && !isRequest && modalImage)"
    >
        
        <img
        @click="clicked"
        :src="preview" 
        :alt="altText" 
        :data-domain="domain"
        :data-source="source"
        class="img-props contain opacity"
        draggable="false"
        >
        
    </div>
           
</template>

<style>
    .fill {object-fit: fill !important;}
    .contain {object-fit: contain !important;}
    .cover {object-fit: cover !important;}
    .scale-down {object-fit: scale-down !important;}
    .none {object-fit: none !important;}
    /* .m-height {height: 200px !important; max-width: calc(100% * (1/4));} */
    .m-height {max-height: 300px !important; flex-basis: 22%;}
    .img-props {max-height: 100% !important; max-width: 100% !important;transition: all .6s ease-in-out; cursor: pointer;}
    .container-bg {background: grey;}


    .opacity {
        opacity: 0;
    }
    
    @media only screen and (max-width: 723px) {
        .m-height {
            flex-basis: 100%;
        }
    }

    @media only screen and (max-width: 1252px) and (min-width: 723px) {
        .m-height {
            flex-basis: 40%;
        }
    }
    
</style>


<script>
export default {
    props: ['allData'],
    data() {
        return {
            altText: this.allData.title,
            domain: this.allData.domain,
        }
    },
    
  
    methods: {
        afterEnter: function(el) {
            console.log(el);
            //el.classList.add('image-fade')
        },
        enter: function(el) {
            console.log(el);
            //el.classList.add('image-fade-op')
        },
        clicked: function() {
            let extras = {
                source: this.source,
                alt: this.altText,
                modalImage: this.modalImage
            }
            this.$store.dispatch('sendImageClick', extras);
            this.$store.dispatch('modalOpen');
        }
    },
    computed: {
        test: function() {
            return this.allData.preview;
        },
        hasPreview: function() {
            if (this.allData.preview) {
                return true;
            } else {
                return false;
            }
        },
        preview: function() {
            if (this.hasPreview) {
                return this.allData.preview.images[0].resolutions[3].url;
            } else {
                return false;
            }
        },
        modalImage: function() {
            if (this.hasPreview) {
                return this.allData.preview.images[0].resolutions[5].url;
            } else {
                return false;
            }
        },
        source: function() {
            if (this.hasPreview) {
                return this.allData.preview.images[0].source.url;
            } else {
                return false;
            }
        },
        isImgur: function() {
            if (this.domain == 'imgur.com' || this.domain == 'i.imgur.com') {
                return true;
            } else {
                return false;
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
        
        
        
    }
}
</script>