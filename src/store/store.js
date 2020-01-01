import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        toReturn: 30,
        numberOfImages: 0,
        after: '',
        listOfImages: [],
        initalUrl: 'https://www.reddit.com/user/coopster81/m/wallpapers.json?limit=30&raw_json=1',
        imageClicked: false,
        clickedImageInfo: {},
        modalOpen: false,
        theModalImage: ''
    },
    getters: {
        arrayOfImages(state) {             
            return state.listOfImages;
        },
        clickedImageURL(state) {
            return state.clickedImageInfo.source;
        },
        clickedImageAlt(state) {
            return state.clickedImageInfo.alt;
        },
        modalOpenState(state) {
            return state.modalOpen;
        },
        modalImage(state) {
            return state.theModalImage;
        }
    },
    mutations: {
        getImages(state) {
            axios.get(state.initalUrl)
                .then(function(response) {
                    state.numberOfImages = response.data.data.children.length;
                    state.after = response.data.data.after;
                    state.listOfImages = response.data.data.children;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getMoreImages(state) {
            let moreURL = `https://www.reddit.com/user/coopster81/m/wallpapers.json?limit=${state.toReturn}&after=${state.after}&raw_json=1`;

            axios.get(moreURL)
                .then(function(response){
                    let listA = state.listOfImages;
                    let listB = response.data.data.children;
                    let concat = listA.concat(listB);
                    state.listOfImages = concat;
                    return response;
                })
                .then(function(response) {
                    state.numberOfImages += response.data.data.children.length;
                    state.after = response.data.data.after;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        clearListOfImages(state) {
            state.listOfImages = [];
        },
        imageWasClicked(state, payload) {
            state.imageClicked = true;
            state.clickedImageInfo = payload;
            state.theModalImage = payload.modalImage;
        },
        modalOpen(state) {
            state.modalOpen = !state.modalOpen;
        },
        insertLoadingIcon(state, payload) {
            state.theModalImage = payload;
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
        }
    }
});