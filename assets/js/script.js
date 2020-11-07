// Custom JS for Quizsite...

// ...this code is working

(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
      
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
          // Sort questions
          // [...myQuestion.sort(question)];

          // variable to store the list of possible answers
          const answers = [];
          
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
        }

        // add comment to results
        if (userAnswer <= 2) {remark = "When last did you open your bible? (smiles)"};
        if (userAnswer <= 5) {remark = "You can be better at this; try again."};
        if (userAnswer <= 8) {remark = "Good! Keep it coming"};
        if (userAnswer <= 10) {remark = "Excellent!"}
        else {return "Please answer the questions."};      
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
      commentContainer.innerHTML = remark;                  
    }
    
    /*function comments() {
      // add comment to results
      if (userAnswer <= 2) {remark = "When last did you open your bible? (smiles)"};
      if (userAnswer <= 5) {remark = "You can be better at this; try again."};
      if (userAnswer <= 8) {remark = "Good! Keep it coming"};
      if (userAnswer <= 10) {remark = "Excellent!"}
      else {return "Please answer the questions."};    
    }

    // display comment
    // comments();*/

    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length -1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1 || currentSlide + 2);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1 || currentSlide - 2);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const commentContainer = document.getElementById('comment');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "Who led the Israelites out of Egypt?",
            answers: {
                a: "Moses",
                b: "Cain",
                c: "Elijah"
            },
            correctAnswer: "a"
        },
        {
            question: "Who is the first king of Israel?",
            answers: {
                a: "David",
                b: "Joshiah",
                c: "Saul"
            },
            correctAnswer: "c"
        },
        {
            question: "Who is Adam?",
            answers: {
                a: "God",
                b: "The first man",
                c: "A prophet"
            },
            correctAnswer: "b"
        },
        {
            question: "The just shall live by what?",
            answers: {
                a: "Bread",
                b: "Faith",
                c: "Wine"
            },
            correctAnswer: "b"
        },
        {
            question: "David killed _____ to marry his wife.",
            answers: {
                a: "Noah",
                b: "Uriah",
                c: "Nathaniel"
            },
            correctAnswer: "b"
        },{
            question: "How old was Adam when he gave birth to Seth?",
            answers: {
                a: "100 years",
                b: "120 years",
                c: "I don't know"
            },
            correctAnswer: "b"
        },
        {
            question: "Who is Peter's brother?",
            answers: {
                a: "Andrew",
                b: "James",
                c: "Philip"
            },
            correctAnswer: "a"
        },
        {
            question: "Who did God command to build the Arrk",
            answers: {
                a: "Cain",
                b: "Moses",
                c: "Noah"
            },
            correctAnswer: "c"
        },
        {
            question: "How many books are in the Bible?",
            answers: {
                a: "52 books",
                b: "66 books",
                c: "48 books"
            },
            correctAnswer: "b"
        },
        {
            question: "Who appeared to virgin Mary?",
            answers: {
                a: "Angel Gabriel",
                b: "Elizbeth",
                c: "John"
            },
            correctAnswer: "a"
        },
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  