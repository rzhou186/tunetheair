/*
 * File: youtube.js
 * ----------------------------------------
 * Youtube API calls.
 * 
 */

/* -------------------- Youtube API calls. -------------------- */

  var videoList = new Queue();
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
     //  player.loadPlaylist(['mGalEx6ufUw', 'TaCUBtzKAnA', '4v8SPz4VfsU']);
       alert("Player is ready");
     //  player.playVideo();
  }

  var done = false;
  var loaded = false;
  function onPlayerStateChange(event) {
          if(event.data == YT.PlayerState.PLAYING) {
        //    alert("In Playing state");
           /* if(videoList.getLength() == 1) 
                player.loadVideoById(videoList.peek());*/
          }
          if(event.data == YT.PlayerState.ENDED) {
              //  alert("In ended state");
                videoList.dequeue();
                if(!videoList.isEmpty()) 
                  player.loadVideoById(videoList.peek());
                socket.emit('removevideo');
          }
          if(event.data == YT.PlayerState.CUED) {

              if(videoList.getLength() == 1 && loaded == false) {
                  player.loadVideoById(videoList.peek());
                  loaded = true;
              }
             else 
              player.playVideo();
          }
          if(event.data == YT.PlayerState.UNSTARTED) {
           // alert("In unstarted state");
        }
        if(event.data == YT.PlayerState.PAUSED) {
         // alert("In paused state");
        }
        if(event.data == YT.PlayerState.BUFFERING) {
       //   alert("In buffering state");
        }
         //   while(!videoList.isEmpty()) {
              
             
            //player.playVideo();
         // }
       //     player.playVideovideoList.peek()
  }

  function stopVideo() {
    player.stopVideo();
    player.clearVideo();
  }
