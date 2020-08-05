var arm=document.querySelector(".arm");
var body=document.querySelector(".body");
var legs=document.querySelector(".legs");
var legone=document.querySelector(".legone");
var legtwo=document.querySelector(".legtwo");
var player=document.querySelector(".player");
var isBird=false;
let bird;
let hydrant;
let count=0;
let scoreDOM=document.querySelector(".score")

var gameCanvas=document.querySelector(".game")

//Player animations

function animateDuck(){
    arm.classList.add("animate-shrinkarm")
    legs.classList.add("animate-shrinklegs")
    body.classList.add("animate-shrinkbody")
    player.classList.add("animate-shrinkperson")

    setTimeout(()=>{
        arm.classList.remove("animate-shrinkarm")
        legs.classList.remove("animate-shrinklegs")
        body.classList.remove("animate-shrinkbody")
        player.classList.remove("animate-shrinkperson")

    },1000)
}



function animateJump(){
    player.classList.add('animate-jump')
    legone.classList.add("animate-legsplitone")
    legtwo.classList.add("animate-legsplittwo")

    setTimeout(()=>{
        player.classList.remove('animate-jump')
        legone.classList.remove('animate-legsplitone')
        legtwo.classList.remove('animate-legsplittwo')

    },1500)
}


// DOM Player function

function playerAction(){

    if(isBird){
        animateDuck()}
    else{
        animateJump()
    }
}




// Generate Obstacles functions


function generateHydrant(){
     hydrant=document.createElement("div")
    let hydrantTop=document.createElement("div")
    let hydrantCross=document.createElement("div")
    let hydrantBody=document.createElement("div")

    hydrant.className="hydrant";
    hydrantTop.className="hydrant_top";
    hydrantCross.className="hydrant_cross"
    hydrantBody.className="hydrant_block"

    for(let i=0;i<3;i++){
        let line=document.createElement("div");
        line.className="line";
        hydrantBody.appendChild(line)
    }

    hydrant.appendChild(hydrantTop)
    hydrant.appendChild(hydrantCross)
    hydrant.appendChild(hydrantBody)

gameCanvas.appendChild(hydrant)


setTimeout(()=>{
    // cleanDom("hydrant")
    // hydrant.innerHTML=""
    gameCanvas.removeChild(hydrant)

},2000)

}




function generateBird(){
     bird=document.createElement("div")
    let headBody=document.createElement("div")
    let wing=document.createElement("div")

    bird.className="bird";
    headBody.className="head_body";
    wing.className="wing"

    headBody.appendChild(wing);
    bird.appendChild(headBody)


gameCanvas.appendChild(bird)

setTimeout(()=>{
    // cleanDom("bird")
        gameCanvas.removeChild(bird)
},2000)
}



function determineObstacle(){
    return Math.random();
}



function gameLoop(){
    if(determineObstacle() > .5){
        isBird=true;
         generateBird()
    }
    else{
        isBird=false;
        generateHydrant()
    }

    setTimeout(()=>{
        gameLoop()
    },3000)
}


gameLoop()


// let cornDOM=document.querySelector(".cornfield")

// let html="";

// for(let i=0;i<5;i++){
//     for(let j=0;j<15;j++){
//         html+= `<div class='corn'></div>`
//     }
// }


// cornDOM.innerHTML=html;



setInterval(()=>{
    let playerTop=parseInt(window.getComputedStyle(player).getPropertyValue('top'))
    // let playerTop=parseInt(window.getComputedStyle(player).getPropertyValue('top'))
    // let birdLeft=parseInt(window.getComputedStyle(bird).getPropertyValue('left'))
    // let hydrantLeft=parseInt(window.getComputedStyle(hydrant).getPropertyValue('left'))

    if(isBird){
        let birdLeft=parseInt(window.getComputedStyle(bird).getPropertyValue('left'))
        console.log("BIrd:" + birdLeft + " Player : " + playerTop)
        if(birdLeft > 0 && birdLeft < 40 && playerTop < 275){
            alert('you got hit!')
        }
        else{
            count++
            scoreDOM.innerHTML=count;
        }
    }
    else{
       // hydrantLeft > 0 && hydrantLeft < 35 && 
     let hydrantLeft=parseInt(window.getComputedStyle(hydrant).getPropertyValue('left'))
     if (hydrantLeft > 0 && hydrantLeft < 40 && playerTop > 200){

         alert("you lost! " + playerTop)
     }
     else{
        count++
        scoreDOM.innerHTML=count;
    }
     }
},10)



