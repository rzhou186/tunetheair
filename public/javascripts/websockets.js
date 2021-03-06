/*
 * File: websockets.js
 * ----------------------------------------
 * Initializing all event listeners for connected websockets.
 *  
 */

function initSocket(socket, roomID){

	/*
   * Listener: 'fetch room data'
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
  socket.on('join room', function (roomID, roomName, playlist) {

    // Update the client's cookies
    setCookie('roomID', roomID, 365);

    // Append all videos in the current playlist to the     
    //for (var i=0; i<playlist.length; i++){
    //  document.getElementById('songqueue').innerHTML += get_yt_embed(playlist[i]);
    //}
    while (!videoList.isEmpty())
      videoList.dequeue();

    for (var j=0; j<playlist.length; j++){
      videoList.enqueue(get_yt_embed(playlist[j]));
    }
    updateSideBar();
   /* if (videoList.getLength() >= 1) {
      if (player !== undefined && player !== null) {
        player.stopVideo();
      }
    }*/

    $('.landing-components').hide();
    $('.main-components').show();
    $('.room-name').html(roomName);
    document.getElementById('room-id').value = roomID;
  });

  /*
   * Listener: 'delete cookies'
   * Deletes all of the client's cookies
   * 
   */
  socket.on('delete cookies', function() {
    
    clearCookie('roomID');

    // Now enable the new room button, since we know the client is not already in a room.
    $('#new-room').text('Start mixing!');
    $('#new-room').removeClass('disabled');

  });
  
  /*
   * Listener: 'newvideo'
   * Appends a new video to the DOM
   * 
   */
  socket.on('newvideo', function(data) {
    //document.getElementById('songqueue').innerHTML = get_yt_embed(data);
    videoList.enqueue(get_yt_embed(data));
    if(videoList.getLength() == 1) player.stopVideo();
    updateSideBar();
  });

}

function updateSideBar() {
  document.getElementById('sbl').innerHTML = "";
  var queueLen = videoList.getLength();
  for (i=1; i<queueLen; i++) {
    var newDiv = "<div id=\"vp-"+i+"\" class=\"video-preview\"><div class=\"icon\"><img src=\"/images/video.png\"></div><div class=\"info\"></div></div>";
    document.getElementById('sbl').innerHTML += newDiv;
    var id = videoList.peek2(i);
    get_yt_title(id, i);
    document.getElementById('vp-'+i).getElementsByClassName('icon')[0].innerHTML = "<img src='http://img.youtube.com/vi/" + id + "/hqdefault.jpg'>";
  }
}

