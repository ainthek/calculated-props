/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
var assert = require("assert");
var drequire = require("drequire")();
var getStateful = drequire("dojox/mvc/getStateful");
var computed = drequire("dojox/mvc/computed");
var at = drequire("dojox/mvc/at");


describe("a=b/10; b=a*10", function() {

    it("dojox/mvc/computed", function() {
        var o = getStateful({
            a: NaN, // a is b/10
            b: NaN // b is a*10    
        });
        computed(o, "a", (b) => b / 10, at(o, "b"));
        computed(o, "b", (a) => a * 10, at(o, "a"));
        computed(o, "c", (a, b) => a + b, at(o, "a"), at(o, "b"));

        function changeA(value) {
            o.set("a", value);
        }

        function changeB(value) {
            o.set("b", value);
        }

        assert(isNaN(o.a)); //already getter fails
        assert(isNaN(o.b));

        changeA(5);
        assert.equal(o.a, 5);
        assert.equal(o.b, 50);

        changeB(10);
        assert.equal(o.a, 1);
        assert.equal(o.b, 10);

        //
        assert.equal(o.c, 11);

    });
});
