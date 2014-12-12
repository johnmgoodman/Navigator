Crafty.c('SceneTransition', {  
    
  _endScene: function(sceneData) {
    Crafty.enterScene(sceneData.name,sceneData.param);
  },
  
  _onOutEvent: function(sceneData) {
    var procedure;
    console.log('onoutevent');
    if(this._outProcedures.length > 0) {
      this.one('TransitionProcedureResponse',this._onOutEvent);
      this._outProcedures.splice(0,1)[0](sceneData);
    } else {
      this._endScene(sceneData);
    }
  },
    
  init: function() {
    this._outProcedures = [];
  },
  
  
  
  addOutProcedure: function(procedure) {
    this._outProcedures.push(procedure);
    return this;
  },
  
  registerOut: function(eventName) {
    this.one(eventName,this._onOutEvent);
    return this;
  }
});
