(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var Widget = TTT.Widget = function (game, $el) {
    this.game = game;
    this.el = $el;
  };

  Widget.prototype.bindEvents = function () {
    var ttt = this;
    
    $(".square").on("click", function(event) {
      var pos = this.data();
      
      console.log("on click for : " + pos)
      
      ttt.game.playMove([pos.row, pos.col]);
      ttt.makeMove(this);
    })
  };

  Widget.prototype.makeMove = function ($square) {
    if($square.is("xowned") || $square.is("oowned")) {
      return;
    } else {
      $square.addClass(this.game.currentPlayer.concat("owned"));
    }
  };

  Widget.prototype.play = function () {
    this.setupBoard();
    this.bindEvents();
  };

  Widget.prototype.setupBoard = function () {    
    console.log("setting board");

    $('.square').remove();
    
    for(var i = 0; i < 9; i ++) {
      var $square = $('<div class="square"></div>');
      $square.data("pos", [i / 3, i % 3]);
      
      $('.grid').append($square);
      console.log($square);
    }
  };
})();
