/*
 * File: main.js
 * ----------------------------------------
 * Initializes web application.
 * 
 */

/* -------------------- Webpage Initialization -------------------- */

$(document).ready(function(){

	// Initialize Socket.io
	var socket = io.connect(window.location.hostname);
	initSocket(socket);

  document.getElementById('yturl').addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) {
      socket.emit('addvideo', {'url': document.getElementById('yturl').value});
    }
  }, false);
});

/* -------------------- Gets youtube embed code for a particular youtube URL -------------------- */

function get_yt_embed(url) {
  var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  if(videoid != null) {
    return "<iframe id=\"ytplayer\" type=\"text/html\" width=\"640\" height=\"390\" src=\"http://www.youtube.com/embed/" + videoid[1] + "?autoplay=1&origin=http://example.com\" frameborder=\"0\"/>";
  } else {
    alert('Could not find youtube video id');
  }
}
