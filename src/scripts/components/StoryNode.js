Crafty.c('StoryNode',{
  _addHTML: function(html) {
    this.append('<div class="storynode htmlcontainer">'+html+'</div>');
  },
  
  _onClick: function(e) {
    var target = e.target;
    if( target.className === 'storynode optionbutton' ) {
      Crafty.trigger('StoryOptionSelect',target.value);
    }
  },
    
  init: function() {
    this.requires('HTML, Mouse')
      .bind('Click',this._onClick);
  },
  
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
        this.addOption(options[optionIndex++]);
      }
    } else {
      this.addOption({"text": "Continue", "node":"_storyend"});
    }
    return this;
  },
  
  addText: function(text) {
    this._addHTML('<p class="storynode text">'+text+'</p>');
    return this;
  },
  
  addOption: function(optionData) {
    this._addHTML('<button class="storynode optionbutton" value="'+optionData.node+'">'+optionData.text+'</div>');
    return this;
  }
    
});
