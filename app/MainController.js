app.controller("MainController", function($scope, Reddit) {
    $scope.reddit = Reddit;
    Reddit.nextPage();
});
