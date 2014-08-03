var http    = require('http');
var options = {
    host: '146.185.146.129'
};

exports.create = function() {
    var request = http.get({
        host : options.host,
        path : '/map/create'
    }, function(res) {
//        console.log('STATUS: ' + res.statusCode);
//        console.log('HEADERS: ' + JSON.stringify(res.headers));
        
        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        
        res.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        })
        .on('end', function() {
            var body = Buffer.concat(bodyChunks);
            console.log('Map Creation: ' + body);
            var obj = JSON.parse(body);
            GLOBAL.map = obj;
        })
    });
    
    request.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        return false;
    }); 
};

exports.call = function(path, callback) {
    var fullPath = '/player/' + path;
    console.log("CALLING: "+fullPath);
    
    var request = http.get({
        host : options.host,
        path : fullPath
    }, function(res) {
        //console.log('MAP STATUS: ' + res.statusCode);
        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        
        res.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        })
        .on('end', function() {
            var body = Buffer.concat(bodyChunks);
            console.log("Map Call: "+ body);
            var obj  = JSON.parse(body);
            
            callback(obj);
        })
    });
    
    request.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        console.log('ERROR PATH: '+fullPath);
        return false;
    });
};