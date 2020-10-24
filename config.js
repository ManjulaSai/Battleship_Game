let config = {
    "battleShipBoard" : {
        "totalRows" : 10,
        "totalColumns" : 10,
        "sizeOfSquareDiv" : 50,
        "textAlign" : "center",
        "padding" : "3%",
        "arrangement1" : [
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
                        ]

    },
    "battleship" : {
        "size" : 4,
        "startRow" : 7,
        "endRow" : 7,
        "startColumn" : 6,
        "endColumn" : 9
    },
    "cruiser" : {
        "size" : 3,
        "startRow" : 5,
        "endRow" : 5,
        "startColumn" : 1,
        "endColumn" : 3
    },
    "submarine" : {
        "size" : 3,
        "startRow" : 3,
        "endRow" : 5,
        "startColumn" : 8,
        "endColumn" : 8
    },
    "destroyer" : {
        "size" : 2,
        "startRow" : 2,
        "endRow" : 2,
        "startColumn" : 0,
        "endColumn" : 1
    },
    "carrier" : {
        "size" : 5,
        "startRow" : 0,
        "endRow" : 4,
        "startColumn" : 4,
        "endColumn" : 4
    },
    "initialCounters" : {
        "hitCounter" : 0,
        "missCounter" : 0,
        "availableShips" : 5,
        "destroyedShips" : 0,
        "totalAttacks" : 0
    },
    "squareStatusStyle": {
        "fontWeight" : "bold",
        "hitLetter" : "H",
        "hitColor" : "red",
        "missLetter" : "M",
        "missColor" : "grey",
        "sunkLetter" : "S",
        "sunkColor" : "#32CD32"
    },
    "shipStatus" : {
        "noShip" : 0,
        "shipExists" : 1,
        "attackMissed" : 2,
        "shipAttacked" : 3
        
    }
}
