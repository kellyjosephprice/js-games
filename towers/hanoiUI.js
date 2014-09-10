(function () {
  if (typeof window.Hanoi === "undefined") {
    window.Hanoi = {};
  }
  
  var UI = window.Hanoi.UI = function (game, $el, discs, newGameCallback) {
    this.game            = game;
    this.el              = $el;
    this.newGameCallback = newGameCallback;
    this.discs           = (discs === undefined) ? 3 : discs;
  };
  
  UI.prototype.render = function () {
    var $piles = $('<div class="piles"></div>');
 
    $('.towers').children().remove();
    $('.towers').append($piles);
    
    var createTile = function (size, $pile) {
      var $disc = $('<div class="disc"></div>');
      $disc.data('size', size);
      $disc.addClass('size' + size);
      $pile.append($disc);
    };
      
    for(var i = 0; i < 3; i++) {
      var $pile = $('<div class="pile"></div>');
      var $discs = $('<div class="discs"></div>');
      $pile.data('index', i);
      $piles.append($pile.append($discs));
      
      for(var j = this.game.towers[i].length; j > 0; j--) {
        createTile(this.game.towers[i][j-1], $discs);
      }
    }
  };
  
  UI.prototype.bindEvents = function() {
    var UI = this;
    
    $(".pile").click(function(event) {
      var $pile = $(event.currentTarget);
      
      $('.status').first().text("");
      
      if (UI.game.isWon()) {
        UI.game = UI.newGameCallback();
        UI.play();
      } else if ($(".selected").length > 0) {
        if (!UI.move($(".selected").first(), $pile)) {
          $('.status').first().text("Invalid Move!");
        }
        UI.play();
        if(UI.game.isWon()) {
          $('.status').first().text("You Win!");
        }
      } else {
        $pile.addClass("selected");
      }
    });
  };
  
  UI.prototype.move = function($source, $dest) {
    return this.game.move($source.data("index"), $dest.data("index"));
  };
  
  UI.prototype.play = function() {
    this.render();
    this.bindEvents();
  };
})();