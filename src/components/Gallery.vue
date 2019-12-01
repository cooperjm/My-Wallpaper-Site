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
            <!-- <div class="col-12">
                <button @click="moreImages">Add more</button>
                <button @click="testButton">test</button>  
            </div>    -->
            <Images v-for="(image, index) in imageList"
            :key="index"            
            :allData="image.data"
            ></Images>            
            <Trigger @triggerIntersected="infiniteScroll" />
        </div>
</template>


<script>


import Images from './Images.vue'
import Trigger from './Trigger.vue'

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
            toReturn: 25,
            count: 0,
            after: '',
            isSearched: false
        }
    },
    computed: {
        searchValueFormatted() {
            //return this.searchValue.replace(' ', '+');
            return this.searchValue.split(" ").join("+").trim();
        },
        fetchUrl() {
            return `https://www.reddit.com/user/coopster81/m/wallpapers.json?limit=${this.toReturn}&raw_json=1`
        },
        getMoreUrl() {
            return `https://www.reddit.com/user/coopster81/m/wallpapers.json?limit=${this.toReturn}&after=${this.after}&raw_json=1`
        },
        searchUrl() {
            return `https://www.reddit.com/user/coopster81/m/wallpapers/search.json?q=${this.searchValueFormatted}&limit=${this.toReturn}&restrict_sr=on&sort=relevance&t=all&raw_json=1`
        },
        searchMoreUrl() {
            return `https://www.reddit.com/user/coopster81/m/wallpapers/search.json?q=${this.searchValueFormatted}&limit=${this.toReturn}&after=${this.after}&restrict_sr=on&sort=relevance&t=all&raw_json=1`
        },
        isAfter() {
            if (this.after) {
                return true;
            } else {
                return false;
            }
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

                for(var i = 0; i < listLength; i++ ) {                
                  this.imageList[i] = data.data.children[i];
                }
                
                this.after = data.data.after;
                this.count += this.toReturn;
                this.isSearched = true;
                this.$forceUpdate(); 
            });      
        },
        searchMoreImages() {
            fetch(this.searchMoreUrl)
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
            console.log(this.searchMoreUrl);
        },
        testButton() {
            console.log(this.searchUrl);
        },
        infiniteScroll() {
            if (this.isSearched) {
                this.searchMoreImages();
                console.log('searched');
            } else {
                this.moreImages();
                console.log('normal');
            }
        }
    },
    mounted() {
        this.fetchJSON();
         
    },
    components: {
        Images,
        Trigger
    }
    
}
</script>