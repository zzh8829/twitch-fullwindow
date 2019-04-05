function executeScripts(tabId, injectDetailsArray) {
	function createCallback(tabId, injectDetails, innerCallback) {
		return function () {
			chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
		};
	}
	var callback = null;
	for (var i = injectDetailsArray.length - 1; i >= 0; --i)
		callback = createCallback(tabId, injectDetailsArray[i], callback);
	if (callback !== null)
		callback();   // execute outermost function
}

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	if(details.url.indexOf("www.twitch.tv")>=0) {
		chrome.tabs.insertCSS(null, {file: "jquery-ui-1.10.4.custom.css"})
		executeScripts(null, [
			{ file: "jquery-2.1.1.js" },
			{ file: "jquery-ui-1.10.4.custom.js" },
			{ file: "twitchfullwindow.js" }
		])
	}
});