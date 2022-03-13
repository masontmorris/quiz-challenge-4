var start = $("#start-btn");
var countdownEl = $("#countdown");
let time = 59;
var container = $("#container");
var questionContainer = $("#question-container");
var usedNumbers = [];
let questionArray = [
    {
        question: "What name did the Crow's ghost go by before reviving him?",
        answers: {
            a: "Porky",
            b: "Pulled Pork",
            c: "Pork Pie",
            d: "Porkchop",
        },
        correct: "b",
    },
    {
        question: "What planet is the Vault of Glass located on?",
        answers: {
            a: "Mars",
            b: "Mercury",
            c: "Venus",
            d: "Nessus",
        },
        correct: "c",
    },
    {
        question: "Who was the first to hold the title of Queen's Wrath",
        answers: {
            a: "Uldren Sov",
            b: "Petra Venj",
            c: "Mara Sov",
            d: "Sjur Eido",
        },
        correct: "d",
    },
    {
        question: "What species did the Hive originate from?",
        answers: {
            a: "Sindu",
            b: "Eliksni",
            c: "Ammonites",
            d: "Krill",
        },
        correct: "d",
    },
    {
        question: "Which of the three classes in Destiny 2 is best?",
        answers: {
            a: "Warlock",
            b: "Hunter",
            c: "Titan",
            d: "All three classes have their own merits",
        },
        correct: "a",
    },
];
var score = 0;
var interval;
var drifter = new Audio("./assets/sounds/drifter-oof.ogg");
var zavala = new Audio("./assets/sounds/zavala-indeed.mp3");
drifter.volume = 0.11;
zavala.volume = 0.2;

function startTimer() {
    if (time > 0) {
        countdownEl.html(time);
        time--;
    } else {
        scoreScreen();
        clearInterval(interval);
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
    questionContainer.remove();
    $("#time-and-score").remove();
    if (score == 1) container.append("<div id='final-score'><h2>You answered " + score + " question correctly with " + time + " seconds to spare!</h2></div>");
    else container.append("<div id='final-score'><h2>You answered " + score + " questions correctly with " + time + " seconds to spare!</h2></div>");
    container.append("<div id='input-container'><p>Enter your initials here:</p><input type='text' id='initials' name='initials' value='' minlength='2' maxlength='3'><br><input type='submit' id='submit' value='Submit'></div>");
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
            leaderboard.sort((a, b) => b.score - a.score || b.time - a.time);
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
            loadLeaderboard(leaderboard);
        }
    });
}

start.click(function () {
    $("#start-container").remove();

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
            questionContainer.find("div").remove();
            var zavalaPlay = zavala.play();
            zavalaPlay;
            score++;
            generateQuestion();
        } else {
            questionContainer.find("div").remove();
            var drifterPlay = drifter.play();
            drifterPlay;
            time -= 5;
            countdownEl.html(time);
            generateQuestion();
        }
    });
}

function Entry(initials, score, time) {
    this.initials = initials;
    this.score = score;
    this.time = time;
}

function loadLeaderboard(leaderboard) {
    $("#final-score").remove();
    $("#input-container").remove();
    container.append("<div id=leaderboard-container></div>");
    var leaderboardContainer = $("#leaderboard-container");
    leaderboardContainer.append("<div id='initials-container' class='leaderboard-child'><ul id='initials-list' class='leaderboard-list'><li id='initials-marker'>initials</li></ul></div>");
    for (let i = 0; i < leaderboard.length; i++) {
        $("#initials-list").append("<li class='ldb-intl'>" + leaderboard[i].initials) + "</li>";
    }
    leaderboardContainer.append("<div id='score-container' class='leaderboard-child'><ul id='score-list' class='leaderboard-list'><li id='score-marker'>score</li></ul></div>");
    for (let i = 0; i < leaderboard.length; i++) {
        $("#score-list").append("<li class='ldb-score'>" + leaderboard[i].score) + "</li>";
    }
    leaderboardContainer.append("<div id='time-container' class='leaderboard-child'><ul id='time-list' class='leaderboard-list'><li id='time-marker'>time remaining</li></ul></div>");
    for (let i = 0; i < leaderboard.length; i++) {
        $("#time-list").append("<li class='ldb-time'>" + leaderboard[i].time) + "</li>";
    }
}
