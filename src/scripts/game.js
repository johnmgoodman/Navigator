(function(Crafty) {
    
  var gameAssets = require('./assets.json');
  
  require('./components/SceneTransition.js');
  require('./components/Player.js');
  require('./components/Outerspace.js');
  require('./components/NavNode.js');
  require('./components/NavNodeText.js');
  require('./components/NavNodeButton.js');
  require('./components/ParallaxLayer.js');
  require('./components/StoryNode.js');
  
  require('./scenes/navigation.js');
  require('./scenes/story.js');
  
  Crafty.Game = {};
  Crafty.Game.navigationNodes = require('./gamedata/navigation.json');
  Crafty.Game.stories = require('./gamedata/story.json');
  Crafty.Game.helpers = require('./helpers/helpers.js');

  Crafty.sprite(32,"assets/images/ui.png",{
    UIBackDisabled:[0,0],
    UIBackEnabled:[1,0]
  });
  
  Crafty.init(window.width,window.height,window.document.getElementById('gamescreen'));
  Crafty.background('#000000');
  Crafty.load(gameAssets,function() {
    Crafty.Game.Player = Crafty.e('Player').apply({
      attributes: {
        intellect: 5,
        luck:3,
        speech: 3
      }
    });
    Crafty.enterScene('Navigation', {sceneNode: '_top'});
  });
})(Crafty);
