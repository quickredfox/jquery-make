/*
    jQuery Make Plugin v 0.0.2

    Copyright 2010, Francois Lafortune, @quickredfox.
    Licensed under the MIT license

    Takes a Array-like JSON structure and builds out a DOM tree using 
    $.fn.attr with passthrough functionality. This basically allows you
    to build an entire DOM structure AND attach events to it AND tie in 
    some data on each node etc... etc...
    
    Requires: jQuery v1.4.2+    
    
*/
(function() {
    /* Private functions */
    // DOM building
    function make(recipe) {
        var nodes,node;
            if(recipe[0] && typeof recipe[0] === 'string') recipe = [recipe];
            recipe.forEach(function(ingredients) {
            var node = $('<'+ingredients[0]+'>').attr(ingredients[1]||{},true);
            nodes = (nodes ? nodes.add(node) : nodes = node);
        });
        $.makeNodes = ($.makeNodes ? $.makeNodes.add(nodes) : nodes);
        return nodes;
    };
    // Good stuff for teardowns that are not onunload.
    function unmake(startingElement) {
        $.makeNodes = $.makeNodes.map(function() {
            var node = $(this);
            // is child of or has been removed (garbage disposal)
            if($.contains(startingElement.get(0),this) || !$.contains(document.documentElement,this)){ 
                node.remove();
                return
            }else{
                return node;                
            }
        });
        return $.makeNodes;
    };
    /* Public Interface */
    $.extend(true,{
        make: function(element,recipe,clear) {
            var node = (clear ? $(element).empty() : $(element)), dom = make(recipe);
            return node.append(dom);
        },
        unmake: function(elt) {
            var node = $(elt);
            unmake(node);
            return node;
        },
        fn: {
            make: function(recipe,clear) {
                return $(this).each(function() {
                    return $.make(this,recipe,clear);
                });                    
            },
            unmake: function() {
                return $.unmake(this);
            } 
        },
        // Activates within $.fn.attr(map,true) signature.
        attrFn: {make: true}
    });
})();