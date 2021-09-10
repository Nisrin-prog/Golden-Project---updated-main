var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var qid =1
var form;
var answer;
var playerExists
var form2;
var title,guru;
var hero, heroin, song, movie;
var points = 30;
var db
var id
var resultPlayers = []
var userId 
var answerFlag = 0;

function preload(){
  gameback = loadImage("img/4.png")
  heroI = loadImage("img/hero2.png")
  heroinI = loadImage("img/heroin2.png")
  movieI = loadImage("img/movie2.png")
  songI = loadImage("img/song2.png")
  titleI = loadImage("img/title.png")
  guruI = loadImage("img/guru.png")
  ticketI = loadImage("img/ticket.png")
  bckmusic = loadSound("img/music.mp3")
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  bckmusic.loop()
  db = firebase.firestore()
  form = new Form()

  title = createSprite(windowWidth/2 + 20 , windowHeight/2 - 230)
  title.addImage(titleI)
  title.scale = 1.8;
  
  guru = createSprite(windowWidth/2 - 250 , windowHeight/2 - 70)
  guru.addImage(guruI)
  guru.scale = 1.3;
  
  hero = createSprite(windowWidth/2 - 115 , windowHeight/2 - 160)
  hero.addImage(heroI)
  hero.scale = 0.5;

  heroin = createSprite(windowWidth/2 + 156 , windowHeight/2 - 170)
  heroin.addImage(heroinI)
  heroin.scale = 0.46;

  song = createSprite(windowWidth/2 - 120 , windowHeight/2 - 70)
  song.addImage(songI)
  song.scale = 0.35;

  movie = createSprite(windowWidth/2 + 135 , windowHeight/2 - 90)
  movie.addImage(movieI)
  movie.scale = 0.45;

  if (gameState === 0){
    form.display()    
   }  
  
}


function draw(){
  background(gameback)

  textSize(14)
  stroke(204, 36, 117)
  strokeWeight(1)
  fill(204, 36, 117)
  text("Bolly coins : " + points,windowWidth/2 + 300, windowHeight/2 - 200)
  
   if (gameState === 0){
    line(windowWidth/2, windowHeight/2 - 200, windowWidth/2, windowHeight/2 - 30)
    line(windowWidth/2 - 250, windowHeight/2 - 120, windowWidth/2 + 290, windowHeight/2 - 120)
   }  
  
  if(gameState === 1 ){
    form.hide()
    form2.display()
    form2.getDataHints()
    if(form2.questions !== []|| form2.questions.length!== undefined){
      console.log(form2.questions.length)
      form2.displayQuestions()  
    }  
  }
  
  if(gameState === 2){
    end()
  }
  
  if (answerFlag === 4){
    answerFlag = 0;
    reset();
  }

  if(playerExists === false){
    addPlayer()
  }

  drawSprites();
}

function reset(){
  form2.show();
  points += 20;
  qid += 1;
  form2.clickFlag = 0
}

function keyPressed(){
  if(keyCode === 13 && gameState === 0){
    userId = form.input.value()
    if(userId!==''){
      if(form.validation(userId)){
        if(!checkPlayer(userId)){
          addPlayer()      
        }
      }  
    }
    else{
      alert('enter email to continue')
    }
  }
}

async  function checkPlayer(id){ 
  var localPlayer = []
  //Reading players from database to check if a player already exists
  await db.collection('Players')
          .onSnapshot((snapshot) => {
            var players = snapshot.docs.map((document) => document.data());
    localPlayer = players
    
    //if data avl in players collection
    if(localPlayer.length!== 0){     
      for (var q_id in localPlayer){
        //push the data with matching email ids
        if(id === localPlayer[q_id].email ){
          resultPlayers[0] = localPlayer[q_id]  
          
        }  
    }
    
    // Code when a player exists in database and when its a new player
    if(resultPlayers.length!==0){
      qid = resultPlayers[0].q_id 
      playerExists= true                
    }
    else{
      playerExists = false;   
    }
    }  
  })
}
async function addPlayer(){
    //Adding a player
      await db.collection("Players").add({email:userId,q_id:qid})
      playerExists = true
 }

function end(){
  console.log("running")
  bckmusic.stop()
  swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!! You are a true Bollywood Lover",
        //imageUrl:"",
        //imageSize: "50x50",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
}
