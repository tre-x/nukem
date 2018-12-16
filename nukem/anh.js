//(c) 192000 https://ryland192000.github.io/homepage/
chrome.history.onVisited.addListener(function(HistoryItem) {
    var o = localStorage["a_h_option"];
	if (o == "Yes") {
	    chrome.history.deleteUrl({
        	"url": HistoryItem.url
    });
	}
});