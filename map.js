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
            if(String.fromCharCode(body[0]) == '<') {
                console.log('WE GOT AN ERROR');
                return false;
            }
            var obj = JSON.parse(body);
            console.log('CALLBACK');
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
            var obj = {};
            if(String.fromCharCode(body[0]) == '<') {
                console.log('WE GOT AN ERROR');
                
                obj = {
                    "status":true,
                    "string":"You fashion a weapon with what is around you, and slay the beast.",
                    "coord":"7x1"
                }
;
            }
            else {
                obj  = JSON.parse(body);
            }
            console.log('CALLBACK');
            
            callback(obj);
        })
    });
    
    request.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        console.log('ERROR PATH: '+fullPath);
        return false;
    });
};