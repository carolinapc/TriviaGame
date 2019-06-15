const TIME_TO_ANSWER = 30;
var audio = document.getElementById("sound-effect");
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
    winner:  "assets/images/flag-party.gif"};

var soundEffects = {
    incorrect: "assets/sounds/whistle.mp3",
    correct: "assets/sounds/claps.mp3",
    timesup: "assets/sounds/countdown.mp3",
    winner: "assets/sounds/canada-anthem.mp3",
    loser: "assets/sounds/loser.mp3"
};

    
function createQuestions(){
    questions = [
        {
            query: "Approximately how many Canadians served in the First World War?",
            answers: ["7000",
                    "8 million",
                    "About 60,000",
                    "More than 600,000"],
            correctAnswer: 3
        },
        {
            query: "Canada has three territories and how many provinces?",
            answers: ["13",
                    "10",
                    "3",
                    "5"],
            correctAnswer: 1
        },
        {
            query: " From where does the name 'Canada' come from?",
            answers: ["From the Inuit word meaning country",
                    "From the French word meaning joining",
                    "From the Metis word meaning rivers",
                    "From 'Kanata', the Huron-Iroquois word for village"],
            correctAnswer: 3
        },
        {
            query: "Give the first line of Canada's national anthem?",
            answers: ["O Canada! Our home and native land! ",
                    "O Canada! Our province and native land!",
                    "O Canada! From far and wide, O Canada, We stand on guard for thee.",
                    "O Canada! We stand on guard for thee."],
            correctAnswer: 0
        },
        {
            query: "Name the five regions of Canada",
            answers: ["Midwest, North, South, East, Central",
                    "Maritimes, Ontario, Quebec, Prairies, and British Columbia",
                    "Atlantic, Central, Prairie, West Coast, and North",
                    "West, Central, East, Prairies, and Territories"],
            correctAnswer: 2
        },
        {
            query: "On what date did Nunavut become a territory?",
            answers: ["July 1st, 1867",
                    "April 1st, 1999",
                    "June 24th, 1995",
                    "March 31st, 1949"],
            correctAnswer: 1
        },
        {
            query: "One third of all Canadians live in which province?",
            answers: ["Quebec",
                    "Northwest Territories",
                    "Ontario",
                    "Manitoba"],
            correctAnswer: 2
        },
        {
            query: "What are the three main groups of Aboriginal peoples?",
            answers: ["Acadians, Metis and Inuit",
                    "United Empire Loyalists, Metis and Inuit",
                    "Inuit, Metis and Acadians",
                    "First Nations, Metis and Inuit."],
            correctAnswer: 3
        },
        {
            query: "What is Canada's national winter sport?",
            answers: ["Golf",
                    "Nordic skiing",
                    "Lacrosse",
                    "Hockey"],
            correctAnswer: 3
        },
        {
            query: "Which animal is an official symbol of Canada?",
            answers: ["The moose",
                    "The hawk",
                    "The beaver",
                    "The deer"],
            correctAnswer: 2
        }

    ];   

}

//play sound effect
function playSoundEffect(effect){
    
    audio.src = effect;
    audio.load();
    audio.play();     
}

function stopSound(){
    audio.pause();
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
        if(time == 10) {
            playSoundEffect(soundEffects.timesup);
            $("#time-display").addClass("blink");
        }
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
        $("#answer").css("display","block");
    }

    $("#play").css("display","none");

    switch (userAnswer) {
        case -1:
            playSoundEffect(soundEffects.incorrect);
            changeMessage("Time's up!");
            $("#mascot").attr("src",mascotImages.timesup);
            displayCorrectAnswer();
            unanswered++;
            break;
        case questions[questionIndex].correctAnswer:
            playSoundEffect(soundEffects.correct);
            changeMessage("Correct!");
            $("#mascot").attr("src",mascotImages.correct);
            correctAnswer++;
            break;
        default:
            playSoundEffect(soundEffects.incorrect);
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
    {
        playSoundEffect(soundEffects.winner);
        $("#mascot").attr("src",mascotImages.winner);
    }
    else if(correctAnswer < incorrectAnswer + unanswered){
        playSoundEffect(soundEffects.loser);
        $("#mascot").attr("src",mascotImages.loser);
    }  
    else
    {
        playSoundEffect(soundEffects.loser);
        $("#mascot").attr("src",mascotImages.tie);
    }
        

    //show the summary
    $("#summary").css("display","block");
    $("#answer").css("display","none");

    changeMessage("All done! Here is what you did...");


    //show the button to restart
    $("#start").text("Start Over");
    $("#start").css("display","block");
}

function reset(){
    stopSound();
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