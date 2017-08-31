var SM = (function () {

    var my = {};

    my.get = function (key) {
        return localStorage.getItem(key);
    }
    my.put = function (key, value) {
        return localStorage.setItem(key, value);
    }
    my.delete = function (key) {
        return localStorage.removeItem(key);
    }
    
    return my;

}());

var GB = (function (SM) {
    var my = {};

    my.rotateTheseSites = [
        «google.ru»,
        «mail.ru»,
        «Yandex.ru»,
        «Lenta.ru»,
    ]
    
    if (!SM.get("urllist")) {
        SM.put("urllist", JSON.stringify(my.rotateTheseSites));
    }
    
    my.getRotatingSites = function () {
        return JSON.parse(SM.get("urllist"));
    }
    
    my.setWatchThisInstead = function (value) {
        var prot = /^http|chrome-extension/i;
        if (value.match(prot)) {
            SM.put("instead", value);
        } else {
            SM.put("instead", "http://" + value);
        }
        return SM.get("instead");
    }

    my.getWatchThisInstead = function () {
        return SM.get("instead");        
    }
    
    my.addRotatingSite = function (site) {
        my.rotatingSites = JSON.parse(SM.get("urllist"));
        my.rotatingSites[site] = "Custom Add";
        SM.put("urllist", JSON.stringify(my.rotatingSites));
    }

    my.removeRotatingSite = function (site) {
        my.rotatingSites = JSON.parse(SM.get("urllist"));
        delete my.blockedSites[site];
        SM.put("urllist", JSON.stringify(my.rotatingSites));
    }
    
    return my;
}(SM));