Crafty.c('NavNode', {

  _createDialog: function() {
    var dwidth = Crafty.viewport.width * (3/4);
    console.log(dwidth);
    Crafty.e('Dialog')
      .attr({
        x: -1 * Crafty.viewport.x + Math.round((Crafty.viewport.width - dwidth) / 2),
        y: -1 * Crafty.viewport.y + 15,
        w: Math.round(dwidth),
        h: Math.round(Crafty.viewport.height / 3)
      })
      .css('background-color', '#009966');
  },
    
  init: function() {
    this.requires('2D, DOM, Mouse')
      .css('cursor', 'pointer')
      .bind('Click',this._createDialog);
  }
  
});
