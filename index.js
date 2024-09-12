const questions = [
  {
    question: "Which is larget animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is smallest country in the world?",
    answers: [
      { text: "Vatican", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the larget desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahare", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const app = document.querySelector(".app");
const timer = document.querySelector(".timer");
const timerSec = document.querySelector(".timer-sec");
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const answersShow = document.querySelector(".answers");
const startBtn = document.querySelector(".start-btn");
const nextButton = document.querySelector("#next-btn");
const exitButton = document.querySelector("#exit-btn");
const page = document.querySelector(".pages");

let currentQuestionIndex = 0;
let score = 0;
let pages = 1;
let seconds = 16;

startBtn.addEventListener("click", () => {
  app.style.display = "block";
  startBtn.style.display = "none";
  startQuiz();
  startTimer();
});

exitButton.addEventListener("click", () => {
  app.style.display = "none";
  startBtn.style.display = "block";
  clearInterval(timerInterval);
  startQuiz();
});

function startTimer() {
  timerInterval = setInterval(() => {
    seconds--;
    timerSec.textContent = seconds;
    if (seconds === 0) {
      handleNextButton();
      seconds = 16;
    }
  }, 1000);
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  pages = 1;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  page.style.display = "block";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", SelectAnswer);
  });
  page.innerHTML = `${pages} of ${questions.length} Questions`;
}

function resetState() {
  answersShow.style.display = "none";
  nextButton.style.display = "none";
  timer.style.display = "flex";
  seconds = 16;
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function SelectAnswer(e) {
  const SelectBtn = e.target;
  const isCorrect = SelectBtn.dataset.correct === "true";
  if (isCorrect) {
    SelectBtn.classList.add("correct");
    score++;
  } else {
    SelectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  page.style.display = "none";
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Replay Quiz";
  nextButton.style.display = "block";
  timer.style.display = "none";
  if ((answersShow.style.display = "none")) {
    answersShow.style.display = "block";
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  pages++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
