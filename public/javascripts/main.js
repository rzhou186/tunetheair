/*
 * File: main.js
 * ----------------------------------------
 * Initializes web application.
 * 
 */

/* -------------------- Webpage Initialization -------------------- */

$(document).ready(function(){

	// Check cookies for current room name and ID (if any)
	var roomName = getCookie('roomName');
	var roomID = getCookie('roomID');

	// Initialize Socket.io
	var socket = io.connect(window.location.hostname);
	initSocket(socket, roomName, roomID);

});