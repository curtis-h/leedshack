var id;

function handleButtonClick() {
    var el    = $(this);
    var data  = el.data('action');
    var query = '/?action='+data;
    
    $.get('/player/'+id+query, function(res) {
        console.log(res);
        $("#displayer").prepend("<p>"+res.string+"</p>");
    });
    
}

function setupHandlers() {
    $("button").click(handleButtonClick)
}

function init() {
    $.get('/player/random', function(res) {
        id = res.id;
    });
    
}

$(document).ready(function() {
    setupHandlers();
    init();
});