<template>
    <div id="wallpaperModal"
    :class="{fullOpacity: modalOpen}"
    >
        <div class="modalContainer">
            <div class="imageModal">                
                <img class="theImage" 
                :src="modalImage" 
                :alt="alt"
                >
                <div class="modalButtons">
                    <a :href="url" target="_blank">
                        <i id="download" class="fas fa-search-plus" alt="download" title="View"></i>
                    </a>
                    <i id="close" class="fas fa-times" alt="close" title="Close" @click="closeClicked"></i>
                    
                </div>             
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
          buttonContainerWidth: 0,
          loadingIcon: '/dist/load.gif'
        }
    },
    methods: {
        closeClicked: function() {
            this.$store.dispatch('modalOpen');
            // This is to insert the loading icon after the modal has closed.
            // Inside setTimeout was out of scope for "this", which is why self is equal to "this"
            let self = this;
            setTimeout(function() {                
                self.$store.dispatch('insertLoadingIcon', self.loadingIcon);
            }, 200);                     
        }
    },
    computed: {
        url() {
            return this.$store.getters.clickedImageURL;
        },
        alt() {
            return this.$store.getters.clickedImageAlt;
        },
        modalOpen() {
            return this.$store.getters.modalOpenState;
        },
        modalImage() {
            return this.$store.getters.modalImage;
        }
    }
}
</script>

<style>
#wallpaperModal {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; 
    opacity: 0;
    pointer-events: none;
    z-index: 2;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    -webkit-transform: scale(1.2);
        -ms-transform: scale(1.2);
            transform: scale(1.2);
}

.fullOpacity {
    opacity: 1 !important;
    pointer-events: initial !important;
    -webkit-transform: scale(1) !important;
        -ms-transform: scale(1) !important;
            transform: scale(1) !important;
}

.theImage {
    max-width: 100%;
    max-height: 100%;
}

.modalContainer {
    width: 100%;
    height: 100vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    background: rgba(0, 0, 0, 0.51);
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
}

.imageModal {
    width: 90vw;
    height: 85vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}

.modalButtons {
    /* background-color: white; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;  
    width: 100%;
    padding-top: 15px;    
    padding-bottom: 15px; /* created a overflow-x issue. fixed with hidding overflow-x on body. will look at later. */
    width: 90vw;
}

.modalOpen {
    -webkit-filter: blur(5px) grayscale(50%);
    filter: blur(5px) grayscale(50%);
    -webkit-transform: scale(0.9);
    -ms-transform: scale(1);
        transform: scale(1);    
}



#close {
    margin-top: -5px;
    cursor: pointer;
    color: white;
    font-size: 2.5rem;
}
#download {
    cursor: pointer;
    color: white;
    font-size: 2rem;
    margin-right: 15px;
}
</style>