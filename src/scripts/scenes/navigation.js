Crafty.defineScene('Navigation', (function() {
    
  var dbg = 0,


  /**
   *  Creates a NavNode entity based on the supplied
   *  data.
   *
   *  @private
   *  @param {Object} nodeData - Object describing desired NavNode.
   *  @param {Object} defaults - Object to use for data that the nodeData object doesn't have.
   *  @return {NavNode} The new NavNode
   */

  navNodeFactory = function(nodeData,defaults) {
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
      node.distance(nodeData.distance);
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
  },


  UIGauges = function() {
    var status = Crafty.Game.Player.status();


    // Fuel Gauge
    Crafty.e('NavGauge')
      .color('#004488')
      .unitWidth(1)
      .value(status.fuel.quantity)
      .bind('ViewportScroll', function() {
        this.x = Math.abs(Crafty.viewport.x) + 20;
        this.y = Math.abs(Crafty.viewport.y) + 20;
      });

    // Hull Gauges
    status.hull.map(function(hullItem,index) {
      Crafty.e('NavGauge')
        .color('#448800')
        .unitWidth(0.25)
        .value(hullItem.condition)
        .bind('ViewportScroll', function() {
          this.x = Math.abs(Crafty.viewport.x) + 20;
          this.y = Math.abs(Crafty.viewport.y) + 30 + 10 * index;
        });
    });

  },


  buildUI = function(param) {
    var backBtn = Crafty.e('2D, DOM')
      .attr({w:32, h: 32})
      .bind('ViewportScroll', function() {
        this.x = Math.abs(Crafty.viewport.x) + 20;
        this.y = Math.abs(Crafty.viewport.y) + Crafty.viewport.height - 20 - 32;
      });

    UIGauges();

    if(Crafty('NavHistory').get(0).history().length === 0) {
      backBtn.addComponent('UIBackDisabled');
    } else {
      backBtn.addComponent('UIBackEnabled, Mouse')
        .bind('Click',function() {
          Crafty.trigger('NavBack');
        });
    }
  },



  onNavNodeActivate = function(node) {
    var sceneName, sceneParam, num = 0;
    if(typeof node._story === 'undefined') {
      sceneName = node._target.sceneName;
      sceneParam = node._target.param;
    } else {
      sceneName = 'Story';
      sceneParam = {
        story: node._story,
        sceneRelay: {
          name: node._target.sceneName,
          param: node._target.param
        }
      };
    }
    console.log(Date.now());
    Crafty.Game.helpers.scene_fadeout(sceneName,sceneParam);
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
      Crafty.bind('NavNodeActivate', onNavNodeActivate);
      createNavNodes(navNodesData);
    }

    Crafty.e('NavHistory')
      .loadParam(param);
    
    buildUI(param);

    Crafty.viewport.clampToEntities = true;
    Crafty.viewport.x = (param.viewport || sceneNode.viewport).x;
    Crafty.viewport.y = (param.viewport || sceneNode.viewport).y;
    Crafty.viewport.mouselook(true);

    Crafty.one('SceneDestroy',function(nextScene) {
      Crafty.unbind('NavNodeActivate', onNavNodeActivate);
    });

  };
})());
