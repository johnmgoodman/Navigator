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
    
    
    Crafty.e('SceneTransition')
      .registerOut('NavNodeActivate')
      .addOutProcedure(function(sceneData) {
        Crafty.e('2D, DOM, Tween, Persist')
          .attr({
            alpha: 0.0,
            x: 0,
            y: 0,
            w: sceneNode.width,
            h: sceneNode.height
          })
          .css('background-color','black')
          .one('TweenEnd',function() {
            Crafty.trigger('TransitionProcedureResponse',sceneData);
            this.one('TweenEnd', this.destroy)
            .tween({alpha:0.0},500);
            
          })
          .tween({alpha:1.0},500)
          .z = 1000;
      });
    
    
    Crafty.viewport.clampToEntities = true;
    Crafty.viewport.x = (param.viewport || sceneNode.viewport).x;
    Crafty.viewport.y = (param.viewport || sceneNode.viewport).y;
    Crafty.viewport.mouselook(true);
  };
})());
