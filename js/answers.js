class Answers{
    constructor(hero,heroine,song,movie){
        this.hero = hero
        this.heroine = heroine
        this.song = song
        this.movie = movie
        this.answers = []
        this.localdb = []
        this.getAnswers()
    }

    async getAnswers(){
        var answers = []
        await db.collection("Answers")
        .where('a_id' ,'==', qid)
        .onSnapshot((snapshot)=>{
            answers = snapshot.docs.map((doc) => doc.data())
            
            this.localdb = answers
            this.answers = this.localdb[0]
            console.log(this)
            this.checkAnswers()
        })
    }
    
    checkAnswers(){
        var heroname = this.hero.toUpperCase().trim()
        heroname = heroname.replace(/\s/g, '')
        heroname = heroname.slice(0,7)
    
        var dbHero = this.answers.hero.toUpperCase().trim()
        dbHero = dbHero.replace(/\s/g, '')
        dbHero= dbHero.slice(0,7)

        if(dbHero===heroname){
            form2.hero.hide();    
            form2.hero.value('')
            answerFlag += 1
        }

        var heroinename = this.heroine.toUpperCase().trim()
        if(this.answers.heroine===heroinename){            
            form2.heroine.hide()
            form2.heroine.value('')
            answerFlag +=1
        }

        var songname = this.song.toUpperCase().trim()
       
        if(this.answers.song===songname){           
            form2.song.hide()
            form2.song.value('')
            answerFlag += 1
        }

        var moviename = this.movie.toUpperCase().trim()
       
        if(this.answers.movie===moviename){            
            form2.movie.hide()
            form2.movie.value('')
            answerFlag +=1
        }
    }
}