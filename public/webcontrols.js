var id;

function getItemList() {
    $.get('/player/items/'+id, function(res) {
        var list = $("#inventory");
        list.find("p").remove();
        
        if(res && res.length) {
            for(p in res) {
                if(res.hasOwnProperty(p)) {
                    var bonus = parseInt(res[p].modifier);
                    var text  = (bonus >= 0) ? '+'+bonus : bonus;
                    list.append("<p>"+text+" - "+res[p].name+"</p>");
                }
            }
        }
    });
}

function handleButtonClick() {
    var el    = $(this);
    var data  = el.data('action');
    var query = '/?action='+data;
    
    $.get('/player/'+id+query, function(res) {
        $("#displayer").prepend("<p>"+res.string+"</p>");
        if(data == 'open') {
            getItemList();
        }
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