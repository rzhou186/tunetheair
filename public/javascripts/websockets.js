/*
 * File: websockets.js
 * ----------------------------------------
 * Initializing all event listeners for connected websockets.
 *  
 */

function initSocket(socket){
  socket.on('newvideo', function(data) {
      document.getElementById('songqueue').innerHTML += get_yt_embed(data);
  });
}
