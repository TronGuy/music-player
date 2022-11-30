window.onload = ()=>{

    document.querySelector('progress').setAttribute('value',0);
}

//confs
var musics = [];
var intervalo = 0;
let audio = document.createElement('audio');
audio.controls = true;
audio.style.display = "none";
document.querySelector('body').appendChild(audio);
document.getElementById('chk').checked = false;
let update = 0;
var background = 1;

function autonomousPlay(){

    if(document.getElementById('chk').checked == false){
        document.getElementById('chk').checked = true;
        audio.src = `musics/${musics[0]}`;
        document.getElementById('title-1').innerText = musics[0].replace('.mp3','');
        audio.play();
        timeStart();
    }
    

}

function buildList(){

    let i = 0;
    document.getElementById('listaudio').addEventListener('change',function(){
        let lista = document.getElementById('listaudio').files
        for(i; i < lista.length; i++){
            musics.push(lista[i]['name']);
        }

        document.getElementById('title-1').innerText = musics[0].replace('.mp3','');
        audio.src = `musics/${musics[0]}`
        document.getElementsByClassName('label')[0].innerText = "Aperte o PLAY!"
        document.getElementsByClassName('label')[0].style.textDecoration = "none";
        document.getElementById('listaudio').style.display = "none";
        document.querySelector('progress').removeAttribute('hidden'); 

        setTimeout(function(){

            document.getElementsByClassName('label')[0].style.display = "none";
        },5000);
    })
    
}

function resetProgress(){

    document.querySelector('progress').setAttribute('value',0);
    document.querySelector('progress').setAttribute('max',0 );
    update = 0;

}


function playStyle(){

    const capa = document.getElementById('cap');
    capa.style.background = "url('./thumbs/1.gif')";
    capa.style.backgroundSize = "cover";
    capa.style.backgroundPosition = "center";
    document.getElementById('playsymbol').setAttribute('class','pausesymbol');

}


function pauseStyle(){

    document.getElementById('playsymbol').setAttribute('class','play')
    
}

function timeUpdate(){

    let duration = parseInt(audio.duration);
    let current = parseInt(audio.currentTime);
    update +=1    
    document.querySelector('progress').setAttribute('max',duration);
    document.querySelector('progress').setAttribute('value',update);

    if(current == duration){
        musics.shift();
        timeStop();
        resetProgress();
        document.getElementById('chk').checked = false;
        autonomousPlay()
    }
}

function timeStart(){

    intervalo =   setInterval(timeUpdate,1000);
}

function timeStop(){

    clearInterval(intervalo)
}

function listeners(){

    const play =  document.getElementById('play');
    const next = document.getElementById('next');
    const previously = document.getElementById('previously');

    play.addEventListener('click',function(e){
            let chk = document.getElementById('chk').checked;
            if(chk == false){
                if(musics[0]){
                document.getElementById('chk').checked = true;
                playStyle();
                audio.play();
                timeStart();
                changeBackground();
                }
                else{

                    alert("Não existem músicas em suas lista de reprodução.")
                }
        }

            else{
                timeStop()
                document.getElementById('chk').checked = false;
                pauseStyle();
                audio.pause();  
         }
    })
}

function changeBackground(){

    setInterval(function(){

        if(background == 7){

            background = 1;
        }
        background += 1;        
        document.querySelector('body').style.backgroundImage = `url('backgrounds/${background}.gif')`;
       document.querySelector('body').style.backgroundSize = "cover";
       document.querySelector('body').style.backgroundPosition = "center";
       document.querySelector('body').style.backgroundRepeat = "no-repeat";
       document.querySelector('body').style.zIndex = '-999';
       
    },8000)
}



    buildList()
    listeners();
    