var start = $("#start-btn");
var countdownEl = $("#countdown");
let time = 59;
var questionContainer = $("#question-container");
var usedNumbers = [];
let questionArray = [
    {
        question: 'a',
        answer: 'aa'
    },
    {
        question: 'b',
        answer: 'bb'
    },
    {
        question: 'c',
        answer: 'cc'
    },
    {
        question: 'd',
        answer: 'dd'
    },
    {
        question: 'e',
        answer: 'ee'
    }
    
]

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
    var questionObject = questionArray[questionNumber]
    console.log(questionNumber)
    console.log(questionObject)
    console.log(usedNumbers)
    questionContainer.append('<h2>'+questionObject.question+'</h2>');
}

start.click(function () {
    start.remove();

    var interval = setInterval(startTimer, 1000);
    generateQuestion();
});
