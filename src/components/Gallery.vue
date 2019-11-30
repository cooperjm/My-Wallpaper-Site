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
        },
        searchMoreUrl() {
            return `https://www.reddit.com/r/multiwall+wallpapers+wallpaper/search.json?q=${this.searchValueFormatted}&limit=${this.toReturn}&after=${this.after}`
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
        },
        testButton() {
            console.log(this.getMoreUrl);
        },
        obs() {
            var watchApp = document.querySelector('.checker');

            var options = {
            root: null,
            threshold: 0,
            rootMargin: '10px'
            }

            var observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if(!entry.isIntersecting) {
                return;
                }
                console.log(this.$refs);
                // $vm.$children[0].$children[0].moreImages();
                
            });
            }, options);

            setTimeout(function() {
            observer.observe(watchApp);
            }, 1000);
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
// setTimeout(function() {
// var watchApp = document.querySelector('.checker');

// var options = {
// root: null,
// threshold: 0,
// rootMargin: '10px'
// }

//     var observer = new IntersectionObserver(function(entries, observer) {
//         entries.forEach(entry => {
//             if(!entry.isIntersecting) {
//             return;
//             }
//             console.log(this.$refs);
//             //wallpapers.$children[0].$children[0].moreImages();
            
//         });
//     }, options);



// observer.observe(watchApp);
// }, 1000);
</script>