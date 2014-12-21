Crafty.c('NavHistory', {

  /**
   * Handler for NavNodeActivate event. When a NavNode is activated, add the current scene parameters to the history.
   * @param  {NavNode} node - the NavNode
   */
  _onNavNodeActivate: function(node) {
    this._history.push(this._param);
  },
  

  /**
   * Handler for SceneDestroy events. Before a scene is destroyed, update the Player's navigation history
   */
  _onSceneDestroy: function() {
    Crafty.Game.Player.navHistory = this._history;
  },


  /**
   * Handler for NavBack events. Changes to the 'Navigation' with params from the top of the history stack
   */
  _onNavBack: function() {
    Crafty.Game.helpers.scene_fadeout('Navigation',this._history.pop());
  },

  init: function() {
    this.bind('NavBack', this._onNavBack);
    this.bind('NavNodeActivate', this._onNavNodeActivate);
    this.bind('SceneDestroy', this._onSceneDestroy);
    this._history = Crafty.Game.Player.navHistory || [];
  },


  /**
   * Loads scene parameters into the entity but doesn't add them to the history until a NavNode is activated.
   * 
   * @param  {Object} param - Parameters for the current navigation scene
   * @return {NavHistory}
   */
  loadParam: function(param) {
    this._param = param;
    return this;
  }, 


  /**
   * Return the history stack
   * @return {Array}
   */
  history: function() {
    return this._history;
  }

});