//(c) 192000 https://ryland192000.github.io/homepage/
chrome.history.onVisited.addListener(function(HistoryItem) {
    var o = localStorage["autonukehistory"];
	
	var o2 = localStorage["autonukecookies"]
	
	if (o == 1) {
	    chrome.history.deleteUrl({
        	url: HistoryItem.url
    });
	}
	
	if (o2 == 1) {
		var cookies = {
			
			start: function() {
				return this.logCookies();
			},
			
			logCookies: function() {
				
				return new Promise(function(resolve,reject){
					
					function remove(cookies){
						for (var i = 0; i < cookies.length; i++) {
							chrome.cookies.remove({url: HistoryItem.url + cookies[i].path, name: cookies[i].name},function(){
								console.log('cookie removed!')
							});
						}
						resolve()
					}
					
					chrome.cookies.getAll({
						'url': HistoryItem.url
					}, function(cookies) {
						remove(cookies)
					});
					
				})
			}
		}
		
		cookies.start()

	}
});