Crafty.c('NavGauge', {

  init: function() {
    this.requires('2D, DOM')
      .attr({
        h: 5,
        alpha: 0.80
      })
      .css('border-radius','2px');

  },

  unitWidth: function(width) {
    this._unitWidth = width;
    return this;
  },

  value: function(val) {
    this._value = val;
    this.w = val * this._unitWidth;
    return this;
  },

  color: function(color) {
    this.css('background-color',color);
    return this;
  }

});