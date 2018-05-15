var bullet = /** @class */ (function () {
    function bullet() {
        this._width = 120;
    }
    bullet.width = function (w) {
        if (!arguments.length)
            return this._width;
        return this;
    };
    return bullet;
}());
var one = bullet().width(160);
console.log(one.width());
