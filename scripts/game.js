(function() {
    
  var gameAssets = {
    "images": [
      'assets/images/galaxy_0_72x72.png',
      'assets/images/galaxy_1_72x72.png',
      'assets/images/galaxy_2_72x72.png',
      'assets/images/stars_0_900x900.png'
    ]
  },
  
  
  initialNavigationConf = {
    
    width: 1400,
    height: 900,
    
    viewport: {
      x: -200,
      y: -300
    },
    
    nodes:  [
      {
        attr: {
          x: 400,
          y: 400,
          w: 72,
          h: 72,
        },
        title: 'M331-I0',
        image: 'assets/images/galaxy_2_72x72.png'
      },
      {
        attr: {
          x: 620,
          y: 480,
          w: 72,
          h: 72,
        },
        title: 'M61-I0',
        image: 'assets/images/galaxy_1_72x72.png'
      },
      {
        attr: {
          x: 420,
          y: 757,
          w: 72,
          h: 72,
        },
        title: 'M139-G4',
        image: 'assets/images/galaxy_3_72x72.png'
      }
    ]
    
  };
  
  
  Crafty.init(window.width,window.height,window.document.getElementById('gamescreen'));
    
  Crafty.load(gameAssets,function() {
    Crafty.enterScene('Navigation', initialNavigationConf);
  });
})();
