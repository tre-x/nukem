//(c) 192000 https://192000.github.io/192000/

var options = {
	NukeTabs: document.querySelector('#nuketabs'),
	NukePasswords: document.querySelector('#nukepwds'),
	NukeCookies: document.querySelector('#nukecookies'),
	NukeHistory: document.querySelector('#nukehistory'),
	NukeLocalStorage: document.querySelector('#nukels'),
	NukeDownloads: document.querySelector('#nukedownloads'),
	NukeBookmarks: document.querySelector('#nukebookmarks'),
	ANukeHistory: document.querySelector('#autonukehistory'),
	ANukeCookies: document.querySelector('#autonukecookies'),
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
		"appcache": true,
		"cache": true,
		"cacheStorage": true,
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
		notify()
	})
	
})

var manifestData = chrome.runtime.getManifest();

if (document.getElementById('version')) {
	document.getElementById('version').children[0].innerHTML = manifestData.version
}