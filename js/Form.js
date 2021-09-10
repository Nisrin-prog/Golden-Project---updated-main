class Form {
  constructor() {
    this.input = createInput("Email");
    this.play = createButton('PLAY');
   
    this.play.attribute('disabled','');  
  }
  reappear(){
    this.play.show();
    this.input.show();     
    hero.visible = true;
    heroin.visible = true;
    song.visible = true;
    movie.visible = true;
  }
  display(){
    this.input.position(windowWidth/2 - 68 , windowHeight/2 + 30);

    this.play.position(windowWidth/2 - 90, windowHeight/2 + 70);
    this.play.size(210,70)
    this.play.style("fontSize","large")
    //userId = this.input.value()    
    
    this.play.mousePressed(()=>{
      gameState = 1;
      form2 = new Form2()
      form2.getData()
      
    }) 
  }
  hide(){
    this.input.hide();
    this.play.hide();
    hero.visible = false;
    heroin.visible = false;
    song.visible = false;
    movie.visible = false;
  }
  //Function to validate if its an email address
  validation(inputText){
    var mailformat = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    if(inputText.match(mailformat)) {
      this.play.removeAttribute('disabled');  
      return true;
    }
    else{
      alert("You have entered an invalid email address!");    //The pop up alert for an invalid email address    
      return false;
    }
  }
  
  async update(id){
    var doc_id 
    await db.collection("Players").where("email", "==", id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            doc_id = doc.id
            db.collection("Players").doc(doc_id).update({q_id: qid});
        });
   })
   if(form2){
     form.reappear()
     form2.hide()
     gameState = 0
   }
  }
}
