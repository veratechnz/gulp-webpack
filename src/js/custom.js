// All of the imports/requires
var axios = require('axios');
// This is a special kind of import/require for vue.js
// Vue needs additional files and build tools so this way works
// For our current gulp/webpack setup
import Vue from 'vue/dist/vue.js';	

(function(){

	console.log('vvv ttt');

	console.log(axios);
	console.log(Vue);

	var app = new Vue({
	  el: '#app',
	  data: {
	    message: 'Hello Vue!',
	    another: 'how are yue???'
	  }
	})

})(); // iffe ENDS ......