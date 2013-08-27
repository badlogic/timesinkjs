String.prototype.contains = function(needle) {
    return this.indexOf(needle) >= 0;
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};