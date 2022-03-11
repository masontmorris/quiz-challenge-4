var start = $("#startBtn");
var countdownEl = $("#countdown");
let time = 59;

function startTimer() {
    countdownEl.html(time);
    time--;
    console.log(time);
}

start.click(function () {
    start.remove();

    setInterval(startTimer, 1000);
    console.log(time);
});
