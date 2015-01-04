/**
 * @ngdoc service
 * @name utag.utils:colorHash
 * @description
 * # colorHash
 * Service in the utag app.
 */
angular
.module('utag.utils')
.factory('colorHash', function colorHash() {
	'use strict';

	return {
		hash: function(inputString, alpha) {
			inputString = inputString.trim();
			inputString = inputString.split('');
			console.log(inputString, alpha);
			var r = 0;
			var g = 0;
			var b = 0;

			for (var i in inputString) {
				// The magic numbers we multiply with are large-ish prime numbers.
				r += (Math.pow(inputString[i].charCodeAt(0), 3) * 11353);
				g += (Math.sqrt(inputString[i].charCodeAt(0)) * 28541);
				b += (Math.sin(inputString[i].charCodeAt(0)) * 66863);
			}
			r = Math.abs(Math.floor(r % 255));
			g = Math.abs(Math.floor(g % 255));
			b = Math.abs(Math.floor(b % 255));

			var rgb = 'rgb('+r+', '+g+', '+b+')';

			if (!alpha && alpha !== 0) {
				alpha = 1;
			}

			var rgba = 'rgba('+r+', '+g+', '+b+', '+alpha+')';

			var hex = '#';

			hex += ('00' + r.toString(16)).substr(-2,2).toUpperCase();
			hex += ('00' + g.toString(16)).substr(-2,2).toUpperCase();
			hex += ('00' + b.toString(16)).substr(-2,2).toUpperCase();

			return {
				r: r,
				g: g,
				b: b,
				rgb: rgb,
				rgba: rgba,
				hex: hex
			};
		}
	};

});
