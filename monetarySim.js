// ===================== QUESTIONS =====================
const questions = [
  {text:"Inflation is rising rapidly while unemployment is low.", correct:"contract"},
  {text:"Borrowing and spending are slowing, and unemployment is rising.", correct:"expand"},
  {text:"Consumers are cutting back on purchases and business investment is weak.", correct:"expand"},
  {text:"Credit is too easy to obtain and prices are climbing steadily.", correct:"contract"},
  {text:"Economic growth is slowing and the money supply is tightening.", correct:"expand"},
  {text:"Banks are lending too aggressively and inflation is starting to spike.", correct:"contract"},
  {text:"Spending is falling across the economy and job losses are increasing.", correct:"expand"},
  {text:"Unemployment is low and businesses are raising prices frequently.", correct:"contract"},
  {text:"Business loans are shrinking due to limited money supply.", correct:"expand"},
  {text:"The economy is overheating and consumer prices continue to rise.", correct:"contract"},
  {text:"The economy is stable with normal inflation and unemployment.", correct:"noChange"},
  {text:"Production is slowing and borrowing costs are too high.", correct:"expand"},
  {text:"Inflation is outpacing wage growth and the dollar is losing value.", correct:"contract"},
  {text:"Consumers are saving more and spending less.", correct:"expand"},
  {text:"Money supply is large and demand is pushing prices upward.", correct:"contract"},
  {text:"Growth is moderate and inflation is steady.", correct:"noChange"},
  {text:"Housing purchases are declining due to tight lending conditions.", correct:"expand"},
  {text:"Loans are too easy to obtain and the economy is expanding too quickly.", correct:"contract"},
  {text:"Businesses report falling sales and rising unemployment.", correct:"expand"},
  {text:"The money supply is excessive and inflation is rising.", correct:"contract"},
  {text:"Economic conditions are stable with no major issues.", correct:"noChange"},
  {text:"Borrowing has slowed and the economy risks recession.", correct:"expand"},
  {text:"Demand is outpacing supply and prices are increasing.", correct:"contract"},
  {text:"Wage growth is slowing and hiring is weakening.", correct:"expand"},
  {text:"Inflation threatens to exceed Federal Reserve targets.", correct:"contract"},
  {text:"Unemployment is rising sharply and spending is declining.", correct:"expand"},
  {text:"The economy is balanced and moderately growing.", correct:"noChange"},
  {text:"Prices are rising faster than expected and borrowing is too easy.", correct:"contract"},
  {text:"Borrowing has decreased and business activity is contracting.", correct:"expand"},
  {text:"The economy shows no concerning trends.", correct:"noChange"}
];

// ===================== DOM HANDLES =====================
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const endScreen = document.getElementById("endScreen");
const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");

const fedName = document.getElementById("fedName");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");

const feedback = document.getElementById("feedback");
const options = document.getElementById("options");
const ecoBox = document.getElementById("ecoBox");

const finalMessage = document.getElementById("finalMessage");
const timestamp = document.getElementById("timestamp");

// ===================== STATE =====================
let currentIndex = 0;
let score = 0;
let shuffledQuestions = [];
let playerName = "";

// ===================== INIT =====================
startBtn.addEventListener("click", startGame);

function startGame() {
  playerName = nameInput.value.trim();
  if (!playerName) {
    alert("Please enter your name first.");
    return;
  }

  intro.style.display = "none";
  game.style.display = "block";
  fedName.textContent = "Federal Reserve Advisor " + playerName;

  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  score = 0;
  currentIndex = 0;

  updateScore();
  loadQuestion();
}

function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
  questionCount.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
}

// ===================== LOAD QUESTION =====================
function loadQuestion() {
  const q = shuffledQuestions[currentIndex];

  ecoBox.style.transform = "scale(1)";
  ecoBox.style.background = "#e0e0e0";
  ecoBox.textContent = "Economy / Inflation";

  feedback.textContent = "";
  questionText.textContent = q.text;
  options.innerHTML = ""; // reset buttons

  // Tool sets
  const expansionTools = [
    { id: "buy", label: "Buy Securities (Expansion)" },
    { id: "lowerRate", label: "Lower Discount Rate (Expansion)" },
    { id: "lowerReserve", label: "Lower Reserve Requirement (Expansion)" }
  ];

  const contractionTools = [
    { id: "sell", label: "Sell Securities (Contraction)" },
    { id: "raiseRate", label: "Raise Discount Rate (Contraction)" },
    { id: "raiseReserve", label: "Raise Reserve Requirement (Contraction)" }
  ];

  let toolOptions = [];

  if (q.correct === "expand") toolOptions = expansionTools;
  else if (q.correct === "contract") toolOptions = contractionTools;
  else toolOptions = [{ id: "noChange", label: "Take No Action" }];

  toolOptions.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.dataset.id = opt.id;
    btn.addEventListener("click", () => checkAnswer(opt.id, btn));
    options.appendChild(btn);
  });
}

// ===================== CHECK ANSWER =====================
function checkAnswer(choice, btn) {
  const q = shuffledQuestions[currentIndex];
  const buttons = options.querySelectorAll("button");

  // Disable everything
  buttons.forEach(b => (b.disabled = true));

  let correct = false;
  const expandSet = ["buy", "lowerRate", "lowerReserve"];
  const contractSet = ["sell", "raiseRate", "raiseReserve"];

  if (q.correct === "expand" && expandSet.includes(choice)) correct = true;
  if (q.correct === "contract" && contractSet.includes(choice)) correct = true;
  if (q.correct === "noChange" && choice === "noChange") correct = true;

  if (correct) {
    btn.style.backgroundColor = "#4caf50";
    feedback.textContent = "✅ Correct!";
    score++;
    animateBox(q.correct);
    setTimeout(nextQuestion, 1500);
  } else {
    btn.style.backgroundColor = "#e53935";
    feedback.textContent = "❌ Incorrect. Try another option.";

    // Re-enable all other buttons
    buttons.forEach(b => {
      if (b.dataset.id !== choice) b.disabled = false;
    });
  }
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < shuffledQuestions.length) {
    updateScore();
    loadQuestion();
  } else {
    endGame();
  }
}

// ===================== ANIMATIONS =====================
function animateBox(type) {
  if (type === "expand") {
    ecoBox.style.transform = "scale(1.25)";
    ecoBox.style.background = "#c8e6c9";
    ecoBox.textContent = "Expansion";
  }
  if (type === "contract") {
    ecoBox.style.transform = "scale(0.8)";
    ecoBox.style.background = "#ffcdd2";
    ecoBox.textContent = "Contraction";
  }
  if (type === "noChange") {
    ecoBox.style.transform = "scale(1)";
    ecoBox.style.background = "#eeeeee";
    ecoBox.textContent = "Stable – No Action";
  }
}

// ===================== END GAME =====================
function endGame() {
  game.style.display = "none";
  endScreen.style.display = "block";

  finalMessage.textContent =
    playerName + ", your final score is " + score + "/" + questions.length + ".";

  const now = new Date();
  timestamp.textContent =
    "Completed on " + now.toLocaleDateString() + " at " + now.toLocaleTimeString();
}

