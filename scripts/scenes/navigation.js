Crafty.defineScene('Navigation', (function() {
    
    
  /**
   *  Creates a NavNode entity based on the supplied
   *  data.
   *
   *  @private
   *  @param {Object} nodeData - Object describing desired NavNode.
   *  @return {NavNode} The new NavNode
   */
   
  var navNodeFactory = function(nodeData) {
    var node;
    
    if(typeof nodeData === 'string') {
      nodeData = JSON.parse(nodeData);
    }
    
    
    node = Crafty.e('NavNode')
      .attr(nodeData.attr)
    
    if(typeof nodeData.image !== 'undefined') {
      node.css('background','url('+nodeData.image+') center');
    }
      
    return node;
  },
  
  
  
  /**
   *  Creates NavNodes from an array of NavNode data.
   *
   *  @private
   *  @param {Array} nodesData - Array of NavNode data
   *  @return {NavNode} Array of the new NavNodes
   */
  createNavNodes = function(nodesData) {
    var nodesCount = nodesData.length,
      nodeIndex = 0,
      nodes = [];
      
    for(;nodeIndex < nodesCount; nodeIndex+=1) {
      nodes[nodeIndex] = navNodeFactory(nodesData[nodeIndex]);
    }
    
    return nodes;
  }
  
  return function(sceneData) {
    
    var background = Crafty.e('Outerspace')
      .attr({
        w: sceneData.width,
        h: sceneData.height,
        x: 0,
        y: 0
      });
    
    Crafty.e('ParallaxLayer')
      .attr({w:900,h:500})
      .css('background-image','url(assets/images/stars_0_900x900.png)')
      .parallax(
        {x:0,y:0},
        {x:background.w-Crafty.viewport.width,y:background.h-Crafty.viewport.height}
      );
    
    Crafty.e('ParallaxLayer')
      .attr({w:1000,h:600})
      .origin('center')
      .css('background-image','url(assets/images/stars_0_900x900.png)')
      .parallax(
        {x:0,y:0},
        {x:background.w-Crafty.viewport.width,y:background.h-Crafty.viewport.height}
      ).rotation = 180;
      
    if(sceneData.nodes instanceof Array) {
      createNavNodes(sceneData.nodes);
    }
    
    Crafty.viewport.clampToEntities = true;
    Crafty.viewport.x = sceneData.viewport.x;
    Crafty.viewport.y = sceneData.viewport.y;
    Crafty.viewport.mouselook(true);
  };
})());
