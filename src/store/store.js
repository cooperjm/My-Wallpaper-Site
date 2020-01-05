import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        gallery: {
            toReturn: 30,
            numberOfImages: 0,
            after: '',
            listOfImages: [],
            initalUrl: 'https://www.reddit.com/user/coopster81/m/wallpapers.json?limit=30&raw_json=1',
            isSearched: false,
            searchValue: ''
        },
        image: {
            imageClicked: false,
            clickedImageInfo: {}
        },
        modal: {
            modalOpen: false,
            theModalImage: ''
        }
    },
    getters: {
        arrayOfImages(state) {             
            return state.gallery.listOfImages;
        },
        clickedImageURL(state) {
            return state.image.clickedImageInfo.source;
        },
        clickedImageAlt(state) {
            return state.image.clickedImageInfo.alt;
        },
        modalOpenState(state) {
            return state.modal.modalOpen;
        },
        modalImage(state) {
            return state.modal.theModalImage;
        },
        searched(state) {
            return state.gallery.isSearched;
        }
    },
    mutations: {
        getImages(state) {
            axios.get(state.gallery.initalUrl)
                .then(function(response) {
                    state.gallery.numberOfImages = response.data.data.children.length;
                    state.gallery.after = response.data.data.after;
                    state.gallery.listOfImages = response.data.data.children;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getMoreImages(state) {
            let moreURL = `https://www.reddit.com/user/coopster81/m/wallpapers.json?limit=${state.gallery.toReturn}&after=${state.gallery.after}&raw_json=1`;

            axios.get(moreURL)
                .then(function(response){
                    let listA = state.gallery.listOfImages;
                    let listB = response.data.data.children;
                    let concat = listA.concat(listB);
                    state.gallery.listOfImages = concat;
                    return response;
                })
                .then(function(response) {
                    state.gallery.numberOfImages += response.data.data.children.length;
                    state.gallery.after = response.data.data.after;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        searchImages(state) {
            let searchURL = `https://www.reddit.com/user/coopster81/m/wallpapers/search.json?q=${state.gallery.searchValue}&limit=${state.gallery.toReturn}&restrict_sr=on&sort=relevance&t=all&after=${state.gallery.after}&raw_json=1`;

            axios.get(searchURL)
                .then(function(response){
                    let listA = state.gallery.listOfImages;
                    let listB = response.data.data.children;
                    let concat = listA.concat(listB);
                    state.gallery.listOfImages = concat;
                    return response;
                })
                .then(function(response) {
                    state.gallery.numberOfImages += response.data.data.children.length;
                    state.gallery.after = response.data.data.after;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        clearListOfImages(state) {
            state.gallery.listOfImages = [];
            state.gallery.after = '';
            state.gallery.isSearched = true;
        },
        imageWasClicked(state, payload) {
            state.image.imageClicked = true;
            state.image.clickedImageInfo = payload;
            state.modal.theModalImage = payload.modalImage;
        },
        modalOpen(state) {
            state.modal.modalOpen = !state.modal.modalOpen;
        },
        insertLoadingIcon(state, payload) {
            state.modal.theModalImage = payload;
        },
        searchValue(state, payload) {
            state.gallery.searchValue = payload;            
        }
    },
    actions: {
        getImages(context) {
            context.commit('getImages');
        },
        getMoreImages(context) {
            context.commit('getMoreImages');
        },
        sendImageClick(context, payload) {
            context.commit('imageWasClicked', payload);
        },
        modalOpen(context) {
            context.commit('modalOpen');
        },
        clearListOfImages(context) {
            context.commit('clearListOfImages');
        },
        insertLoadingIcon(context, payload) {
            context.commit('insertLoadingIcon', payload);
        },
        searchValue(context, payload) {
            context.commit('searchValue', payload);
            context.commit('searchImages');
        }
    }
});