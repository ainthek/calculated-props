


/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
var assert = require("assert");
describe("a=b/10; b=a*10", function() {

    it("getter setter impl, push style", function() {
        var o = {
            get a() {
                return "_a" in this ? this._a : NaN;
            },
            set a(value) {
                this._a = value;
                this._b = this._a * 10; //push
            },
            get b() {
                return "_b" in this ? this._b : NaN;
            },
            set b(value) {
                this._b = value;
                this._a = this._b / 10; //push
            }
        };

        function changeA(value) {
            o.a = value;
        }

        function changeB(value) {
            o.b = value;
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

