app = angular.module("timesink", [, 'infinite-scroll', 'wu.masonry']);

app.config(function($routeProvider) {
	$routeProvider.otherwise( {templateUrl: "app/main.html", controller: "MainController"} )
});