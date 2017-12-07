$(document).ready(function(){
      
  var triviaQuestions = [
    {
      question: "Who played a US predident in the movie Austin Powers: The Spy Who Shagged Me",
      possibleAnswers: ["Kelsey Grammer","Tim Robbins","Anthony Hopkins","Nick Nolte"],
      correctAnswer: "Tim Robbins",
      qimg:"./images.placeholder.png"
    },
    {
      question: "Who played The Joker in 1989's Batman?",
      possibleAnswers: ["Michael Caine","Tommy Lee Jones","Christopher Walken","Jack Nicholson"],
      correctAnswer: "Jack Nicholson",
      qimg:"./images.placeholder.png"
    },
    {
      question: "What is the main sport in the movie Caddyshack? ",
      possibleAnswers:["BasketBall","Boxing","Tennis","Golf"],
      correctAnswer: "Golf",
      qimg:"./images.placeholder.png"
    },
    {
      question: "In the movie 'The Wizard of Oz', what did the scarecrow want from the wizard? ",
      possibleAnswers:["Heart","Brain","Soul","Legs"],
      correctAnswer: "Brain",
      qimg:"./images.placeholder.png"
    },
    {
      question:" In what year was the original 'Jurassic Park' film released ",
      possibleAnswers:["2006","1993","1967","1999"],
      correctAnswer: "1993",
      qimg:"./images.placeholder.png"
    }
    ];
   

    // console.log("question: " + triviaQuestions[0].question);
    // console.log("array Length: " + triviaQuestions.length);
    // console.log(" Correct: " + triviaQuestions[0].correctAnswer);
    // console.log(triviaQuestions[0].possibleAnswers.length);
    // console.log(triviaQuestions[0].possibleAnswers[0]);
    


  var triviaGame = {
    numCorrect: 0,
    numWrong: 0,
    unAnswered: 0,
    correctFlag: false,
    timer: 30,
    intervalId: 0,
    questionIndex:0,

    statistics: function(){
       this.stop();
        $("#questions").html("<p>All done, here's how you did!</p>");
        $("#guesses").html("<p>Correct Answers: " + triviaGame.numCorrect + "</p");
        $("#guesses").append("<p>Wrong Answers:   " + triviaGame.numWrong + "</p");
        $("#guesses").append("<p>UnAnswered: " + triviaGame.unAnswered + "</p>");
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
        window.setTimeout(triviaGame.nextQuestion, 3000);
        }
    },

    renderQuestion:  function(){
    // If there are still more questions, render the next one
      $("#guesses").empty();
      if (this.questionIndex <= (triviaQuestions.length - 1)){
        $("#questions").html(triviaQuestions[this.questionIndex].question);
        for (var i=0; i < 4; i++){
          var id = `btn${i}`
          var btntemplate =
          `<button id="${id}" 
                   class = "btn btn-block btn-default guess" 
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
          $("#questions").html("<p> Correct! </p>");
        }else {
          triviaGame.numWrong ++;
          $("#questions").html("<p> Wrong Answer! </p>");
          $("#questions").append("<p> The Correct Answer was: " + triviaQuestions[this.questionIndex].correctAnswer);
          }
        //display image
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
      triviaGame.questionInput(userguess = ($(this).attr("value")));    
      });

   $("#startover").on("click", "#repeat", function(){
          triviaGame.reset();
          triviaGame.run();
          triviaGame.renderQuestion();
      });


    
});
