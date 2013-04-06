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

	// Initialize Tinysong
	initTinysong();

  document.getElementById('yturl').addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) {
      socket.emit('addvideo', {'url': document.getElementById('yturl').value});
    }
  }, false);
});
