// ===== Monetary OST Scenarios =====
const questions = [
 {text:"Inflation is rising quickly. Which monetary tool should the Fed use?",correct:"sell"},
 {text:"Economic growth is too slow and unemployment is rising.",correct:"buy"},
 {text:"credit has become too cheap and home prices are spiking.",correct:"raiseRate"},
 {text:"Businesses are struggling to borrow money.",correct:"lowerRate"},
 {text:"Too much money is circulating, creating inflation pressure.",correct:"sell"},
 {text:"The economy is overheating from rapid expansion.",correct:"raiseReserve"},
 {text:"The economy is falling into recession; demand is weak.",correct:"buy"},
 {text:"Banks are lending too aggressively; inflation risk rising.",correct:"raiseReserve"},
 {text:"Consumers are spending too little; deflation threat emerging.",correct:"lowerReserve"},
 {text:"Unemployment rising and factories are cutting production.",correct:"lowerRate"},
 {text:"The Fed wants to stimulate borrowing and economic growth.",correct:"buy"},
 {text:"Stable output and stable inflation.",correct:"noChange"},
 {text:"Inflation too high; Fed wants to cool demand.",correct:"sell"},
 {text:"Banks have too much money; loans too easy.",correct:"raiseReserve"},
 {text:"Banks holding excess reserves; Fed wants them to lend more.",correct:"lowerReserve"},
 {text:"The Fed sees falling inflation and weakening GDP.",correct:"lowerRate"},
 {text:"Interest rates already low; Fed wants more stimulus.",correct:"buy"},
 {text:"Economy booming and inflation accelerating.",correct:"raiseRate"},
 {text:"Loan defaults rising; Fed wants to ease credit.",correct:"lowerRate"},
 {text:"Consumers heavily borrowing; inflation risk high.",correct:"sell"},
 {text:"Nationwide shortage of borrowing activity.",correct:"lowerRate"},
 {text:"Fed wants to pull money out of circulation.",correct:"sell"},
 {text:"Steady growth, stable inflation, balanced lending.",correct:"noChange"},
 {text:"Home buying frenzy causing asset bubbles.",correct:"raiseRate"},
 {text:"Banks need more reserves to slow lending.",correct:"raiseReserve"},
 {text:"Loan approval rates collapsing; Fed wants banks to lend more.",correct:"lowerReserve"},
 {text:"Economic contraction; consumer spending low.",correct:"buy"},
 {text:"Inflationary wage growth accelerating.",correct:"sell"},
 {text:"Economy near full employment, rising prices.",correct:"raiseRate"},
 {text:"Economy stable and balanced.",correct:"noChange"}
];

// ===== DOM =====
const intro=document.getElementById("intro");
const game=document.getElementById("game");
const endScreen=document.getElementById("endScreen");
const nameInput=document.getElementById("nameInput");
const startBtn=document.getElementById("startBtn");
const senatorName=document.getElementById("senatorName");
const scoreDisplay=document.getElementById("scoreDisplay");
const questionCount=document.getElementById("questionCount");
const questionText=document.getElementById("questionText");
const options=document.getElementById("options");
const feedback=document.getElementById("feedback");
const ecoBox=document.getElementById("ecoBox");

const sliderOMO=document.getElementById("sliderOMO");
const sliderDiscount=document.getElementById("sliderDiscount");
const sliderReserve=document.getElementById("sliderReserve");

const finalMessage=document.getElementById("finalMessage");
const timestamp=document.getElementById("timestamp");

// STATE
let currentIndex=0;
let score=0;
let shuffledQuestions=[];
let playerName="";

// ===== START =====
window.addEventListener("DOMContentLoaded",()=>{
  intro.style.display="block";
  startBtn.addEventListener("click",startGame);

  sliderOMO.addEventListener("input",()=>updateSim());
  sliderDiscount.addEventListener("input",()=>updateSim());
  sliderReserve.addEventListener("input",()=>updateSim());
});

function startGame(){
  playerName=nameInput.value.trim();
  if(!playerName){alert("Enter name first!");return;}

  intro.style.display="none";
  game.style.display="block";

  senatorName.textContent="Senator "+playerName;

  shuffledQuestions=[...questions].sort(()=>Math.random()-0.5);
  currentIndex=0;score=0;
  updateScore();loadQuestion();
}

// ===== SIMULATOR EFFECTS =====
function updateSim(){
  let omo=sliderOMO.value;       // up = buy
  let disc=sliderDiscount.value; // up = raise
  let res=sliderReserve.value;   // up = raise

  let expand=false;
  let contract=false;

  // OMO
  if(omo>55) expand=true;
  if(omo<45) contract=true;

  // Discount Rate
  if(disc>55) contract=true;
  if(disc<45) expand=true;

  // Reserve Requirement
  if(res>55) contract=true;
  if(res<45) expand=true;

  if(expand && !contract){
    ecoBox.style.transform="scale(1.2)";
    ecoBox.style.backgroundColor="#a5d6a7";
    ecoBox.textContent="Economy Expands";
  } else if(contract && !expand){
    ecoBox.style.transform="scale(0.8)";
    ecoBox.style.backgroundColor="#ef9a9a";
    ecoBox.textContent="Economy Contracts";
  } else {
    ecoBox.style.transform="scale(1)";
    ecoBox.style.backgroundColor="#cfd8dc";
    ecoBox.textContent="Stable Economy";
  }
}

// ===== QUESTIONS =====
function updateScore(){
  scoreDisplay.textContent="Score: "+score;
  questionCount.textContent="Question "+(currentIndex+1)+" of 30";
}

function loadQuestion(){
  const q=shuffledQuestions[currentIndex];

  feedback.textContent="";
  questionText.textContent=q.text;

  // reset sliders
  sliderOMO.value=50;
  sliderDiscount.value=50;
  sliderReserve.value=50;
  updateSim();

  options.innerHTML="";

  const base=[
    {id:"buy",label:"Buy Securities"},
    {id:"sell",label:"Sell Securities"},
    {id:"raiseRate",label:"Raise Discount Rate"},
    {id:"lowerRate",label:"Lower Discount Rate"},
    {id:"raiseReserve",label:"Raise Reserve Requirement"},
    {id:"lowerReserve",label:"Lower Reserve Requirement"}
  ];

  const all=q.correct==="noChange"
    ? [...base,{id:"noChange",label:"No Change Necessary"}]
    : base;

  all.forEach(opt=>{
    const btn=document.createElement("button");
    btn.textContent=opt.label;
    btn.addEventListener("click",()=>checkAnswer(opt.id,btn));
    options.appendChild(btn);
  });
}

// ===== CHECK ANSWER =====
function checkAnswer(choice,btn){
  const q=shuffledQuestions[currentIndex];
  const buttons=options.querySelectorAll("button");
  buttons.forEach(b=>b.disabled=true);

  if(choice===q.correct){
    btn.style.backgroundColor="#4caf50";
    feedback.textContent="✅ Correct!";
    score++;setTimeout(()=>{
      currentIndex++;
      if(currentIndex<30){updateScore();loadQuestion();}
      else endGame();
    },2000);
  } else {
    btn.style.backgroundColor="#e53935";
    feedback.textContent="❌ Incorrect.";
  }
}

// ===== END =====
function endGame(){
  game.style.display="none";
  endScreen.style.display="block";
  finalMessage.textContent=`Senator ${playerName}, you achieved ${score}/30 correct answers.`;

  const now=new Date();
  timestamp.textContent=`Completed on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
}
