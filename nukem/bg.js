//(c) 192000 https://ryland192000.github.io/homepage/

//main
var ko = document.getElementById("tabs_option");var ko2 = document.getElementById("pwd_option");var ko3 = document.getElementById("cookie_option");var ko4 = document.getElementById("downloads_option");var ko5 = document.getElementById("bookmarks_option");var stext = document.getElementById("saved");
if (ko && ko2 && ko3 && ko4 && ko5 && stext) {
	function waiting(ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	function save_options() {
		localStorage["t_option"] = document.getElementById("tabs_option").value;
		localStorage["p_option"] = document.getElementById("pwd_option").value;
		localStorage["c_option"] = document.getElementById("cookie_option").value;
		localStorage["d_option"] = document.getElementById("downloads_option").value;
		localStorage["b_option"] = document.getElementById("bookmarks_option").value;
		localStorage["a_h_option"] = document.getElementById("nohistory_option").value;
		document.getElementById("saved").innerHTML = "Options saved";
		setTimeout(function () {
			document.getElementById("saved").innerHTML = "";
		}, 1500)
	}

	function restore_options() {
		var o1 = localStorage["t_option"];
		if (o1) {
			document.getElementById("tabs_option").value = o1;
		}
		var o2 = localStorage["p_option"];
		if (o2) {
			document.getElementById("pwd_option").value = o2;
		}
		var o3 = localStorage["c_option"];
		if (o3) {
			document.getElementById("cookie_option").value = o3;
		}
		var o4 = localStorage["d_option"];
		if (o4) {
			document.getElementById("downloads_option").value = o4;
		}
		var o5 = localStorage["b_option"];
		if (o5) {
			document.getElementById("bookmarks_option").value = o5;
		}
		var o6 = localStorage["a_h_option"];
		if (o6) {
			document.getElementById("nohistory_option").value = o6;
		}
	}
	document.addEventListener('DOMContentLoaded', restore_options);
	document.querySelector('#save').addEventListener('click', save_options);
}

var notify = function (msg) {
	chrome.notifications.create("notify_user", {
		type: "basic",
		iconUrl: "assets/icon4.png",
		title: "Nuke'm",
		message: msg,
	}, );
};

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.browsingData.remove({}, {
		"appcache": true,
		"cache": true,
		"fileSystems": true,
		"formData": true,
		"history": true,
		"indexedDB": true,
		"localStorage": true,
		"pluginData": true,
		"serverBoundCertificates": true,
		"webSQL": true
	}, notify("All browsing data and configured browsing data has been cleared!"));
	var ktabs = localStorage["t_option"];
	var kpwds = localStorage["p_option"];
	var kcookies = localStorage["c_option"];
	var kdownloads = localStorage["d_option"];
	var kbookmarks = localStorage["b_option"];
	if (ktabs == "Yes") {
		chrome.tabs.query({}, function (tabArray) {

			for (var i = 0; i <= tabArray.length - 1; i++) {
				chrome.tabs.remove(tabArray[i].id);
			}
			chrome.tabs.create({
				url: "chrome://newtab"
			})
		});
	} else {
		console.log("halted tab clearing")
	}
	if (kdownloads == "Yes") {
		chrome.browsingData.remove({}, {
			"downloads": true
		});
	}
	if (kpwds == "Yes") {
		chrome.browsingData.remove({}, {
			"passwords": true
		});
	}
	if (kcookies == "Yes") {
		chrome.browsingData.remove({}, {
			"cookies": true
		});
	}
	if (kbookmarks == "Yes") {
		chrome.bookmarks.getTree(process_bookmark)

		function process_bookmark(bookmarks) {
			for (var i = 0; i < bookmarks.length; i++) {
				var bookmark = bookmarks[i];
				if (bookmark.url) {
					chrome.bookmarks.remove(bookmark.id)
				}
				if (bookmark.children) {
					process_bookmark(bookmark.children);
				}
			}
		}
	};
})

//options page
var tooltip = document.querySelectorAll('.tooltip');
document.addEventListener('mousemove', fn, false);

function fn(e) {
	for (var i = tooltip.length; i--;) {
		tooltip[i].style.left = e.pageX + 'px';
		tooltip[i].style.top = e.pageY + 'px';
	}
}