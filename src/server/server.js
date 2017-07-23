var socketio = require("socket.io");
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();
var server = http.createServer(app).listen(3000);
var io = socketio.listen(server);

var bcrypt = require('bcrypt');
var saltRounds = 10;

var secretKey = "signium";

var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/project-signium');
var db = mongoose.connection;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("../client"));


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    var schema = require("./schema");
    var User = schema.user;
    var Student = schema.student;
    var Location = schema.location;
    var House = schema.house;

    var apiRoutes = express.Router();

    var studentRoutes = express.Router();
    var userRoutes = express.Router();
    var locationRoutes = express.Router();

    userRoutes.post("/authenticate", function(req, res) {
        var username = req.query.username.toLowerCase();
        var password = req.query.password;
        var dateMultiply = req.query.remember ? 365 : 1;
        var userQuery = User.findOne({
            'username': username
        });
        userQuery.select('password');
        userQuery.exec(function(err, hash) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            bcrypt.compare(password, hash.password, function(err, result) {
                if (err) {
                    res.json({
                        success: false,
                        reason: err.message
                    });
                }
                if (result) {
                    userQuery.select('-password');
                    userQuery.exec(function(err1, user) {
                        if (err1) {
                            res.json({
                                success: false,
                                reason: err1.message
                            });
                        }
                        res.json({
                            success: true,
                            authenticated: true,
                            token: jwt.sign({
                                data: user
                            }, secretKey, {
                                expiresIn: 60 * 60 * 24 * dateMultiply
                            })
                        });
                    });

                } else {
                    res.json({
                        success: true,
                        authenticated: false
                    });
                }
            });
        });
    });
    userRoutes.post("/read", function(req, res) {
        var jwt_key = req.query.jwt;

        jwt.verify(jwt_key, secretKey, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    reason: err
                });
            }
            res.json({
                success: true,
                user: decoded
            });
        });
    });
    userRoutes.post("/create", function(req, res) {
        var username = req.query.username.toLowerCase();
        var password = req.query.password;
        var role = req.query.role;
        var house = req.query.house;
        var firstname = req.query.firstname;
        var surname = req.query.surname;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            password = hash;
            var user = User.create({
                username: username,
                password: password,
                role: role,
                house: house
            }, function(error, user) {
                if (error) {
                    res.json({
                        success: false,
                        reason: error.message
                    });
                }
                res.json({
                    success: true
                });
            });
        });
    });

    userRoutes.post("/update", function(req, res) {
        User.findByIdAndUpdate(id, req.query.user, function(err, user) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true
            });
        });
    });

    userRoutes.post("/delete", function(req, res) {
        User.findByIdAndRemove(req.query.id, function(err, user) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true
            });
        });
    });

    studentRoutes.post("/create", function(req, res) {
        var newStudent = Student.create(req.query, function(err, student) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true
            });
        });
    });

    studentRoutes.get("/read", function(req, res) {
        var minor = req.query.minor;
        if (minor) {
            Student.find({
                "_house": req.query.house
            }, 'location timelastout', function(err, students) {
                if (err) {
                    res.json({
                        success: false,
                        reason: err.message
                    });
                }
                res.json({
                    success: true,
                    students: students
                });
            });
        } else {
            Student.find({
                "_house": req.query.house
            }, function(err, students) {
                if (err) {
                    res.json({
                        success: false,
                        reason: err.message
                    });
                }
                res.json({
                    success: true,
                    students: students
                });
            });
        }
    });

    studentRoutes.post("/update", function(req, res) {
        Student.findByIdAndUpdate(req.query.id, req.query.student, function(err, student) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true,
                student: student
            });
        });
    });

    studentRoutes.get("/update-location", function(req, res) {
        results = [];
        var newLocation = {
            id: req.query.location.id,
            name: req.query.location.name,
            colour: req.query.location.colour
        };
        req.query.ids.forEach(function(id) {
            Student.findByIdAndUpdate(id, {
                location: newLocation,
                timelastout: new Date()
            }, function(err, student) {
                if (err) {
                    res.json({
                        success: false,
                        reason: err.message
                    });
                }
                results.push(student);
            });
        });
        res.json({
            success: true,
            students: results
        });
    });

    studentRoutes.get("/delete", function(req, res) {
        Student.findByIdAndRemove(req.query.id, function(err, user) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true
            });
        });
    });

    locationRoutes.post("/create", function(req, res) {
        var newLocation = Location.create(req.query, function(err) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true
            });
        });
    });
    locationRoutes.get("/read", function(req, res) {
        Location.find({
            "_house": req.query.house
        }, function(err, locations) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true,
                locations: locations
            });
        });
    });
    locationRoutes.post("/update", function(req, res) {
        Location.findByIdAndUpdate(req.query.id, req.query.location, function(err, location) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true,
                location: location
            });
        });
    });
    locationRoutes.get("/delete", function(req, res) {
        Location.findByIdAndRemove(req.query.id, function(err) {
            if (err) {
                res.json({
                    success: false,
                    reason: err.message
                });
            }
            res.json({
                success: true
            });
        });
    });


    apiRoutes.use('/students', studentRoutes);
    apiRoutes.use('/users', userRoutes);
    apiRoutes.use('/locations', locationRoutes);

    app.use('/api', apiRoutes);
});

var sockets = [];
io.on("connect", function(socket) {
    var socketHouse, socketAdmin, socketRole;
    socket.on("socket-client-server-init", function(packet) {
        packet = JSON.parse(packet);
        sockets[packet.house].push({
            socket: socket,
            admin: packet.admin,
            role: packet.role
        });
        socketHouse = packet.house;
        socketAdmin = packet.admin;
        socketRole = packet.role;
        socket.emit("socket-server-client-init");
    });
    socket.on("socket-client-server-redraw-major", function() {
        sockets[socketHouse].forEach(function(clientSocket) {
            clientSocket.socket.emit("socket-server-client-redraw-major", {
                house: socketHouse
            });
        });
    });
    socket.on("socket-client-server-redraw-minor", function() {
        sockets[socketHouse].forEach(function(clientSocket) {
            clientSocket.socket.emit("socket-server-client-redraw-minor", {
                house: socketHouse
            });
        });
    });
    socket.on("disconnect", function() {
        var indexOf = sockets[socketHouse].indexOf({
            socket: socket,
            admin: socketAdmin,
            role: socketRole
        });
        sockets[socketHouse].splice(indexOf, 0);
    });
});
