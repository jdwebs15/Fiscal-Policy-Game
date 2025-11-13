// ================== QUESTIONS ===================
const questions = [
 {text:"Unemployment is high, and factories are closing. What fiscal policy should the government use?",correct:"increaseSpending"},
 {text:"Consumer demand is falling, and businesses are laying off workers.",correct:"increaseSpending"},
 {text:"The economy is in a deep recession with rising unemployment.",correct:"lowerTaxes"},
 {text:"Tax revenues are low, and the government wants to stimulate growth.",correct:"increaseSpending"},
 {text:"The government wants to boost household income and encourage spending.",correct:"lowerTaxes"},
 {text:"Economic output is below potential, and unemployment benefits are being expanded.",correct:"increaseSpending"},
 {text:"The economy is overheating, and inflation is rising quickly.",correct:"cutSpending"},
 {text:"Prices are rising at their fastest pace in a decade.",correct:"raiseTaxes"},
 {text:"Government debt is climbing, and the economy is growing too fast.",correct:"cutSpending"},
 {text:"Too much money is circulating, and consumer prices keep increasing.",correct:"raiseTaxes"},
 {text:"There is steady job growth and stable prices.",correct:"noChange"},
 {text:"The government wants to slow inflation by reducing demand.",correct:"cutSpending"},
 {text:"The economy is expanding rapidly, and the government budget is in deficit.",correct:"raiseTaxes"},
 {text:"Production and employment are declining after a major hurricane.",correct:"increaseSpending"},
 {text:"The government launches a new highway infrastructure project to create jobs.",correct:"increaseSpending"},
 {text:"The economy is stable, with 2% inflation and 4% unemployment.",correct:"noChange"},
 {text:"Consumers are saving more and spending less, causing output to drop.",correct:"lowerTaxes"},
 {text:"Unemployment claims are at record highs, and factories are idle.",correct:"increaseSpending"},
 {text:"The national debt is large, but inflation is rising faster than expected.",correct:"raiseTaxes"},
 {text:"Corporate profits and wages are rising quickly, causing higher prices.",correct:"cutSpending"},
 {text:"Interest rates are low, and inflation is starting to climb.",correct:"raiseTaxes"},
 {text:"Government stimulus from last year has overheated the economy.",correct:"cutSpending"},
 {text:"Public spending on schools and bridges is expanded to reduce unemployment.",correct:"increaseSpending"},
 {text:"The economy has slowed sharply, and tax revenues have dropped.",correct:"lowerTaxes"},
 {text:"A balanced budget and stable growth exist with little inflation.",correct:"noChange"},
 {text:"The economy is booming, and demand is far outpacing supply.",correct:"raiseTaxes"},
 {text:"Wages and prices are falling during an economic slowdown.",correct:"increaseSpending"},
 {text:"High unemployment has persisted for six months.",correct:"lowerTaxes"},
 {text:"Inflation is rising while the unemployment rate remains low.",correct:"cutSpending"},
 {text:"Consumer confidence is strong, and the economy is balanced.",correct:"noChange"}
];

// ================== DOM HANDLES ===================
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

// ================== STATE ===================
let currentIndex = 0;
let score = 0;
let shuffledQuestions = [];
let playerName = "";

// ================== INIT ===================
window.addEventListener("DOMContentLoaded", () => {
  intro.style.display = "block";
  startBtn.addEventListener("click", startGame);
});

function startGame(){
  playerName = nameInput.value.trim();
  if(!playerName){ alert("Please enter your name first."); return; }

  intro.style.display = "none";
  game.style.display = "block";
  senatorName.textContent = "Senator " + playerName;

  shuffledQuestions = [...questions].sort(()=>Math.random()-0.5);
  currentIndex = 0;
  score = 0;
  updateScore();
  loadQuestion();
}

function updateScore(){
  scoreDisplay.textContent = "Score: " + score;
  questionCount.textContent = "Question " + (currentIndex+1) + " of 30";
}

function loadQuestion(){
  const q = shuffledQuestions[currentIndex];

  // Reset visuals
  feedback.textContent = "";
  ecoBox.style.transform = "scale(1,1)";
  ecoBox.style.backgroundColor = "#cfd8dc";
  ecoBox.textContent = "Economy / Employment";

  // Question text
  questionText.textContent = q.text;

  // Options
  options.innerHTML = "";
  const baseOptions = [
    {id:"increaseSpending",label:"Increase Government Spending"},
    {id:"cutSpending",label:"Cut Government Spending"},
    {id:"raiseTaxes",label:"Raise Taxes"},
    {id:"lowerTaxes",label:"Lower Taxes"},
  ];

  // Only show "No Change" on the few that require it
  const finalOptions = (q.correct === "noChange")
    ? [...baseOptions, {id:"noChange",label:"No Change"}]
    : baseOptions;

  finalOptions.forEach(opt=>{
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.addEventListener("click", ()=>checkAnswer(opt.id, btn));
    options.appendChild(btn);
  });
}

function checkAnswer(choice, btn){
  const q = shuffledQuestions[currentIndex];
  const buttons = options.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  if(choice === q.correct){
    btn.style.backgroundColor = "#4caf50";
    feedback.textContent = "✅ Correct!";
    score++;
    animateBox(q.correct);

    setTimeout(()=>{
      currentIndex++;
      if(currentIndex < 30){
        updateScore();
        loadQuestion();
      } else {
        endGame();
      }
    }, 2000);
  } else {
    btn.style.backgroundColor = "#e53935";
    feedback.textContent = "❌ Incorrect.";
    // wrong stays locked; student must move on when correct is clicked
    // (we do NOT auto-advance; they can try other buttons this question,
    // but wrong ones remain disabled as they click them)
    buttons.forEach(b=>{
      if(b !== btn) b.disabled = false;
    });
  }
}

function animateBox(type){
  if(type==="increaseSpending" || type==="lowerTaxes"){
    ecoBox.style.transform = "scale(1.3,1.3)";
    ecoBox.style.backgroundColor = "#a5d6a7";
    ecoBox.textContent = "Economy Expands";
  } else if(type==="cutSpending" || type==="raiseTaxes"){
    ecoBox.style.transform = "scale(0.8,0.8)";
    ecoBox.style.backgroundColor = "#ef9a9a";
    ecoBox.textContent = "Economy Contracts";
  } else {
    ecoBox.style.backgroundColor = "#cfd8dc";
    ecoBox.textContent = "Stable Economy";
  }
}

function endGame(){
  game.style.display = "none";
  endScreen.style.display = "block";
  finalMessage.textContent = `Senator ${playerName}, you achieved ${score}/30 correct answers.`;

  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  timestamp.textContent = `Completed on ${dateStr} at ${timeStr}`;
}
