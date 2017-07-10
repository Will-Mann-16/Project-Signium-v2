var socketio = require("socket.io");
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();
var server = http.createServer(app).listen(3000);

var bcrypt = require('bcrypt');
var saltRounds = 10;

var secretKey = "signium";

var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017');

var studentSchema = mongoose.Schema({
    firstname: String,
    surname: String,
    yeargroup: String,
    location: Number,
    house: Number,
    timelastout: Date
});

var locationSchema = mongoose.Schema({
    name: String,
    heading: String,
    colour: String,
    house: Number
});

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    role: String,
    house: Number
}, {
    runSettersOnQuery: true
});
var Student = mongoose.model("Student", studentSchema);
var Location = mongoose.model("Location", locationSchema);
var User = mongoose.model("User", userSchema);

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
    var username = req.body.username.toLowerCase();
    var password = req.body.password;

    var userQuery = User.findOne({
        'username': username
    });
    userQuery.select('password');
    userQuery.exec(function(err, hash) {
        if (err) {
            res.json({
                success: false
            });
        }
        bcrypt.compare(password, hash.password, function(err, result) {
            if (result) {
                userQuery.select('-password');
                userQuery.exec(function(err1, user) {
                    if (err1) {
                        res.json({
                            success: false,
                            reason: err1.message
                        })
                    }
                    res.json({
                        success: true,
                        token: jwt.sign({
                            data: user;
                        }, secretKey, {
                            expiresIn: 60 * 60 * 24
                        });
                    });
                });

            } else {
                res.json({
                    success: false,
                    reason: err
                });
            }
        });
    });
});
userRoutes.post("/read", function(req, res) {
    var jwt_key = req.body.jwt;

    jwt.verify(jwt_key, secretKey, function(err, decoded) {
        if (err) {
            res.json({
                success: false,
                reason: err
            });
        }
        res.json({
            success: true,
            user: decoded;
        })
    });
});
userRoutes.post("/create", function(req, res) {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    var role = req.body.role;
    var house = req.body.house;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            res.json({
                success: false,
                reason: err.message
            });
        }
        password = hash;
        var user = new User({
            username: username,
            password: password,
            role: role,
            house: house
        });
        user.save(function(error) {
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
    User.findByIdAndUpdate(id, req.body.user, function(err, user) {
        if (err) {
            res.json({
                success: false,
                reason: err.message
            });
        }
        res.json({
            success: true
        });
    })
});

userRoutes.get("/delete", function(req, res) {
    User.findByIdAndRemove(req.body.id, function(err, user) {
        if (err) {
            res.json({
                success: false,
                reason: err.message
            });
        }
        res.json({
            success: true
        })
    });
});

studentRoutes.post("/create", function(req, res) {
    var newStudent = new Student(req.body);
    newStudent.save(function(err) {
        if (err) {
            res.json({
                success: false,
                reason: err.message
            });
        }
        res.json({
            success: true
        })
    });
});

studentRoutes.get("/read", function(req, res) {
    if (req.body.ids) {
        var result = [];
        req.body.ids.forEach(function(id) {
            Student.findById(id, function(err, student) {
                if (err) {
                    res.json({
                        success: false,
                        reason: err.message
                    });
                }
                result.push(student);
            });
        });
        res.json({
            success: true,
            students: result
        });
    } else {
        Student.find({}, function(err, students) {
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
    Student.findByIdAndUpdate(req.body.id, req.body.student, function(err, student) {
        if (err) {
            res.json({
                success: false,
                reason: err.message
            });
        }
        res.json({
            success: true,
            student: student
        })
    });
});

studentRoutes.get("/update-location", function(req, res) {
    results = [];
    req.body.ids.forEach(function(id) {
        Student.findByIdAndUpdate(id, {
            location: req.body.location,
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
    Student.findByIdAndRemove(req.body.id, function(err, user) {
        if (err) {
            res.json({
                success: false,
                reason: err.message
            });
        }
        res.json({
            success: true
        })
    });
});

locationRoutes.post("/create", function(req, res) {
    var newLocation = new Location(req.body);
    newLocation.save(function(err) {
        if (err) {
            res.json({
                success: false,
                reason: err.message
            });
        }
        res.json({
            success: true
        });
    })
});
locationRoutes.get("/read", function(req, res) {
    Location.find({}, function(err, locations) {
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
    Location.findByIdAndUpdate(req.body.id, req.body.location, function(err, location) {
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
    Location.findByIdAndRemove(req.body.id, function(err) {
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

app.use(express.static("./public"));

io.on("connect", function(socket) {

});
