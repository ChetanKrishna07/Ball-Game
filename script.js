var ballposs = {
    row: 0,
    col: 0,
    running: 0,
    level: 0
}

var food = {
    row: 0,
    col: 0
}

function reset() {
    ballposs.row = 0;
    ballposs.col = 0;
    ballposs.running = 0;
    ballposs.level = 0;
    food.row = 0;
    food.col = 0;
}

function createBoard() {
    $(".board").html("");
    var html = $(".board").html();
    for (var row = 1; row < 16; row++) {
        for (var col = 1; col < 16; col++) {
            var cellClass = "cell " + "r" + row + "c" + col;
            $(".board").html(html + "<div class='" + cellClass + "'></div>\n")
            html = $(".board").html();
            $(".r" + row + "c" + col).css("grid-row", row + "/" + (row + 1));
            $(".r" + row + "c" + col).css("grid-column", col + "/" + (col + 1));
            $(".r" + row + "c" + col).html("");
        }
    }
    $(".r15c1").html("<div class = 'ball'> <img src='images/ball.png' alt = 'ball'/> </div>");
    ballposs.row = 15;
    ballposs.col = 1;
    ballposs.running = 1;
    ballposs.level = 1;
    addFood();
    $(".heading").text("Level 1");
}

function addFood() {

    if (ballposs.running == 1) {
        do {
            var randRow = Math.floor(Math.random() * 15) + 1;
            var randCol = Math.floor(Math.random() * 15) + 1;
        } while (randRow == ballposs.row || randCol == ballposs.col);

        $(".r" + randRow + "c" + randCol).html("<div class = 'food'><img src='images/food.png' alt = 'food'/></div>");
        food.row = randRow;
        food.col = randCol;
    }
}

function sizeUp() {
    var width = parseInt($(".ball img").css("width").split("px")[0]);
    var height = parseInt($(".ball img").css("height").split("px")[0]);
    $(".ball img").css("width", (width + 1) + "px");
    $(".ball img").css("height", (height + 1) + "px");
}

function move(frow, fcol, trow, tcol) {
    fromClass = ".r" + frow + "c" + fcol;
    toClass = ".r" + trow + "c" + tcol;
    var html = $(fromClass).html();
    console.log(fromClass)
    $(fromClass).html("");
    $(toClass).html(html);
}

function pressAction(btn) {
    $(btn).addClass("pressed");
    setTimeout(function () {
        $(btn).removeClass("pressed");
    }, 100);
}

$(".btn").click(function () {
    pressAction(this);
    createBoard();
})

$(document).keydown(function (e) {
    var k = e.key;
    var row = ballposs.row;
    var col = ballposs.col;
    if (k == " ") {
        pressAction(".btn");
        createBoard();
    }
    if (ballposs.running == 1) {
        if (k == "ArrowRight") {
            col = ((col) % 15) + 1;
            console.log(col);
            move(ballposs.row, ballposs.col, row, col);
            ballposs.row = row;
            ballposs.col = col;
        }
        if (k == "ArrowLeft") {
            if (col > 1) {
                col--;
            } else {
                col = 15;
            }
            console.log(col);
            move(ballposs.row, ballposs.col, row, col);
            ballposs.row = row;
            ballposs.col = col;
        }
        if (k == "ArrowDown") {
            row = ((row) % 15) + 1;
            console.log(row);
            move(ballposs.row, ballposs.col, row, col);
            ballposs.row = row;
            ballposs.col = col;
        }
        if (k == "ArrowUp") {
            if (row > 1) {
                row--;
            } else {
                row = 15;
            }
            console.log(row);
            move(ballposs.row, ballposs.col, row, col);
            ballposs.row = row;
            ballposs.col = col;
        }
        if (ballposs.row == food.row && ballposs.col == food.col) {
            ballposs.level++;
            $(".heading").text("Level " + ballposs.level);
            if (ballposs.level == 11) {
                $(".heading").text("You Won!");
                reset();
            } else {
                sizeUp();
                addFood();
            }
        }
    }
});