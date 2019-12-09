//https://github.com/tre-x
chrome.history.onVisited.addListener(function (HistoryItem) { // user visits website
    var o = localStorage["autonukehistory"]; //get settings

    var o2 = localStorage["autonukecookies"]

    if (o == 1) { //if autonuke history is enabled
        chrome.history.deleteUrl({
            url: HistoryItem.url //delete the websites history entry
        });
    }

    if (o2 == 1) { //if autonuke cookies is enabled
        var cookies = {

            start: function () {
                return this.logCookies(); //get cookies
            },

            logCookies: function () {

                return new Promise(function (resolve, reject) { //gather

                    function remove(cookies) { //remove function
                        for (var i = 0; i < cookies.length; i++) { //for every cookie gathered
                            chrome.cookies.remove({
                                url: HistoryItem.url + cookies[i].path, //only remove the websites cookies
                                name: cookies[i].name
                            }, function () {
                                console.log('cookie removed!')
                            });
                        }
                        resolve()
                    }

                    chrome.cookies.getAll({ //get all cookies
                        'url': HistoryItem.url //from website
                    }, function (cookies) {
                        remove(cookies) // start removal process for every cookie on that site
                    });

                })
            }
        }

        cookies.start() //execute

    }
});
