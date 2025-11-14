/* ================== FISCAL POLICY GAME JS ================== */
/* Final, corrected, non-freezing version */

/* ================== QUESTIONS ================== */
const questions = [
  {text:"Unemployment is high, and factories are closing.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"Consumer demand is falling, and businesses are laying off workers.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"The economy is in a deep recession with rising unemployment.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"Tax revenues are low, and the government wants to stimulate growth.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"The government wants to boost household income and encourage spending.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"Economic output is below potential, and unemployment benefits are being expanded.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},

  {text:"The economy is overheating, and inflation is rising quickly.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"Prices are rising at their fastest pace in a decade.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"Government debt is climbing, and the economy is growing too fast.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"Too much money is circulating, and consumer prices keep increasing.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"The government wants to slow inflation by reducing demand.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"The economy is expanding rapidly, and the government budget is in deficit.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"Public spending is causing prices to rise faster than wages.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"Corporate profits and wages are rising quickly, causing higher prices.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"Inflation is rising while the unemployment rate remains low.", correct:["cutSpending","raiseTaxes"], type:"contraction"},

  {text:"Production and employment are declining after a major hurricane.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"The government launches a new highway infrastructure project to create jobs.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"Consumers are saving more and spending less, causing output to drop.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"Unemployment claims are at record highs, and factories are idle.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"Wages and prices are falling during an economic slowdown.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},
  {text:"High unemployment has persisted for six months.", correct:["increaseSpending","lowerTaxes"], type:"expansion"},

  {text:"Interest rates are low, and inflation is starting to climb.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"Government stimulus from last year has overheated the economy.", correct:["cutSpending","raiseTaxes"], type:"contraction"},
  {text:"The economy is booming, and demand is far outpacing supply.", correct:["cutSpending","raiseTaxes"], type:"contraction"},

  {text:"There is steady job growth and stable prices.", correct:["noChange"], type:"noChange"},
  {text:"The economy is stable, with 2% inflation and 4% unemployment.", correct:["noChange"], type:"noChange"},
  {text:"A balanced budget and stable growth exist with little inflation.", correct:["noChange"], type:"noChange"},
  {text:"Consumer confidence is strong, and the economy is balanced.", correct:["noChange"], type:"noChange"}
];

/* ================== DOM REFERENCES ================== */
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const endScreen = document.getElementById("endScreen");
const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");
const senatorName = document.getElementById("senatorName");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const feedback = document.getElementById("feedback");
const options = document.getElementById("options");
const ecoBox = document.getElementById("ecoBox");
const finalMessage = document.getElementById("finalMessage");
const timestamp = document.getElementById("timestamp");

/* ================== STATE ================== */
let currentIndex = 0;
let score = 0;
let shuffledQuestions = [];
let playerName = "";

/* ================== INITIALIZE ================== */
window.addEventListener("DOMContentLoaded", () => {
  intro.style.display = "block";
  startBtn.addEventListener("click", startGame);
});

/* ================== START GAME ================== */
function startGame() {
  playerName = nameInput.value.trim();
  if (!playerName) {
    alert("Please enter your name first.");
    return;
  }

  intro.style.display = "none";
  game.style.display = "block";
  senatorName.textContent = "Senator " + playerName;

  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  currentIndex = 0;
  score = 0;
  updateScore();
  loadQuestion();
}

/* ================== SCORE & QUESTION ================== */
function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
  questionCount.textContent = "Question " + (currentIndex + 1) + " of 30";
}

function loadQuestion() {
  const q = shuffledQuestions[currentIndex];

  feedback.textContent = "";
  ecoBox.style.transform = "scale(1)";
  ecoBox.style.backgroundColor = "#cfd8dc";
  ecoBox.textContent = "Economy / Employment";

  questionText.textContent = q.text;

  options.innerHTML = "";

  const toolButtons = [
    { id: "increaseSpending", label: "Increase Government Spending" },
    { id: "cutSpending", label: "Cut Government Spending" },
    { id: "raiseTaxes", label: "Raise Taxes" },
    { id: "lowerTaxes", label: "Lower Taxes" }
  ];

  let optionSet = [...toolButtons];
  if (q.type === "noChange") {
    optionSet.push({ id: "noChange", label: "No Change" });
  }

  optionSet.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.dataset.id = opt.id;
    btn.addEventListener("click", () => checkAnswer(opt.id, btn));
    options.appendChild(btn);
  });
}

/* ================== CHECK ANSWER ================== */
function checkAnswer(choice, btn) {
  const q = shuffledQuestions[currentIndex];
  const buttons = options.querySelectorAll("button");

  // Disable all buttons initially
  buttons.forEach(b => b.disabled = true);

  if (q.correct.includes(choice)) {
    btn.style.backgroundColor = "#4caf50";
    feedback.textContent = "✅ Correct!";
    score++;
    animateBox(q.type);

    setTimeout(() => {
      currentIndex++;
      if (currentIndex < 30) {
        updateScore();
        loadQuestion();
      } else {
        endGame();
      }
    }, 1800);

  } else {
    // WRONG ANSWER
    btn.style.backgroundColor = "#e53935";
    feedback.textContent = "❌ Incorrect. Try again.";

    // Re-enable buttons EXCEPT the one just clicked
    buttons.forEach(b => {
      const id = b.dataset.id;
      if (id !== choice) {
        b.disabled = false;
      }
    });
  }
}

/* ================== ANIMATION ================== */
function animateBox(type) {
  if (type === "expansion") {
    ecoBox.style.transform = "scale(1.3)";
    ecoBox.style.backgroundColor = "#a5d6a7";
    ecoBox.textContent = "Economy Expands";
  } else if (type === "contraction") {
    ecoBox.style.transform = "scale(0.8)";
    ecoBox.style.backgroundColor = "#ef9a9a";
    ecoBox.textContent = "Economy Contracts";
  } else {
    ecoBox.style.transform = "scale(1)";
    ecoBox.style.backgroundColor = "#cfd8dc";
    ecoBox.textContent = "Stable Economy";
  }
}

/* ================== END GAME ================== */
function endGame() {
  game.style.display = "none";
  endScreen.style.display = "block";
  finalMessage.textContent = `Senator ${playerName}, you achieved ${score}/30 correct answers.`;

  const now = new Date();
  timestamp.textContent =
    "Completed on " + now.toLocaleDateString() + " at " + now.toLocaleTimeString();
}

