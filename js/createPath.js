var frame = document.getElementsByTagName('iframe')[8],
    moveLog = "";

$(frame).contents().on('click', 'map#MoveMap area', function() {
    switch(this.href) {
        case "javascript:dung_link('path=m1','m1')":
            moveLog+= "'up',";
            break;
        case "javascript:dung_link('path=rl')":
            moveLog+= "'left',";
            break;
        case "javascript:dung_link('path=rr')":
            moveLog+= "'right',";
            break;
    }
    console.log(moveLog);
});

$(frame).contents().on('click', 'map#ObjectsMap area', function() {
    moveLog+= "'useObject(\'" + this.title + "\', 1)',";
    console.log(moveLog);
});