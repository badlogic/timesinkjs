app = angular.module("timesink", ['ui.bootstrap', 'infinite-scroll']);

app.config(function($routeProvider) {
	$routeProvider.otherwise( {templateUrl: "app/main.html", controller: "MainController"} )
});