/**
 * Controllers of the utag.auth module
 */
angular
.module('utag.auth.controller', [])

/**
 * @ngdoc function
 * @name utag.auth.controller:AuthBaseCtrl
 * @description
 * # AuthBaseCtrl
 * Controller of the utag app
 */
.controller('AuthBaseCtrl', function AuthBaseCtrl($scope, $log, ngDialog) {
	'use strict';

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

	}

	function showRegisterDialog() {

		if (!$scope.dialogShown) {
			var dialog = ngDialog.open({
				templateUrl: '/utag/auth/register.html',
				controller: 'AuthRegisterCtrl',
				className: 'ngdialog-theme-plain',
				scope: $scope,
			});
			$scope.dialogShown = true;

			dialog.closePromise.then(function (data) {
				$scope.dialogShown = false;
				// $log.info(data.id + ' has been dismissed.');
			});
		}

	}

	$scope.dialogShown = false;
	$scope.showLoginDialog = showLoginDialog;
	$scope.showRegisterDialog = showRegisterDialog;

})

/**
 * @ngdoc function
 * @name utag.auth.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the utag app
 */
.controller('AuthCtrl', function AuthCtrl($scope, $rootScope, $log, $controller, authSrvc) {
	'use strict';

	$controller('AuthBaseCtrl', { $scope: $scope });

	$rootScope.$on('event:auth-loginRequired', function(rejection) {
		// $log.info(rejection);
		$scope.showLoginDialog();
	});

	$scope.logout = authSrvc.logout;
	$scope.isAuthenticated = authSrvc.isAuthenticated;

	console.log($scope.isAuthenticated);

})

/**
 * @ngdoc function
 * @name utag.auth.controller:AuthLoginCtrl
 * @description
 * # AuthLoginCtrl
 * Controller of the utag app
 */
.controller('AuthLoginCtrl', function AuthLoginCtrl($scope, $log, $controller, authSrvc) {
	'use strict';

	$controller('AuthBaseCtrl', { $scope: $scope });

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
.controller('AuthRegisterCtrl', function AuthRegisterCtrl($scope, $log, $controller, authSrvc) {
	'use strict';

	$controller('AuthBaseCtrl', { $scope: $scope });

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
	};

});
