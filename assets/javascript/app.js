$(document).ready(function(){
      
  var triviaQuestions = [
    {
      question: "Who played a US president in the movie 'Austin Powers: The Spy Who Shagged Me?'",
      possibleAnswers: ["Kelsey Grammer","Tim Robbins","Anthony Hopkins","Nick Nolte"],
      correctAnswer: "Tim Robbins",
      qimg:"assets/images/spywhoshaggedme.png"
    },
    {
      question: "Who played The Joker in 1989's Batman?",
      possibleAnswers: ["Michael Caine","Tommy Lee Jones","Christopher Walken","Jack Nicholson"],
      correctAnswer: "Jack Nicholson",
      qimg:"assets/images/batmanjoker.png"
    },
    {
      question:" Where is the Pixar movie 'Finding Nemo' mainly set? ",
      possibleAnswers:["Sydney","Honolulu","Los Angeles","New York"],
      correctAnswer: "Sydney",
      qimg:"assets/images/nemo.gif"
    },
    {
      question: "What is the main sport in the movie 'Caddyshack'? ",
      possibleAnswers:["BasketBall","Boxing","Tennis","Golf"],
      correctAnswer: "Golf",
      qimg:"assets/images/caddyshack.gif"
    },
    {
      question: "In the movie 'The Wizard of Oz', what did the scarecrow want from the wizard? ",
      possibleAnswers:["Heart","Brain","Soul","Legs"],
      correctAnswer: "Brain",
      qimg:"assets/images/wizard.png"
    },
    {
      question:" In what year was the original 'Jurassic Park' film released? ",
      possibleAnswers:["2006","1993","1967","1999"],
      correctAnswer: "1993",
      qimg:"assets/images/jurassic-park-sm.png"
    },
    {
      question:" What's the only film directed by Alfred Hitchcock that won an Oscar for Best Picture? ",
      possibleAnswers:["Spellbound","Psycho","Rear Window","Rebecca"],
      correctAnswer: "Rebecca",
      qimg:"assets/images/rebecca.png"
    },
    {
      question:" What's Pierce Bronson's first James Bond movie? ",
      possibleAnswers:["The World is not Enough","Goldeneye","Die Another Day","Tomorrow Never Dies"],
      correctAnswer: "Goldeneye",
      qimg:"assets/images/jamesbond.png"
    },
    {
      question:" In Home Alone what movie does Kevin use to scare the pizza delivery guy? ",
      possibleAnswers:["Angels with Filthy Souls","Angels with Dirty Faces","Reservoir Dogs","Scarface"],
      correctAnswer: "Angels with Filthy Souls",
      qimg:"assets/images/homealone.png"
    }
    ];
  

  var triviaGame = {
    numCorrect: 0,
    numWrong: 0,
    unAnswered: 0,
    correctFlag: false,
    timer: 30,
    intervalId: 0,
    questionIndex:0,
    timeupimage: "assets/images/timeup.gif",

    statistics: function(){
       this.stop();
       $("#questions").empty();
        var stattemplate = 
            `<p> All Done! Here is how you did: <br> Correct Responses:  ${triviaGame.numCorrect} 
             <br> Wrong Responses:  ${triviaGame.numWrong} <br> UnAnswered Questions:  ${triviaGame.unAnswered} </p>`
            $("#outoftime").append(stattemplate);

        var $btn2 =$('<input/>').attr({type:'button',id: 'repeat', class:'btn start',value:'START OVER'});
        $("#startover").append($btn2);
    },

    run: function(){
      $("#show-number").html("Time Remaining: " + triviaGame.timer + " Seconds");
      intervalId = setInterval(this.decrement, 1000);
      },

    decrement: function(){
      $("#show-number").html("Time Remaining: " + triviaGame.timer + " Seconds");
      triviaGame.timer--;                                
      if (triviaGame.timer === 0) {
        triviaGame.stop();
        //  Alert the user that time is up.
        triviaGame.unAnswered ++;
        $("#outoftime").html("<p> Out Of Time </p>");
        $('.guess').attr("disabled", true);
         var imgtemplate =
          `<img src = "${triviaGame.timeupimage}" alt="Out of Time"
           class="img-thumbnail" >`
          $("#questions").html(imgtemplate);
        window.setTimeout(triviaGame.nextQuestion, 3000);
        }
    },

    renderQuestion:  function(){
    // If there are still more questions, render the next one
      $("#guesses").empty();
      if (this.questionIndex <= (triviaQuestions.length - 1)){
        $("#questions").html(triviaQuestions[this.questionIndex].question);
        for (var i=0; i < 4; i++){
    //Create Guess Button Template
          var btntemplate =
          `<button class = "btn btn-block btn-default guess" 
                   value="${triviaQuestions[this.questionIndex].possibleAnswers[i]}">
                   ${triviaQuestions[this.questionIndex].possibleAnswers[i]}</button>`
          $("#guesses").append(btntemplate);
        }
      } else {
        this.statistics();
      }
    },
    
    stop: function(){
      clearInterval(intervalId);
    },

    nextQuestion:  function(){
      $("#outoftime").empty();
      triviaGame.correctFlag = false;
      triviaGame.questionIndex ++;
      triviaGame.timer = 30;
      triviaGame.run();
      triviaGame.renderQuestion();
    },

    questionInput: function(input){
      for (var i=0; i < triviaQuestions[this.questionIndex].possibleAnswers.length; i++){
          if (input === triviaQuestions[this.questionIndex].correctAnswer){
            triviaGame.numCorrect ++;
            triviaGame.correctFlag = true;
            i = triviaQuestions[this.questionIndex].possibleAnswers.length;
          }
        }
        if (triviaGame.correctFlag){
          $("#questions").html("<p class='alerttxt'> CORRECT! </p>");
        }else {
          triviaGame.numWrong ++;
          $("#questions").html("<p class='alerttxt'> WRONG ANSWER! </p>");
          $("#questions").append("<p class='txtinfo'> The Correct Answer was: " + triviaQuestions[this.questionIndex].correctAnswer);
          }
           this.stop();
           $('.guess').attr("disabled", true);
           var imgtemplate =
          `<p><img src = "${triviaQuestions[this.questionIndex].qimg}" alt="Movie Image"
           class="img-thumbnail" ></p>`
          $("#questions").append(imgtemplate);

        window.setTimeout(triviaGame.nextQuestion, 3000);
        // this.nextQuestion();
    },

    reset: function(){
      this.numCorrect = 0;
      this.numWrong = 0;
      this.unAnswered = 0;
      this.correctFlag = false;
      this.timer = 30;
      this.intervalId = 0;
      this.questionIndex = 0;
      $("#outoftime").empty();
      $("#repeat").remove();
    }

  };

// Start the game when user clicks on the start button
  var $btn1 =$('<input/>').attr({type:'button',class:'btn start',value:'START'});
      $("#start").append($btn1);
  
  $("#start").on("click", function(){
    $("#start").remove();
    triviaGame.run();
    triviaGame.renderQuestion();
  });

  $("#guesses").on("click", ".guess", function(){
      triviaGame.stop();
      $('.guess').attr("disabled", true);
      triviaGame.questionInput(userguess = ($(this).attr("value")));    
      });

   $("#startover").on("click", "#repeat", function(){
          triviaGame.reset();
          triviaGame.run();
          triviaGame.renderQuestion();
      });


    
});
