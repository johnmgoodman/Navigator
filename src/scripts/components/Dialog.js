
Crafty.c('Dialog', {

  init: function() {
    Crafty.trigger('NewDialog');
    this.requires('2D, DOM')
      .css({
        borderTopLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        border: '2px outset #aaaaaa'
      })
      .bind('ViewportScroll',this.destroy)
      .bind('NewDialog',this.destroy);
  },
  
  
  title: function(dialogTitle) {
    this._title = Crafty.e('DialogText')
      .attr({
        x: this.x + 10,
        y: this.y + 10,
        h: 16,
        w: this.w - 20
      })
      .text(dialogTitle);
  }

});
