var express = require('express');
var parser  = require('body-parser');

function init(db) {
    var app           = express();
    var routesPlayer  = require('./routes/player')(db);
    var routesWebface = require('./routes/webface')(db);
    
    app.use(parser.json());
    app.use('/player', routesPlayer);
    app.use('/webface', express.static(__dirname+'/public'));
    app.use('/bossface', function(req, res) {
        res.sendfile(__dirname+'/public/bossface.html');
    });
    // TODO define other routes here
    app.listen('80');
    console.log('Server running on port 80');
};

exports.init = init;