/*
 * File: websockets.js
 * ----------------------------------------
 * Initializing all event listeners for connected websockets.
 *  
 */

function initSocket(socket, roomName, roomID){

	/*
   * Listener: 'get room'
   * Sends the client's room name and ID back to the server
   * 
   */
 	socket.on('fetch room data', function () {
		socket.emit('subscribe', roomName, roomID);
  });



}