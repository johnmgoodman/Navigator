Crafty.defineScene('Story', (function() {
  
  var currentStory = null,
    storyNodeFactory = function(storyData) {
      Crafty.e('StoryNode')
        .nodeData(storyData)
        .attr({
          x: 20,
          y: 20,
          w: 300,
          h: 300
        });
    };
    
  Crafty.bind('StoryOptionSubmit',function(v) {
    console.log('Value: ' + v);
  });
    
  return function(param) {
    if(typeof param.story !== 'undefined') {
      currentStory = Crafty.Game.stories[param.story];
    } else {
      // TEMPORARY. this is the only story
      currentStory = Crafty.Game.stories.spaceworm;
    }
    
    storyNodeFactory(currentStory.nodes[currentStory.initial]);
  };
})());
