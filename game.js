// ================== QUESTIONS ===================
// Each scenario now maps to: "expansion", "contraction", or "noChange"

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

  // Neutral/no change cases
  {text:"There is steady job growth and stable prices.", correct:["noChange"], type:"noChange"},
  {text:"The economy is stable, with 2% inflation and 4% unemployment.", correct:["noChange"], type:"noChange"},
  {text:"A

