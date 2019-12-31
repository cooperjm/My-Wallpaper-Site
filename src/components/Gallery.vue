<template>
        <div class="row gallery d-flex flex-row flex-wrap justify-content-around"
        :class="{modalOpenBlur: modalOpen}"
        >
            
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
            @source-image="getModalImage($event)"
            ></Images>            
            <Trigger @triggerIntersected="infiniteScroll" />
            <!-- <div id="wallpaperModal" :class="{'full-opacity': imageClicked}">
                <div class="modalContainer">
                    <div class="imageModal">
                        <img :src="modalImageSource" :alt="modalAlt">
                        <p style="font-size: 0">{{modalAlt}}</p> 
                        
                    </div>
                </div>
            </div> -->
        </div>
</template>


<script>


import Images from './Images.vue'
import Trigger from './Trigger.vue'

export default {
    
    props: [],
    data() {
        return {
            searchValue: '',
            isSearched: false,
            modalImage: './assets/blank.png',
            modalAlt: '',
            imageClicked: false
        }
    },
    computed: {
        searchValueFormatted() {
            //return this.searchValue.replace(' ', '+');
            return this.searchValue.split(" ").join("+").trim();
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
        },
        modalImageSource() {
            return this.modalImage;
        },
        modalText() {
            return 
        },
        arrayOfImages() {
            return this.$store.getters.arrayOfImages;
        },
        imageList() {
            return this.$store.getters.arrayOfImages;
        },
        modalOpen() {
            return this.$store.getters.modalOpenState;
        }
    },
    methods: {
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
                this.$store.dispatch('getMoreImages');
                console.log('normal');
            }
        },
        checkFade() {
            setTimeout(function() {
                var images = document.querySelectorAll('.opacity');
                images.forEach(function (item, index) {
                    //console.dir(item);
                    item.style.opacity = '1';
                    //console.dir(item);
                });
            }, 600);
            
        }
    },
    mounted() {
        //this.fetchJSON();
        this.checkFade();
    },
    updated() {
        this.checkFade();
    },
    components: {
        Images,
        Trigger
    }
    
}
</script>
<style>
#app {
    z-index: 10;
}
.modalOpenBlur {
    filter: blur(8px) grayscale(50%);
    overflow: hidden;    
}
.full-opacity {
    opacity: 1 !important;
}
.gallery {
    max-width: 1300px;
    margin: 0 auto;
    /* position: relative; */
    transition: all .3s ease-in-out;
}

</style>