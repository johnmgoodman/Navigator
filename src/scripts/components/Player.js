Crafty.c('Player', { // The player and the ship are one.
  
  /**
   * Affect Player inventory quantity for a particular item. If the item doesn't already exist, it will be created with a quantity of 0 before applying the amount.
   * @param  {String} name - Item reference id
   * @param  {Float|Integer} amount - number to add to the current quantity (can be negative) 
   * @return {Float|Integer} New quantity for the item (can be negative)
   */
  _applyToInventory: function(name,amount) {
    var prevQty = this._inventory[name] || 0,
      qty = prevQty + (amount||0);
    this._inventory[name] = qty;
    console.log(this._inventory);
    Crafty.trigger('PlayerInventoryChanged',{
      name: name,
      quantity: qty,
      previousQuantity: prevQty
    });
    return qty;
  },

  /** Handle fuel ("energy") effects */
  _onEnergyEffect: function(value) {
    if(this._applyToInventory(this._spacecraft.fuel.name, value - this._spacecraft.fuel.efficiency * value) < 0) {
      Crafty.trigger('PlayerDeath', {cause: "Your "+this._spacecraft.fuel.name+" has depleted."});
      console.log(value);
    }
  },

  /** Handle nourishment ("time") effects */
  _onTimeEffect: function(value) {
    var nindex = 0,
    countN = this._lifeform.nourishment.length,
    currentN;

    for(;nindex < countN; nindex += 1) {
      currentN = this._lifeform.nourishment[nindex];
      if(this._applyToInventory(currentN.name,currentN.proportion * value) < 0) {
        Crafty.trigger('PlayerDeath', {cause: "Your "+currentN.name+" has depleted."});
      }
    }
  },

  /** Handle hull ("condition") effects */
  _onHullEffect: function(value) {
    var hullIndex, hullLength = this._spacecraft.hull.length,
      currentH, prevCond,
      currentCond,
      iter = Math.sign(value);
      
    if(iter === 1) {
      hullIndex = 0;
    } else if(iter === -1) {
      hullIndex = hullLength - 1;
    } else {
      return null;
    }
      
      
    while(value !== 0) {
      
      currentH = this._spacecraft.hull[hullIndex];
      prevCondition = currentH.condition;
      currentH.condition += value;
      value = 0;
      
      
      /* Carry over effects to next hull item */
      if( currentH.condition > currentH['max condition']) {
        value = currentH.condition - currentH['max condition'];
        currentH.condition = currentH['max condition'];
      } else if(currentH.condition < 0 && iter === -1) {
        value = currentH.condition;
        currentH.condition = 0;
      }
      
      
      if(hullIndex === 0 && value !== 0) {
        value = 0;
        Crafty.trigger('PlayerDeath', {cause: "Your ship has been destroyed"});
      }
      
      Crafty.trigger('PlayerHullChanged', {
        name: currentH.name,
        condition: currentCond,
        prevCondition: prevCond
      });
      
      hullIndex += iter;
    }

  },



  /**
   * Handler for PlayerEffects event. Currently recognizes
   *  "condition" effects - affects hull
   *  "energy" - affects fuel
   *  "time" - affects nourishment
   * @param  {Array} effects - array of effects
   */
  _onPlayerEffects: function(effects) {
    var effectIndex = 0,
      effectCount = effects.length,
      currentEffect,
      actions = {
        "condition": "_onHullEffect",
        "energy": "_onEnergyEffect",
        "time": "_onTimeEffect"
      };

    for (; effectIndex < effectCount; effectIndex++) {
      currentEffect = effects[effectIndex];
      if(currentEffect.effect === "condition") {
        this._onHullEffect(currentEffect.value);
      } else if(currentEffect.effect === "energy") {
        this._onEnergyEffect(currentEffect.value);
      } else if(currentEffect.effect === "time") {
        this._onTimeEffect(currentEffect.value);
      } else if(currentEffect.effect === "inventory") {
        this._applyToInventory(currentEffect.item,currentEffect.value);
      }
    }
  },


  /**
   * Handler for PlayerDeath events
   * @param  {Object} Details regarding the Player death
   */
  _onPlayerDeath: function(deathDetails) {
    console.log(deathDetails.cause);
  },

  init: function() {
    
    this.requires('Persist');
    
    
    this._inventory = {};   // Storage
    this._modifiers = {};

    this.bind('PlayerEffects', this._onPlayerEffects);
    this.bind('PlayerDeath', this._onPlayerDeath);

  },
  

  /**
   * Specify player lifeform data
   * @param  {Object} lifeform data
   * @return {Player}
   */
  lifeform: function(lifeformData) {
    this._lifeform = Crafty.Game.lifeforms[lifeformData];
    return this;
  },
  

  /**
   * Specify player spacecraft
   * @param  {Object} spacecraft data
   * @return {Player}
   */
  spacecraft: function(spacecraftData) {
    this._spacecraft = Crafty.Game.spacecrafts[spacecraftData];
    return this;
  },


  /**
   * Specify player inventory data
   * @param  {Object} inventory data
   * @return {Player}
   */
  inventory: function(inventoryData) {
    this._inventory = inventoryData;
    return this;
  },


  /**
   * Provide hull, fuel, nourishment and inventory information about the player
   * @return {Object} Player status
   */
  status: function() {
    var self = this;
    return {
      fuel: {
          name: this._spacecraft.fuel.name,
          quantity: this._inventory[this._spacecraft.fuel.name] || 0
        },
      nourishment: this._lifeform.nourishment.map(function(nItem) {
          return {
            name: nItem.name,
            quantity: self._inventory[nItem.name] || 0
          };
        }),
      hull: this._spacecraft.hull.map(function(hullItem) {
          return {
            name: hullItem.name,
            condition: hullItem.condition
          };
        }),
      inventory: (function() {
          var inv = {}, itemName;
          for(itemName in self._inventory) {
            if(self._inventory.hasOwnProperty(itemName)) {
              inv[itemName] = self._inventory[itemName];
            }
          }
          return inv;
        })()
    };
  }

});
