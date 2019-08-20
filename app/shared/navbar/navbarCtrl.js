app.controller("navbarCtrl", function ($scope, $rootScope, server, $location, $timeout) {



    $scope.isOpen = false
    $scope.openSide = function () {
        $scope.isOpen = true
    }

    $scope.closeSide = function () {
        $scope.isOpen = false;
    }

    // $scope.usermenu=false;

    $scope.usermenuclick = function () {
        $scope.usermenu = !$scope.usermenu;

    }

    // $location.absUrl().includes("staff");

    $scope.menuIndex = function () {
        if ($location.path() === "/courses") {
            return "קורסים - נא לעבור לתצוגת מובייל בדפדפן!";
        } else if ($location.absUrl().includes("staff")) {
            return "עובדים";
        } else if ($location.absUrl().includes("student")) {
            return "חניכים";
        } else if ($location.absUrl().includes("new")) {
            return "משתמשים חדשים";
        } else if ($location.path() === "/hours-report") {
            return "דיווח שעות";
        } else if ($location.path() === "/hours-approve") {
            return "אישור שעות";
        }
    }

    $scope.logout = function(){
		var data = {token : $rootScope.userToken};
		server.requestPhp(data, 'logout').then(function (data) {
			loginStatus	=false;
			$rootScope.userToken = "";
			$rootScope.activeUser = {};
            $rootScope.isAdmin = false;
            localStorage.removeItem("loginToken");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("activeUser");
			$location.path('/');
		});
    }

    $scope.navNavigation = function(navTo) {
        $scope.isOpen = false;
        $timeout(function() {
            $location.path(navTo)
        }, 400);
    }
    
})