
Crafty.c('Dialog', {

  init: function() {
    this.requires('2D, DOM')
      .bind('ViewportScroll',this.destroy);
  }

});
