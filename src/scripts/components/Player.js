Crafty.c('Player', { // The player and the ship are one.
  
  _onEnergyEffect: function(value) {
    if(this._expend(this._spacecraft.fuel.name, value - this._spacecraft.fuel.efficiency * value) < 0) {
      //player dies
    }
  },

  _onPlayerEffects: function(effects) {
    
  },
  
  _expend: function(name,amount) {
    
  },

  init: function() {
    
    this.requires('Persist');
    
    
    this._inventory = {};   // Storage
    this._modifiers = {};   //

    this.bind('PlayerEffects', this._onPlayerEffects);

  },
  
  lifeform: function(lifeformData) {
    this._lifeform = lifeformData;
    return this;
  },
  
  spacecraft: function(spacecraftData) {
    this._spacecraft = spacecraftData;
    return this;
  }

});
