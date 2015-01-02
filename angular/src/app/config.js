/**
 * @ngdoc config
 * @name utag.config
 * @description
 * # Config
 * Config for the utag app.
 */

var config = {
	'APP_NAME':			'uTag',
	'APP_VERSION':		'0.1',
	'API_PREFIX':		'api/v1/'
};

var config_module = angular.module('utag.config', []);

angular.forEach(config, function(value, key) {
	'use strict';

	config_module.constant(key, value);
});
