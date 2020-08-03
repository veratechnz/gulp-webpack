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
	    message: 'Hello Vue!',
	    another: 'how are you too?'
	  }
	})

})(); // iffe ENDS ......