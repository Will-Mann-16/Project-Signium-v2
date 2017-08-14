var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
    firstname: String,
    surname: String,
    yeargroup: String,
    location: {
        id: String,
        name: String,
        colour: String
    },
    _house: String,
    timelastout: Date,
    code: String
});

var locationSchema = mongoose.Schema({
    name: String,
    heading: String,
    colour: String,
    _house: String
});

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: String,
    role: String,
    _house: String,
    firstname: String,
    surname: String
}, {
    runSettersOnQuery: true
});

var houseSchema = mongoose.Schema({
    name: String,
    colours: [String],
    personell: [String]
});
var Student = mongoose.model("Students", studentSchema);
var Location = mongoose.model("Locations", locationSchema);
var User = mongoose.model("Users", userSchema);
var House = mongoose.model("Houses", houseSchema);

module.exports = {
    student: Student,
    location: Location,
    user: User,
    house: House
};
