/**
 * Helper function to fade out the scene
 * @param  {String} sceneName - Scene to transition to
 * @param  {Object} sceneParam - Parameters to pass to the new scene
 * @param  {Number} duration - duration of the fade (ms)
 * @param  {String} color - css coor value of the fader
 */
module.exports = function(sceneName,sceneParam,duration,color) {
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
    .tween({alpha:1.0},duration||250);
  fader.z = 1000;
};