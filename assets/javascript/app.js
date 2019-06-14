const TIME_TO_ANSWER = 30;
var started = false;
var time = TIME_TO_ANSWER; 
var questionInterval;
var questionIndex = 0;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unanswered = 0;
var questions =[];
var mascotImages = {
    incorrect: "assets/images/flag-yellow.gif",
    correct: "assets/images/flag-claps.gif",
    cheer: "assets/images/flag-cheer.gif",
    timesup: "assets/images/flag-timesup.gif",
    tie: "assets/images/flag-claps.gif",
    loser: "assets/images/flag-red.gif",
    winner:  "assets/images/flag-party.gif"}


function createQuestions(){
    questions = [
        {
            query: "Question 1",
            answers: ["Answer 1",
                    "Answer 2",
                    "Answer 3",
                    "Answer 4"],
            correctAnswer: 0
        },
        {
            query: "Question 2",
            answers: ["Answer 1",
                    "Answer 2",
                    "Answer 3",
                    "Answer 4"],
            correctAnswer: 1
        },
        {
            query: "Question 3",
            answers: ["Answer 1",
                    "Answer 2",
                    "Answer 3",
                    "Answer 4"],
            correctAnswer: 2
        }
    ];   

}


function timeConverter(t) {

  if (t < 10) {
    t = "0" + t;
  }

  return t + " seconds";
}

function countDown(){
    if(time == TIME_TO_ANSWER) $("#time-display").removeClass("blink");

    if(time >= 0){
        $("#time-display").text(timeConverter(time));
        if(time == 10) $("#time-display").addClass("blink");
        time--;
    }
    else{
        showAnswer(-1);
    }
        
}

function changeMessage(msg){
    $("#message").text(msg);
}

function showQuestion(){
    clearInterval(questionInterval);
    $("#time").css("display","block");
    
    changeMessage("");
    $("#mascot").attr("src",mascotImages.cheer);

    //starts the time
    time = TIME_TO_ANSWER;
    countDown();
    questionInterval = setInterval(countDown, 1000);
    
    //choses a question
    $("#question").text(questions[questionIndex].query);
    $("#answer-0").text(questions[questionIndex].answers[0]);
    $("#answer-1").text(questions[questionIndex].answers[1]);
    $("#answer-2").text(questions[questionIndex].answers[2]);
    $("#answer-3").text(questions[questionIndex].answers[3]);

    $("#answer").css("display","none");
    $("#play").css("display","block");
}

function showAnswer(userAnswer){

    //stop the interval
    clearInterval(questionInterval);

    var displayCorrectAnswer = function (){
        $("#answer").text("The correct answer was: " + questions[questionIndex].answers[questions[questionIndex].correctAnswer]);
    }

    $("#play").css("display","none");
    $("#answer").css("display","block");

    switch (userAnswer) {
        case -1:
            changeMessage("Time's up!");
            $("#mascot").attr("src",mascotImages.timesup);
            displayCorrectAnswer();
            unanswered++;
            break;
        case questions[questionIndex].correctAnswer:
            changeMessage("Correct!");
            $("#mascot").attr("src",mascotImages.correct);
            correctAnswer++;
            break;
        default:
            changeMessage("Wrong!");
            $("#mascot").attr("src",mascotImages.incorrect);
            displayCorrectAnswer();
            incorrectAnswer++;
            break;
    }

    questionIndex++;
    if(questionIndex < questions.length)
        setTimeout(showQuestion,3000);
    else    
        setTimeout(gameOver,3000);
}

function gameOver(){
    //update summary data
    $("#corrects").text(correctAnswer);
    $("#incorrects").text(incorrectAnswer);
    $("#unanswered").text(unanswered);

    if(correctAnswer > incorrectAnswer + unanswered)
        $("#mascot").attr("src",mascotImages.winner);
    else if(correctAnswer < incorrectAnswer + unanswered)    
        $("#mascot").attr("src",mascotImages.loser);
    else
        $("#mascot").attr("src",mascotImages.tie);

    //show the summary
    $("#summary").css("display","block");
    $("#answer").css("display","none");

    changeMessage("All done! Here is what you did...");


    //show the button to restart
    $("#start").text("Start Over");
    $("#start").css("display","block");
}

function reset(){
    
    started = false;
    clearInterval(questionInterval);
    time = TIME_TO_ANSWER; 
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    questionIndex = 0;
    createQuestions();
    changeMessage("");
    $("#summary").css("display","none");
    
}

function answerClicked(){
    showAnswer(parseInt($(this).val()));
}

function start(){
    reset();
    started = true;
    $("#start").css("display","none");
    
    showQuestion();
}

$("#start").click(start);
$(".answer").click(answerClicked);