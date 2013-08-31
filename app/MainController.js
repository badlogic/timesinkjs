app.controller("MainController", function($scope, Reddit) {
    $scope.reddit = Reddit;
    $scope.subreddit = Reddit.getSubReddits()[0];
    $scope.mode = Reddit.getModes()[0];
    Reddit.load();

    $scope.changeReddit = function () {
        Reddit.setSubReddit($scope.subreddit);
    }

    $scope.changeMode = function () {
        Reddit.setMode($scope.mode);
    }

    $scope.addSubReddit = function() {
        Reddit.addSubReddit($scope.newReddit);
        $scope.newReddit = "";
    }

    $scope.clear = function() {
        $scope.subreddit = Reddit.getSubReddits[0];
        Reddit.clear();
    }
});
