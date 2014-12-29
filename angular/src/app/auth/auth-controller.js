/**
 * Controllers of the utag.auth module
 */
angular
.module('utag.auth.controller', [])

/**
 * @ngdoc function
 * @name utag.auth.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the utag app
 */
.controller('AuthCtrl', function AuthCtrl($scope, $rootScope, $log, ngDialog, authSrvc) {
	'use strict';

	$scope.dialogShown = false;

	function showLoginDialog() {

		if (!$scope.dialogShown) {
			var dialog = ngDialog.open({
				templateUrl: '/utag/auth/login.html',
				controller: 'AuthLoginCtrl',
				className: 'ngdialog-theme-plain',
				scope: $scope,
			});
			$scope.dialogShown = true;

			dialog.closePromise.then(function (data) {
				$scope.dialogShown = false;
				// $log.info(data.id + ' has been dismissed.');
			});
		}

	};

	$rootScope.$on('event:auth-loginRequired', function(rejection) {
		// $log.info(rejection);
		showLoginDialog();
	});

})

/**
 * @ngdoc function
 * @name utag.auth.controller:AuthLoginCtrl
 * @description
 * # AuthLoginCtrl
 * Controller of the utag app
 */
.controller('AuthLoginCtrl', function AuthLoginCtrl($scope, $log, authSrvc) {
	'use strict';

	$scope.credentials = {username: '', password: ''};
	$scope.message = '';
	$scope.submit = function(credentials) {
		$scope.error = false;
		authSrvc.login(credentials, function(data) {
			$scope.closeThisDialog();
			// $log.info($scope);
			// $log.info(data);
		}, function(data) {
			$scope.error = true;
			$scope.message = data.error_description;
			// $log.info(data);
		});
	};
})

/**
 * @ngdoc function
 * @name utag.auth.controller:AuthRegisterCtrl
 * @description
 * # AuthRegisterCtrl
 * Controller of the utag app
 */
.controller('AuthRegisterCtrl', function AuthRegisterCtrl($scope, authSrvc) {
	'use strict';

	$scope.user = {username: '', email: '', password: ''};
	$scope.message = '';
	$scope.submit = function(user) {
		$scope.error = false;
		authSrvc.register(user, function(data) {
			$scope.closeThisDialog();
			// $log.info($scope);
			// $log.info(data);
		}, function(data) {
			$scope.error = true;
			$scope.message = data.error_description;
			// $log.info(data);
		});
	}

});
