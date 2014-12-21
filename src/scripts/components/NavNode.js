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
          return function() {
            Crafty.trigger('NavNodeActivate',self);
            Crafty.trigger('PlayerEffects',[
                {effect: "energy", value: self._distance * -100},
                {effect: "time", value: self._distance * -34}
              ]);
          };
        })(this),
        this
      );
    }
  },
  
  _createText: function() {
    if(typeof this._titleEntity === 'undefined') {
      this._titleEntity = Crafty.e('NavNodeText')
        .navNodeKey(this._key)
        .width(this.w +32)
        .attr({
          x: this.x,
          y: this.y + this.h - 8
        });
      if(this.hasOwnProperty('_title')) {
        this._titleEntity.addLine('<span class="nodeinfo title">'+this._title+'</span>');
      }
      if(this.hasOwnProperty('_distance')) {
        this._titleEntity.addLine("<span class=\"nodeinfo distance\">dist "+this._distance+"Mly</span>");
      }
      this._titleEntity.display();
    }
  },
  
  _onClick: function(e) {
    Crafty.trigger('NavNodeClick',this._key);
    this._createText();
    this._createButton();
  },
    
  init: function() {
    this.requires('2D, DOM, Mouse')
      .css('cursor', 'pointer')
      .bind('Click',this._onClick);
  },
  
  target: function(sceneName,param) {
    this._target = {
      sceneName: sceneName,
      param: param
    };
    return this;
  },
  
  story: function(storyId) {
    if(typeof storyId === 'undefined') return this._story;
    this._story = storyId;
  },
  
  key: function(navNodeKey) {
    if(typeof navNodeKey === 'undefined') return this._key;
    this._key = navNodeKey;
    return this;
  },
  
  distance: function(dist) {
    if(typeof dist === 'undefined') return this._distance;
    this._distance = dist;
    return this;
  },
  
  title: function(titleText) {
    if(typeof titleText === 'undefined') return this._title;
    this._title = titleText;
    return this;
  }
  
});
