Crafty.c('NavNodeText', {
    
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
  
  display: function() {
    this.w = 0;
    this.visible = true;
    this.tween({w:this._width},250);
  },
  
  width: function(width) {
    this._width = width;
    return this;
  },
  
  navNodeKey: function(navNodeKey) {
    this._navNodeKey = navNodeKey;
    this.bind('NavNodeClick', this._onNavNodeClick);
    return this;
  },
  
  addLine: function(lineText) {
    this._textLines.push(lineText);
    this.h += 16;
    this.text(this._textLines.join('<br />'));
    return this;
  }
    
});
