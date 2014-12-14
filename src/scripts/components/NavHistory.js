Crafty.c('NavHistory', {

  _onNavNodeActivate: function(node) {
    this._history.push(this._param);
  },
  
  _onSceneDestroy: function() {
    Crafty.Game.Player.navHistory = this._history;
  },

  _onNavBack: function() {
    Crafty.Game.helpers.scene_fadeout('Navigation',this._history.pop());
  },

  init: function() {
    this.bind('NavBack', this._onNavBack);
    this.bind('NavNodeActivate', this._onNavNodeActivate);
    this.bind('SceneDestroy', this._onSceneDestroy);
    this._history = Crafty.Game.Player.navHistory || [];
  },

  loadParam: function(param) {
    this._param = param;
    return this;
  }, 

  history: function() {
    return this._history;
  }

});