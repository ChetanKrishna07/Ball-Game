function pressAction(btn) {
    $(btn).addClass("pressed");
    setTimeout(function() {
        $(btn).removeClass("pressed");
    }, 100);  
}

$(".btn").click(function() { 
    pressAction(this);
})

$(document).keydown(function(e) {
    var k = e.key;
    if(k == " ") {
        pressAction(".btn");
    } if(k == "ArrowRight") {
        var x = $(".ball").css("grid-column");
        x = parseInt(x[0]);

        $(".ball").css("grid-column", x + 1);
    }
    if(k == "ArrowLeft") {
        var x = $(".ball").css("grid-column");
        x = parseInt(x[0]);

        $(".ball").css("grid-column", x - 1);
    }
    if(k == "ArrowDown") {
        var x = $(".ball").css("grid-row");
        x = parseInt(x[0]);

        $(".ball").css("grid-row", x + 1);
    }
    if(k == "ArrowUp") {
        var x = $(".ball").css("grid-row");
        x = parseInt(x[0]);

        $(".ball").css("grid-row", x - 1);
    }
})