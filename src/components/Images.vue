<template>
    <div 
    class="col-12 col-md-4 my-3 d-flex justify-content-center m-height" 
    v-if="(hasPreview && !isRequest)"
    >
        <img 
        :src="preview" 
        :alt="altText" 
        :data-domain="daDomain" 
        class="img-props contain">
    </div>        
</template>

<style>
    .fill {object-fit: fill !important;}
    .contain {object-fit: contain !important;}
    .cover {object-fit: cover !important;}
    .scale-down {object-fit: scale-down !important;}
    .none {object-fit: none !important;}
    .m-height {max-height: 300px !important;}
    .img-props {max-height: 100% !important; max-width: 100% !important;}
    .container-bg {background: grey;}    
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
        source: function() {
            if (this.hasPreview) {
                return unescape(this.allData.preview.images[0].source.url);
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