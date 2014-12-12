module.exports = function(sceneName,sceneParam,fadeConfig) {
  fadeConfig = fadeConfig || {};
  var fader = Crafty.e('2D, DOM, Tween, Persist')
    .attr({
      alpha: 0.0,
      x: fadeConfig.x1 || 0,
      y: fadeConfig.y1 || 0,
      w: fadeConfig.w1 || Crafty.viewport.width,
      h: fadeConfig.h1 || Crafty.viewport.height
    })
    .css('background-color','white')
    .one('TweenEnd',function() {
      this.one('TweenEnd', this.destroy)
      .tween({alpha:0.0},500);
      Crafty.enterScene(sceneName,sceneParam);
      
    })
    .tween({alpha:1.0},500);
  fader.z = 1000;
};
