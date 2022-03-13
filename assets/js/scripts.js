var start = $("#start-btn");
var countdownEl = $("#countdown");
let time = 59;
var container = $("#container");
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
var score = 0;
var interval;

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

function scoreScreen() {
    console.log("good job!");
    questionContainer.remove();
    $("#time-and-score").remove();
    if (score == 1) container.append("<div id='final-score'><h2>You answered " + score + " question correctly with " + time + " seconds to spare!</h2></div>");
    else container.append("<div id='final-score'><h2>You answered " + score + " questions correctly with " + time + " seconds to spare!</h2></div>");
    container.append("<div id='input-container'><label for='initial'>Enter your initials here:</label><br><input type='text' id='initials' name='initials' value='' minlength='2' maxlength='3'><input type='submit' id='submit' value='Submit'></div>");
    var submit = document.getElementById("submit");
    submit.addEventListener("click", function () {
        var initialsValue = $("#initials").val();
        if (initialsValue.length < 2) {
            window.alert("Please enter at least 2 initials");
            return;
        } else {
            var leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
            if (leaderboard === null) {
                var leaderboard = [];
            }
            let newEntry = new Entry(initialsValue, score, time);
            leaderboard.push(newEntry);
            leaderboard.sort((a, b) => b.score - a.score);
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
            loadLeaderboard();
        }
    });
}

start.click(function () {
    start.remove();

    interval = setInterval(startTimer, 1000);
    generateQuestion();
});

function generateQuestion() {
    $("#score").html(score);
    if (usedNumbers.length == questionArray.length) {
        clearInterval(interval);
        return scoreScreen();
    }
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
            score++;
            generateQuestion();
        } else {
            console.log("incorrect!");
            questionContainer.find("div").remove();
            time -= 5;
            countdownEl.html(time);
            console.log(time);
            generateQuestion();
        }
    });
}

function Entry(initials, score, time) {
    this.initials = initials;
    this.score = score;
    this.time = time;
}

function loadLeaderboard() {
    $("#final-score").remove();
    $("#input-container").remove();
}
