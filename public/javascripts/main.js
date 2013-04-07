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
  if (roomID !== undefined) {
    socket.emit('subscribe', roomID);
  }

	// Initialize room creating and joining
	$('#new-room').click(function(){
		// Ask for title of room
		socket.emit('new room', 'sample title');
	});

	// Initialize leave room button
	$('#leave-room').click(function(){

		clearCookie('roomID');
		location.reload();

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

  document.getElementById('submit-roomID').addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) {
      var id = document.getElementById('submit-roomID').value;
      alert("trying to subscribe to "+ id);
      socket.emit('subscribe', id);
    }
  }, false);

});

/*
 * Function: 'get_yt_embed'
 * returns just youtube id given a youtube url
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

/*
 * Function: 'get_yt_title'
 * Fetches Youtube video title
 */
function get_yt_title(ytid) {
  $.get('https://gdata.youtube.com/feeds/api/videos/' + ytid + '?v=2', function (data) {
    alert(data);
  });
}

