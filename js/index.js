// general functions
function randomBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// classes for boardInitialize()
class Rock {
  constructor(_startY) {
    this.startY = _startY;
    this.height = randomBetween(1, 2);
  }
  getCells(gridCellsNum, groundHeight){
    return {
      startY: this.startY,
      endY: this.startY,
      startX: gridCellsNum - 1 - groundHeight - this.height,
      endX: gridCellsNum - 1 - groundHeight,
    }
  }
  // num of rocks
  static minMax(){
    return [2, 4];
  }
}

class Tree {
  constructor(_y) {
    this.y = _y;
    this.trunkHeight = randomBetween(2, 4);

    // create the tree-top, and store it in tops (arr)
    tops.push(new Top(this.y, gridCellsNum - 1 - groundHeight - this.trunkHeight));
  }
  getCells(gridCellsNum, groundHeight){
    return {
      startY: this.y,
      endY: this.y,
      startX: gridCellsNum - 1 - groundHeight - this.trunkHeight,
      endX: gridCellsNum - 1 - groundHeight,
    }
  }
  // num of trees
  static minMax(){
    return [1, 3];
  }
}

class Top {
  constructor(_trunkY, _trunkTip) {
    this.startY = _trunkY - 1;
    this.endY = _trunkY + 1;
    this.startX = _trunkTip - randomBetween(2, 5);
    this.endX = _trunkTip - 1;
  }
  getCells(gridCellsNum, groundHeight){
    return {
      startY: this.startY,
      endY: this.endY,
      startX: this.startX,
      endX: this.endX,
    }
  }
}

// helper-functions for boardInitialize()
function createAndStoreElements (obj, arrForStore, freeCells, ){
  let [min, max] = [...obj.minMax()];
  let elementNum = randomBetween(min, max);
  for (let i = 0; i < elementNum; i++){
    let index = randomBetween(0, freeCells.length - 1);
    let start = freeCells[index];
    console.log('freeCells: ', freeCells);
    freeCells.splice(index, 1);
    let newObj = new obj(start);
    arrForStore.push(newObj);
  }
}

function setCells(){
    // create the cells
    for (let x = 0; x < gridCellsNum; x++){
      let column = [];
      mainGrid.push(column);
      for (let y = 0; y < gridCellsNum; y++){
        let cell = document.createElement('div');
        document.querySelector('.board').appendChild(cell);
        column.push(cell);
        cell.addEventListener("click", ClickOnBoardPanel);
        // grass
        if (x === (gridCellsNum - groundHeight)){
          cell.classList.add('grass');
        }
        //ground
        if (x > (gridCellsNum - groundHeight)){
          cell.classList.add('ground');
        }
      }
    }
  }

function setCellsClass(arrOfobj, classStr){
  for (let i = 0; i < arrOfobj.length; i++){
    let cells = arrOfobj[i].getCells(gridCellsNum, groundHeight);
    for (let x = cells.startX; x <= cells.endX; x++){
      for (let y = cells.startY; y <= cells.endY; y++){
        if (x >= 0 && x < gridCellsNum && y >= 0 && y < gridCellsNum){
          if(mainGrid[x][y].classList.value){
            mainGrid[x][y].classList.value = [];
          }
          mainGrid[x][y].classList.add(classStr);
        }
      }
    }
  }
}

function handelBoardResponsiveness(){
  console.log('handelBoardResponsiveness() is running');
  const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  document.querySelector('.container').style.width = width.toString() + 'px';
  // if mobile
  if (screen.availHeight < 480) {
    gridCellsNum = 10;
    groundHeight = randomBetween(1, 2);
    console.log('im a mobile');
  }
}
// global vars for boardInitialize()
let mainGrid = [];
let gridCellsNum = 20;
let rocks = [];
let trees = [];
let tops = [];
let groundHeight = randomBetween(4, 6);

function boardInitialize(){
  handelBoardResponsiveness();
  let freeCells = [...Array(gridCellsNum).keys()];
  createAndStoreElements(Rock, rocks, freeCells); 
  createAndStoreElements(Tree, trees, freeCells);

  setCells()

  setCellsClass(tops, 'top');
  setCellsClass(trees, 'tree');
  setCellsClass(rocks, 'rock');
}

boardInitialize();

// classes for gameInitialize()
class ToolOrTile{
  constructor(_class, _tile, _addOrRemove){
    this.class = _class;
    this.tile = _tile;
    this.addOrRemove = _addOrRemove;
  }

  getClass(){
    return this.class;
  }
}

// helper-functions for gameInitialize()
function toolsCreateAndStore(toolsStore){
  console.log('toolsCreateAndStore() is running')
  toolsStore['axe'] = (new ToolOrTile('axe', ['tree', 'top'], 'remove'));
  toolsStore['pickaxe'] = (new ToolOrTile('pickaxe', ['rock'], 'remove'));
  toolsStore['shovel'] = (new ToolOrTile('shovel', ['ground', 'grass'], 'remove'));
}

function toolsDisplayAndCreateEvents(toolsStore){
  console.log('toolsDisplayAndCreateEvents() is running')

  Object.values(toolsStore).forEach(element => {
    let tool = document.createElement('div');
    document.querySelector('.tools-tiles-container').appendChild(tool);
    tool.classList.add(element.getClass());
    tool.classList.add('tool');
    tool.addEventListener("click", ClickOnTool);
  });
}

function addTile(tileName){
  let tile = document.createElement('div');
  document.querySelector('.tools-tiles-container').appendChild(tile);
  tile.classList.add(tileName);
  console.log(tile);
  tile.classList.add('tile');
  if (availableTiles.length === inventoryAmount){
    removeTile(availableTiles[0]);
  }
  availableTiles.push(tile);
  
  tile.addEventListener("click", ClickOnTile);
}

function removeTile(tile){
  let index = availableTiles.indexOf(tile);
  availableTiles.splice(index, 1);
  tile.remove();
}

function handelGameResponsiveness(){
  console.log('handelGameResponsiveness() is running')
  // if mobile
  if (screen.availHeight < 480) {
    inventoryAmount = 1;
    console.log('im a mobile');
  }
}

// global vars for gameInitialize()
let currentToolOrTile = {
  div: null,
  type: null,
  name: null
};
let availableTiles = [];
let tools = {};
let inventoryAmount = 4;

function gameInitialize(){
  handelGameResponsiveness();
  toolsCreateAndStore(tools);
  toolsDisplayAndCreateEvents(tools);
}
gameInitialize();

//event functions
function ClickOnTool(event){
  let tool = event.target; 
  console.log(event.target);
  if(currentToolOrTile.div){
    currentToolOrTile.div.classList.remove('clicked');
  }
  currentToolOrTile.type = 'tool';
  currentToolOrTile.div = tool; 
  currentToolOrTile.name = tool.classList[0];

  tool.classList.add('clicked');
}

function ClickOnTile(event){
  let tile = event.target; 
  //ceck
  console.log(currentToolOrTile.div);
  if(currentToolOrTile.div){
    currentToolOrTile.div.classList.remove('clicked');
  }
  currentToolOrTile.type = 'tile';
  currentToolOrTile.div = tile;
  currentToolOrTile.name = tile.classList[0];
  tile.classList.add('clicked');
}

function ClickOnBoardPanel(event){
  let cell = event.target; 
  console.log(cell);
  // tile
  if(currentToolOrTile.type === 'tile'){
    if (!cell.classList.value){
      cell.classList.add(currentToolOrTile.name); 
      removeTile(currentToolOrTile.div);
      currentToolOrTile = {};
    }
    else{
      // currentToolOrTile.div.classList.add('non-valid');
    }
  }
  else if(currentToolOrTile.type === 'tool'){
    tool = tools[currentToolOrTile.name];
    if (tool.tile.includes(cell.classList[0])){
      addTile(cell.classList[0]);
      cell.classList.remove(cell.classList[0]);
    } else{
      // currentToolOrTile.div.classList.add('non-valid');
    }
  }

}

//reset
document.querySelector('.new-game').addEventListener('click', () => {
  document.querySelector('.board').innerHTML = null;
  mainGrid = [];
  gridCellsNum = 20;
  rocks = [];
  trees = [];
  tops = [];
  groundHeight = randomBetween(4, 6);
  boardInitialize();

  document.querySelector('.tools-tiles-container').innerHTML = null;
  currentToolOrTile = {
    div: null,
    type: null,
    name: null
  };
  availableTiles = [];
  tools = {};
  gameInitialize();
});
