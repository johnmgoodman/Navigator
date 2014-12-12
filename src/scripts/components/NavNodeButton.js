Crafty.c('NavNodeButton', {
  
  _text: function(buttonText) {
    this._element.innerHTML = buttonText;
  },
    
  init: function() {
    this.requires('2D, DOM, Mouse')
      .bind('NavNodeClick',this.destroy)
      .bind('SceneTransition',this.destroy)
      .css({
        textAlign: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        border: '1px solid #ffffff',
        borderRadius: '6px',
        fontSize: '12px',
        lineHeight: '26px',
        color: '#ffffff',
        fontFamily: 'monaco'
      });
  },
  
  text: function(buttonText) {
    this._text(buttonText);
    return this;
  },
  
  action: function(cb, context) {
    if(typeof context === 'undefined') {
      context = this;
    } else if(context === this) {
      this.bind('Click', cb);
    } else {
      this.bind('Click', function() { cb.call(context); });
    }
    return this;
  }
  
  
});
