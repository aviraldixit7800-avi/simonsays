// let gameseq=[];
// let userseq=[];
// let btns =["red","yellow","blue","green"];

// let started = false;
// let level =0;

// let h2 = document.querySelector("h2");

// document.addEventListener("keypress",function(){
//     if(started == false){
//         console.log("game started");
//         started = true;

//         levelUp();
//     }
// });

// function gameflash(btn){
//     btn.classList.add("flash");
//     setTimeout(function (){
//         btn.classList.remove("flash");
//     },100);
// }

// function userflash(btn){
//     btn.classList.add("userflash");
//     setTimeout(function (){
//         btn.classList.remove("userflash");
//     },100);
// }

// function levelUp(){
//     userseq=[];
//     level++;
//     h2.innerText = `level ${level}`;
//     //random btn choose
//     let randIdx =Math.floor(Math.random()*3);
//     let randColor = btns[randIdx];
//     let randbtn = document.querySelector(`.${randColor}`);
//     // console.log(randIdx);
//     // console.log(randColor);
//     // console.log(randbtn);
//     gameseq.push(randColor);
//     console.log(gameseq);
//     gameflash(randbtn);
// }

// function checkans(idx){
//     // let idx = level-1;
//     if(userseq[idx]===gameseq[idx]){
//         if(userseq.length==gameseq.length){
//            setTimeout (levelUp,1000);
//         }
//     }else{
//         h2.innerHTML =`Game over! your score was <b>${level}</b><br> press any key to start `;
//         document.querySelector("body").style.backgroundColor="red";
//         setTimeout(function(){
//             document.querySelector("body").style.backgroundColor="white";
//         },150);
//         reset();
//     }
// }

// function btnPress(){
    
//     let btn = this;
//     userflash(btn);

//     userColor=btn.getAttribute("id");
//     userseq.push(userColor);

//     checkans(userseq.length-1);
// }

// let allBtns= document.querySelectorAll(".btn");
// for(btn of allBtns){
//     btn.addEventListener("click",btnPress)
// }

// function reset(){
//     started=false;
//     gameseq=[];
//     userseq=[];
//     level=0;
// }
let gameseq = [];
let userseq = [];

let btns = ["red", "yellow", "blue", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let levelDisplay = document.querySelector("#level");
let highScoreDisplay = document.querySelector("#high-score");

const audioCtx = new (
    window.AudioContext ||
    window.webkitAudioContext
)();

const frequencies = {
    red: 261.63,
    yellow: 329.63,
    blue: 392.00,
    green: 523.25
};


function playSound(color) {

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    let oscillator = audioCtx.createOscillator();

    let gainNode = audioCtx.createGain();


    oscillator.type = "sine";

    oscillator.frequency.value =
        frequencies[color];


    gainNode.gain.setValueAtTime(
        0.3,
        audioCtx.currentTime
    );


    gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime + 0.3
    );


    oscillator.connect(gainNode);

    gainNode.connect(
        audioCtx.destination
    );


    oscillator.start();

    oscillator.stop(
        audioCtx.currentTime + 0.3
    );
}


document.addEventListener(
    "keydown",
    function () {

        if (started === false) {

            console.log("Game Started");

            started = true;

            levelUp();
        }

    }
);

function gameflash(btn) {

    btn.classList.add("flash");

    playSound(btn.id);


    setTimeout(function () {

        btn.classList.remove("flash");

    }, 20);
}

function userflash(btn) {

    btn.classList.add("userflash");

    playSound(btn.id);


    setTimeout(function () {

        btn.classList.remove("userflash");

    }, 100);
}


function levelUp() {

    // Clear user's previous answer
    userseq = [];


    // Increase level
    level++;


    // Update level on screen
    levelDisplay.innerText = level;

    h2.innerText = `Level ${level}`;


  
    let randIdx = Math.floor(
        Math.random() * btns.length
    );

    let randColor = btns[randIdx];


    // Add new color to sequence
    gameseq.push(randColor);


    console.log(
        "Game Sequence:",
        gameseq
    );


   
    let i = 0;


    let interval = setInterval(function () {

        let color = gameseq[i];


        let btn = document.querySelector(
            `#${color}`
        );


        gameflash(btn);


        i++;


        // Sequence finished
        if (i === gameseq.length) {

            clearInterval(interval);


            setTimeout(function () {

                h2.innerText =
                    "Your Turn!";

            }, 400);
        }


    }, 200);
}


function checkans(idx) {

    // Correct answer
    if (
        userseq[idx] ===
        gameseq[idx]
    ) {


        // User completed entire sequence
        if (
            userseq.length ===
            gameseq.length
        ) {

            h2.innerText =
                "Correct!";


            setTimeout(function () {

                levelUp();

            }, 800);
        }

    }

    // Wrong answer
    else {

        gameOver();
    }
}



function gameOver() {

    h2.innerHTML =
        `Game Over! Score: <b>${level}</b><br>
        Press any key to restart`;


    // Update high score
    if (level > highScore) {

        highScore = level;

        highScoreDisplay.innerText =
            highScore;
    }


    // Game over animation
    document.body.classList.add(
        "game-over"
    );


    document.body.style.background =
        "linear-gradient(135deg, #450a0a, #7f1d1d)";


    setTimeout(function () {

        document.body.classList.remove(
            "game-over"
        );


        document.body.style.background =
            "linear-gradient(135deg, #0f172a, #1e293b, #020617)";

    }, 500);


    reset();
}


function btnPress() {

    // Don't allow clicks before game starts
    if (!started) return;


    let btn = this;


    // Flash button
    userflash(btn);


    // Get clicked color
    let userColor =
        btn.getAttribute("id");


    // Add user's answer
    userseq.push(userColor);


    console.log(
        "User Sequence:",
        userseq
    );


    // Check answer
    checkans(
        userseq.length - 1
    );
}



let allBtns =
    document.querySelectorAll(".btn");


for (let btn of allBtns) {

    btn.addEventListener(
        "click",
        btnPress
    );
}




function reset() {

    started = false;

    gameseq = [];

    userseq = [];

    level = 0;

    levelDisplay.innerText = "0";
}