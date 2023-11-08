const gameContainer = document.getElementById("game-container");
const totalScore = 0;
const totalMoves = 0;
const gridSize = 4;
let key = "";
const schema = [];
 function createSchema(){
  for(y=0; y<gridSize; y++){
    for(x=0; x<gridSize; x++){
       const cube ={
        value : null,
        isEmpty: true,
        position:{
          x : x,
          y : y,
        }
        
       };
      schema.push(cube);
      
    }
  }
createBox();
 }
function createBox() {
    for (let x = 0; x < gridSize; x++) {
      const row = document.createElement("div");
    //   const boxWidth = `${100 / gridSize}%`;
      row.classList.add("row");
     for (let y = 0; y < gridSize; y++) {
       const box = schema[x * gridSize + y]; 
        const cube = document.createElement("div");
        cube.classList.add("game-box");
        // cube.style.width = boxWidth;
        cube.setAttribute("value", box.value);
        cube.setAttribute("position", JSON.stringify(box.position));
        cube.setAttribute("isEmpty", box.isEmpty);
        row.appendChild(cube);
      }
  
      gameContainer.appendChild(row);
    }
  }
  function updateBox(cube) {
    const gameBoxes = document.getElementsByClassName("game-box");
    for (let i = 0; i < gameBoxes.length; i++) {
      const position = JSON.parse(gameBoxes[i].getAttribute("position"));
      if (position.x === cube.position.x && position.y === cube.position.y) {
        gameBoxes[i].setAttribute("value", cube.value);
        gameBoxes[i].setAttribute("isEmpty", cube.isEmpty);
        gameBoxes[i].innerHTML = cube.value;
      }
    }
  }
 function randomCube() {
  const emptyCubes = schema.filter(cube => cube.isEmpty == true);
  if (emptyCubes.length == 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * emptyCubes.length);
  const randomValue = Math.random() < 0.9 ? 2 : 4;
  const selectedCube = emptyCubes[randomIndex];
  selectedCube.value = randomValue;
  selectedCube.isEmpty = false;

  updateBox(selectedCube);
}
function keyCheck(){
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        key = "leftArrow";
        console.log(key);
        break;
      case 38:
        key = "upArrow";
        console.log(key);
        break;
      case 39:
        key = "rightArrow";
        console.log(key);
        break;
      case 40:
        key = "downArrow";
        console.log(key);
        break;
      default:
        break;
    }
 };
}
function move(filledBox, key)  {
  schema.forEach(filledBox => {
   if(key == "upArrow"){
      if(temp.position.y == 0){
         return;
      }
      else{
       temp = filledBox[i].position.y-1;
       return temp;
      }
   }
  });

}
function sum(){

}
function swap(){

}
function keysImplementation(){
  const filledBox = schema.filter(cube => cube.isEmpty == false);
  for(i=0 ; i<filledBox.length; i++){
      console.log(filledBox[i]);
       const temp = move(filledBox[i], key);
      if(key == "upArrow"){
        for (let position = temp; filledBox[i].y < 0; temp--) {
          if(filledBox[i].y == 0){
            return;
          }
          if(position.value!==null){
            if(filledBox[i].value == position.value){
              S = sum();
              swap();
              S += totalScore;
            }
          }
          else{
            swap();
          }
        
        }
      randomCube();
      totalMoves += totalMoves;
      }
   
  }
  
}

 function gameStart(){
  createSchema();
  randomCube();
  randomCube();
  keyCheck();
  keysImplementation();
 }
 gameStart();