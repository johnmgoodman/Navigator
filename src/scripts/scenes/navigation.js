Crafty.defineScene('Navigation', (function() {
    
    
  /**
   *  Creates a NavNode entity based on the supplied
   *  data.
   *
   *  @private
   *  @param {Object} nodeData - Object describing desired NavNode.
   *  @return {NavNode} The new NavNode
   */
   
  var navNodeFactory = function(nodeData,defaults) {
    var node;
    
    if(typeof nodeData === 'string') {
      nodeData = JSON.parse(nodeData);
    }
    
    console.log(defaults);
    node = Crafty.e('NavNode')
      .attr({
        w: nodeData.width || defaults.width,
        h: nodeData.height || defaults.height,
        x: nodeData.x,
        y: nodeData.y
      })
      .title(nodeData._title)
      .css('background','url('+(nodeData.image||defaults.image)+') center');
      
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
    var nodeKey,
      nodes = {},
      defaults = nodesData['_default'];
      
    for(nodeKey in nodesData) {
      if(nodesData.hasOwnProperty(nodeKey) && nodeKey !== '_default') {
        nodesData[nodeKey]._title = Crafty.Game.navigationNodes[nodeKey].title;
        nodes[nodeKey] = navNodeFactory(nodesData[nodeKey],defaults);
      }
    }
    
    return nodes;
  };
  
  return function(param) {
    
    var sceneNode = Crafty.Game.navigationNodes[param.sceneNode],
      navNodesData = sceneNode.children,
      background = Crafty.e('Outerspace')
      .attr({
        w: sceneNode.sceneWidth,
        h: sceneNode.sceneHeight,
        x: 0,
        y: 0
      });
      
    
    if(typeof navNodesData !== 'undefined') {
      createNavNodes(navNodesData);
    }
    
    Crafty.viewport.clampToEntities = true;
    Crafty.viewport.x = param.viewport.x;
    Crafty.viewport.y = param.viewport.y;
    Crafty.viewport.mouselook(true);
  };
})());
