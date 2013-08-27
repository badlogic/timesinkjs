app.factory("Reddit", function ($http) {
    var items = [];
    var busy = false;
    var after = '';

    var Reddit = {};

    Reddit.getThumbnail = function(item) {
        if(item.url.contains("imgur")) {
            if(!item.url.contains("/a/")) {
                var lcUrl = item.url.toLowerCase();
                if(lcUrl.endsWith(".png") || lcUrl.endsWith(".jpg") || lcUrl.endsWith(".gif")) {
                    item.thumbnail = item.url.substring(0, item.url.length - 4) + "s.jpg";
                } else {
                    item.thumbnail = item.url + "s.jpg";
                }
            }
        } else if(item.url.contains("youtube") || item.url.contains("youtu.be")) {

        } else if(item.media) {
            console.log(JSON.stringify(item.media));
        }
    }

    Reddit.nextPage = function () {
        if (busy) return;
        busy = true;

        var url = "http://api.reddit.com/hot?after=" + after + "&jsonp=JSON_CALLBACK";
        $http.jsonp(url).success(function (data) {
            var children = data.data.children;
            for (var i = 0; i < children.length; i++) {
                Reddit.getThumbnail(children[i].data);
                items.push(children[i].data);
            }
            after = "t3_" + items[items.length - 1].id;
            busy = false;
        });
    };

    Reddit.getItems = function() {
        return items;
    }

    Reddit.isBusy = function() {
        return busy;
    }

    return Reddit;
});