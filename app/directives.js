app.directive('masonry', function ($parse) {
    return {
        restrict: 'AC',
        link: function (scope, elem, attrs) {
            elem.masonry({ itemSelector: '.masonry-item', columnWidth: $parse(attrs.masonry)(scope) });
        }
    };
});

app.directive('masonryItem', function () {
    return {
        restrict: 'AC',
        link: function (scope, elem, attrs) {
            elem.imagesLoaded(function () {
                elem.parents('.masonry').masonry('reload');
            });
        }
    };
});