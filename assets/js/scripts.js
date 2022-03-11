var start = $("#start-btn");
var countdownEl = $("#countdown");
let time = 59;
var questionContainer = $("#question-container");
var usedNumbers = [];
var questions = [1, 2, 3, 4, 5];
var answers = [1, 2, 3, 4, 5];

function startTimer() {
    if (time >= 0) {
        countdownEl.html(time);
        time--;
    } else {
        return;
    }
}

function questionPicker() {
    var selector = Math.floor(Math.random() * 5);
    if (usedNumbers.includes(selector)) {
        return questionPicker;
    }
    usedNumbers.push(selector);
    return selector;
}

function generateQuestion() {
    var questionNumber = questionPicker();
    console.log(questions[questionNumber]);
    console.log(answers[questionNumber]);
    questionContainer.append("<p>Hello!</p>");
}

start.click(function () {
    start.remove();

    var interval = setInterval(startTimer, 1000);
    generateQuestion();
});
