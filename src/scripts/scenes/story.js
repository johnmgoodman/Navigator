Crafty.defineScene('Story', (function() {
  
  var currentStory = null,
    nextScene = {},
    storyNodeFactory = function(storyData) {
      Crafty.e('StoryNode')
        .attr({
          x: 20,
          y: 20,
          w: window.innerWidth - 40,
          h: window.innerHeight - 40
        })
        .nodeData(storyData);
    },
    onStoryOptionSelect = function(value) {
      if(value === '_storyend') {
        Crafty.Game.helpers.scene_fadeout(nextScene.name,nextScene.param);
      } else if(currentStory.nodes.hasOwnProperty(value)) {
        storyNodeFactory(currentStory.nodes[value]);
      }
    },
    onSceneDestroy = function() {
      Crafty.unbind('SceneDestroy',onSceneDestroy);
      Crafty.unbind('StoryOptionSelect',onStoryOptionSelect);
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
    
    Crafty.bind('SceneDestroy',onSceneDestroy);
    Crafty.bind('StoryOptionSelect',onStoryOptionSelect);
    
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
    Crafty.viewport.mouselook(false);
    Crafty.viewport.clampToEntities = false;
    Crafty.viewport.reload();
    storyNodeFactory(currentStory.nodes[currentStory.initial]);
  };
})());
