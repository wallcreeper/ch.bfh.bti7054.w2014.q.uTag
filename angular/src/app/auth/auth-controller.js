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
		if (!$scope.loginDialogOpen) {
			var dialog = ngDialog.open({
				name: 'login',
				controller: 'AuthLoginCtrl',
				templateUrl: '/utag/auth/login.html',
				className: 'ngdialog-theme-plain',
				// scope: $scope,
			});

			dialog.closePromise.then(function (data) {
				$scope.loginDialogOpen = false;
				// $log.info(data.id + ' has been dismissed.');
			});

			$scope.loginDialogOpen = true;
		}

		return $scope.loginDialogOpen;
	}

	function showRegisterDialog() {
		if (!$scope.registerDialogOpen) {
			var dialog = ngDialog.open({
				name: 'register',
				controller: 'AuthRegisterCtrl',
				templateUrl: '/utag/auth/register.html',
				className: 'ngdialog-theme-plain',
				// scope: $scope,
			});

			dialog.closePromise.then(function (data) {
				$scope.registerDialogOpen = false;
				// $log.info(data.id + ' has been dismissed.');
			});

			$scope.registerDialogOpen = true;
		}

		return $scope.registerDialogOpen;
	}

	$scope.loginDialogOpen = false;
	$scope.showLoginDialog = showLoginDialog;
	$scope.registerDialogOpen = false;
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

	$rootScope.$on('event:auth-loginCancelled', function(rejection) {
		// $log.info(rejection);
		$scope.showLoginDialog();
	});

	$scope.logout = authSrvc.logout;
	$scope.isAuthenticated = authSrvc.isAuthenticated;

})

/**
 * @ngdoc function
 * @name utag.auth.controller:AuthLoginCtrl
 * @description
 * # AuthLoginCtrl
 * Controller of the utag app
 */
.controller('AuthLoginCtrl', function AuthLoginCtrl($scope, $log, $controller, ngDialog, authSrvc) {
	'use strict';

	$controller('AuthBaseCtrl', { $scope: $scope });

	$scope.credentials = {username: '', password: ''};
	$scope.message = '';

	$scope.login = function(credentials) {
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
.controller('AuthRegisterCtrl', function AuthRegisterCtrl($scope, $log, $controller, ngDialog, authSrvc) {
	'use strict';

	$controller('AuthBaseCtrl', { $scope: $scope });

	$scope.user = {username: '', email: '', password: ''};
	$scope.message = '';

	$scope.register = function(user) {
		if (user.password === user.passwordConfirm) {

			$scope.error = false;
			authSrvc.register(user, function(data) {
				$scope.closeThisDialog();
				ngDialog.close('login');
				// $log.info($scope);
				// $log.info(data);
			}, function(data) {
				$scope.error = true;
				$scope.message = data.error_description;

				if (data.errors) {
					$scope.errors = data.errors;
				}
				// $log.info(data);
			});

		} else {
			$scope.error = true;
			$scope.message = "Passwords don't match";
		}
	};

});
