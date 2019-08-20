app.controller('loginCtrl', function ($rootScope, $scope, $location, server, $uibModal) {

	$scope.email = "analyst7@appleseeds.org.il";
	$scope.pass = "123";

	$scope.error_password = false;
	$scope.login = function () {
		if (!$scope.pass || !$scope.email) {
			$scope.errorText = "נא להזין פרטי משתמש";
			$scope.error_password = true;
			// alert("נא להזין פרטי משתמש");
			return;
		}
		
		var data = { pass: $scope.pass, email: $scope.email };
		server.requestPhp(data, "login").then(function (data) {
			if (data['error']) {
				// alert(data['error']);
				$scope.errorText = "אימייל או סיסמה שגויים";
				$scope.error_password = true;
			}
			if (data['token']) {
				$rootScope.userToken = data['token'];
				$rootScope.isAdmin = data['isAdmin'] == 1;
				$rootScope.myEmail = $scope.email;
				localStorage.token = data.token;
				localStorage.isAdmin = $rootScope.isAdmin;
				// $location.path('courses');
				// $scope.isFirstEnter = true;
				// Getting user info and putting on rootscope for use of header directive
				var data = {};
				$rootScope.activeUser = {};
				server.requestPhp(data, 'GetMyProfile').then(function (data) {
				    $rootScope.activeUser = data;
				    $rootScope.activeUser.image = ($rootScope.activeUser.image) ? $rootScope.activeUser.image : "img/userBig.png";
				    localStorage.setItem('activeUser', JSON.stringify($rootScope.activeUser));
				});
				$location.path('courses');
			}
		});
	}

	$scope.hideError = function () {
		$scope.error_password = false;
	
	}
// modal functionality of forgot password is not completed no logic was implemented.
	$scope.open = function () {
		  var modalInstance = $uibModal.open({
		  templateUrl: 'app/login/forgotpwmodal.html',
		  controller: 'forgotpwCtrl'
		  });
		}

		
		  

	// var waitingForServer=false;
	// $scope.forgotPass={};
	// $scope.forgotPass.resetMail="";
	// $scope.sendForgotPassMail = function () {
	// 	if(waitingForServer)
	// 		return;
	// 	waitingForServer=true;
	//     var data = {};
	// 	data.email=$scope.forgotPass.resetMail;
	//     server.requestPhp(data, "InitPassApp").then(function (data) {
	// 		waitingForServer=false;
	// 		alert("מייל עם לינק לשחזור סיסמה נשלח לכתובת שהוזנה");
	// 		$scope.forgotPass.resetPass = false;
	// 	});
	// }
});
