var start = $("#startBtn");
var countdownEl = $("#countdown");
let time = 59;

function startTimer() {
    if (time >= 0) {
        countdownEl.html(time);
        time--;
    } else {
        return;
    }
}

start.click(function () {
    start.remove();

    var interval = setInterval(startTimer, 1000);
});
