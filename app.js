const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const song = document.querySelector(".song");
const avatarImg =document.querySelector(".avatarImg");
const volumeBtn = document.querySelector(".volumeBtn");
const myInput = document.querySelector("#myinput");

song.volume=0.5;

const volumeControl = document.querySelector(".volume-control");
volumeBtn.addEventListener("click",showVolume=()=>{
    volumeControl.classList.toggle("volumeShow");
});


playBtn.addEventListener("click",playMusic=()=>{
    console.log("music start");
    song.play();
    playBtn.style.display="none";
    pauseBtn.style.display="block";
    avatarImg.classList.add("anime");

});



pauseBtn.addEventListener("click",()=>{
    song.pause();
    playBtn.style.display="block";
    pauseBtn.style.display="none"
    avatarImg.classList.remove("anime");
})



//              Setting Up the Progress bar   


// Start and End 
const end = document.querySelector(".end");
const start = document.querySelector(".initial");

song.addEventListener("timeupdate",(e)=>{
  
  const CurrTime = Math.floor(song.currentTime);
  const totalTime = Math.floor(song.duration);

  let bar = (CurrTime*100)/totalTime;
  

 
  var value = bar;
  myInput.value=bar;
  myInput.style.background = 'linear-gradient(to right, hotpink 0%, hotpink ' + value + '%, pink ' + value + '%, pink 100%)';
 
  let totalTimeMin = totalTime/60;
  let totalTimeSec = totalTime%60

  
  end.innerHTML=`${Math.floor(totalTimeMin)}:${totalTimeSec}`;

  let showCurrentSec = Math.floor(CurrTime%60);
  let showCurrentMin = Math.floor(CurrTime/60);

  start.innerHTML=`${showCurrentMin}:${showCurrentSec}`;

});



//              Setting Up the Voloume Control  

const volumeBar = document.querySelector(".volumeBar");
const plusBtn = document.querySelector(".plusBtn");
const minusBtn = document.querySelector(".minusBtn");

volumeBar.addEventListener("input",(e)=>{ 
    song.volume=volumeBar.value/10;
});

plusBtn.addEventListener("click",()=>{
    if(song.volume<0.9){
        song.volume= song.volume+0.1;   
    }
    volumeBar.value = song.volume*10;
    
});

minusBtn.addEventListener("click",()=>{
    if(song.volume>0.001){
        song.volume= song.volume-0.1;   
        
    }

    volumeBar.value = song.volume*10;
    
})


  // trying
 
  

  myInput.addEventListener("click",(e)=>{

    let songTime = Math.floor((myInput.value*song.duration)/100);
    
    song.currentTime = songTime;
  });




//                                  OKhhhh  Now we have to set next Song, Prev Song, Stop the image roatating when music end and
//                                  Change of button 


song.addEventListener("ended",()=>{
    
    avatarImg.classList.remove("anime");
    playBtn.style.display="block";
    pauseBtn.style.display="none";
    
});




//  Setting Up the   :    Next Song  , and Previous Btn   but first set the json




    
    
    




    let mainData;
    fetch("details.json")
    .then(response=>response.json())
    .then(data=>{
        mainData = data
    })
    .catch(console.log("helo"));





setTimeout(()=>{console.log(mainData[1])},500);


const nextBtn = document.querySelector(".nextBtn");
const backBtn = document.querySelector(".backBtn");
const songName = document.querySelector(".songName");
const artist = document.querySelector(".artist");

let i =0;

nextBtn.addEventListener("click",()=>{
    
    song.src = mainData[i].source;
    songName.textContent=mainData[i].title;
    artist.textContent=mainData[i].artist;
    avatarImg.src = mainData[i].img;
    song.play();
    i=(i+1)%mainData.length;
    
    playBtn.style.display="none";
    pauseBtn.style.display="block";
    avatarImg.classList.add("anime");
    

    
});


backBtn.addEventListener("click",()=>{
    
    song.src = mainData[i].source;
    songName.textContent=mainData[i].title;
    artist.textContent=mainData[i].artist;
    avatarImg.src = mainData[i].img;
    song.play();
    i=(i-1+mainData.length)%mainData.length;
    
    playBtn.style.display="none";
    pauseBtn.style.display="block";
    avatarImg.classList.add("anime");
    

    
});

