Crafty.c('DOMEventDelegator', {
  
  _DOMEventCallback: function(e) {
    Crafty.trigger('DOMEvent',e);
  },
  
  _onDOMEvent: function(e) {
    try {
      this.listeners[e.type].map(function(cb) { cb(e); });
    } catch(error) {
      
    }
  },
    
  _onSceneDestroy: function() {
    var listeners = this._listeners,
      eventType;
    
    for(eventType in listeners) {
      if(listeners.hasOwnProperty(eventType)) {
        window.removeEventListener(eventType,this._DOMEventCallback);
      }
    }
  },
    
  init: function() {
    this.listeners = {};
    this.bind('SceneDestroy',this._onSceneDestroy);
    this.bind('DOMEvent',this._onDOMEvent);
  },
  
  addListener: function(eventType,callback) {
    try {
      this.listeners[eventType].push(callback);
    } catch(e) {
      this.listeners[eventType] = [callback];
      window.addEventListener(eventType,this._DOMEventCallback,false);
    }
  },
  
  removeListener: function(eventType,callback) {
    var callbacks, cbIndex;
    if(this.listeners.hasOwnProperty(eventType)) {
      callbacks = this.listeners;
      cbIndex = callbacks.indexOf(callback);
      if(cbIndex !== -1) {
        callbacks.splice(cbIndex,1);
      }
      if(callbacks.length === 0) {
        window.removeEventListener(eventType,this._DOMEventCallback);
        delete this.listeners[eventType];
      }
    }
  }
    
});
