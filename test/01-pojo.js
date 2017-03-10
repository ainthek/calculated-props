/*global describe:true,it:true,	after:true,before:true,afterEach:true,beforeEach:true */
var assert = require("assert");
describe("a=b/10; b=a*10", function() {
    
    it("pojo imp", function() {
        var o = {
            a: NaN, // a is b/10
            b: NaN // b is a*10
        };

        function changeA(value) {
            o.a = value;
            o.b = o.a * 10; // BTW: some would write value * which is not semantic
        }

        function changeB(value) {
            o.b = value;
            o.a = o.b / 10;
        }
        assert(isNaN(o.a));
        assert(isNaN(o.b));

        changeA(5);
        assert.equal(o.a, 5);
        assert.equal(o.b, 50);

        changeB(10);
        assert.equal(o.a, 1);
        assert.equal(o.b, 10);
    });
});
