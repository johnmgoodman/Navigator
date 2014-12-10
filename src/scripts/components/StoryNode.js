Crafty.c('StoryNode',{
  _addHTML: function(html) {
    this.append('<div class="storynode htmlcontainer">'+html+'</div>');
  },
    
  init: function() {
    this.requires('HTML');
  },
  
  nodeData: function(storyNodeData) {
    var optionIndex = 0, noptions,
      options = storyNodeData.options;
    
    this.addText(storyNodeData.text);
    
    
    //TODO: apply effects
      
    if(typeof options !== 'undefined') {
      noptions = options.length;
      while(optionIndex < noptions) {
        this.addOption(options[optionIndex++]);
      }
    } else {
      this.addOption({"text": "Continue", "node":""});
    }
    return this;
  },
  
  addText: function(text) {
    this._addHTML('<p class="storynode text">'+text+'</p>');
    return this;
  },
  
  addOption: function(optionData) {
    this._addHTML('<button class="storynode optionbutton" onclick="Crafty.trigger(\'StoryOptionSubmit\',\''+optionData.node+'\')">'+optionData.text+'</div>');
    return this;
  }
    
});
