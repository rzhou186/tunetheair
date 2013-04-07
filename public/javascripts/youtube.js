/*
 * File: youtube.js
 * ----------------------------------------
 * Youtube API calls.
 * 
 */

/* -------------------- Youtube API calls. -------------------- */

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var videoList = new Queue();
  var player = null;
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
     //  player.playVideo();
    if (videoList.getLength() >= 1) {
      player.stopVideo();
    }
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
                updateSideBar();
                socket.emit('removevideo');
          }
          if(event.data == YT.PlayerState.CUED) {
            if(videoList.getLength() >= 1 && loaded == false) {
                  player.loadVideoById(videoList.peek());
                  loaded = true;
              }
             else 
              player.playVideo();
          }
          if(event.data == YT.PlayerState.UNSTARTED) {
            if(videoList.getLength() >= 1 && loaded == false) {
              player.loadVideoById(videoList.peek());
              loaded = true;
            }
        }
        if(event.data == YT.PlayerState.PAUSED) {
        }
        if(event.data == YT.PlayerState.BUFFERING) {
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
