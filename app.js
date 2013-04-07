
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
  function getRoom (roomID) {
    return io.sockets.manager.rooms['/' + roomID];
  }

  /*
   * Function: 'HashLength'
   * Gets the length of a hash map
   * 
   */  
  function HashLength (obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
  };

  /*
   * Function: 'getRoomPlaylist'
   * Gets the current room's playlist
   * 
   */
  function getRoomPlaylist (){
    var currRoom = getRoom(currRoomID);
    return currRoom.playlist;
  }

  /*
   * Function: 'getRoomName'
   * Gets the current room's name
   * 
   */
  function getRoomName (){
    var currRoom = getRoom(currRoomID);
    return currRoom.name;
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

  /*
   * Function: 'changeRoomName'
   * Modifies the current room name
   * 
   */
  function setRoomName (roomName){
    var currRoom = getRoom(currRoomID);
    currRoom.name = roomName;
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

    if (roomID !== null && getRoom(roomID) !== undefined){

      socket.join(roomID);
      currRoomID = roomID;

      socket.emit('join room', roomID, getRoomName(), getRoomPlaylist());

    }

    else {
      socket.emit('delete cookies');
    }

  });  

  /*
   * Listener: 'new room'
   * Creates a new room, then subscribes the client to it.
   * 
   */
  socket.on('new room', function (roomName) {
    
    // Generate the new room's ID
    currRoomID = HashLength(io.sockets.manager.rooms);

    // Create and subscribe the client to the new room
    socket.join(currRoomID);

    // Name the current room
    setRoomName(roomName);

    // Initialize the room playlist
    var currRoom = getRoom(currRoomID);
    currRoom.playlist = new Array();

    socket.emit('join room', currRoomID, getRoomName(), getRoomPlaylist());

  });

  socket.on('addvideo', function (data) {
    console.log(data['url']);
    addVideo(data['url']);
    io.sockets.in(currRoomID).emit('newvideo', data['url']);
  });  

  socket.on('dequeuevideo', function () {
    console.log('dequeueing video!!');
    var currRoom = getRoom(currRoomID);
    currRoom.playlist.shift();
  });

});
