Crafty.c('ParallaxLayer', {
  
  _onViewportScroll: function() {
     var maxX = this._viewportMax.x + Crafty.viewport.width - this.w,
      minX = this._viewportMin.x,
      xDist = maxX - minX,
      x = -1 * xDist * Crafty.viewport.x / this._viewportDist.x,
      
      maxY = this._viewportMax.y + Crafty.viewport.height - this.h,
      minY = this._viewportMin.y,
      yDist = maxY - minY,
      y = -1 * yDist * Crafty.viewport.y / this._viewportDist.y;
      
      if(x <= minX) {
        this.x = minX;
      } else if(x >= maxX) {
        this.x = maxX;
      } else {
        this.x = x;
      }
      
      if(y <= minY) {
        this.y = minY;
      } else if(y >= maxY) {
        this.y = maxY;
      } else {
        this.y = y;
      }
  },
    
  init: function() {
    this.requires('2D, DOM');
  },
  
  parallax: function(viewportMin,viewportMax) {
    this._viewportMax = viewportMax;
    this._viewportMin = viewportMin;
    this._viewportDist = {
      x: viewportMax.x - viewportMin.x,
      y: viewportMax.y - viewportMin.y
    };
    
    this.bind('ViewportScroll', this._onViewportScroll);
    return this;
  }
    
});
