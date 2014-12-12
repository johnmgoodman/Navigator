Crafty.defineScene('Story', (function() {
  
  var currentStory = null,
    nextScene = {},
    storyNodeFactory = function(storyData) {
      Crafty.e('StoryNode')
        .nodeData(storyData)
        .attr({
          x: 20,
          y: 20,
          w: window.innerWidth - 40,
          h: window.innerHeight - 40
        });
    },
    onStoryOptionSelect = function(value) {
      if(value === '_storyend') {
        Crafty.enterScene(nextScene.name,nextScene.param);
      } else if(currentStory.nodes.hasOwnProperty(value)) {
        storyNodeFactory(currentStory.nodes[value]);
      }
    },
    onSceneDestroy = function() {
      Crafty.unbind('SceneDestroy',onSceneDestroy);
      Crafty.unbind('StoryOptionSelected',onStoryOptionSelect);
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
    
    
    Crafty.e('SceneTransition')
      .registerOut('NavNodeActivate')
      .addOutProcedure(function(sceneData) {
        Crafty.e('2D, DOM, Tween, Persist')
          .attr({
            alpha: 0.0,
            x: 0,
            y: 0,
            w: sceneNode.width,
            h: sceneNode.height
          })
          .css('background-color','black')
          .one('TweenEnd',function() {
            Crafty.trigger('TransitionProcedureResponse',sceneData);
            this.one('TweenEnd', this.destroy)
            .tween({alpha:0.0},500);
            
          })
          .tween({alpha:1.0},500)
          .z = 1000;
      });
    
    
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
    Crafty.viewport.mouselook(false);
    Crafty.viewport.clampToEntities = false;
    Crafty.viewport.reload();
    storyNodeFactory(currentStory.nodes[currentStory.initial]);
  };
})());
