/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
var assert = require("assert");
describe("a=b/10; b=a*10", function() {

    it.skip("getter setter impl, pull style (TODO: challenge)", function() {
        var o = {
            get a() {
                // you can reference b,_b, f(b), f(return f(this.b) / 10;) here
                return this.b / 10;
            },
            set a(value) {
                // no reference to be allowed here
            },
            get b() {
                // you can reference a,_a, f(a), f(return f(this.a) / 10;) here
                return this.a * 10;
            },
            set b(value) {
                // no reference to a allowed here
            }
        };

        function changeA(value) {
            o.a = value;
        }

        function changeB(value) {
            o.b = value;
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
