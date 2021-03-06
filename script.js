const nextButton = document.getElementById("nextbtn");
const startButton = document.getElementById("startbtn");
const questionContainerElement = document.getElementById("questioncontainer");
const questionElement = document.getElementById("question");
const answerButtonElemnt = document.getElementById("answerbuttens");
const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { Text: "4", correct: true },
      { Text: "22", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { Text: "Kinda", correct: false },
      { Text: "YES!!!", correct: true },
      { Text: "Um no", correct: false },
      { Text: "IDK", correct: false },
    ],
  },
  {
    question: "What is 4 * 2?",
    answers: [
      { Text: "6", correct: false },
      { Text: "8", correct: true },
    ],
  },
  {
    question: "whats my name",
    answers: [
      { Text: "ahmad", correct: true },
      { Text: "I have no name", correct: false },
    ],
  },
  {
    question: "how old am I?",
    answers: [
      { Text: "old enough", correct: true },
      { Text: "66", correct: false },
      { Text: "12", correct: false },
    ],
  },
  {
    question: "What is 2 - 2?",
    answers: [
      { Text: "2", correct: false },
      { Text: "1", correct: false },
      { Text: "0", correct: true },
      { Text: "-1", correct: false },
    ],
  },
];
let shuffledQuestions, currentQuestionIndex;
let score;

const startingSeconds = 10;
let seconds = startingSeconds;
const countdownElement = document.getElementById("countdown");
setInterval(updateCountdown, 1000);

function updateCountdown() {
  if (seconds == -1) {
    return;
  }
  countdownElement.innerHTML = "time left: " + seconds + " seconds";
  if (seconds > 0) {
    seconds--;
  }
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  score = 0;
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  seconds = 0;
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  //if (shuffledQuestions.lenth == currentQuestionIndex + 1) {
  //  startButton.classList.remove("hide");
  //}
}

function selectAnswer(e) {
  let currentSeconds = seconds;
  seconds = 0;
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatus(document.body, correct);
  if (correct) {
    score += currentSeconds;
  }
  console.log(correct);
  console.log(score);
  Array.from(answerButtonElemnt.children).forEach((button) => {
    setStatus(button, button.dataset.correct);
  });
  if (shuffledQuestions.length >= currentQuestionIndex + 1) {
    //nextButton.classList.remove("hide");
    //console.log("first");
  } else {
    //console.log("second");
    //startButton.innerText = "restart";
    //startButton.classList.remove("hide");
  }
  nextButton.classList.remove("hide");
}

function setStatus(element, correct) {
  clearStatus(element);
  startButton.classList.add("hide");

  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function showQuestion(question) {
  if (shuffledQuestions.length >= currentQuestionIndex + 1) {
  } else {
    seconds = -1;
    questionElement.innerText = "good job. your score is: " + score;
    countdownElement.innerHTML =
      "Hello there, I just want to let you know that I don't have any previous experience in web development; still, I had fun building my first web application. It's important for me to let you know that I worked on this project for one day only for two reasons. First, I had an important exam two days before the submission. Secondly, I thought that the submission date was April 12. Still, I really enjoyed working on it and I hope to get another chance to prove myself and what I am capable of. thanks :)";
    return;
  }

  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.Text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct; //when correct
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElemnt.appendChild(button);
    seconds = startingSeconds;
  });
}

function resetState() {
  clearStatus(document.body);
  nextButton.classList.add("hide");
  startButton.classList.add("hide");

  while (answerButtonElemnt.firstChild) {
    answerButtonElemnt.removeChild(answerButtonElemnt.firstChild);
  }
}
