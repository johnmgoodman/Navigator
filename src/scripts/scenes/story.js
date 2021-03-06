Crafty.defineScene('Story', (function() {
  
  var currentStory = null,
    nextScene = {},

    getStoriesByTags = function(tags) {
      var ntags, tagIndex, tag, result,
        stories = Crafty.Game.stories,
        storyKey,
        story,
        storyMatches = [],
        matchTags = function(storyTag) {
          return tags.indexOf(storyTag) !== -1;
        };

      if(typeof tags === 'undefined') {
        return storyMatches;
      } else if(typeof tags === 'string') {
        tags = [tags];
      }

      ntags = tags.length;

      for(storyKey in stories) {
        if(stories.hasOwnProperty(storyKey)) {
          story = stories[storyKey];
          if(story.repeat !== false && story.tags instanceof Array) {
            result = story.tags.filter(matchTags);
            if(result.length !== 0) {
              storyMatches.push(story);
            }
          }
        }
      }
      return storyMatches;

    },


    findStory = function(tags) {
      var foundStories = getStoriesByTags(tags),
        story,
        storyFound = false,
        foundStory = null;

        while(storyFound === false && foundStories.length !== 0) {
          story = foundStories.splice(Math.floor(Math.random() * foundStories.length),1)[0];
          // TODO: if player meets story requirements...
          storyFound = true;
          foundStory = story;
        }

        return foundStory;
    },


    /**
     * Simple factory function for creating StoryNodes
     * @param  {Object} storyData
     */
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


    /**
     * Handler for StoryOptionSelect events. Changes the StoryNode
     * @param  {[type]}
     * @return {[type]}
     */
    onStoryOptionSelect = function(value) {
      if(value === '_storyend') {
        Crafty.Game.helpers.scene_fadeout(nextScene.name,nextScene.param);
      } else if(currentStory.nodes.hasOwnProperty(value)) {
        storyNodeFactory(currentStory.nodes[value]);
      }
    },


    /**
     * Handler for SceneDestory events. Used to unbind the scene listeners
     */
    onSceneDestroy = function() {
      Crafty.unbind('SceneDestroy',onSceneDestroy);
      Crafty.unbind('StoryOptionSelect',onStoryOptionSelect);
    };
  return function(param) {
    if(param.hasOwnProperty('story')) {
      currentStory = Crafty.Game.stories[param.story];
    } else if(param.hasOwnProperty('tags')) {
      currentStory = findStory(param.tags);
      if(typeof currentStory.repeat === 'undefined') {
        currentStory.repeat = false;
      }
    }
    
    if(param.hasOwnProperty('sceneRelay')) {
      nextScene.name = param.sceneRelay.sceneName;
      nextScene.param = param.sceneRelay.sceneParam;
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
