Crafty.c('DialogText',{

    init: function() {
      this.requires('2D, DOM, Text')
        .bind('NewDialog',this.destroy);
    }
    
});
