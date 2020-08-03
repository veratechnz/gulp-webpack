// All of the imports/requires
var axios = require('axios');
// A special/work-around kind of import/require for vue.js
// Vue needs additional files and build tools so this way works
// for our current gulp/webpack setup:
import Vue from 'vue/dist/vue.js';
// A tool tip plugin
import tippy from 'tippy.js';


(function(){

	// Setup the vue instance
	var app = new Vue({
	  el: '#app',
	  data: {
	    message: 'Today\'s Reporters:',
	    news: false,
	    home: true
	  },
	  mounted () {
	    this.instanceLoaded()
	  },
	  methods: {
	  	// This is a vue method that is called from a vue instance life cycle hook
	  	instanceLoaded: function () {
	  		console.log('working...instance loaded')
	  	}, // placeTooltips END
	  	// This is a vue method that is called from a vue instance life cycle hook
	  	getContextForUi: function (event, index) {
	  		console.log(index)
	  		console.log(event)
	  		// With the above scripts loaded, you can call `tippy()` with a CSS
	  		// selector and a `content` prop:
	  		tippy('.news-item', {
	  		  content: 'Click To View Full Article',
	  		  placement: 'right'
	  		});
	  	} // placeTooltips END
	  
	  } // methods END

	}) // vue instance END

	// Connect and get data from API
	// GET request for remote image
	axios({
	  method: 'get',
	  // Call to the news api
	  url: 'http://newsapi.org/v2/everything?q=bitcoin&from=2020-07-03&sortBy=publishedAt&apiKey=4d3b541f038945ef8d06d25795556ce4'
	})
	  .then(function(response) {
	  // Add data from api to the vue app data above
	  app.news = response.data.articles
	  console.dir(app.news)
	  init()
	});
	// axios ENDS

	function init () {
		console.log('an init function outside of vue.js')
	}

})(); // iffe ENDS