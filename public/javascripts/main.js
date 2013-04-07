/*
 * File: main.js
 * ----------------------------------------
 * Initializes web application.
 * 
 */

/* -------------------- Webpage Initialization -------------------- */

$(document).ready(function(){

  // Download the iframe API
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	// Check cookies for current room name and ID (if any)
	var roomID = getCookie('roomID');

	// Initialize Socket.io
	var socket = io.connect(window.location.hostname);
	initSocket(socket, roomID);

	// Initialize room creating and joining
	$('#new-room').click(function(){
		// Ask for title of room
		socket.emit('new room', 'sample title');
	});

	$('#join-room').click(function(){
		socket.emit('subscribe', 1);
	});

  document.getElementById('yturl').addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) {
      var url = document.getElementById('yturl').value;
      if (get_yt_embed(url) != "") {
        socket.emit('addvideo', {'url': document.getElementById('yturl').value});
      } else {
        alert('That doesn\'t look like a valid youtube URL.');
      }
    }
  }, false); 

});

/*
 * Function: 'get_yt_embed'
 * Fetches Youtube embed code and returns it
 * 
 */
function get_yt_embed(url) {
  var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  if(videoid != null) {
  return videoid[1];
  //  return "<iframe id=\"ytplayer\" type=\"text/html\" width=\"640\" height=\"390\" src=\"http://www.youtube.com/embed/" + videoid[1] + "?autoplay=1\" frameborder=\"0\"/>";
  } else {
    return "";
  }
}
