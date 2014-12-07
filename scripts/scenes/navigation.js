Crafty.defineScene('Navigation', (function() {
    
    
  /**
   *  Creates a NavNode entity based on the supplied
   *  data.
   *
   *  @private
   *  @param {object} nodeData - Objected describing desired NavNode.
   *  @return {NavNode} The new NavNode
   */
   
  var navNodeFactory = function(nodeData) {
    if(typeof nodeData === 'string') {
      nodeData = JSON.parse(nodeData);
    }
    return Crafty.e('NavNode')
      .attr(nodeData.attr)
  };
  
  
  
  
  return function(sceneData) {
  };
})());
