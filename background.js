//https://github.com/tre-x
var options = {
    NukeTabs: document.querySelector('#nuketabs'),
    NukeCache: document.querySelector('#nukecache'),
    NukePasswords: document.querySelector('#nukepwds'),
    NukeCookies: document.querySelector('#nukecookies'),
    NukeHistory: document.querySelector('#nukehistory'),
    NukeLocalStorage: document.querySelector('#nukels'),
    NukeDownloads: document.querySelector('#nukedownloads'),
    NukeWebSQL: document.querySelector('#nukewebsql'),
    NukePluginData: document.querySelector('#nukeplugindata'),
    NukeIndexedDB: document.querySelector('#nukeidb'),
    NukeFileSystems: document.querySelector('#nukefs'),
    NukeFormData: document.querySelector('#nukeformdata'),
    NukeServerBoundCertificates: document.querySelector('#nukesbc'),
    ANukeHistory: document.querySelector('#autonukehistory'),
    ANukeCookies: document.querySelector('#autonukecookies'),
    EnableNotifs: document.querySelector('#enablenotifs'),
    EnableActiveTab: document.querySelector('#enableactivetab')
}
function restore_options() { // MOVED OUTSIDE OF EVENT LISTENER
    for (var key in options) {
        var value = options[key]
        if (value) {
            var lsname = value.id
            if (localStorage.getItem(lsname) == 1) {
                value.checked = true
            } else if (localStorage.getItem(lsname) == 0) {
                value.checked = false
            }
        }
    }
}
function save_options() { // MOVED OUTSIDE OF EVENT LISTENER
    for (var key in options) {
        var value = options[key]
        if (value) {
            var lsname = value.id
            console.log(lsname + ' - ' + value.checked)
            if (value.checked) {
                localStorage.setItem(lsname, 1)
            } else {
                localStorage.setItem(lsname, 0)
            }
        }
    }
    setTimeout(function () {
        if (document.getElementById('save')) {
            document.getElementById('save').innerHTML = "SAVED"
        }
    }, 1500)
}

document.addEventListener('DOMContentLoaded', function () {
    restore_options()
    if (document.getElementById('save')) {
        document.getElementById('save').addEventListener('click', save_options)
    }
    if (document.getElementById('version')) {
        document.getElementById('version').children[0].innerHTML = chrome.runtime.getManifest().version
    }
})

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        localStorage.setItem('nukehistory', 1)
        localStorage.setItem('enablenotifs', 1)
        localStorage.setItem('enableactivetab', 0) // FIRST INSTALL BUG FIXED
        save_options()
    }
});


chrome.browserAction.onClicked.addListener(function (tab) {
    restore_options()
    //get item count
    var historyItemCount = 0
    var cookieCount = 0

    function getCount(callback) {
        chrome.history.search({
            text: "",
            maxResults: 10000
        }, function (results) {
            historyItemCount = historyItemCount + results.length
            var cookies = {
                start: function () {
                    return this.logCookies();
                },
                logCookies: function () {
                    for (var i = 0; i < results.length; i++) {
                        chrome.cookies.getAll({
                            'url': results[i].url
                        }, function (cookies) {
                            cookieCount = cookieCount + cookies.length
                        });
                    }
                }
            }
            cookies.start()
            callback()
        })
    }

    //notification functions

    var notify = function (type, callback) {
        if (type == 1) {
            if (localStorage.getItem('nukecookies') == 1 && localStorage.getItem('nukehistory') == 1) {
                chrome.notifications.create("notify_user", {
                    type: "basic",
                    iconUrl: "imgs/128.png", // NOTIFICATIONS BUG FIXED
                    title: "Nuke'm",
                    message: "Successfully nuked history entries and cookies from the current visited website!"
                }, callback)
            } else if (localStorage.getItem('nukecookies') == 1) {
                chrome.notifications.create("notify_user", {
                    type: "basic",
                    iconUrl: "imgs/128.png",
                    title: "Nuke'm",
                    message: "Successfully nuked " + cookieCount + " cookies from the current visited website!"
                }, callback)
            } else if (localStorage.getItem('nukehistory') == 1) {
                chrome.notifications.create("notify_user", {
                    type: "basic",
                    iconUrl: "imgs/128.png",
                    title: "Nuke'm",
                    message: "Successfully nuked all history entries from the current visited website!"
                }, callback)
            }
        } else if (type == 0) {
            if (localStorage.getItem('nukecookies') == 1 && localStorage.getItem('nukehistory') == 1) {
                chrome.notifications.create("notify_user", {
                    type: "basic",
                    iconUrl: "imgs/128.png",
                    title: "Nuke'm",
                    message: "Successfully nuked " + historyItemCount + " history item(s), " + cookieCount + " cookies, and enabled browsing data!"
                }, callback)
            } else if (localStorage.getItem('nukecookies') == 1) {
                chrome.notifications.create("notify_user", {
                    type: "basic",
                    iconUrl: "imgs/128.png",
                    title: "Nuke'm",
                    message: "Successfully nuked all " + cookieCount + " cookies!"
                }, callback)
            } else if (localStorage.getItem('nukehistory') == 1) {
                chrome.notifications.create("notify_user", {
                    type: "basic",
                    iconUrl: "imgs/128.png",
                    title: "Nuke'm",
                    message: "Successfully nuked all " + historyItemCount + " history item(s)!"
                }, callback)
            } else {
                chrome.notifications.create("notify_user", {
                    type: "basic",
                    iconUrl: "imgs/128.png",
                    title: "Nuke'm",
                    message: "Successfully nuked enabled browsing data!"
                }, callback)
            }
        }
    };

    //remove data
    if (localStorage.getItem('enableactivetab') == 0) {
        getCount(function () {
            chrome.browsingData.remove({}, {
                "appcache": Boolean(Number(localStorage.getItem('nukecache'))),
                "cache": Boolean(Number(localStorage.getItem('nukecache'))),
                "cacheStorage": Boolean(Number(localStorage.getItem('nukecache'))),
                "fileSystems": Boolean(Number(localStorage.getItem('nukefs'))),
                "formData": Boolean(Number(localStorage.getItem('nukeformdata'))),
                "indexedDB": Boolean(Number(localStorage.getItem('nukeidb'))),
                "pluginData": Boolean(Number(localStorage.getItem('nukeplugindata'))),
                "serverBoundCertificates": Boolean(Number(localStorage.getItem('nukesbc'))),
                "webSQL": Boolean(Number(localStorage.getItem('nukewebsql'))),
                "downloads": Boolean(Number(localStorage.getItem('nukedownloads'))),
                "passwords": Boolean(Number(localStorage.getItem('nukepwds'))),
                "cookies": Boolean(Number(localStorage.getItem('nukecookies'))),
                "localStorage": Boolean(Number(localStorage.getItem('nukels'))),
                "history": Boolean(Number(localStorage.getItem('nukehistory')))
            }, function () {
                console.log('nuked')
                //notify
                if (localStorage.getItem('enablenotifs') == 1) {
                    notify(0, function () {
                        if (localStorage.getItem('nukecookies') == 1) {
                            cookieCount = 0
                        }
                        if (localStorage.getItem('nukehistory') == 1) {
                            historyItemCount = 0
                        }
                    })
                }
            })

            if (localStorage.getItem('nuketabs') == 1) {
                chrome.tabs.query({}, function (tabArray) {
                    for (var i = 0; i <= tabArray.length - 1; i++) {
                        chrome.tabs.remove(tabArray[i].id);
                    }
                    chrome.tabs.create({
                        url: "chrome://newtab"
                    })
                });
            }
        })
    } else if (localStorage.getItem('enableactivetab') == 1) {
        getCount(function () {
            if (localStorage.getItem('nukehistory') == 1) {
                chrome.tabs.query({
                    'active': true,
                    'lastFocusedWindow': true
                }, function (tabs) {
                    var currentURL = tabs[0].url
                    chrome.history.search({
                        text: "",
                        maxResults: 10000
                    }, function (results) {
                        var ans = results.filter(function (result) {
                            if (result.url.startsWith(currentURL) == true) {
                                chrome.history.deleteUrl({
                                    url: result.url
                                });
                                console.log('history entry removed (' + result.url + ')')
                            }
                        });
                    });
                });
            }
            if (localStorage.getItem('nukecookies') == 1) {
                chrome.tabs.query({
                    'active': true,
                    'lastFocusedWindow': true
                }, function (tabs) {
                    var currentURL = tabs[0].url
                    var cookies = {
                        start: function () {
                            return this.logCookies();
                        },
                        logCookies: function () {
                            chrome.cookies.getAll({
                                'url': currentURL
                            }, function (cookies) {
                                for (var i = 0; i < cookies.length; i++) {
                                    chrome.cookies.remove({
                                        url: currentURL + cookies[i].path,
                                        name: cookies[i].name
                                    }, function () {
                                        console.log('cookie removed from ' + currentURL)
                                    });
                                }
                            });
                        }
                    }
                    cookies.start()
                })
            }
            if (localStorage.getItem('enablenotifs') == 1) {
                notify(1, function () {
                    if (localStorage.getItem('nukecookies') == 1) {
                        cookieCount = 0
                    }
                    if (localStorage.getItem('nukehistory') == 1) {
                        historyItemCount = 0
                    }
                })
            }
        })
    }
})