Crafty.c('NavNodeText', {
    
  /**
   * Handler for NavNodeClick events. When the NavNode is clicked, displays the text
   * @param  {String} navNodeKey - The reference id (name) of the NavNode
   */
  _onNavNodeClick: function(navNodeKey) {
    if(navNodeKey === this._navNodeKey) {
      this.display();
    } else {
      if(this.visible) {
        this.visible = false;
      }
    }
  },
  
  init: function() {
    this.requires('2D, DOM, Text, Tween')
      .css({
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      })
      .textColor('#ffffff')
      .textFont({size:'10px',family:'monaco'})
      .bind('NavNodeActivate',this.destroy)
      .attr({
        w: 0,
        h: 0
      });
    this.visible = false;
    this._textLines = [];
  },
  

  /**
   * Method used to display the text.
   */
  display: function() {
    this.w = 0;
    this.visible = true;
    this.tween({w:this._width},250);
  },
  

  /**
   * Specify the width of the entity at full-width (after display() tweening)
   * @param  {Number} width
   * @return {NavNodeText}
   */
  width: function(width) {
    this._width = width;
    return this;
  },
  

  /**
   * Specify the NavNode name to listen for on NavNodeClick events
   * @param  {String} navNodeKey - 
   * @return {NavNodeText}
   */
  navNodeKey: function(navNodeKey) {
    this._navNodeKey = navNodeKey;
    this.bind('NavNodeClick', this._onNavNodeClick);
    return this;
  },
  

  /**
   * Add a line to the text. Lines are separated by <br /> elements.
   * @param {String} lineText - text to add
   */
  addLine: function(lineText) {
    this._textLines.push(lineText);
    this.h += 16;
    this.text(this._textLines.join('<br />'));
    return this;
  }
    
});
