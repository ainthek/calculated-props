/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
var assert = require("assert");
var drequire = require("drequire")();
var getStateful = drequire("dojox/mvc/getStateful");
var computed = drequire("dojox/mvc/computed");
var at = drequire("dojox/mvc/at");


describe("a=b/10; b=a*10", function() {

    function sugar(plain) {
        var stateful = getStateful(plain);
        // dynamically build this:
        // computed(o, "a", (b) => b / 10, at(o, "b"));
        // computed(o, "b", (a) => a * 10, at(o, "a"));
        // computed(o, "c", (a, b) => a + b, at(o, "a"), at(o, "b"));

        for (let p in plain) {
            if (typeof plain[p] === "function") {
                let funct = plain[p];
                let ats = args(funct).map((pn) => at(stateful, pn));
                computed.apply(null, [stateful, p, funct].concat(ats));
            }
        }
        return stateful;

        function args(funct) {
            return require("parse-function")({})
                .parse(funct).args;
        }
    }

    it("dojox/mvc/computed - syntactic sugar", function() {

        var o = sugar({
            a: (b) => b / 10,
            b: (a) => a * 10,
            c: (a, b) => a + b
                // d: {
                //     //a: (e.b) => e.b / 10
                //     a: l((b) => b / 10, ()=>()=>o.e.b)
                // },
                // e: {
                //     b: (d.a) => d.a * 10,
                // }
        });

        function changeA(value) {
            o.set("a", value);
        }

        function changeB(value) {
            o.set("b", value);
        }

        assert(isNaN(o.get("a"))); //already getter fails
        assert(isNaN(o.get("b")));

        changeA(5);
        assert.equal(o.get("a"), 5);
        assert.equal(o.get("b"), 50);

        changeB(10);
        assert.equal(o.get("a"), 1);
        assert.equal(o.get("b"), 10);

        //
        assert.equal(o.get("c"), 11);

    });
});
