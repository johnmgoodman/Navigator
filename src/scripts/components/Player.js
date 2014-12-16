Crafty.c('Player', { // The player and the ship are one.
  
  _applyToInventory: function(name,amount) {
    var qty = (this._inventory[name] || 0) + amount ;
    this._inventory[name] = qty;
    return qty;
  },
  
  _onEnergyEffect: function(value) {
    if(this._applyToInventory(this._spacecraft.fuel.name, value - this._spacecraft.fuel.efficiency * value) < 0) {
      console.log('player dies');
    }
  },

  _onTimeEffect: function(value) {
    var nindex = 0,
    countN = this._lifeform.nourishment.length,
    currentN;

    for(;nindex < countN; nindex += 1) {
      currentN = this._lifeform.nourishment[nindex];
      if(this._applyToInventory(currentN.name,currentN.proportion * value) < 0) {
        console.log('player dies');
      }
    }
  },

  _onHullEffect: function(value) {
    var hullIndex = this._spacecraft.hull.length,
      currentH,
      currentCond;
    while(value !== 0) {
      if(hullIndex === 0) {
        console.log('player dies');
        break;
      }
      currentH = this._spacecraft.hull[--hullIndex];
      currentCond = currentH.condition + value;
      if(currentCond < 0) {
        value = currentCond;
        currentCond = 0;
      } else if(currentCond > currentH['max condition']) {
        currentCond = currentH['max condition'];
      }
      currentH.condition = currentCond;
    }

  },

  _onPlayerEffects: function(effects) {
    var effectIndex = 0,
      effectCount = effects.length,
      currentEffect,
      actions = {
        "condition": "_onHullEffect",
        "energy": "_onEnergyEffect",
        "time": "_onEnergyEffect"
      };

    for (; effectIndex < effectCount; effectIndex++) {
      currentEffect = effects[effectIndex];
      if(currentEffect.effect === "condition") {
        this._onHullEffect(currentEffect.value);
      } else if(currentEffect.effect === "energy") {
        console.log(this);
        this._onEnergyEffect(currentEffect.value);
      } else if(currentEffect.effect === "time") {
        this._onTimeEffect(currentEffect.value);
      }
    }
  },

  init: function() {
    
    this.requires('Persist');
    
    
    this._inventory = {};   // Storage
    this._modifiers = {};   //

    this.bind('PlayerEffects', this._onPlayerEffects);

  },
  
  lifeform: function(lifeformData) {
    this._lifeform = Crafty.Game.lifeforms[lifeformData];
    return this;
  },
  
  spacecraft: function(spacecraftData) {
    this._spacecraft = Crafty.Game.spacecrafts[spacecraftData];
    return this;
  },

  inventory: function(inventoryData) {
    this._inventory = inventoryData;
    return this;
  }

});
