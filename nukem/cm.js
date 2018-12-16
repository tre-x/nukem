//(c) 192000 https://ryland192000.github.io/homepage/
chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
  		id: "OpenHistory",
  		title: "View History", 
  		contexts:["browser_action"]
	});
	//passwords context menu
	chrome.contextMenus.create({
  		id: "OpenPasswords",
  		title: "View Passwords", 
  		contexts:["browser_action"]
	});
	//downloads context menu
	chrome.contextMenus.create({
  		id: "OpenDownloads",
  		title: "View Downloads", 
  		contexts:["browser_action"]
	});
});
chrome.contextMenus.onClicked.addListener(function(info,tab){
    if (info.menuItemId == "OpenHistory") {
        chrome.tabs.create({
            url: "chrome://history/"
        });
    };
});
chrome.contextMenus.onClicked.addListener(function(info,tab){
    if (info.menuItemId == "OpenDownloads") {
        chrome.tabs.create({
            url: "chrome://downloads/"
        });
    };
});
chrome.contextMenus.onClicked.addListener(function(info,tab){
    if (info.menuItemId == "OpenPasswords") {
        chrome.tabs.create({
            url: "chrome://settings/passwords/"
        });
    };
});