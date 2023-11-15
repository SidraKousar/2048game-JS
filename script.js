const value = 4;
const schema = [];
let key = "";
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

const valueBColorMap = {
    null: 'rgba(238,228,218,.35)',
    2: 'rgb(238, 228, 218)',      
    4: 'rgb(237, 224, 200)',       
    8: 'rgb(242, 177, 121)',        
    16: 'rgb(245, 149, 99)',        
    32: 'rgb(246, 124, 95)',    
    64: 'rgb(246, 94, 59)',      
    128: 'rgb(237, 207, 114)',     
    256: 'rgb(237, 204, 97)',      
    512: 'rgb(237, 200, 80)',      
    1024: 'rgb(237, 197, 63)',     
    2048: 'rgb(237, 194, 46)'
};
const valueColorMap ={
    2: 'black',      
    4: 'black',       
    8: 'white',        
    16: 'white',        
    32: 'white',    
    64: 'white',      
    128: 'white',     
    256: 'white',      
    512: 'white',      
    1024: 'white',     
    2048: 'white'
}
const gameContainer = document.getElementById("game-container");

function createschema() 
{
  for (let x = 0; x < value; x++) 
     {
         for (let y = 0; y < value; y++) 
         {
          const box = 
          {
             value: null,
             position:
                 {
                     x: x,
                     y: y,
                 },
             isEmpty: true,
          };
          schema.push(box);
         }
     }
  renderBoxes(true);
}

function renderBoxes(isFirst=false) {
    for (let x = 0; x < value; x++) {
        let row = null;
        if(isFirst){
            row = document.createElement("div");
            row.classList.add("row");
        }
      
  
      for (let y = 0; y < value; y++) {
        const box = schema[x * value + y];
        let cube = isFirst ? document.createElement("div") : document.getElementById(`${x}${y}`);
        cube.innerHTML = box.value;
        cube.style.backgroundColor = valueBColorMap[box.value];
        cube.style.color =  valueColorMap[box.value];
  
        if(isFirst && row){ 
            const boxId = `${x}${y}`;
            cube.setAttribute("id", boxId);
            cube.classList.add("boxstyle");
            row.appendChild(cube);
        }
      }
  
      if(isFirst && row){
        gameContainer.appendChild(row);
      }
    }
  }


function generateRandomValue()
{
    const emptyValue = schema.filter(cube => cube.isEmpty == true);
    if(emptyValue == 0)
    {
        return;
    }

    const randomValueIndex = Math.floor(Math.random()*emptyValue.length);
    const randonValue = Math.random()< 0.9 ? 2:4;

    emptyValue[randomValueIndex].value = randonValue;
    emptyValue[randomValueIndex].isEmpty = false;

}
function keyCheck(){
    document.onkeydown = function(event) {
        switch (event.keyCode) {
           case 37:
              key = "LeftArrow";
              console.log(key);
              keysImplementation();
              generateRandomValue();
              renderBoxes();
              gameEnd();
           break;
           case 38:
              key = "UpArrow";
              console.log(key);
              keysImplementation();
              generateRandomValue();
              renderBoxes();
              gameEnd();
           break;
           case 39:
              key = "RightArrow";
              console.log(key);
              keysImplementation();
              generateRandomValue();
              renderBoxes();
              gameEnd();
           break;
           case 40:
              key = "DownArrow";
              console.log(key);
              keysImplementation();
              generateRandomValue();
              renderBoxes();
              gameEnd();
           break;
        }
     };
}

function keysImplementation()
{
if(key=="UpArrow")
{
    const filledBox = schema.filter(cube => cube.isEmpty == false);
    for(i=0 ; i<=filledBox.length-1; i++)
    {
        console.log(filledBox[i]);
        let temp = Move(filledBox[i],key);
        if(temp == null){
            continue ;
        }
        else
        {
       
            while(temp != null){
                if(filledBox[i] && filledBox[i].x== 0)
                                {
                                    return;
                                }
                                else if (filledBox[i].value !== temp.value && temp.isEmpty == false)
                                 {
                                   break;
                                } 
                               
                                else 
                                { 
                                    if(filledBox[i])
                                {
                                    swap(filledBox[i], temp);
                                    return keysImplementation();
                                }
                                }
            }
            
        
    }
    }
}
if(key=="DownArrow")
{ 
     filledBox = schema.filter(cube => cube.isEmpty == false);
     for(i=filledBox.length-1 ; i>=0; i--)
     {
        console.log(filledBox[i]);
        let temp = Move(filledBox[i],key);
        if(temp == null){
            continue ;
        }
        else{
            while(temp != null){
                        if(filledBox[i] && filledBox[i].x== 3)
                                        {
                                            return;
                                        }
        
                                        else if (filledBox[i].value !== temp.value && temp.isEmpty === false) {
                                           break;

                                        } 
                                        else if(filledBox[i]){
                                            swap(filledBox[i], temp);
                                            return keysImplementation();
                                        }
                    }
                    

        }
     }
}

if(key=="LeftArrow")
{
    const filledBox = schema.filter(cube => cube.isEmpty == false);
    for(i=0 ; i<=filledBox.length-1; i++)
    {
        console.log(filledBox[i]);
        let temp = Move(filledBox[i],key);
        if(temp == null){
            continue ;
        }
        else
        {
       
            while(temp != null){
                if(filledBox[i] && filledBox[i].y== 0)
                                {
                                    return;
                                }
                                else if (filledBox[i].value !== temp.value && temp.isEmpty == false)
                                 {
                                    break;
                                } 
                               
                                else 
                                { 
                                    if(filledBox[i])
                                {
                                    swap(filledBox[i], temp);
                                    return keysImplementation();
                                }
                                }
            }
            
        
    }
    }
}
if(key=="RightArrow")
{ 
     filledBox = schema.filter(cube => cube.isEmpty == false);
     for(i=filledBox.length-1 ; i>=0; i--)
     {
        console.log(filledBox[i]);
        let temp = Move(filledBox[i],key);
        if(temp == null){
            continue ;
        }
        else{
            while(temp != null){
                        if(filledBox[i] && filledBox[i].y== 3)
                                        {
                                            return;
                                        }
        
                                        else if (filledBox[i].value !== temp.value && temp.isEmpty === false) {
                                
                                            break;
                                        } 
                                        else if(filledBox[i]){
                                            swap(filledBox[i], temp);
                                            return keysImplementation();
                                        }
                    }
                    

        }
     }
}


}

function Move(filledBox, key) 
{
    if (key === "UpArrow") 
    {
        if (filledBox.position.x == 0) {
            return null; 
        } else {
            const upwardPosition = schema.find(obj =>
                obj.position.y == filledBox.position.y && obj.position.x == filledBox.position.x - 1
            );

            return upwardPosition;
            
        }
    }

    if (key === "DownArrow") 
    {
        if (filledBox.position.x == 3) {
            return null; 
        } 
         else {
            const upwardPosition = schema.find(obj =>
                obj.position.y == filledBox.position.y && obj.position.x == filledBox.position.x + 1
            );

            return upwardPosition;
            
        }
    
    }
    if (key === "LeftArrow") 
    {
        if (filledBox.position.y == 0) {
            return null; 
        } else {
            const upwardPosition = schema.find(obj =>
                obj.position.x == filledBox.position.x && obj.position.y == filledBox.position.y - 1
            );

            return upwardPosition;
            
        }
    }

    if (key === "RightArrow") 
    {
        if (filledBox.position.y == 3) {
            return null; 
        } 
         else {
            const upwardPosition = schema.find(obj =>
                obj.position.x == filledBox.position.x && obj.position.y == filledBox.position.y + 1
            );

            return upwardPosition;
            
        }
    
    }
    

}
function sum(filledBox , position){
  const sum = filledBox.value + position.value;
  return sum;
}

function swap(filledBox, position) {
    if (filledBox.value === position.value) {
        const s = sum(filledBox, position);
       const totalScore=  document.getElementById("ScoreCalculation");
       score = parseInt(score + s);
       totalScore.innerHTML = score;
        console.log(totalScore);
        position.value = s;

        filledBox.value = null;
        filledBox.isEmpty = true;
    } 

    else if (filledBox.value !== position.value && position.isEmpty === false) {
        renderBoxes();
    } 
    else {
        position.value = filledBox.value;
        position.isEmpty = filledBox.isEmpty;

        filledBox.value = null;
        filledBox.isEmpty = true;
    }

}
let gameEnded = false; 

function gameEnd() {
    const emptyCells = schema.filter(cube => cube.isEmpty);

    if (emptyCells.length === 0 && !gameEnded) { // Check if the game has not ended
        for (let x = 0; x < value; x++) {
            for (let y = 0; y < value; y++) {
                const currentBox = schema[x * value + y];
                const neighbors = getNeighbors(currentBox);
                for (let i = 0; i < neighbors.length; i++) {
                    if (neighbors[i].value == currentBox.value) {
                        return;
                    }
                }
            }
        }

        const gameEndContainer = document.createElement("div");
        gameEndContainer.classList.add("gameOverOverlay");
        
        const gameOverMessage = document.createElement("h1");
        gameOverMessage.innerHTML = "Game Over!";
        gameOverMessage.classList.add("gameOverMessageStyle")

        const gameEndButton = document.createElement("button");
        gameEndButton.classList.add("tryAgainBtn");
        gameEndButton.textContent = "Try Again";
        gameEndButton.addEventListener('click', resetGame);
        
        gameEndContainer.appendChild(gameOverMessage);
        gameEndContainer.appendChild(document.createElement("br"));
        gameEndContainer.appendChild(gameEndButton);
        gameContainer.appendChild(gameEndContainer);

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
            const bestScoreElement = document.getElementById("BestScoreCalculation");
            bestScoreElement.innerHTML = bestScore;
        }

        gameEnded = true; 
    }
}


function getNeighbors(box) {
    const neighbors = [];
    const { x, y } = box.position;

    if (x > 0) neighbors.push(schema.find(obj => obj.position.x === x - 1 && obj.position.y === y)); 
    if (x < value - 1) neighbors.push(schema.find(obj => obj.position.x === x + 1 && obj.position.y === y)); 
    if (y > 0) neighbors.push(schema.find(obj => obj.position.x === x && obj.position.y === y - 1)); 
    if (y < value - 1) neighbors.push(schema.find(obj => obj.position.x === x && obj.position.y === y + 1)); 

    return neighbors;
}


function resetGame() {
    schema.forEach(box => {
        box.value = null;
        box.isEmpty = true;
    });
    score = 0;
    gameEnded = false;
    generateRandomValue();
    generateRandomValue();
    renderBoxes(false);

    const scoreElement = document.getElementById("ScoreCalculation");
    scoreElement.innerHTML = score;
    
    const gameEndContainer = document.querySelector(".gameOverOverlay");
    if (gameEndContainer) {
        gameEndContainer.remove();
    }
    
}
function renderBestScore() {
    const bestScoreElement = document.getElementById("BestScoreCalculation");
    bestScoreElement.innerHTML = bestScore;
}

document.addEventListener('keydown', keyCheck);

function gameStart(){
createschema();
generateRandomValue();
generateRandomValue();
renderBoxes();
renderBestScore();
}
gameStart();
