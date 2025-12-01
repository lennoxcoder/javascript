
let jetIndex = 0;
const strArrBez = ["linear", "linear", "ease-in", "ease-in", "ease-out"];
const fileArr = ["./img/01.svg", "./img/02.svg", "./img/03.svg", "./img/04.svg", "./img/05.svg"]
const jetTimer = [6,5,4,3,2];
let viewPort = document.getElementsByClassName("viewPort")[0];
let jetTrack = document.getElementsByClassName("jetTrack")[0];
let cannon = document.getElementById("cannon");
let canX=10;
let areaWidth = viewPort.clientWidth;

const audioStart = new Audio('./sound/button-press.wav');
const audio1 = new Audio('./sound/engine01.mp3');
const audio2 = new Audio('./sound/engine02.mp3');
let audioEngine = audio1;
//jetTrack.style.opacity=0;


function showInfo(msg) {

    id=document.getElementById("info");
    id.style.opacity=1;
    id.innerHTML=msg;
    wait(3000).then(()=>id.style.opacity=0);
}


// =====================BUTTON PLAY=============================
document.getElementById('btnPlay').addEventListener('click', () => {
    audioStart.play();

    // MOBILE
    if (window.innerWidth <= 768) {
        const warning = document.createElement('div');
        warning.textContent="CONCEBIDO PARA DESKTOP";
        warning.classList.add('warning');
        jetTrack.appendChild(warning);

    // DESKTOP    
    } else {        
        cannon.focus();
        jetTrack.style.opacity=1.0;
        showInfo('Level 1');
        wait(1000).then(()=>startRaid());        
    }
});


// =====================DIRECTIONAL KEYS < > ======================
cannon.addEventListener('keydown', moveCannon);


function moveCannon(event) {

    const keyPpress = event.key;
    event.preventDefault();
    let range=jetTrack.clientWidth-50;
    let step=5;
    
    if (keyPpress === '.') {
        canX=canX+step;
        if (canX>=range) canX=range;
        cannon.style.marginLeft=`${canX}px`;                
    }
    
    if (keyPpress === ',') {
        canX=canX-step;
        if (canX<=10) canX=10;
        cannon.style.marginLeft=`${canX}px`;       
    }    
}




function NextJet() {

    let varTime = jetTimer[jetIndex];
    let newImg = document.createElement('img');
    newImg.style.animationDuration = `${varTime}s`;
    newImg.style.animationTimingFunction = strArrBez[jetIndex];
    newImg.id = "jet";
    newImg.className = "jetAnimation";
    newImg.width = 100;
    newImg.height = 40;
    newImg.src = fileArr[jetIndex];
    let strMsg=fileArr[jetIndex];
    jetTrack.innerHTML = `<div id="info" class="info">Enemy ${strMsg} </div>;`
    jetTrack.appendChild(newImg);
    playEngineSound();
    jetIndex = jetIndex + 1;
    if (jetIndex >= fileArr.length) jetIndex = 0;    

}

function wait(miliSeconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, miliSeconds);
    })
}


function playEngineSound() {
    
    audioEngine.pause();
        
    switch (jetIndex) {
        case 0:
            audioEngine=audio1;  
            audioEngine.currentTime = 3;            
            break;
        case 1:
            audioEngine=audio1;              
            audioEngine.currentTime = 3;            
            break;
        case 2:
            audioEngine=audio2;              
            break;
        case 3:
            audioEngine=audio2;                  
            break;
        case 4:
            audioEngine=audio2;              
            break;

            default:audioEngine=audio2
            break;
    }

    audioEngine.play();      
    
}

function startRaid() {

    let tp = [6200,11400,15600,18800]; // time points
        
    NextJet();
    
    // Gera promessas de voo.
    for (let t of tp) {
        wait(t).then(() =>{NextJet()});    
    }
    
}

    



