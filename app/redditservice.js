app.factory("Reddit", function ($http) {
    var defaultReddits = [
        {name: "frontpage", url: ""},
        {name: "all", url: "r/all"},
        {name: "funny", url: "r/funny"},
        {name: "pics", url: "r/pics"},
        {name: "videos", url: "r/videos"},
        {name: "fullmoviesonyoutube", url: "r/fullmoviesonyoutube"}
    ];

    var items = [];
    var busy = false;
    var after = '';
    var subreddits =  localStorage.getItem("subreddits");
    if(subreddits == null) {
        subreddits = defaultReddits.slice(0);
    } else {
        subreddits = JSON.parse(subreddits);
    }
    var subreddit = subreddits[0];
    var modes = [ "hot", "new", "rising", "controversial", "top"];
    var mode = modes[0];

    var Reddit = {};

    Reddit.getThumbnail = function(item) {
        item.image = null;

        // imgur
        if(item.url.contains("imgur")) {
            if(!item.url.contains("/a/")) {
                var lcUrl = item.url.toLowerCase();
                if(lcUrl.endsWith(".png") || lcUrl.endsWith(".jpg") || lcUrl.endsWith(".gif")) {
                    item.thumbnail = item.url.substring(0, item.url.length - 4) + "m.jpg";
                    item.image = item.url.substring(0, item.url.length - 4) + ".jpg";
                } else {
                    item.thumbnail = item.url + "m.jpg";
                    item.image = item.url + ".jpg";
                }
            } else {
                // gallery...
            }
        }
        // youtube
        else if(item.url.contains("youtube") || item.url.contains("youtu.be")) {
            var id = parseYoutubeId(item.url);
            if(id) {
                item.thumbnail = "http://i1.ytimg.com/vi/" + id + "/mqdefault.jpg";
                item.image = item.url;
            }
        }

        // self post
        else if(!item.thumbnail.contains("http") && item.thumbnail.length > 0) {
            item.thumbnail = null;
            return;
        }

        if(item.image) item.image = item.url;
    }

    Reddit.nextPage = function (callback) {
        if (busy) return;
        busy = true;

        var url = "http://api.reddit.com/" + subreddit.url + "/" + mode + "?after=" + after + "&jsonp=JSON_CALLBACK";
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

    Reddit.getSubReddits = function() {
        return subreddits;
    }

    Reddit.getModes = function() {
        return modes;
    }

    Reddit.setMode = function(m) {
        mode = m;
        Reddit.load();
    }

    Reddit.setSubReddit = function(r) {
        if(!r.name) {
            for(var i = 0; i < subreddits.length; i++) {
                if(subreddits[i].name === r) {
                    r = subreddits[i];
                }
            }
        }
        if(!subreddit) return;
        subreddit = r;
        Reddit.load();
    }

    Reddit.getSubReddit = function() {
        return subreddit;
    }

    Reddit.isBusy = function() {
        return busy;
    }

    Reddit.load = function() {
        items = []
        after = "";
        busy = false;
        Reddit.nextPage();
    }

    Reddit.addSubReddit = function(r) {
        if(!r || r.trim().length == 0) return;

        for(var i = 0; i < subreddits.length; i++) {
            if(subreddits[i].name === r) return;
        }
        subreddits.push({name: r, url: "r/" + r});
        localStorage.setItem("subreddits", JSON.stringify(subreddits));
    }

    Reddit.clear = function() {
        subreddits = defaultReddits;
        localStorage.removeItem("subreddits");
    }
    return Reddit;
});