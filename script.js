const gameContainer = document.getElementById("game");
let bestScore = localStorage.getItem('bestScore')
console.log('default best score is 100')
if(bestScore == null){
  localStorage.setItem('bestScore', 100)
}
let theBestScore = parseInt(bestScore)
const colorObj =[{
  name: 'red',
  pix : 'pictures/one.png'
},{
  name: 'orange',
  pix : 'pictures/two.png'
},{
  name: 'yellow',
  pix : 'pictures/three.png'
},{
  name: 'green',
  pix : 'pictures/four.png'
},{
  name: 'blue',
  pix : 'pictures/five.png'
},{
  name: 'purple',
  pix : 'pictures/six.png'
},{
  name: 'red',
  pix : 'pictures/oneRN.png'
},{
  name: 'orange',
  pix : 'pictures/twoRN.png'
},{
  name: 'yellow',
  pix : 'pictures/threeRN.png'
},{
  name: 'green',
  pix : 'pictures/fourRN.png'
},{
  name: 'blue',
  pix : 'pictures/fiveRN.png'
},{
  name: 'purple',
  pix : 'pictures/sixRN.png'
},{
  name: 'indego',
  pix : 'pictures/seven.png'
},{
  name: 'indego',
  pix : 'pictures/sevenRN.png'
},{
  name: 'violet',
  pix : 'pictures/eight.png'
},{
  name: 'violet',
  pix : 'pictures/eightRN.png'
},{
  name: 'teal',
  pix : 'pictures/nine.png'
},{
  name: 'teal',
  pix : 'pictures/nineRN.png'
},{
  name: 'cyan',
  pix : 'pictures/ten.png'
},{
  name: 'cyan',
  pix : 'pictures/tenRN.png'
}]

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(colorObj) {
  let counter = colorObj.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = colorObj[counter];
    colorObj[counter] = colorObj[index];
    colorObj[index] = temp;
  }

  return colorObj;
}

let shuffledColors = shuffle(colorObj);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors() {
  for (let i =0; i< colorObj.length; i++) {
    // create a new div
    const newDiv = document.createElement("img");
    newDiv.setAttribute('src', 'pictures/Omega.png');
    newDiv.setAttribute('data-id', i)
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let score = 0;
let scoreBoard = document.getElementById('score');
let bestBoard = document.getElementById('hi-score');
bestBoard.innerHTML = theBestScore;
let cardsPicked = [];
let cardsExact = [];
let pairsFound =[];



//Is it a match?
function isMatch(){
  let allCard = document.querySelectorAll('img');
  let cardOne = cardsExact[0];
  let cardTwo = cardsExact[1];
  if(cardsPicked[0] === cardsPicked[1]){
    if(cardsExact[0] !== cardsExact[1]){
    console.log("Match!");
    pairsFound.push(cardsPicked);
    if(colorObj.length/2 === pairsFound.length){
      alert("YOU WON!!!")
      if (theBestScore > score){
      localStorage.setItem('bestScore', score)
    }
  }
  }
    
  }else{
    allCard[cardOne].setAttribute('src', 'pictures/Omega.png')
    allCard[cardTwo].setAttribute('src', 'pictures/Omega.png')
    console.log('Try again.');
    score++;  
    scoreBoard.innerHTML = score;
  }
  cardsExact =[];
  cardsPicked =[];
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let card = event.target;
  let cardId =card.getAttribute('data-id');
  let name = colorObj[cardId].name;
//so they can't click a card that's already been clicked
if(card.getAttribute('src') !== 'pictures/Omega.png'){
   alert('you already clicked that one!')
  }
//to stop clicking more than 2 too fast
  else if(cardsPicked.length === 2){
    alert('slow down')
  } else{
  console.log(cardId)
  console.log("you just clicked", name ,"!");
  card.setAttribute('src', colorObj[cardId].pix)
  cardsPicked.push(name);
  cardsExact.push(cardId);
  if(cardsPicked.length === 2){
    setTimeout(isMatch, 1000)
  }
}
}
let reset = document.querySelector('#newGame');
reset.addEventListener('click', function(){
  location.reload()
})

// when the DOM loads
createDivsForColors(shuffledColors);