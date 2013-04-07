/*
 * File: youtube.js
 * ----------------------------------------
 * Youtube API calls.
 * 
 */

/* -------------------- Youtube API calls. -------------------- */

 
  var player;
  // Called once API is ready. Initializes player.
  function onYouTubeIframeAPIReady() {
        player = new YT.Player('ytplayer', {
        height: '390',
        width: '640',
        videoId: '',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
          }
        });
    }
  
  // Called when player is ready
  function onPlayerReady(event) {
       player.loadPlaylist(['mGalEx6ufUw', 'TaCUBtzKAnA', '4v8SPz4VfsU']);
       player.playVideo();
  }

  var done = false;
  function onPlayerStateChange(event) {
          
  }
  function stopVideo() {
    player.stopVideo();
    player.clearVideo();
  }