// All of the imports/requires
var axios = require('axios');
// A special/work-around kind of import/require for vue.js
// Vue needs additional files and build tools so this way works
// for our current gulp/webpack setup:
import Vue from 'vue/dist/vue.js';
import tippy from 'tippy.js';
import anime from 'animejs/lib/anime.es.js';

(function(){

// Vue World
	var app = new Vue({
	  el: '#app',
	  data: {
	    message: 'News Items',
			aboutPage: 'About Page',
			news: false,
			display: true,
			displayPanel: false
	  },
		mounted () {
			console.log('vue is mounted')
		},
		methods: {
			goAboutPage: function () {
				console.log('working switch')
				this.display = false;
			},
			goHomePage: function () {
				console.log('working switch')
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
				anime({
		      targets: '#contentDisplay',
		      opacity: [0, 1],
		      easing: 'easeInOutSine'
		    })
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

	// GET request for remote image in node.js
	axios({
	  method: 'get',
	  url: 'https://newsapi.org/v2/top-headlines?q=trump&apiKey=4d3b541f038945ef8d06d25795556ce4'
	})
	.then(function (response) {
		console.log(response.data)
		app.news = response.data.articles;
	});

})(); // iffe ENDS
