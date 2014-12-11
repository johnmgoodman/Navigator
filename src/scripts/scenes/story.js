Crafty.defineScene('Story', (function() {
  
  var currentStory = null,
    nextScene = {},
    storyNodeFactory = function(storyData) {
      Crafty.e('StoryNode')
        .nodeData(storyData)
        .attr({
          x: 20,
          y: 20,
          w: 300,
          h: 300
        });
    },
    onStoryOptionSelect = function(value) {
      console.log(nextScene);
      Crafty('StoryNode').each(function(){this.destroy();});
      if(value === '_storyend') {
        Crafty.unbind('StoryOptionSelect',onStoryOptionSelect);
        Crafty.enterScene(nextScene.name,nextScene.param);
      } else if(currentStory.nodes.hasOwnProperty(value)) {
        storyNodeFactory(currentStory.nodes[value]);
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
    
    Crafty.bind('StoryOptionSelect',onStoryOptionSelect);
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
    storyNodeFactory(currentStory.nodes[currentStory.initial]);
  };
})());
