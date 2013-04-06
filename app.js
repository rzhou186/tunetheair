
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , routes = require('./routes')
  , user = require('./routes/user')
  , path = require('path')
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

var port = process.env.PORT || app.get('port');

server.listen(port, function(){
  console.log("Express server listening on port " + app.get('port'));
});

/* -------------------- Websocket Management -------------------- */

io.sockets.on('connection', function (socket) {

  /* -------------------- Variables ------------------- */

  var currRoomID = null;

  /* -------------------- Functions ------------------- */

  /*
   * Function: 'getRoom'
   * Gets a room from the list of rooms, provided the room ID
   * 
   */
  function getRoom (roomID)
    return io.sockets.manager.rooms['/' + roomID];
  }

  /*
   * Function: 'getRoomPlaylist'
   * Gets the current room's palylist
   * 
   */
  function getRoomPlaylist (){
    var currRoom = getRoom(currRoomID);
    return currRoom.playlist;
  }

  /*
   * Function: 'addVideo'
   * Adds a video to the current room's playlist
   * 
   */
  function addVideo (videoName){
    var currRoom = getRoom(currRoomID);
    currRoom.playlist[currRoom.playlist.length] = videoName;
  }

  /* -------------- Actions & Listeners --------------- */

  // Ping the socket for its current room data (if any).
  socket.emit('fetch room data');

  /*
   * Listener: 'subscribe'
   * Subscribes the socket to its appropriate room.
   * 
   */
  socket.on('subscribe', function (roomID) {

    if (roomID !== null){

      socket.join(roomID);
      currRoomID = roomID;

      socket.emit('join room', getRoomPlaylist());

    }

  });  

  /*
   * Listener: 'unsubscribe'
   * Unsubscribes the socket from its current room.
   * Triggered whenever any socket disconnects.
   * 
   */
  socket.on('unsubscribe', function () {
    
  });

});