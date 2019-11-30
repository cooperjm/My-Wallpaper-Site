import Vue from 'vue'
import App from './App.vue'


var wallpapers = new Vue({
  el: '#app',
  render: h => h(App)
})

//console.log(wallpapers.$children[0].$children[0])
//wallpapers.$children[0].$children[0].moreImages();

// var watchApp = document.querySelector('.checker');

// var options = {
//   root: null,
//   threshold: 0,
//   rootMargin: '10px'
// }

// var observer = new IntersectionObserver(function(entries, observer) {
//   entries.forEach(entry => {
//     if(!entry.isIntersecting) {
//       return;
//     }
//     //console.log(entry);
//     wallpapers.$children[0].$children[0].moreImages();
//   });
// }, options);

// setTimeout(function() {
//   observer.observe(watchApp);
// }, 1000);

