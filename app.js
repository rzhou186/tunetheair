
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

  // Subscribe the socket to the default room.
  socket.join('default');
  console.log('Joined default room.');


  /*
   * Listener: 'unsubscribe'
   * Unsubscribes the socket from the default room.
   * Triggered whenever any socket disconnects.
   * 
   */
  socket.on('unsubscribe', function () {
    socket.leave('default');
  });

});