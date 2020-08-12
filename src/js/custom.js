// All of the imports/requires
var axios = require('axios');
// A special/work-around kind of import/require for vue.js
// Vue needs additional files and build tools so this way works
// for our current gulp/webpack setup:
import Vue from 'vue/dist/vue.js';
import tippy from 'tippy.js/dist/tippy.umd.js';
import anime from 'animejs/lib/anime.es.js';
import toastr from 'izitoast/dist/js/iziToast.js';

(function(){

	// Vue Components
	// Define a new component called button-counter
	Vue.component('home-button', {
	  data: function () {
	    return {
	      aboutPage: 'About Page',
	    }
	  },
	  methods: {
	  	// this method function is called from the vue home-button component
	  	// within the html
	  	goAboutPage: function () {

	  		 // This statement emits an event
	  		 this.$emit('about-go', false)
	  		}
	  },
	  template: '<button @click="goAboutPage">About Page</button>'
	})
	// Vue Component Registration ENDS

	// Define a new component called author
	Vue.component('author', {
		props: ['title'],
	  template: '<span class="author">{{title}}</span>'
	})
	// Vue Component Registration ENDS


// Initiate the Vue App and Instance
	var app = new Vue({
	  el: '#app',
	  // Data is an object on the vue instance that can be constantly used for
	  // updating and informing the html/dom
	  data: {
	    message: 'News Items',
			aboutPage: 'About Page',
			news: false,
			display: true,
			displayPanel: false,
			passInfo: '',
			loginInfo: ''
	  },
	  // 'mounted' is what is known as a vue lifecycle hook. These can
	  // be used to trigger events and start processes, sort of like $(document).ready();
		mounted () {
			console.log('vue is mounted')
			if (localStorage.getItem('NewsApiReference') != null) {
			  toastr.show({
				    title: localStorage.getItem('NewsApiReference'),
				    message: 'Welcome back, remember to login...',
				    position: 'topCenter'
				});
			}
		},
		methods: {
			// A list of vue methods that we are using within our application.
			receiveEmitData: function (val) {
				console.log('ok ok')
				console.log(val)
				this.display = false;
			},
			goHomePage: function () {
				// console.log('working switch')
				this.display = true;
			},
			hoverWithTippy: function () {
				// Adding tippy hover to the display divs
				tippy('.news-item', {
        	content: 'Click Item To See More...',
					placement: 'left'
	      });
			},
			generateArticleDisplay: function (whatItem) {
				// Adding relevant info from item....from vue reference
				// See v-for="item in news" @click="generateArticleDisplay(item)"
				// Then update vue's display property
				this.displayPanel = whatItem.content
				// Using anime.js to create a fade in effect for the news item
				anime({
		      targets: '#contentDisplay',
		      opacity: [0, 1],
		      easing: 'easeInOutSine'
		    })
			},
			loginTime: function () {
				var vueData = this;
				localStorage.setItem('NewsApiName', vueData.loginInfo)
				localStorage.setItem('NewsApiPassword', vueData.passInfo)
				localStorage.setItem('NewsApiReference', vueData.loginInfo)
				// Display an info toast with no title
				console.log(toastr)
				toastr.show({
				    title: vueData.loginInfo,
				    message: 'Welcome, you are now logged in.',
				    position: 'topCenter'
				});
			},
			logoutTime: function () {
				// comment ..
				var vueData = this;
				localStorage.removeItem('NewsApiName', vueData.loginInfo);
				localStorage.removeItem('NewsApiPassword', vueData.loginInfo)
				toastr.show({
				    title: vueData.loginInfo,
				    message: 'See you next time, you are now logged out.',
				    position: 'topCenter'
				});
			}
		}, // methods END
		filters: {
			// A filter that reverses text
		  reverseText: function (value) {
		  	// This reverses the text
		    return value.split('').reverse().join('')
		  },
		  // A filter that makes a capital letter out of each word
		  allWordCaps: function (value) {
		  	value = value.toLowerCase()
		  	// Uses array methods and ecma script 6 to do the text to uppercase
		  	    .split(' ')
		  	    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		  	    .join(' ');
		  	return value
		  },
		  // A filter for updating a no author name provided case
		  checkForAuthor: function (value) {
		  	if (value === null || value === undefined) {
		  		value = 'No Author Provided';
		  	}
		  	return value
		  }
		}
	});
// Vue World ENDS

	// GET request for news api, made by axios...
	axios({
	  method: 'get',
	  url: 'https://newsapi.org/v2/top-headlines?q=trump&apiKey=4d3b541f038945ef8d06d25795556ce4'
	})
	.then(function (response) {
		// an axios promise function. response relates to the data being returned by the request.
		console.log(response.data)
		app.news = response.data.articles;
	});

})(); // iffe ENDS
