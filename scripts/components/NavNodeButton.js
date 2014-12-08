Crafty.c('NavNodeButton', {
  
  
    
  init: function() {
    this.requires('2D, DOM, Text, Mouse')
  },
  
  action: function(cb, context) {
    if(typeof context === 'undefined') {
      context = this;
    } else if(context === this) {
      this.bind('Click', cb);
    } else {
      this.bind('Click', function() { cb.call(context) });
    }
  }, 
  
  
  value: function(buttonText) {
    this.text = buttonText;
  }
  
  
});
