(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var Widget = TTT.Widget = function (game, $el, newGame) {
    this.game = game;
    this.el = $el;
    this.newGame = newGame;
  };

  Widget.prototype.bindEvents = function () {
    var ttt = this;
    
    $(".square").on("click", function(event) {
      if(ttt.game.isOver()) {
        ttt.game = ttt.newGame();
        ttt.play();
        $('.status').text('');
      } else {
        ttt.makeMove($(event.currentTarget));
      }
    })
  };

  Widget.prototype.makeMove = function ($square) {      
    var pos = $square.data("pos");
    
    console.log("makeMove for : " + pos);
    
    try {
      this.game.playMove(pos); // Could throw
      
      $square.addClass(this.game.currentPlayer.concat("_owned"));
      $('.status').text('');
      
      if(this.game.isOver()) {
        this.gameOver(this.game.winner());
      }
    } catch(e) {
      $('.status').text("Invalid Move!");
    }
  };
  
  Widget.prototype.gameOver = function (winner) {
    $('.status').text(winner + " won!");
  };

  Widget.prototype.play = function () {
    this.setupBoard();
    this.bindEvents();
  };

  Widget.prototype.setupBoard = function () {    
    $('.square').remove();
    
    for(var i = 0; i < 9; i ++) {
      var $square = $('<div class="square"></div>');
      $square.data("pos", [Math.floor(i / 3), i % 3]);
      
      $('.grid').append($square);
    }
  };
})();
