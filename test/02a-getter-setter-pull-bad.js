/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
var assert = require("assert");
describe("a=b/10; b=a*10", function() {

    it("getter setter impl, pull style (call stack size exceeded)", function() {
        var o = {
            get a() {
                return this.b / 10;
            },
            set a(value) {
                this._a = value;
            },
            get b() {
                return this.a * 10;
            },
            set b(value) {
                this._b = value;
            }
        };

        function changeA(value) {
            o.a = value;
        }

        function changeB(value) {
            o.b = value;
        }
        assert.throws(() => {

            assert(isNaN(o.a)); //already getter fails
            assert(isNaN(o.b));

            changeA(5);
            assert.equal(o.a, 5);
            assert.equal(o.b, 50);

            changeB(10);
            assert.equal(o.a, 1);
            assert.equal(o.b, 10);
        }, /Maximum call stack size exceeded/, "getter will fail this does not work");
    });
});
