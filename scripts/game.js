(function() {
    
  var gameAssets = {
    "images": [
      'assets/images/galaxy_0_72x72.png',
      'assets/images/galaxy_1_72x72.png',
      'assets/images/galaxy_2_72x72.png'
    ]
  };
  
  
  Crafty.init(window.width,window.height,window.document.getElementById('gamescreen'));
    
  Crafty.load(gameAssets,function() {
    Crafty.enterScene('Navigator');
  });
})();
