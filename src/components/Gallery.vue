<template>
        <div class="row gallery">           
            <Images v-for="(image, index) in imageList"
            :key="index"
            :daImage="image.data.url"
            :daAlt="image.data.title"
            ></Images>
            
            <!-- <Images
            :daImage="imageList[0].data.url"
            :daAlt="imageList[0].data.title"
            ></Images> -->
        </div>
</template>


<script>
import Images from './Images.vue'

export default {
    
    props: [],
    data() {
        return {
            wallpaperCount: 0,
            searchValue: '',
            links: [],
            data: {},
            imageList: {},
            listLength: 0,
            toReturn: 20,
            count: 0
        }
    },
    computed: {
        fetchUrl() {
            return `https://www.reddit.com/r/wallpaper.json?limit=${this.toReturn}`
        }
    },
    methods: {
        fetchJSON() {
            fetch(this.fetchUrl)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.data = data
                var listLength = data.data.children.length;
                this.listLength = listLength;
                
                for(var i = 0; i < listLength; i++ ) {                
                  this.imageList[i] = data.data.children[i];
                } 
                this.$forceUpdate();       
            });      
        }       
    },
    beforeMount() {
        this.fetchJSON();
        
    },
    components: {
        Images
    }
    
}
</script>