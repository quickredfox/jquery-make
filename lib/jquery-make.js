/*
    jQuery Make Plugin v0.0.1

    Copyright 2010, Francois Lafortune, @quickredfox.
    Licensed under the MIT license

    Takes a Array-like JSON structure and builds out a DOM tree using 
    $.fn.attr with passthrough functionality. This basically allows you
    to build an entire DOM structure AND attach events to it AND tie in 
    some data on each node etc... etc...
    
    Requires: jQuery v1.4.2+
    
    Example Usage: 
    
    // Given an array like thus:
        
        var recipe =[
            [
                'section',
                {
                    text: "wrapper",
                    make: ['button',{text:'click me',click:function() {
                       alert('has button, is clicked!');
                    }}]
                }
            ]
        ];
        
    // Building it upon the body:
    
        $(document.body).make(recipe);
    
    // Will produce this HTML:
    
        <section>wrapper<button>click me</button></section>
    
    // ...where the button has a registered click event handler.
    
    
    // This also works:
    
        $.make(document.body,recipe);
        
    // In any case, to empty() the containing element before building, 
    // pass in true as an additional argument
    
        $.make(document.body,recipe,true);
        // or
        $(document.body).make(recipe,true);
        
    // Using it in the $.fn form, will build upon a node collection
       
       $('<div>').make(recipe) // adds built nodes to each div
       $.make($('<div>'),recipe) // adds built nodes to the first matched node only...
       $.make('<div>',recipe) // ...this also works       
    
*/
(function() {
    // DOM building
    function make(recipe) {
        var wrapper = $('<div>'),node;
        recipe.forEach(function(ingredients) {
            wrapper.append($('<'+ingredients[0]+'>').attr(ingredients[1]||{},true));
        });
        return wrapper.contents();
    };
    $.extend(true,{
        // Attach to jQuery namespace
        make: function(element,recipe,clear) {
            var node = (clear ? $(element).empty() : $(element)), dom = make(recipe);
            return node.append(dom);
        },
        // Per-element version
        fn: {
            make: function(recipe,clear) {
                return $(this).each(function() {
                    return $.make(this,recipe,clear);
                });                    
            }
        },
        // Activates within $.fn.attr(map,true) signature.
        attrFn: {make: true}
    });
})();