class Form2 {
    constructor() {
      
      this.submit = createButton("SUBMIT")
      this.questions = [];
      this.hints = [];
      this.hid = 1;
      this.hero = createInput();
      this.heroine = createInput();
      this.song = createInput();
      this.movie = createInput();
      this.localdb = [];
      this.localdb2 = []
      this.answers = []
      this.hint3 = createButton("hint1");
      this.hint4 = createButton("hint2");
      this.hintFlag = false
      this.hintFlag2 = false
      this.clickFlag = 0;
      this.saveGame = createButton("Save Your Game")
      
    }
       
async getData(){
    var localdb = []
    await db.collection('Questions')
    .onSnapshot((snapshot) => {
    var questions = snapshot.docs.map((document) => document.data());
    this.localdb = questions

});  
}
async getDataHints(){
    var hints = []
    await db.collection("Hints")
    .where('h_id' ,'==', qid)
    .onSnapshot((snapshot)=>{
    hints = snapshot.docs.map((doc) => doc.data())

    this.localdb2 = hints
    this.hints = this.localdb2[0]
  }) 
}
show(){
    this.hero.show();
    this.heroine.show();
    this.song.show();
    this.movie.show();
}
hide(){
    this.hero.hide();
    this.heroine.hide();
    this.song.hide();
    this.movie.hide();
    this.submit.hide()
    this.saveGame.hide()
    this.hint3.hide()
    this.hint4.hide()
}
  
  display(){
    
    push()
    textSize(60);
    fill(197, 57, 125);      
    stroke("white")
    strokeWeight(3)
    textFont("Georgia")
    text("Hero - ",windowWidth/2 - 300 , windowHeight/2 - 140)
    this.hero.position(windowWidth/2 - 300 , windowHeight/2 - 150);
    this.hero.size(250,25)

    text("Heroine - ",windowWidth/2 + 50 , windowHeight/2 - 140)
    this.heroine.position(windowWidth/2 + 50 , windowHeight/2 - 150);
    this.heroine.size(250,25)

    text("Song - ",windowWidth/2 - 300 , windowHeight/2)
    this.song.position(windowWidth/2 - 300 , windowHeight/2 + 40);
    this.song.size(250,25)

    text("Movie - ",windowWidth/2 + 50 , windowHeight/2)
    this.movie.position(windowWidth/2 + 50 , windowHeight/2 + 40);
    this.movie.size(250,25)
    pop()

    for (var q_id in this.localdb){
      if(qid === this.localdb[q_id].q_id ){
        this.questions = this.localdb[q_id]
        //console.log(this.questions)  
      }
    }
    
    this.submit.position(windowWidth/2 + 370, windowHeight/2 + 20);
    this.submit.size(130,35);
    this.submit.mousePressed(async()=>{    
      answer = new Answers (this.hero.value(),this.heroine.value(),this.song.value(),this.movie.value()) 
      this.hintFlag = false;
      this.hint3.show()
      this.hintFlag2 = false;
      this.hint4.show()
      this.clickFlag +=1
     // answer.getAnswers()
    })
     
    if (this.clickFlag === 3){
      this.submit.attribute('disabled','')
      setInterval(()=>{
          this.submit.removeAttribute('disabled')
          this.clickFlag = 0
          console.log("works")
        },60000)
    }
    this.saveGame.position(windowWidth/2 + 370, windowHeight/2 + 60)
    this.saveGame.mousePressed(async()=>{   
      form.update(userId)
      if(qid === 5){
        gameState = 2
        //form2.hide()
        //form.reappear()
      }
     })
  }
  
  displayQuestions(){
    if(qid !== this.questions.length){ 
      console.log(this.questions.length) 
        push()
        textSize(50);
        fill(197, 57, 125);
        stroke("white")
        strokeWeight(3)
        textFont("Georgia")
        text(this.questions.hero,(windowWidth/2 - 300)+170 , windowHeight/2 - 140)
        this.hero.position(windowWidth/2 - 300 , windowHeight/2 - 120);
        this.hero.size(250,25)

        text(this.questions.heroine,(windowWidth/2 + 50)+250 , windowHeight/2 - 140)
        this.heroine.position(windowWidth/2 + 50 , windowHeight/2 - 120);
        this.heroine.size(250,25)

        text(this.questions.song,(windowWidth/2 - 300)+170 , windowHeight/2)
        this.song.position(windowWidth/2 - 300 , windowHeight/2 + 30);
        this.song.size(250,25)

        text(this.questions.movie,(windowWidth/2 + 50)+200 , windowHeight/2)
        this.movie.position(windowWidth/2 + 50 , windowHeight/2 + 30);
        this.movie.size(250,)

        pop()

        fill(204, 36, 117)
        textSize(25)
        text("Trivia about the movie : ",windowWidth/2 - 660, windowHeight/2 + 160)
        textSize(17);
        text(this.hints.hint1,windowWidth/2 - 670 , windowHeight/2 + 195)
        text(this.hints.hint2,windowWidth/2 - 670 , windowHeight/2 + 225)

        line(windowWidth/2, windowHeight/2 - 200, windowWidth/2, windowHeight/2 + 100)
        line(windowWidth/2 - 340, windowHeight/2 - 60, windowWidth/2 + 365, windowHeight/2 - 60)


         this.hint3.position(windowWidth/2 + 370 , windowHeight/2 + 190);
         this.hint3.style("color","purple")
         this.hint3.mousePressed(()=>{
           if(points >= 15){
             this.hint3.hide()
             points = points - 15
             this.hintFlag = true        
           }  
         })
         if (this.hintFlag === true){
           textSize(15);
           text(this.hints.hint3,windowWidth/2 + 370 , windowHeight/2 + 195)
         }

         this.hint4.position(windowWidth/2 + 370 , windowHeight/2 + 220)  ;
         this.hint4.style("color","purple")
         this.hint4.mousePressed(()=>{ 
           if(points>= 15){       
             this.hint4.hide() 
             points = points - 15 
             this.hintFlag2 = true    
           }
         })
         if (this.hintFlag2 === true){
           textSize(15);
           text(this.hints.hint4,windowWidth/2 + 370 , windowHeight/2 + 225)            
         }
    }
      
  }
}
