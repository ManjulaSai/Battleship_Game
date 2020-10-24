// Refers to battleship game data configuration from config.json as imported in index.html
let battleshipGame;
// Refers to battleship game data configuration from config.json as imported in index.html
let battleshipGame2;
/*
This class responsible to define Game board and it's cell layout.
*/

class BattleShipsBoard {
    constructor(noOfRows, noOfColumns) {
        this.noOfRows = noOfRows;
        this.noOfColumns = noOfColumns;
    }

    createBoard(gameboardDiv,n) {
        // Create the board with empty squares
        for (let col = 0; col < this.noOfColumns; col++) {
            for (let row = 0; row < this.noOfRows; row++) {

                // Create squareDiv elements
                let squareDiv = document.createElement("div");
                gameboardDiv.appendChild(squareDiv);

                // Id of a square looks like "square42"
                squareDiv.id = n +'square' + row + col;

                // SquareDiv coordinates
                let topPos = row * config.battleShipBoard.sizeOfSquareDiv;
                let leftPos = col * config.battleShipBoard.sizeOfSquareDiv;

                // SquareDiv style elements
                squareDiv.style.top = topPos + 'px';
                squareDiv.style.left = leftPos + 'px';
                squareDiv.style.textAlign = config.battleShipBoard.textAlign;
                squareDiv.style.padding = config.battleShipBoard.padding;
            }
        }
    }
}

/*
This class reponsible to provide defination of ship class properties.
Ship object store the type of ship, size and the coordinates.
*/
class Ship {
    constructor(size, startRow, startColumn, endRow, endColumn,boardNum) {
        this.size = size;
        this.startRow = startRow;
        this.startColumn = startColumn;
        this.endRow = endRow;
        this.endColumn = endColumn;
        this.boardNum = boardNum;
    }

    destroyShip() {
        this.size--;
    }

    sinkShip(boardNum) {
        for (let i = this.startRow; i < this.endRow + 1; i++) {
            for (let j = this.startColumn; j < this.endColumn + 1; j++) {
                document.getElementById(boardNum + "square" + i + j).innerHTML = config.squareStatusStyle.sunkLetter;
                document.getElementById(boardNum + "square" + i + j).style.color = config.squareStatusStyle.sunkColor;
                document.getElementById(boardNum + "square" + i + j).style.fontWeight = config.squareStatusStyle.fontWeight;
            }
        }
    }
}

/*
This class responsible to do all action results 
Example: onHit function apply cell label as 'H' and apply color accordingly
*/
class ActionResult {
    onSink(shipEntry, boardNum) {
        shipEntry.sinkShip(boardNum);
        battleshipGame.availableShips--;
        battleshipGame.destroyedShips++;
    }

    onMiss(squareId, attackedRow, attackedCol, boardNum) {
        if (boardNum == 1){
        battleshipGame.missCounter++;
        battleshipGame.battleShipsArrangement[attackedRow][attackedCol] = config.shipStatus.attackMissed;
        } else {
            battleshipGame2.missCounter++;
            battleshipGame2.battleShipsArrangement[attackedRow][attackedCol] = config.shipStatus.attackMissed;
        }
        document.getElementById(squareId).innerHTML = config.squareStatusStyle.missLetter;
        document.getElementById(squareId).style.color = config.squareStatusStyle.missColor;
        document.getElementById(squareId).style.fontWeight = config.squareStatusStyle.fontWeight;
        // Set the attacked ship position value to 2
       

    }

    onHit(squareId, attackedRow, attackedCol, boardNum) {
        if (boardNum == 1){
        battleshipGame.hitCounter++;
        // Set the attacked ship position value to 3
        battleshipGame.battleShipsArrangement[attackedRow][attackedCol] = config.shipStatus.shipAttacked;
        } else {
            battleshipGame2.hitCounter++;
            battleshipGame2.battleShipsArrangement[attackedRow][attackedCol] = config.shipStatus.shipAttacked;
        }
        document.getElementById(squareId).innerHTML = config.squareStatusStyle.hitLetter;
        document.getElementById(squareId).style.color = config.squareStatusStyle.hitColor;
        document.getElementById(squareId).style.fontWeight = config.squareStatusStyle.fontWeight;


    }
}



/* 
This class responsible to create ship game initialization and doing appropriate actions based on user event.
ship status - Hit, Miss, Already Attacked, Sunk, Win
*/
class BattleshipGame {

    initializeGameData() {

        // Board with ship positions
        this.battleShipsArrangement = [
            [0,0,0,0,1,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0],
            [1,1,0,0,1,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,1,0],
            [0,0,0,0,1,0,0,0,1,0],
            [0,1,1,1,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
            ];
        this.hitCounter = config.initialCounters.hitCounter;
        this.missCounter = config.initialCounters.missCounter;
        this.availableShips = config.initialCounters.availableShips;
        this.destroyedShips = config.initialCounters.destroyedShips;
        this.totalAttacks = config.initialCounters.totalAttacks;
        this.actionResult = new ActionResult();
        this.createAllShips();
        // Assign corresponding ship size decrementing function to ship positions.
        this.shipsPositionMap = {
            "0,4": this.carrier,
            "1,4": this.carrier,
            "2,4": this.carrier,
            "3,4": this.carrier,
            "4,4": this.carrier,
            "2,0": this.destroyer,
            "2,1": this.destroyer,
            "3,8": this.submarine,
            "4,8": this.submarine,
            "5,8": this.submarine,
            "5,1": this.cruiser,
            "5,2": this.cruiser,
            "5,3": this.cruiser,
            "7,6": this.battleship,
            "7,7": this.battleship,
            "7,8": this.battleship,
            "7,9": this.battleship
        };
    }

    createAllShips() {
        this.battleship = new Ship(config.battleship.size, config.battleship.startRow, config.battleship.startColumn, config.battleship.endRow, config.battleship.endColumn);
        this.cruiser = new Ship(config.cruiser.size, config.cruiser.startRow, config.cruiser.startColumn, config.cruiser.endRow, config.cruiser.endColumn);
        this.submarine = new Ship(config.submarine.size, config.submarine.startRow, config.submarine.startColumn, config.submarine.endRow, config.submarine.endColumn);
        this.destroyer = new Ship(config.destroyer.size, config.destroyer.startRow, config.destroyer.startColumn, config.destroyer.endRow, config.destroyer.endColumn);
        this.carrier = new Ship(config.carrier.size, config.carrier.startRow, config.carrier.startColumn, config.carrier.endRow, config.carrier.endColumn);
    }
    computerGenerated(){
        let  i = Math.floor(Math.random() *10 );
        let  j = Math.floor(Math.random() *10 );
        return `${i}${j}`
    }

    applyActionResult(attackedRow, attackedCol, squareId, boardNum) {
        this.totalAttacks++;
        // If a ship is attacked show the status 'Hit' which is 'H'
        if (this.battleShipsArrangement[attackedRow][attackedCol] == config.shipStatus.shipExists) {

            this.actionResult.onHit(squareId, attackedRow, attackedCol, boardNum);

            let key = attackedRow + ',' + attackedCol;
            let ship= this.shipsPositionMap[key];
           
                ship.destroyShip();
            // If all the ship positions are attacked then the ship status is 'Sunk' shown as 'S'
            if (ship.size == 0) {
                ship.sinkShip(boardNum);
                this.actionResult.onSink(ship,boardNum);
            }
            // Count ships which are not yet attacked
            let shipsStanding = this.battleship.size + this.cruiser.size + this.submarine.size + this.carrier.size + this.destroyer.size;

            // If all the ships are attacked and there no ships standing then show the message 'Win'
            if (shipsStanding == 0 && boardNum == 1) {
                alert(" Player won");
            } else if (shipsStanding == 0 && boardNum == 2)
                 alert(" Computer won");
            // If the user click does not attack a ship, it is a Miss. Indicate the status with 'M'.
        } else if (this.battleShipsArrangement[attackedRow][attackedCol] == config.shipStatus.noShip) {
            this.actionResult.onMiss(squareId, attackedRow, attackedCol,boardNum);

            // If the user clicks on a square which is clicked before, show the alert message 'Already Attacked'.
        } else if (this.battleShipsArrangement[attackedRow][attackedCol] > 1) {
            console.log('row and column is' +  this.battleShipsArrangement[attackedRow][attackedCol]);
            alert("Already Attacked");
        }
    }
    onAttack(eventEntry) {

        let coordinates = battleshipGame2.computerGenerated();
        let row = coordinates.substring(0,1);
        let col  = coordinates.substring(1,2);
        console.log(battleshipGame2.battleShipsArrangement[row][col]);
        while(battleshipGame2.battleShipsArrangement[row][col]>1) {
             coordinates = battleshipGame2.computerGenerated();
            console.log('coordinates are'+ "2square"+coordinates);
            break;
        }
           
           // if there is click on any sqaureDiv
           if (eventEntry.target !== eventEntry.currentTarget) {
            let boardNum = eventEntry.target.id.substring(0,1);
            if(boardNum == 1 ){
                document.getElementById("2square"+coordinates).click();
            }
            
         
            let attackedRow = eventEntry.target.id.substring(7, 8);
            let attackedCol = eventEntry.target.id.substring(8, 9);
      
            //alert("Row: " + attackedRow + ", Column: " + attackedCol);
            if (boardNum ==1) {
            battleshipGame.applyActionResult(attackedRow, attackedCol, eventEntry.target.id,boardNum);
            } else 
            battleshipGame2.applyActionResult(attackedRow, attackedCol, eventEntry.target.id,boardNum);

        }
        eventEntry.stopPropagation();
    }

}



function load() {
    // get the container element
    let battleShipBoardDiv = document.getElementById("gameboard");

    let gameBoard = new BattleShipsBoard(config.battleShipBoard.totalRows, config.battleShipBoard.totalColumns);
    gameBoard.createBoard(battleShipBoardDiv,1);

    // Create game object and initialize game data
    battleshipGame = new BattleshipGame();
    battleshipGame.initializeGameData();

    // Run attackPosition function when squareDiv is clicked
    battleShipBoardDiv.addEventListener("click", battleshipGame.onAttack, false);

    let battleShipBoardDiv2 = document.getElementById("gameboard2");

    let gameBoard2 = new BattleShipsBoard(config.battleShipBoard.totalRows, config.battleShipBoard.totalColumns);
    gameBoard2.createBoard(battleShipBoardDiv2,2);

    // Create game object and initialize game data
    battleshipGame2 = new BattleshipGame();
    battleshipGame2.initializeGameData();

    // Run attackPosition function when squareDiv is clicked
   battleShipBoardDiv2.addEventListener("click", battleshipGame2.onAttack, false);
}

load();
