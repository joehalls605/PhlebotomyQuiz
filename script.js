function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleEmoji(array) {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}

const questions = [
  {
    question: "What does CBC stand for in phlebotomy?",
    correctAnswer: "Complete Blood Count",
    hint: "Hint: This test involves a comprehensive analysis of different elements in the bloodstream, exploring the 'complete balance.'"
  },
  {
    question: "Which vein is commonly used for venipuncture?",
    correctAnswer: "Median cubital vein",
    hint: "Hint: Seek a central vein in the arm, often the preferred choice for blood collection due to its accessibility and stability."
  },
  {
    question: "What is the purpose of using a tourniquet during venipuncture?",
    correctAnswer: "To make veins more visible and easier to access",
    hint: "Hint: Enhances the process by improving visibility and simplifying entry, typically involving a temporary band."
  },
  {
    question: "Which anticoagulant is commonly used in blood collection tubes for coagulation studies?",
    correctAnswer: "Sodium citrate",
    hint: "Hint: Frequently employed in studies related to blood clotting, this substance starts with 'Sodium c...'"
  },
  {
    question: "What is the purpose of the Order of Draw in venipuncture?",
    correctAnswer: "Prevent cross-contamination of additives between tubes",
    hint: "Hint: Follow a specific sequence during blood collection to maintain the purity of substances, avoiding 'mixing' issues."
  },
  {
    question: "Which color-coded tube is commonly used for serum tests in phlebotomy?",
    correctAnswer: "Red",
    hint: "Hint: Look for a tube with a distinct color."
  },
  {
    question: "What is the term for the liquid portion of blood that remains after clotting?",
    correctAnswer: "Serum",
    hint: "Hint: After the blood transforms, the remaining liquid is called the 'golden fluid,' signifying its valuable properties."
  },
  {
    question: "Why is it important to label blood collection tubes accurately?",
    correctAnswer: "To ensure proper patient identification and sample integrity",
    hint: "Hint: Place significant emphasis on precision when marking tubes to uphold patient identity and safeguard the sample's 'soundness.'"
  },
  {
    question: "What is the purpose of the basilic vein in venipuncture?",
    correctAnswer: "It is a common site for blood collection in the antecubital area",
    hint: "Hint: Considered a prime location for blood retrieval, this vein is often associated with the 'inner' part of the elbow region."
  },
  {
    question: "What is the recommended angle for needle insertion during routine venipuncture?",
    correctAnswer: "15 to 30 degrees",
    hint: "Hint: Follow a moderate angle when introducing the needle into the skin during a standard blood collection procedure, aiming between 'low' and 'high.'"
  }
];

const phlebotomyLines = [
  { line: "Let's see your needle-sharp knowledge." },
  { line: "Let's get to the vein of the matter with some questions." },
  { line: "Time to puncture through this quiz with your skills." },
  { line: "Let's draw out your expertise in phlebotomy." },
  { line: "Sharpen your wits for this phlebotomy quiz." },
  { line: "Let's see if you can find the vein of the answers." },
  { line: "Prepare to tap into your phlebotomy knowledge." },
  { line: "Time to test your phlebotomy precision with this quiz." }
];

const phlebotomyEmoji = [
  { line: "🩺" },
  { line: "👩🏼‍⚕️" },
  { line: "🧬" }
];

let currentQuestionIndex = 0;
let score = 0;
const maxQuestionLimit = 9;

function showPhlebotomyLines() {
  const randomLine = shuffleArray(phlebotomyLines)[0].line;
  document.getElementById("phlebotomyLines").textContent = randomLine;
}

showPhlebotomyLines();

function showEmoji() {
  const emojiElement = document.getElementById("emoji-element");
  emojiElement.textContent = shuffleEmoji(phlebotomyEmoji).line;
}

document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  document.getElementById("header-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  shuffleArray(questions);
  showEmoji();
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestionIndex < maxQuestionLimit) {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const answerButtonsContainer = document.getElementById("answerButtons");

    questionElement.textContent = currentQuestion.question;
    answerButtonsContainer.innerHTML = "";

    const answers = [currentQuestion.correctAnswer, ...getIncorrectAnswers(currentQuestion)];
    shuffleArray(answers);

    answers.forEach(answer => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("answer-button");
      button.onclick = () => checkAnswer(answer);
      answerButtonsContainer.appendChild(button);
    });

    hideHint();
  } else {
    gameOver();
  }
}

function getIncorrectAnswers(currentQuestion) {
  const allAnswers = questions.map(q => q.correctAnswer);
  return shuffleArray(allAnswers.filter(answer => answer !== currentQuestion.correctAnswer)).slice(0, 2);
}

function checkAnswer(userAnswer) {
  const currentQuestion = questions[currentQuestionIndex];
  const headerInfo = document.getElementById("header-info");

  if (userAnswer === currentQuestion.correctAnswer) {
    headerInfo.textContent = "Correct, well done! 😊";
    score++;
  } else {
    headerInfo.textContent = "Incorrect, try again! 🫤";
  }

  currentQuestionIndex++;
  setTimeout(() => {
    headerInfo.textContent = "";
    if (currentQuestionIndex < maxQuestionLimit) {
      loadQuestion();
    } else {
      gameOver();
    }
  }, 1000);
}

function showHint() {
  const hintElement = document.getElementById("hint-text");
  hintElement.textContent = questions[currentQuestionIndex].hint;
}

function hideHint() {
  document.getElementById("hint-text").textContent = "";
}

function gameOver() {
  document.getElementById("quiz-container").style.display = "none";
  const gameOverContainer = document.getElementById("game-over-container");
  gameOverContainer.style.display = "flex";
  gameOverContainer.style.margin = 50;
  
  const finalScoreElement = document.getElementById("game-over");
  finalScoreElement.innerHTML = `Thank you for playing! <br><br>Your final score is ${score} 🩸`;
  
  document.getElementById("reset-btn").style.display = "block";
}

function resetQuiz() {
  window.location.reload();
}

document.getElementById("hint-btn").addEventListener("click", showHint);
document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < maxQuestionLimit) {
    loadQuestion();
  } else {
    gameOver();
  }
});

document.getElementById("reset-btn").addEventListener("click", resetQuiz);