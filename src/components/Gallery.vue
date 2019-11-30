<template>
        <div class="row gallery">
            <div class="col-12">
                <div class="row">
                    <div class="input-group mb-3 col-11 col-md-9 col-lg-6 mx-auto">
                        <input type="text" class="form-control" placeholder="Search..." aria-label="Search..." aria-describedby="basic-addon2" v-model="searchValue"
                        @keyup.enter="searchWallpapers">
                        <div class="input-group-append">
                            <button id="search" class="btn btn-info" type="button" @click="searchWallpapers">Search</button>
                        </div>
                    </div>
                </div>
            </div>      
            <Images v-for="(image, index) in imageList"
            :key="index"
            :daImage="image.data.url"
            :daAlt="image.data.title"
            :daDomain="image.data.domain"
            ></Images>
            <div class="col-12">
                <button @click="moreImages">Add more</button>
                <button @click="testButton">test</button>  
            </div>
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
            count: 0,
            after: ''
        }
    },
    computed: {
        searchValueFormatted() {
            return this.searchValue.replace(' ', '+');
        },
        fetchUrl() {
            return `https://www.reddit.com/r/multiwall+wallpapers+wallpaper.json?limit=${this.toReturn}`
        },
        getMoreUrl() {
            return `https://www.reddit.com/r/multiwall+wallpapers+wallpaper.json?limit=${this.toReturn}&after=${this.after}`
        },
        searchUrl() {
            return `https://www.reddit.com/r/multiwall+wallpapers+wallpaper/search.json?q=${this.searchValueFormatted}&limit=${this.toReturn}&restrict_sr=on&sort=relevance&t=all`
        }
    },
    methods: {
        fetchJSON() {
            fetch(this.fetchUrl)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.data = data;
                var listLength = data.data.children.length;
                this.listLength = listLength;
                
                for(var i = 0; i < listLength; i++ ) {                
                  this.imageList[i] = data.data.children[i];
                }
                this.after = data.data.after;
                this.count += this.toReturn;
                
                this.$forceUpdate(); 
                
            });      
        },
        moreImages() {
            fetch(this.getMoreUrl)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.data = data;
                var listLength = data.data.children.length;
                this.listLength += listLength;
                
                for(var i = 0; i < listLength; i++) {                
                  this.imageList[(i + this.count)] = data.data.children[i];
                }
                this.after = data.data.after;
                this.count += this.toReturn;
                this.$forceUpdate(); 
            });
        },
        searchWallpapers() {
            this.data = {};
            this.count = 0;
            this.imageList = {};
            fetch(this.searchUrl)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.data = data;
                var listLength = data.data.children.length;
                this.listLength = listLength;

                this.imageList[i] = data.data.children[i];
                
                this.after = data.data.after;
                this.count += this.toReturn;
                this.$forceUpdate(); 
            });      
        },
        testButton() {
            console.log(this.getMoreUrl);
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