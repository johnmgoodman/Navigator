
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
  }

});
