(function(Crafty) {
    
  var gameAssets = require('./assets.json');
  
  require('./components/Player.js');
  require('./components/Outerspace.js');
  require('./components/NavNode.js');
  require('./components/NavNodeButton.js');
  require('./components/ParallaxLayer.js');
  
  require('./scenes/navigation.js');
  
  Crafty.Game = require('./game.json');
  
  Crafty.init(window.width,window.height,window.document.getElementById('gamescreen'));    
  Crafty.load(gameAssets,function() {
    Crafty.enterScene('Navigation', initialNavigationConf);
  });
})(Crafty);