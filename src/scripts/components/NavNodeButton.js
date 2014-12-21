Crafty.c('NavNodeButton', {
  
  _text: function(buttonText) {
    this._element.innerHTML = buttonText;
  },
    
  init: function() {
    this.requires('2D, DOM, Mouse')
      .bind('NavNodeClick',this.destroy)
      .bind('NavNodeActivate',this.destroy)
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
  

  /**
   * Specify text to appear inside the button
   * @param  {String} buttonText - The text to display inside the button
   * @return {NavNodeButton}
   */
  text: function(buttonText) {
    this._text(buttonText);
    return this;
  },
  

  /**
   * Provide a callback function for the button on click
   * @param  {Function} cb - the function to exectue
   * @param  {Object} [context] - an execution context for the callback function
   * @return {NavNodeButton}
   */
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
