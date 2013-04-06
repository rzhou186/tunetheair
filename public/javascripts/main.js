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

});