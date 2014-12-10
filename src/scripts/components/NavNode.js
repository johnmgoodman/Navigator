Crafty.c('NavNode', {

  _createButton: function() {
    var goButton = Crafty.e('NavNodeButton')
      .attr({
        x: this.x + this.w + 10,
        y: this.y,
        w: 32,
        h: 26
      })
      .css({backgroundColor: '#008800'})
      .text('Go');
      
    if(typeof this._target !== 'undefined') {
      goButton.action(
        function() {Crafty.enterScene(this._target.sceneName,this._target.params);},
        this
      );
    }
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
  
  target: function(sceneName,params) {
    this._target = {
      sceneName: sceneName,
      params: params
    };
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
