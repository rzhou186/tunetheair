/*
 * File: websockets.js
 * ----------------------------------------
 * Initializing all event listeners for connected websockets.
 *  
 */

function initSocket(socket){
  socket.on('newvideo', function(data) {
    alert(data); // TODO should add the video to the queue here
  });
}
