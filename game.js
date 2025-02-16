var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []

var level = 0;
var started = false;

/*function to generate colors by the game*/
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random()* 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
       playSound(randomChosenColour);
}

/*add a funtion to the document everytime the user click a keyboard key*/
$(document).keypress(function(){
    if(started === false){
        nextSequence();
        started = true;
    }
});


/*add a function to the button clicked by user */
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

/*function to add a sound when thye buttons are clicked */
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

/*function to add animation when thye buttons are clicked */
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    }

/*A function to check the answer of the user if it matches the game */
function checkAnswer(currentLevel){
   if( gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(() => {
            nextSequence();
        }, 1000);
       }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart!");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);
        startOver();
    }
}
/* A function to restart the game*/
function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}
