/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
var assert = require("assert");
var drequire = require("drequire")();
var Stateful = drequire("dojo/Stateful");
var sync = drequire("dojox/mvc/sync");

describe("a=b/10; b=a*10", function() {

    it("dojo mvc pull style", function() {
        var o = new Stateful({
            a: NaN, // a is b/10
            b: NaN // b is a*10    
        });
        //a=b/10; 
        sync(o, "a", o, "b", {
            bindDirection: sync.to,
            converter: {
                parse: (b) => b / 10
            }
        });
        //b=a*10
        sync(o, "b", o, "a", {
            bindDirection: sync.to,
            converter: {
                parse: (a) => a * 10
            }
        });

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


    });
});
