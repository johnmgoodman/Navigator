Crafty.c('Player', { // The player and the ship are one.
  
  init: function() {
    
    this.requires('Persist');
    
    
    this._inventory = {};   // Storage
    this._resources = {};   // Active support (fuel, oxygen, water, etc)
    
    this._attributes = {};  // { "attr1Name": 57,
    this._modifiers = {};   //
  },
  
  apply: function(conf) {
    var procName, procItems, procItemName;
    for(procName in conf) {
      if(conf.hasOwnProperty(procName)) {
        procItems = conf[procName];
        for(procItemName in procItems) {
          if(procItems.hasOwnProperty(procItemName)) {
            this['_'+procName][procItemName] = this['_'+procName][procItemName] || 0 + procItems[procItemName];
          }
        }
      }
    }
    return this;
  }

});
