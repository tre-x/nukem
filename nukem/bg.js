//(c) 192000 https://192000.github.io/192000/

var options = {
	NukeTabs: document.querySelector('#nuketabs'),
	NukeCache: document.querySelector('#nukecache'),
	NukePasswords: document.querySelector('#nukepwds'),
	NukeCookies: document.querySelector('#nukecookies'),
	NukeHistory: document.querySelector('#nukehistory'),
	NukeLocalStorage: document.querySelector('#nukels'),
	NukeDownloads: document.querySelector('#nukedownloads'),
	ANukeHistory: document.querySelector('#autonukehistory'),
	ANukeCookies: document.querySelector('#autonukecookies'),
	EnableNotifs: document.querySelector('#enablenotifs')
}

document.addEventListener('DOMContentLoaded', function(){
	
	function restore_options(){
		for(var key in options) {
			var value = options[key]
			if (value) {
				var lsname = value.id
				if (localStorage.getItem(lsname) == 1){
					value.checked = true
				} else if (localStorage.getItem(lsname) == 0){
					value.checked = false
				}
			}
		}
	}
	
	function save_options() {
		for(var key in options) {
			var value = options[key]
			if (value) {
				var lsname = value.id
				console.log(lsname + ' - ' + value.checked)
				if (value.checked) {
					localStorage.setItem(lsname,1)
				}else {
					localStorage.setItem(lsname,0)
				}
			}
		}
		document.getElementById("saved").innerHTML = "Saved";
		setTimeout(function () {
			document.getElementById("saved").innerHTML = "";
		}, 1500)
	}
	
	if (document.querySelector('#save')){
		document.querySelector('#save').addEventListener('click', save_options);
	}
	
	restore_options()
	
})

var notify = function () {
    chrome.notifications.create("notify_user", {
        type:    "basic",
        iconUrl: "assets/newicon4.png",
        title:   "Nuke'm",
        message: "All Browsing Data has been nuked!",
    },
    );
};

chrome.browserAction.onClicked.addListener(function(tab) {
	
	chrome.browsingData.remove({}, {
		"appcache": Boolean(Number(localStorage.getItem('nukecache'))),
		"cache": Boolean(Number(localStorage.getItem('nukecache'))),
		"cacheStorage": Boolean(Number(localStorage.getItem('nukecache'))),
		"fileSystems": true,
		"formData": true,
		"indexedDB": true,
		"pluginData": true,
		"serverBoundCertificates": true,
		"webSQL": true,
		"downloads": Boolean(Number(localStorage.getItem('nukedownloads'))),
		"passwords": Boolean(Number(localStorage.getItem('nukepwds'))),
		"cookies": Boolean(Number(localStorage.getItem('nukecookies'))),
		"localStorage": Boolean(Number(localStorage.getItem('nukels'))),
		"history": Boolean(Number(localStorage.getItem('nukehistory')))
	},function(){
		console.log('nuked')
		if (localStorage.getItem('enablenotifs') == 1) {
			notify()
		}
	})
	
	if (localStorage.getItem('nuketabs') == 1) {
		chrome.tabs.query({}, function (tabArray) {
			for (var i = 0; i <= tabArray.length-1; i++) {
                chrome.tabs.remove(tabArray[i].id);
        	}
            chrome.tabs.create({
            	url: "chrome://newtab"
			})
		});
	}
	
})

var manifestData = chrome.runtime.getManifest();

if (document.getElementById('version')) {
	document.getElementById('version').children[0].innerHTML = manifestData.version
}