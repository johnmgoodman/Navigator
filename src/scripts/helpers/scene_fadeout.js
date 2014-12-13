module.exports = function(sceneName,sceneParam,duration,color) {
  fadeConfig = fadeConfig || {};
  var fader = Crafty.e('2D, DOM, Tween')
    .attr({
      alpha: 0.0,
      x: Math.abs(Crafty.viewport.x),
      y: Math.abs(Crafty.viewport.y),
      w: Crafty.viewport.width,
      h: Crafty.viewport.height
    })
    .css('background-color',color||'black')
    .one('TweenEnd',function() {
      Crafty.enterScene(sceneName,sceneParam);
    })
    .tween({alpha:1.0},duration||500);
  fader.z = 1000;
};