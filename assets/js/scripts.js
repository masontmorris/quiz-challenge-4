var start = $("#start-btn");
var countdownEl = $("#countdown");
let time = 59;
var questionContainer = $("#question-container");
var usedNumbers = [];
let questionArray = [
    {
        question: "question1",
        wrongAnswer1: "b",
        wrongAnswer2: "c",
        wrongAnswer3: "d",
        correctAnswer: "a",
    },
    {
        question: "question2",
        wrongAnswer1: "b",
        wrongAnswer2: "c",
        wrongAnswer3: "d",
        correctAnswer: "a",
    },
    {
        question: "question3",
        wrongAnswer1: "b",
        wrongAnswer2: "c",
        wrongAnswer3: "d",
        correctAnswer: "a",
    },
    {
        question: "question4",
        wrongAnswer1: "b",
        wrongAnswer2: "c",
        wrongAnswer3: "d",
        correctAnswer: "a",
    },
    {
        question: "question5",
        wrongAnswer1: "b",
        wrongAnswer2: "c",
        wrongAnswer3: "d",
        correctAnswer: "a",
    },
];
var usedAnswers = [];

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
        return questionPicker();
    } else {
        usedNumbers.push(selector);
        return selector;
    }
}

function generateQuestion() {
    var questionNumber = questionPicker();
    var questionObject = questionArray[questionNumber];
    var answerArray = [questionObject.wrongAnswer1, questionObject.wrongAnswer2, questionObject.wrongAnswer3, questionObject.correctAnswer];
    console.log(questionNumber);
    console.log(questionObject);
    console.log(usedNumbers);
    questionContainer.append("<h2>" + questionObject.question + "</h2><ul></ul>");
    answerPicker(answerArray);
}

function answerPicker(answerArray) {
    for (var i = 4; i >= 0; i--) {
        var chosenAnswer = randomizeAnswer();
        usedAnswers.push(chosenAnswer);
        var printAnswer = answerArray[chosenAnswer];
        if (chosenAnswer == "4") {
            questionContainer.append("<li class='correct'>" + printAnswer + "</li>");
        } else {
            questionContainer.append("<li class='incorrect'>" + printAnswer + "</li>");
        }
    }
}

function randomizeAnswer() {
    var answerSelector = Math.floor(Math.random() * 4);
    if (usedAnswers.includes(answerSelector)) {
        return randomizeAnswer();
    } else return answerSelector;
}

start.click(function () {
    start.remove();

    var interval = setInterval(startTimer, 1000);
    generateQuestion();
});
