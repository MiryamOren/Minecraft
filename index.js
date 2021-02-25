function randomBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class Rock {
  constructor(_startY) {
    this.startY = _startY;
    this.height = randomBetween(1, 2);
    // this.width = _width;
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
  static maxWidth(){
    return 2;
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
        document.querySelector('main').appendChild(cell);
        column.push(cell);
        //ground
        if (x > (gridCellsNum - 1 - groundHeight)){
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
          mainGrid[x][y].classList.add(classStr);
        }
        
      }
    }
  }
}

// global vars
const mainGrid = [];
const gridCellsNum = 20;
const rocks = [];
const trees = [];
const tops = [];
const groundHeight = randomBetween(3, 5);

function boardInitialize(){
  let freeCells = [...Array(gridCellsNum).keys()];
  createAndStoreElements(Rock, rocks, freeCells); 
  createAndStoreElements(Tree, trees, freeCells);

  setCells()

  setCellsClass(tops, 'top');
  setCellsClass(trees, 'tree');
  setCellsClass(rocks, 'rock');
}

boardInitialize();