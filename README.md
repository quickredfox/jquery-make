# jQuery Make Plugin v 0.0.2 #

Copyright &copy; 2010, Francois Lafortune, @quickredfox.
Licensed under the MIT license

Takes a Array-like JSON structure and builds out a DOM tree using $.fn.attr with passthrough functionality added in jQuery around version 1.4.2...

This basically allows you to build an entire DOM structure *and* attach events to it *and* tie in some data on each node with one single "recipe". 

see also: http://mela.nom.es/jquery-make

### Requires ###

jQuery v1.4.2+

### Note ###

Nothing very new here, a common jQuery DOM builder sort of like the ones seen in the past like jQuery.create() and the graft() function... except it's tiny, and delegates most of it's power as a plugin to the jQuery core itself.

Update: Well something new methinks. I basically added unmake functionality by storing in $.makeNodes a jquery object and used $.fn.add during the make process, and then unmake loops through that .remove()'ing those nodes. OTTOMH, remove() should clear all related data and events. Need a "remake" method?


### Example Usage ###
    
    /* 
        Given an array like so: 
    */
    
        var recipe =[
            [
                'section',
                {
                    text: "wrapper",
                    make: [
                      [
                        'button', {
                                    text:'click me',
                                    click:function() {
                                          alert('has button, is clicked!');
                                    }
                                }
                        ]
                    ]
                }
            ]
        ];
    
    /* 
        Building it upon the body: 
    */
    
        $(document.body).make(recipe);
    
    /* 
        Will produce this HTML: 
        
        <section>wrapper<button>click me</button></section>
         
        ...where the button has a registered click event handler.
    */
    
    
    /* 
        This also works: 
    */
    
        $.make(document.body,recipe);
    
    /* 
        In any case, to empty() the containing element before building, 
        pass in "true" as an additional argument 
    */
    
        $.make(document.body,recipe,true);
        // or
        $(document.body).make(recipe,true);
    
    /* 
        Using it in the $.fn form, will build upon a node collection 
    */
    
        $('<div>').make(recipe) // adds built nodes to each div
        $.make($('<div>'),recipe) // adds built nodes to the first matched node only...
        $.make('<div>',recipe) // ...this also works

    /*
        In the same general idea as $.make and $.fn.make but for destroying previously created nodes
        which are being held in $.makeNodes;
    */
        $('#mydiv').unmake();
        $.unmake('#mydiv');

### TODO ###

moar test!

### License ###

(The MIT License)

Copyright (c) 2010 Francois Lafortune, @quickredfox

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.