(function() {

	"use strict";

	angular
		.module("classifieds")
		.factory("classifiedsFactory", function($http,$firebaseArray) {

			var ref = new Firebase('https://billyclassifieds.firebaseio.com/');
			
			return {
				ref: $firebaseArray(ref)
			}
		});

})();