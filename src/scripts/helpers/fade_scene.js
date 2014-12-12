module.exports = function(sceneName,sceneParam,fadeConfig) {
  fadeConfig = fadeConfig || {};
  var fader = Crafty.e('2D, DOM, Tween, Persist')
    .attr({
      alpha: 0.0,
      x: Math.abs(Crafty.viewport.x),
      y: Math.abs(Crafty.viewport.y),
      w: Crafty.viewport.width,
      h: Crafty.viewport.height
    })
    .css('background-color','white')
    .one('TweenEnd',function() {
      this.one('TweenEnd', this.destroy)
      .attr({
        x: Math.abs(Crafty.viewport.x),
        y: Math.abs(Crafty.viewport.y),
        w: Crafty.viewport.width,
        h: Crafty.viewport.height
      })
      .tween({alpha:0.0},500);
      Crafty.enterScene(sceneName,sceneParam);
      
    })
    .tween({alpha:1.0},500);
  fader.z = 1000;
};