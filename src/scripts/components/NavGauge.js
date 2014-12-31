Crafty.c('NavGauge', {

  init: function() {
    this.requires('2D, DOM')
      .attr({
        h: 5,
        alpha: 0.80
      })
      .css('border-radius','2px');

  },
  
  /**
   * Specify the name of the gauge
   * @param  {String} gaugeName
   * @return {NavGauge}
   */
  name: function(gaugeName) {
    this._name = gaugeName;
    return this;
  },

  /**
   * Specify width in pixels for every 1 unit value
   * @param  {Number} width - width per value
   * @return {NavGauge}
   */
  unitWidth: function(width) {
    this._unitWidth = width;
    return this;
  },


  /**
   * Specify the gauge value and apply this to the width
   * @param  {Number} val - the value
   * @return {NavGauge}
   */
  value: function(val) {
    this._value = val;
    this.w = val * this._unitWidth;
    return this;
  },


  /**
   * Set the color of the gauge
   * @param  {String} color - the css color value
   * @return {NavGauge}
   */
  color: function(color) {
    this.css('background-color',color);
    return this;
  }

});