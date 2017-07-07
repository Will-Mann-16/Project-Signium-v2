var socketio = require("socket.io");
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();
var server = http.createServer(app).listen(3000);

var bcrypt = require('bcrypt');
var saltRounds = 10;

var secretKey = "signium";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var apiRoutes = express.Router();

var studentRoutes = express.Router();
var userRoutes = express.Router();
var locationRoutes = express.Router();

userRoutes.post("/authenticate", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  //TODO Find user

  bcrypt.compare(password, user.Hash, function(err, result) {
    if (result) {
      delete user.Hash;
      res.json({
        success: true,
        token: jwt.sign({
          data: user;
        }, secretKey, {
          expiresIn: 60 * 60 * 24
        });
      });
    } else {
      res.json({
        success: false
      });
    }
  });
})

apiRoutes.use('/students', studentRoutes);
apiRoutes.use('/users', userRoutes);
apiRoutes.use('/locations', locationRoutes);

app.use('/api', apiRoutes);

app.use(express.static("./public"));

io.on("connect", function(socket) {

});
