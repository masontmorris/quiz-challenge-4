var start = $("#start-btn");
var countdownEl = $("#countdown");
let time = 59;
var questionContainer = $("#question-container");
var usedNumbers = [];
let questionArray = [
    {
        question: "question1",
        answers: {
            a: "aa",
            b: "bb",
            c: "cc",
            d: "dd",
        },
        correct: "b",
    },
    {
        question: "question2",
        answers: {
            a: "aa",
            b: "bb",
            c: "cc",
            d: "dd",
        },
        correct: "c",
    },
    {
        question: "question3",
        answers: {
            a: "aa",
            b: "bb",
            c: "cc",
            d: "dd",
        },
        correct: "d",
    },
    {
        question: "question4",
        answers: {
            a: "aa",
            b: "bb",
            c: "cc",
            d: "dd",
        },
        correct: "d",
    },
    {
        question: "question5",
        answers: {
            a: "aa",
            b: "bb",
            c: "cc",
            d: "dd",
        },
        correct: "a",
    },
];

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
    questionContainer.append(
        "<div><h2>" +
            questionObject.question +
            "</h2><p class='a'>" +
            questionObject.answers.a +
            "</p><p class='b'>" +
            questionObject.answers.b +
            "</p><p class='c'>" +
            questionObject.answers.c +
            "</p><p class='d'>" +
            questionObject.answers.d +
            "</p></div>"
    );
    questionContainer.find("p").click(function () {
        if ($(this).attr("class") == questionObject.correct) {
            console.log("correct!");
            questionContainer.find("div").remove();
            generateQuestion();
        } else {
            console.log("incorrect!");
        }
    });
}

start.click(function () {
    start.remove();

    var interval = setInterval(startTimer, 1000);
    generateQuestion();
});
