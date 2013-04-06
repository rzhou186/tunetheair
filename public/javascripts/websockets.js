/*
 * File: websockets.js
 * ----------------------------------------
 * Initializing all event listeners for connected websockets.
 *  
 */

function initSocket(socket, roomID){

	/*
   * Listener: 'get room'
   * Sends the client's room name and ID back to the server
   * 
   */
 	socket.on('fetch room data', function () {
		socket.emit('subscribe', roomID);
  });

  /*
   * Listener: 'join room'
   * 
   * 
   */
  socket.on('join room', function (playlist) {

    // Append all videos in the current playlist to the     
    for (var i=0; i<playlist.length; i++){

      document.getElementById('songqueue').innerHTML += get_yt_embed(data);

    }

  });
  
  /*
   * Listener: 'newvideo'
   * Appends a new video to the DOM
   * 
   */
  socket.on('newvideo', function(data) {
    document.getElementById('songqueue').innerHTML = get_yt_embed(data);
  });

}