// All of the imports/requires
var axios = require('axios');
// A special/work-around kind of import/require for vue.js
// Vue needs additional files and build tools so this way works
// for our current gulp/webpack setup:
import Vue from 'vue/dist/vue.js';	

(function(){

	// Setup the vue instance
	var app = new Vue({
	  el: '#app',
	  data: {
	    message: 'Today\'s Reporters:',
	    another: 'how are you too?',
	    news: false
	  }
	})

	// Connect and get data from API
	// GET request for remote image
	axios({
	  method: 'get',
	  url: 'http://newsapi.org/v2/everything?q=bitcoin&from=2020-07-03&sortBy=publishedAt&apiKey=4d3b541f038945ef8d06d25795556ce4'
	})
	  .then(function(response) {
	  // console.log(response.data)
	  app.news = response.data.articles
	  console.dir(app.news)
	});

})(); // iffe ENDS ......