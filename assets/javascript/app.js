$(document).ready(function(){
      
  var triviaQuestions = [
    {
      question: "Who played a US predident in the movie Austin Powers: The Spy Who Shagged Me",
      possibleAnswers: ["Kelsey Grammer","Tim Robbins","Anthony Hopkins","Nick Nolte"],
      correctAnswer: "Tim Robbins"
    },
    {
      question: "Who played The Joker in 1989's Batman?",
      possibleAnswers: ["Michael Caine","Tommy Lee Jones","Christopher Walken","Jack Nicholson"],
      correctAnswer: "Jack Nicholson"
    },
    {
      question:" What is the main sport in the movie Caddyshack? ",
      possibleAnswers:["BasketBall","Boxing","Tennis","Golf"],
      correctAnswer: "Golf"
    },
    {
      question:" In the movie 'The Wizard of Oz', what did the scarecrow want from the wizard? ",
      possibleAnswers:["Heart","Brian","Soul","Legs"],
      correctAnswer: "Brain"
    },
    {
      question:" In what year was the original 'Jurassic Park' film released ",
      possibleAnswers:["2006","1993","1967","1999"],
      correctAnswer: "1993"
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
    },

    run: function(){
      intervalId = setInterval(this.decrement, 1000);
      },
  
    renderQuestion:  function(){
    // If there are still more questions, render the next one
      $("#guesses").empty();
      if (this.questionIndex <= (triviaQuestions.length - 1)){
      $("#questions").html(triviaQuestions[this.questionIndex].question);
      for (var i=0; i < 4; i++){
        var id = `btn${i}`
        var btntemplate =`<button id="${id}" class="guess" value="${triviaQuestions[this.questionIndex].possibleAnswers[i]}">${triviaQuestions[this.questionIndex].possibleAnswers[i]}</button>`
        $("#guesses").append(btntemplate);
        }
      }
      // If there aren't any more questions render the end game screen.
      else {
        this.statistics();
        }
    },

    questionInput: function(input){
      for (var i=0; i < triviaQuestions[this.questionIndex].possibleAnswers.length; i++){
          if (input === triviaQuestions[this.questionIndex].correctAnswer){
            triviaGame.numCorrect ++;
            triviaGame.correctFlag = true;
            i = triviaQuestions[this.questionIndex].possibleAnswers.length;
          }
        }
        triviaGame.stop();
        if (triviaGame.correctFlag){
          $("#questions").html("<h1> Correct! </h1>");
          console.log("triviaGame.correctFlag " + triviaGame.correctFlag);
        }else {
          triviaGame.numWrong ++;
          $("#questions").html("<h1> Wrong Answer! </h1>");
          $("#questions").append("<h1> The Correct Answer was: " + triviaQuestions[this.questionIndex].correctAnswer);
          }
        window.setTimeout(triviaGame.nextQuestion, 3000);
        // this.nextQuestion();
    },

    decrement: function(){
      triviaGame.timer--;
      $("#show-number").html("Time Remaining: " + triviaGame.timer + " Seconds");                                
      if (triviaGame.timer === 0) {
        triviaGame.stop();
        //  Alert the user that time is up.
        triviaGame.unAnswered ++;
        $("#outoftime").html("<h1> Out Of Time </h1>");
        window.setTimeout(triviaGame.nextQuestion, 3000);
        }
    },

    stop: function(){
      clearInterval(intervalId);
    },

    nextQuestion(){
      $("#outoftime").empty();
      triviaGame.correctFlag = false;
      triviaGame.questionIndex ++;
      triviaGame.timer = 30;
      triviaGame.run();
      triviaGame.renderQuestion();
    }

  };

// Start the game when user clicks on the start button
  $('#start').before('<div class="btn"><button id="start">START</button></div>');
  $("#start").on("click", function(){
    $("#start").remove();
    triviaGame.run();
    triviaGame.renderQuestion();
  });

  $("#guesses").on("click", ".guess", function(){
      triviaGame.questionInput(userguess = ($(this).attr("value")));    
      });


    
});
