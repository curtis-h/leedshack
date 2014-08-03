var id;

function getItemList() {
    $.get('/player/items/'+id, function(res) {
        var list = $("#inventory");
        list.find("p").not(".header").remove();
        
        var level = parseInt(res.level) || 1;
        if(res.modifiers && res.modifiers.length) {
            for(p in res.modifiers) {
                if(res.modifiers.hasOwnProperty(p)) {
                    var bonus = parseInt(res.modifiers[p].modifier);
                    var text  = (bonus >= 0) ? '+'+bonus : bonus;
                    list.append("<p>"+text+" - "+res.modifiers[p].name+"</p>");
                    level += bonus;
                }
            }
        }
        
        $("#levelDisplay").text(level || '1');
    });
}

function handleButtonClick() {
    var el    = $(this);
    var data  = el.data('action');
    var query = '/?action='+data;
    
    $.get('/player/'+id+query, function(res) {
        if(res.boss) {
            window.location = '/bossface/?id='+id;
            return;
        }
        $("#displayer").prepend("<p>"+res.string+"</p>");
        $("#levelDisplay").text(res.level || '1');
        $("#stepCounter").text(res.steps || '0');
        if(data == 'open') {
            getItemList();
        }
        if(data == 'fight') {
            if(typeof(res.deader) != 'undefined' && res.deader == true) {
                alert('You DIED');
                
                if(window.location.pathname.match(/bossface/) != null) {
                    window.location = '/webface/?id='+id;
                    return;
                }
            }
            else if(res.status == true && (window.location.pathname.match(/bossface/) != null)) {
                handleWin();
            }
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
        handleWin();
    }
}

function handleWin() {
    $("#bosstext").text("YOU WIN!!");
    $(".controls button").remove();
    $("#robotcontainer").show();
    $.get('/player/win', function(res) {
        setTimeout(function() {
            window.location = '/webface/?id='+id;
        }, 10000);
    });
}

function setupHandlers() {
    $("button").click(handleButtonClick);
    $("#randact").keyup(handleSomething);
}

function init() {
    var testid = window.location.search.split("=")[1];
    if(testid && testid.length > 0) {
        id = testid;
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