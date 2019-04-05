var isLoaded = false;

isReserved = function(url) {
	// Match Exactly e.g. http://www.twitch.tv/inbox
	reserved1 = ["","inbox","outbox"];
	for(i in reserved1) {
		if(!url.localeCompare("http://www.twitch.tv/"+reserved1[i]))
			return true;
	}
	// Match http://twitch.tv* /p/ *
	reserved2 = ["inbox","outbox","directory","c","b","p","message","customer","team"];
	for(i in reserved2) {
		if(url.indexOf("/"+reserved2[i]+"/")>=0){
			return true;
		}
	}
	return false;
}

enterFullwindow = function() {

	streamer = location.href.substring(20).replace(/\//g,"");

	if($("#right_close").attr("class").indexOf("open")>=0) {
		$("#right_close")[0].click();
	}
	$("#right_close").css("display","none");

	$("#player").prependTo("div.js-directory");
	$("#player").removeClass("dynamic-player");

	opacity = 0.6;
	color = "#6A4E9E";

	$("body").prepend('<div id="zc-wrapper" style="opacity:'+opacity+';z-index:2147483647;height:520px;width:300px;left:'+($("body").width()-350)+'px;top:50px;position:absolute;"><div id="zc-dialog" style="background-color:'+color+';height:100%;width:100%;"><div id="zc-title" style="cursor:move;text-align:center;font-family:arial;color:#FFF;">Twitch Chat</div><div id="zc-content" style="padding-left:5px;width:calc(100% - 10px);height:calc(100% - 25px);"><iframe id="zc" frameborder="0" src="http://www.twitch.tv/'+streamer+'/chat" style="width:100%;height:100%;"></iframe></div></div></div>');
	$("#zc-wrapper").draggable({
		handle: "#zc-title",
	});
	$("#zc-wrapper").resizable({
		handles: 'all',
		start: function(){
			// Fix mouse issue with iframe and flash player
			ifr = $('iframe');
			var d = $('<div></div>');
			$('#zc-wrapper').append(d[0]);
			d[0].id = 'temp_div';
			d.css({position:'absolute'});
			d.css({top: $("body").position().top, left:0});
			d.height($("body").height());
			d.width($("body").width());
		},
		stop: function(){
			$('#temp_div').remove();
		}
	});

	$("#twitchfullwindow").unbind("click");
	$("#twitchfullwindow span").html("Exit Fullwindow");
	$("#twitchfullwindow").click(function() {
		exitFullwindow();
	})
}

exitFullwindow = function() {
	location.reload();
}

$(document).ready(function() {
	if(isReserved(location.href)){
		console.log("reserved");
		return;
	}
	if(isLoaded) {
		console.log("loaded");
		return;
	}
	console.log("loading")

	if(!$('#twitchfullwindow').length) {
		var buttons = $("#channel > div > div.stats-and-actions > div.channel-actions")
		var fullwindow = '<span id="twitchfullwindow" class="ember-view button action"><span>Fullwindow</span></span>'
		buttons.append(fullwindow)

		$("#twitchfullwindow").click(function() {
			enterFullwindow();
		})
	}
	isLoaded = true;
});
