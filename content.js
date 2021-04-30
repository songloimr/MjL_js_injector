/*
getInjectDataFromStorage().then(function(injectionData) {
	if (injectionData == undefined) return;
	//console.log(injectionData.jsInjection);
	try{
		var myJS = document.createElement("script");
		myJS.type = "text/javascript";
		myJS.innerHTML = injectionData.jsInjection;
		document.head.appendChild(myJS);
		console.log("---JS INJECTOR----");
		console.log(injectionData.jsInjection);
		console.log("---JS INJECTOR----");
	}catch(ex){
		console.err( ex );
	}
});
*/
function getHost() {
	var url = window.location.href;
	if (window.tab && window.tab.url) {
		url = tab.url;
	}
	return url.match(/[^\/]+\/\/[^\/]+/)[0];
}
chrome.storage.sync.get(getHost(), function(data) {
	var currentUrl = getHost();
	console.log("host: " + currentUrl);
	data = data[currentUrl];
	if (data == undefined) {
		console.log("data : undefined");
		return;
	}
	if (data.jsInjection == undefined){
		console.log("data.jsInjection : undefined");
		return;
	}
	var injectionData = data.jsInjection;
	
	try{
    	var codeJS = document.createElement("script");
			codeJS.type = "text/javascript";
			codeJS.innerHTML = injectionData;
			document.body.appendChild(codeJS);
		    
	}catch(ex){
	   console.err( ex );
	}

});


