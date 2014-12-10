Crafty.c('NavNode', {

  _createButton: function() {
    Crafty.e('NavNodeButton')
      .attr({
        x: this.x + this.w + 10,
        y: this.y,
        w: 32,
        h: 26
      })
      .css({backgroundColor: '#008800'})
      .text('Go');
  },
  
  _onClick: function(e) {
    Crafty.trigger('NavNodeClick',this);
    this._createButton();
  },
    
  init: function() {
    this.requires('2D, DOM, Mouse')
      .css('cursor', 'pointer')
      .bind('Click',this._onClick);
  },
  
  title: function(titleText) {
    var self = this;
    if(typeof this._titleEntity === 'undefined') {
      this._titleEntity = Crafty.e('2D, DOM, Text')
        .css({
          textAlign: 'center'
        })
        .unselectable()
        .textColor('#ffffff')
        .textFont({size:'10px',family:'monaco'})
        .attr({
          x: this.x,
          y: this.y + this.h - 8,
          w: this.w,
          h: 12
        })
        .bind('ViewportScroll',function(){this.visible=false;})
        .bind('NavNodeClick',function(navNode) {
          if(navNode === self) {
            this.visible = true;
          } else {
            this.visible = false;
          }
        });
        
      this._titleEntity.visible = false;
    }
    
    this._titleEntity.text(titleText);
    
    return this;
  }
  
});