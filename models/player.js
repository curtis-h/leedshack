module.exports = function(db) {
    var schema = db.Schema({
        id         : Number,
        name       : String,
        level      : Number,
        modifiers  : [],
        game_id    : Number,
        identifier : String,
        x          : Number,
        y          : Number,
        z          : Number,
        steps      : Number
    });
    
    return db.model('Player', schema);
};