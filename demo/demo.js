(function(window,undefined) {
	var demo = {
		// in real life, you can also pre-bind with delegate() and/or live() instead of this approach
		clickHandler:function (e) {
			alert("You clicked "+$(this).text()+" in "+($(this).parents('nav').length>0 ? 'nav' : 'aside'));
		}
	}
	var demoTitle =[
			['h1',{text:"Title"}]
		],
		demoLinks = [
			['ul',{make:[
				['li',{make:[['a',{text:"link A",href:'#linka',click:demo.clickHandler}]]}],
				['li',{make:[['a',{text:"link B",href:'#linkb',click:demo.clickHandler}]]}],
				['li',{make:[['a',{text:"link C",href:'#linkc',click:demo.clickHandler}]]}]
			]}]
		],
		demoRecipe = [
			['header',{
				make: demoTitle
			}],
			['nav',{make: demoLinks }],
			['section',{text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}],
			['aside',{make: demoLinks }],
			['footer',{text:"jquery make demo"}]			
		];
		$(function() {
			var container = $('<section>').attr('id','demo').make(demoRecipe);
			$(document.body).append(container);
		})
})(window,undefined)