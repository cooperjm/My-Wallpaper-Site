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
            </div>
            <div class="modalButtons">
                <a :href="url" target="_blank">
                    <img id="download" src="src\assets\download.svg" alt="download" title="View">
                </a>
                <img id="close" src="src\assets\close.svg" alt="close" title="Close"
                @click="closeClicked">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            
        }
    },
    methods: {
        closeClicked: function() {
            this.$store.dispatch('modalOpen');
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
    transition: all .3s ease-in-out;
}

.fullOpacity {
    opacity: 1 !important;
    pointer-events: initial !important;
}

.theImage {
    max-width: 100%;
    max-height: 100%;
}

/* #wallpaperModal img:hover {
     -webkit-filter: blur(5px) grayscale(80%);
    filter: blur(2px) grayscale(90%);
} */

.modalContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.51);
    flex-direction: column;
}

.imageModal {
    width: 90vw;
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modalButtons {
    /* background-color: white; */
    display: flex;
    justify-content: flex-end;  
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    width: 90vw;
}

.modalOpen {
    -webkit-filter: blur(5px) grayscale(50%);
    filter: blur(5px) grayscale(50%);
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
}

#close {
    margin-bottom: 7px;
    cursor: pointer;
}
</style>