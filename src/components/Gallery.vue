<template>
        <div class="row gallery d-flex flex-row flex-wrap justify-content-around mt-5"
        :class="{modalOpenBlur: modalOpen}"
        >
            <div class="col-12">
                <h1 class="galleryHeader">Wallpapers</h1>
            </div>   
            <!-- <div class="col-12">
                <div class="row">
                    <div class="input-group mb-3 col-11 col-md-9 col-lg-6 mx-auto">
                        <input type="text" class="form-control" placeholder="Search..." aria-label="Search..." aria-describedby="basic-addon2" v-model="searchValue"
                        @keyup.enter="searchWallpapers">
                        <div class="input-group-append">
                            <button id="search" class="btn btn-info" type="button" @click="searchWallpapers">Search</button>
                        </div>
                    </div>
                </div>
            </div>  -->
            
            <Images v-for="(image, index) in imageList"
            :key="index"            
            :allData="image.data"
            @source-image="getModalImage($event)"
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
        this.$store.dispatch('getMoreImages');
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
    /* transform: scale(.98);     */
}
.gallery {
    max-width: 1300px;
    margin: 0 auto;
    transition: all .2s ease-in-out;
}
.galleryHeader {
    font-family: 'Major Mono Display', monospace;
    color: white;
    font-size: 5rem;
    font-weight: bold;
    text-shadow: 0 0 10px #fff,
                 0 0 20px #fff,
                 0 0 30px #fff,
                 0 0 40px #79E5CB,
                 0 0 70px #79E5CB,
                 0 0 80px #79E5CB,
                 0 0 100px #79E5CB,
                 0 0 150px #79E5CB;
    margin-bottom: 20px;
}

@media only screen and (max-width: 600px) {
    .galleryHeader {
        font-size: 2.5rem;
    }
    
}

/* @media only screen and (max-width: 1024px) {
    .modalOpenBlur {
        transform: scale(1);    
    }
} */

</style>