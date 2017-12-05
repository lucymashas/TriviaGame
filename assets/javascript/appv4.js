$(document).ready(function(){
      
  // var number = 30;   //set Timer to 30 seconds
  // var intervalId;
  //object with trivia Questions Properties (Question, Answer,and Possible Answers)
  var triviaQuestions = {
    q1: { 
      question: "Who played a US predident in the movie 'Austin Powers: The Spy Who Shagged Me'",
      answer: "Tim Robbins",
      possibleAnswers: ["Kelsey Grammer","Tim Robbins","Anthony Hopkins","Nick Nolte"]
      },
    q2:{
      question: "Who played The Joker in 1989's Batman?",
      answer:"Jack Nicholson",
      possibleAnswers: ["Michael Caine","Tommy Lee Jones","Christopher Walken","Jack Nicholson"]
    },
    q3:{
      question:" What is the main sport in the movie Caddyshack? ",
      answer:"Golf",
      possibleAnswers:["BasketBall","Boxing","Tennis","Golf"]
    },
    q4:{
      question:" In the movie 'The Wizard of Oz', what did the scarecrow want from the wizard? ",
      answer:"Brian",
      possibleAnswers:["Heart","Brian","Soul","Legs"]
    },
    q5:{
      question:" In what year was the original 'Jurassic Park' film released ",
      answer:"1993",
      possibleAnswers:["2006","1993","1967","1999"]
    },

  };

    console.log("first question: " + triviaQuestions.q1.question);
    console.log(" Correct: " + triviaQuestions.q1.answer);
    console.log("possible Answers " + triviaQuestions.q1.possibleAnswers);
    console.log("possible Answers 1 " + triviaQuestions.q1.possibleAnswers[0]);
    console.log("Object Length " + Object.keys(triviaQuestions).length);
    console.log("Object Length " + triviaQuestions(2));

   

  var triviaGame = {
    questionArr: [triviaQuestions.q1.question,triviaQuestions.q2.question,triviaQuestions.q3.question,triviaQuestions.q4.question,triviaQuestions.q5.question],
    numcorrect: 0,
    correctFlag: false,
    timer: 30,
    intervalId:0,
    questionIndex:0,
  
  run: function(){
    intervalId = setInterval(this.decrement, 1000);
    },
  
  renderQuestion:  function(){
  // If there are still more questions, render the next one
    $("#guesses").empty();
    if (triviaGame.questionIndex <= triviaGame.questionArr.length -1){
    $("#questions").html(triviaGame.questionArr[triviaGame.questionIndex]);

    for (var i=0; i < triviaQuestions.q1.possibleAnswers.length; i++){
        var id = `btn${i}`
        var btntemplate =`<button id="${id}" class="guess" value="${triviaQuestions.q1.possibleAnswers[i]}">${triviaQuestions.q1.possibleAnswers[i]}</button>`
        $("#guesses").append(btntemplate);
        }
      }
      // If there aren't, render the end game screen.
      else {
        $("#questions").html("Game Over!");
        }
      triviaGame.questionIndex ++;
    },

  questionInput: function(input){
    for (var i=0; i < triviaQuestions.q1.possibleAnswers.length; i++){
          if (input === triviaQuestions.q1.answer){
            triviaGame.numCorrect ++;
            this.correctFlag = true;
            i = triviaQuestions.q1.possibleAnswers.length;
          }
        }
        triviaGame.stop();
        if (this.correctFlag){
          $("#questions").html("<h1> Correct! </h1>");
        }else{
          $("#questions").html("<h1> Wrong Answer! </h1>");
          $("#questions").append("<h1> The Correct Answer was: " + triviaQuestions.q1.answer);
        }
        // this.renderQuestion();
  },
  //  The decrement function.
  decrement: function(){
    triviaGame.timer--;
    $("#show-number").html("Time Remaining: " + triviaGame.timer + " Seconds");                                
     if (triviaGame.timer === 0) {
        triviaGame.stop();
      //  Alert the user that time is up.
      $("#outoftime").html("<h1> Out Of Time </h1>");
      }
    },
  stop: function(){
      clearInterval(intervalId);
    }
  };

//Start the game when user clicks on the start button
  $('#start').before('<div class="btn"><button id="start">START</button></div>');

  $("#start").on("click", function(){
    $("#start").remove();
    triviaGame.renderQuestion();
    triviaGame.run();
  });
  

  $("#guesses").on("click", ".guess", function(){
      triviaGame.questionInput(userguess = ($(this).attr("value")));    
      });

    
});