function getHost() {
	var url = window.location.href;
	if (window.tab && window.tab.url) {
		url = tab.url;
	}
	return url.match(/[^\/]+\/\/[^\/]+/)[0];
}
function getInjectDataFromStorage() {
	var currentUrl = getHost();
	return new Promise(function(resolve, reject) {
		chrome.storage.sync.get(currentUrl, function(data) {
			data = data[currentUrl];
			if (data == undefined) {
				resolve();
				return;
			}
			var injectData = {};
			if (data.jsInjection != undefined) injectData["jsInjection"] = data.jsInjection;
			resolve(injectData);
		});
	});
}
function saveInjectDataToStorage(jsInjection) {
	var currentUrl = getHost();
	var data = {};
	data[currentUrl] = {
		jsInjection: jsInjection
	};
	chrome.storage.sync.set(data);
}