var id;

function getItemList() {
    $.get('/player/items/'+id, function(res) {
        var list = $("#inventory");
        list.find("p").not(".header").remove();
        
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
        if(res.boss) {
            window.location = '/bossface?id='+id;
            return;
        }
        $("#displayer").prepend("<p>"+res.string+"</p>");
        $("#levelDisplay").text(res.level || '1');
        $("#stepCounter").text(res.steps || '0');
        if(data == 'open') {
            getItemList();
        }
    });
}

function handleSomething() {
    var el = $(this);
    var text = el.val();
    
    /*
     * Possible options
     * dance
     * bribe
     * cuddle
     * 
     */
    
    if(text.match(/dance/gi) != null) {
        $("#bosstext").text("YOU WIN!!");
        $(".controls button").remove();
        $("#robotcontainer").show();
    }
}

function setupHandlers() {
    $("button").click(handleButtonClick);
    $("#randact").keyup(handleSomething);
}

function init() {
    if(window.location.pathname.match(/bossface/) != null) {
        id = window.location.search.split("=")[1];
        getItemList();
    }
    else {
        $.get('/player/random', function(res) {
            id = res.id;
            getItemList();
        });
    }
}

$(document).ready(function() {
    setupHandlers();
    init();
});