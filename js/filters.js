'use strict';

/* Filters */

angular.module('contactPath.filters', []).
    filter('interpolate', ['version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}]).filter('regex', function () {
        return function (input, field, regex) {
            var patt = new RegExp(regex, "i");
            var out = [];
            for (var i = 0; i < input.length; i++) {
                if (patt.test(input[i][field]))
                    out.push(input[i]);
            }
            return out;
        };
    });
