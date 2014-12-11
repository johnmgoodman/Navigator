Crafty.defineScene('Story', (function() {
  
  var currentStory = null,
    nextScene = {},
    storyNodeFactory = function(storyData) {
      Crafty.e('StoryNode')
        .nodeData(storyData)
        .attr({
          x: 20,
          y: 20,
          w: window.innerWidth - 50,
          h: window.innerHeight - 50
        });
    },
    onClick = function(e) {
      var target = e.target,
        value = target.value;
      if( target.className === 'storynode optionbutton' ) {
        Crafty('StoryNode').each(function(){this.destroy();});
        if(value === '_storyend') {
          Crafty.enterScene(nextScene.name,nextScene.param);
        } else if(currentStory.nodes.hasOwnProperty(value)) {
          storyNodeFactory(currentStory.nodes[value]);
        }
      }
    };
  return function(param) {
    if(param.hasOwnProperty('story')) {
      currentStory = Crafty.Game.stories[param.story];
    } else {
      // TEMPORARY. this is the only story
      currentStory = Crafty.Game.stories.spaceworm;
    }
    
    if(param.hasOwnProperty('sceneRelay')) {
      nextScene.name = param.sceneRelay.name;
      nextScene.param = param.sceneRelay.param;
    }
    
     
    
    Crafty.e('DOMEventDelegator')
      .addListener(window.ontouchstart ? 'touchstart' : 'click',onClick);
    
    
    
    
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
    Crafty.viewport.mouselook(false);
    Crafty.viewport.clampToEntities = false;
    Crafty.viewport.reload();
    storyNodeFactory(currentStory.nodes[currentStory.initial]);
  };
})());
