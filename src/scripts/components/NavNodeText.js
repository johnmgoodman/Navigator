Crafty.c('NavNodeText', {
    
  _onEnterFrame: function() {
    if(this.w < this._width) {
      this.w += 5;
    } else {
      this.w = this._width;
      this.unbind('EnterFrame',this._onEnterFrame);
    }
  },
    
  _onNavNodeClick: function(navNodeKey) {
    if(navNodeKey === this._navNodeKey) {
      this.w = 0;
      this.visible = true;
      this.bind('EnterFrame',this._onEnterFrame);
    } else {
      if(this.visible) {
        this.visible = false;
        this.unbind('EnterFrame',this._onEnterFrame);
      }
    }
  },
  
  init: function() {
    this.requires('2D, DOM, Text')
      .css({
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      })
      .textColor('#ffffff')
      .textFont({size:'10px',family:'monaco'})
      .bind('SceneTransition',this.destroy)
      .attr({
        w: 0,
        h: 0
      });
    this.visible = false;
    this._textLines = [];
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
    this.h += 12;
    this.text(this._textLines.join('<br />'));
    return this;
  }
    
});
