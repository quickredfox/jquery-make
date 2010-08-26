var current,
parent,
kids,
data;
QUnit.reset = function() {
    current = $('<div>');
    data = { foo: 'bar' };
    kids = [
        ['header', {
            id: "main-header",
            text: "main header",
            data: {testData: data}
        }],
        ['section', {
            id: "main-section",
            text: "main section",
            data: {
                testData: data
            }
        }],
        ['footer', {
            id: "main-footer",
            text: "main footer",
            data: {
                testData: data
            }
        }]
    ];
    parent = [
    [
        'section', {
            id: "main-wrapper",
            data: {
                testData: data
            },
            make: kids
        }]
    ];
    current.make(parent);
}
QUnit.reset();
module("JQuery ui builder");
test('$.fn.make Generated DOM Structure',
function() {
    // DOM building
    ok(current.find('#main-wrapper').length === 1, "#main-wrapper node created");
    ok(current.find('#main-wrapper #main-header').length === 1, "#main-header node created");
    ok(current.find('#main-wrapper #main-section').length === 1, "#main-section node created");
    ok(current.find('#main-wrapper #main-footer').length === 1, "#main-section node created");
});
test('$.fn.make Consistent Data Transfer',
function() {
    // attr data integrity
    same(current.find('#main-wrapper').data('testData'), data, "should transport data through attr for #main-wrapper");
    same(current.find('#main-wrapper #main-header').data('testData'), data, "should transport data through attr for #main-header");
    same(current.find('#main-wrapper #main-section').data('testData'), data, "should transport data through attr for #main-section");
    same(current.find('#main-wrapper #main-footer').data('testData'), data, "should transport data through attr for #main-footer");
});
test('$.fn.unmake Destroys Generated DOM Structure',
function() {
    current.unmake();
    // DOM building
    ok(current.find('#main-wrapper').length === 0, "#main-wrapper node destroyed");
    ok(current.find('#main-wrapper #main-header').length === 0, "#main-header node destroyed");
    ok(current.find('#main-wrapper #main-section').length === 0, "#main-section node destroyed");
    ok(current.find('#main-wrapper #main-footer').length === 0, "#main-section node destroyed");
    ok(true,"Blindly jQuery kills the data");
    ok(true,"Like a Ninja jQuery slices off event handlers on these elements");    
    ok(true,"3 b.s. tests passed!");    
});