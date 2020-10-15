// this is solely dedicated to making the quiz section work.
// my plan - the button options update 2 variables in a 2D array - [0] for the option they picked, and [1] for true or false. When you press next, that array spot is added to a tally.
// arr - ["question", "your answer", "correct answer", 0/1]
// 0/1 if you got it right or not. Updates a variable which is added to total on Next button press.

var dataPage = document.getElementById("dataPage");
var currQuestion, currYourAnswer, currCorrectAnswer, currPoints;
var optionSelected = false;
var firstQuestion = true;
var totalPoints = 0;
var totalQuestions = 0;
var ansArray = [];
var lastTabPressed = 1;
var allButtons = document.getElementsByClassName("option");
var nextArr = document.getElementsByClassName("next");

// initialize questions, and re-initialize questions when user switches tabs.
var questions = Array.from(document.getElementsByClassName("ch1Question")); // the class name for ch1 would be ch1Questions, ch2 is ch2Questions, so on.
var allQuestions = Array.from(document.getElementsByClassName("ch1Question")); // the class name for ch1 would be ch1Questions, ch2 is ch2Questions, so on.

function initializeQuestions(className, chapterNumber) {
    questions = Array.from(document.getElementsByClassName(className)); // the class name for ch1 would be ch1Questions, ch2 is ch2Questions, so on.
    allQuestions = Array.from(document.getElementsByClassName(className)); // the class name for ch1 would be ch1Questions, ch2 is ch2Questions, so on.
    ansArray = [];
    firstQuestion = true;
    totalQuestions = 0;
    dataPage.style.display = "none";
    displayNextQuestion();
    lastTabPressed = chapterNumber;

    // reset timer
    seconds = -1;
    minutes = 0;
    hours = 0;
    window.clearInterval(stopTimer);
    increment();
    stopTimer = setInterval(increment, 1000);

    // set all buttons back to default color
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].children[0].children[0].classList = "fas fa-circle fa-inverse";
        allButtons[i].style.backgroundColor = "#f1f1f1";
    }
}

displayNextQuestion();

// displays next question at the start, and when next is pressed
function displayNextQuestion() {

    // set all buttons back to default color and allow hover highlight
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].className = "option hover";
    }

    if (optionSelected || firstQuestion) {
        firstQuestion = false;
        optionSelected = false;

        // make all questions hidden
        for (var i = 0; i < allQuestions.length; i++) {
            allQuestions[i].style.display = "none";
        }

        // display random question
        var randQuestionNum = Math.floor(Math.random() * questions.length);
        questions[randQuestionNum].style.display = "block";

        // update question # to user
        questions[randQuestionNum].children[1].innerHTML = "Question " + (totalQuestions + 1) + " of " + allQuestions.length;

        // re-initialize questions to remove displayed index
        questions.splice(randQuestionNum, 1);

        /*var replace = document.getElementById(("replace"));
        replace.innerHTML = "" +  questions.length; */
    }


}

function openLastChapter() {

    //openChapter('active2', 'chapter2'); initializeQuestions('ch2Question', 2);

    var listNum = 'active' + lastTabPressed;
    var chapter = 'chapter' + lastTabPressed;
    //document.write(listNum + "&nbsp;&nbsp;&nbsp;&nbsp;" + chapter);
    openChapter(listNum, chapter);
    //openChapter('active2', 'chapter2');

    var thisField = 'ch' + lastTabPressed + 'Question';
    initializeQuestions(thisField, lastTabPressed);


}

/* DATA */

// updates data temporarily when answer choice is selected
function updateDataTemporarily(question, yourAnswer, correctAnswer, points) {
    currQuestion = question;
    currYourAnswer = yourAnswer;
    currCorrectAnswer =  correctAnswer;
    currPoints = points;
    optionSelected = true;

    // disallow future hover highlights for a given question after first answer choice is selected
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].className = "option";
    }

}

// finalizes answer choice when next is selected
function updateDataOfficially() {
    if (optionSelected) {
        ansArray.push([currQuestion, currYourAnswer, currCorrectAnswer, currPoints]);
        totalPoints += currPoints;
        totalQuestions++;

        if (questions.length == 0) {
            displayData();
        }
    }
    else {
        //tell user to select an option
        alert("Select an answer choice to move on");
    }
}

function displayData() {
    dataPage.style.display = "block";
    window.clearInterval(stopTimer);

    // make all feedback chunks hidden
    var feedbackChunks = Array.from(document.getElementsByClassName("questionFeedbackChunk"));
    for (var i = 0; i < feedbackChunks.length; i++) {
        feedbackChunks[i].style.display = "none";
    }

    // show and style the correct amount.
    for (var i = 0; i < allQuestions.length; i++) {
        feedbackChunks[i].style.display = "block";
        feedbackChunks[i].children[0].innerHTML = ansArray[i][0];
        feedbackChunks[i].children[2].innerHTML = ansArray[i][1] + "<br>";
        feedbackChunks[i].children[4].innerHTML = ansArray[i][2];

        // if users answer was incorrect on given question
        if (ansArray[i][3] === 0) {
            feedbackChunks[i].className = "questionFeedbackChunk incorrect";
            feedbackChunks[i].children[1].style.display = "inline";
            feedbackChunks[i].children[2].style.display = "inline";
        }
        // if user was correct
        else {
            feedbackChunks[i].className = "questionFeedbackChunk correct";
            feedbackChunks[i].children[1].style.display = "none";
            feedbackChunks[i].children[2].style.display = "none";
        }
    }
}

/* TIMER */

var htmlTimer = document.getElementById("timer");
var seconds = 0;
var minutes = 0;
var hours = 0;

var secondsCorrectedForTens;
var minutesCorrectedForTens;
var hoursCorrectedForZero;

var stopTimer = setInterval(increment, 1000);
function increment() {

    // increment seconds, and maybe minutes & hours
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    // correct for 0s in front of seconds and minutes. Don't show hours if minutes < 60.
    secondsCorrectedForTens = seconds.toString();
    minutesCorrectedForTens = minutes.toString();
    hoursCorrectedForZero = hours.toString() + ":";
    if (seconds < 10) {
        secondsCorrectedForTens = "0" + seconds.toString();
    }
    if (minutes < 10 && hours > 0) {
        minutesCorrectedForTens = "0" + minutes.toString();
    }
    if (hours === 0) {
        hoursCorrectedForZero = "";
    }
    htmlTimer.innerHTML = hoursCorrectedForZero + minutesCorrectedForTens + ":" + secondsCorrectedForTens;
}

// for testing purposes
function writeTesting() {
    document.write("There are " + questions.length + " questions.");
    document.write("5 random numbers 1-10: "+ (Math.floor((Math.random() * 25)) + 1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (Math.floor((Math.random() * 25)) + 1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (Math.floor((Math.random() * 25)) + 1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (Math.floor((Math.random() * 25)) + 1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (Math.floor((Math.random() * 25)) + 1));
    document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ansArray[0][0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[0][1] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[0][2] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[0][3]);
    document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ansArray[1][0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[1][1] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[1][2] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[1][3]);
    document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + ansArray[2][0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[2][1] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[2][2] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ansArray[2][3]);

}

