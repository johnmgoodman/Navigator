Crafty.c('StoryNode',{

  /**
   * Wraps the specified HTML in a container element and inserts it into the entity DOM element
   * @param {String} html - the HTML to insert
   */
  _addHTML: function(html) {
    this.append('<div class="storynode htmlcontainer">'+html+'</div>');
  },
  

  /**
   * Handler for StoryNode Click events. If the target of the MouseEvent is a StoryNode optionbutton, relay the event as a StoryOptionSelect event.
   * @param  {MouseEvent} e - the click event
   */
  _onClick: function(e) {
    var target = e.target;
    if( target.className === 'storynode optionbutton' ) {
      Crafty.trigger('StoryOptionSelect',target.value);
    }
  },
  
  
  /**
   * 
   * 
   * 
   */
  _satisfiesOptionRequirements: (function() {
    var playerStatus,
      requirementTypes = {
        inventory: function(requirement) {
            var inv = playerStatus.inventory;
            if(typeof inv[requirement.name] === 'number') {
              if(inv[requirement.name] >= requirement.quantity) {
                return true;
              }
            }
            return false;
          }
          
      };
      
      
    return function(optionRequirements) {
      var requirement,
        reqIndex = 0,
        reqLength = optionRequirements.length;
        
      playerStatus = Crafty.Game.Player.status();
      
      for(;reqIndex < reqLength; reqIndex +=1) {
        requirement = optionRequirements[reqIndex];
        if(!requirementTypes[requirement.type](requirement)) {
          return false;
        }
      }
      return true;
    };
  })(),
  
    
  init: function() {
    this.requires('2D, DOM, HTML, Mouse')
      .bind('Click',this._onClick);
  },
  

  /**
   * Loads the StoryNode data.
   * @param  {Object} storyNodeData - the StoryNode data
   * @return {StoryNode}
   */
  nodeData: function(storyNodeData) {
    var optionIndex = 0, noptions,
      options = storyNodeData.options;
    
    this.addText(storyNodeData.text);
    
    
    if(storyNodeData.hasOwnProperty('effects')) {
      Crafty.trigger('PlayerEffects',storyNodeData.effects);
    }
      
    if(typeof options !== 'undefined') {
      noptions = options.length;
      while(optionIndex < noptions) {
        if(typeof options[optionIndex].requires === 'undefined' || this._satisfiesOptionRequirements(options[optionIndex].requires)) {
          this.addOption(options[optionIndex++]);
        }
      }
    } else {
      this.addOption({"text": "Continue", "node":"_storyend"});
    }
    return this;
  },
  

  /**
   * Wraps text in HTML and inserts it into the StoryNode DOM element
   * @param {String} text - the text for the StoryNode
   */
  addText: function(text) {
    this._addHTML('<p class="storynode text">'+text+'</p>');
    return this;
  },
  

  /**
   * Creates clickable button HTML based on optionData and inserts this into the StoryNode DOM element
   * @param {optionData} optionData - and object with a "node" property and a "text" property
   */
  addOption: function(optionData) {
    this._addHTML('<button class="storynode optionbutton" value="'+optionData.node+'">'+optionData.text+'</div>');
    return this;
  }
    
});
