Crafty.defineScene('Navigation', (function() {
    
    
  /**
   *  Creates a NavNode entity based on the supplied
   *  data.
   *
   *  @private
   *  @param {Object} nodeData - Object describing desired NavNode.
   *  @param {Object} defaults - Object to use for data that the nodeData object doesn't have.
   *  @return {NavNode} The new NavNode
   */
   
  var navNodeFactory = function(nodeData,defaults) {
    var node;
    
    if(typeof nodeData === 'string') {
      nodeData = JSON.parse(nodeData);
    }
    
    node = Crafty.e('NavNode')
      .attr({
        w: nodeData.width || defaults.width,
        h: nodeData.height || defaults.height,
        x: nodeData.x,
        y: nodeData.y
      })
      .key(nodeData._key)
      .css('background','url('+(nodeData.image||defaults.image)+') center')
      .target('Navigation',{
        sceneNode: nodeData._key
      });
      
    if(nodeData.hasOwnProperty('story')) {
      node.story(nodeData.story);
    }
      
    if(nodeData.hasOwnProperty('distance')) {
      node.story(nodeData.distance);
    }
      
    node.title(nodeData._node.title);
      
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
      defaults = nodesData._default;
      
    for(nodeKey in nodesData) {
      if(nodesData.hasOwnProperty(nodeKey) && nodeKey !== '_default') {
        nodesData[nodeKey]._key = nodeKey;
        nodesData[nodeKey]._node = Crafty.Game.navigationNodes[nodeKey];
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
        w: sceneNode.width,
        h: sceneNode.height,
        x: 0,
        y: 0
      });
      
    if(typeof sceneNode.image !== 'undefined') {
      background.css('background-image','url('+sceneNode.image+')');
    }
    
    if(typeof navNodesData !== 'undefined') {
      createNavNodes(navNodesData);
    }
    
    Crafty.viewport.clampToEntities = true;
    Crafty.viewport.x = (param.viewport || sceneNode.viewport).x;
    Crafty.viewport.y = (param.viewport || sceneNode.viewport).y;
    Crafty.viewport.mouselook(true);
  };
})());
