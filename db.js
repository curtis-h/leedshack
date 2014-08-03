var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var conn     = mongoose.connection;

conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", function() {
    console.log("Connected to db");
});

exports.objectID = mongoose.Types.ObjectId;
exports.player = require('./models/player')(mongoose);
