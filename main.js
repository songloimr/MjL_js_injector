var tab;
var jsEditor;
var storage = chrome.storage.sync;
function redrawEditor(editor) {
	editor.resize();
	editor.renderer.updateFull();
	editor.focus();
}
function bindListeners() {
	document.querySelector("ul.tabs").addEventListener("click", function(event) {
		if (!event.target.classList.contains("tab")) return;
		redrawEditor(jsEditor);
	});
	jsEditor.on("change", function() {
		saveEditorContent();
	});
}
document.addEventListener("DOMContentLoaded", function() {
	jsEditor = ace.edit("jsEditor");
	jsEditor.setTheme("ace/theme/monokai");
	jsEditor.getSession().setMode("ace/mode/javascript");
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
		window.tab = tabs[0];
		loadEditorContent().then(bindListeners);
	})
});
function loadEditorContent() {
	return getInjectDataFromStorage().then(function(injectionData) {
		if (injectionData == undefined) return;
		jsEditor.setValue(injectionData.jsInjection);
	});
}
function saveEditorContent() {
	saveInjectDataToStorage(jsEditor.getValue());
}

function escapeCode(code) {
	return code.replace(/'/g, "\'").replace(/\r?\n/g, "\\n");
}