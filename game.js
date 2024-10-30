const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;
let level = 0;



$(document).on("keydown",function(){
    nextSequence();
    $("h1").text(`Level ${level}`);
    
});

$(".btn").on("click", function(){
    let userChosenColour = $(this). attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("h1").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random()*4);
    
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    let a = new Audio("sounds/"+name+".mp3");
    a.play();

}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(()=>{$("#" + currentColour).removeClass("pressed")},100)

}

function startOver(){
    playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text(`Game Over, Press Any Key to Restart`);
        level=0;
        gamePattern = [];
        started = false;
}




