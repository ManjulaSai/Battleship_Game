describe("Battle ship test", function() {
   var ship;
   beforeEach(function() {
    // size, startRow, startColumn, endRow, endColumn   
     ship = new Ship(9,10,10,20,20);
     battleShipsBoard = new BattleShipsBoard(10,10);
   });

   it("Test ship size", function() {
     // expect(ship.size.toBe(true));
     expect(ship.size).toEqual(9)
 
   });
   it("Test Destroy Ship function", function(){
      ship.destroyShip();
      expect(ship.size).toEqual(8)

   });
   it('should test createBoard function', function(){
      const board = document.createElement('gameboard');
      board.setAttribute("id", "gameboard");
      battleShipsBoard.createBoard(board,1);
      expect(board.childNodes.length).toEqual(100);
     
    });

      
   
});