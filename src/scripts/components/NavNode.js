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
        (function(self) {
          var sceneName, sceneParam;
          if(typeof self._story === 'undefined') {
            sceneName = self._target.sceneName;
            sceneParam = self._target.params;
          } else {
            sceneName = 'Story';
            sceneParam = {
              story: self._story,
              sceneRelay: {
                name: self._target.sceneName,
                param: self._target.params
              }
            };
          }
          return function() {
            Crafty.trigger('NavNodeActivate',{scene: sceneName, param: sceneParam});
          };
        })(this),
        this
      );
    }
  },
  
  _onClick: function(e) {
    Crafty.trigger('NavNodeClick',this._key);
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
    return this;
  },
  
  story: function(storyId) {
    this._story = storyId;
  },
  
  key: function(navNodeKey) {
    this._key = navNodeKey;
    return this;
  },
  
  title: function(titleText) {
    if(typeof this._titleEntity === 'undefined') {
      this._titleEntity = Crafty.e('NavNodeText') // TODO: Store data and move entity creation to NavNode::_onClick
        .navNodeKey(this._key)
        .width(this.w +32)
        .addLine(titleText)
        .attr({
          x: this.x,
          y: this.y + this.h - 8
        });
    }
    return this;
  }
  
});
