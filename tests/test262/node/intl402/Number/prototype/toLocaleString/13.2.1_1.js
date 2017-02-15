function assert(mustBeTrue, message) {
    if (mustBeTrue === true) {
        return;
    }

    if (message === undefined) {
        message = 'Expected true but got ' + String(mustBeTrue);
    }
    throw new Error(message);
}

assert._isSameValue = function (a, b) {
    if (a === b) {
        // Handle +/-0 vs. -/+0
        return a !== 0 || 1 / a === 1 / b;
    }

    // Handle NaN vs. NaN
    return a !== a && b !== b;
};

assert.sameValue = function (actual, expected, message) {
    if (assert._isSameValue(actual, expected)) {
        return;
    }

    if (message === undefined) {
        message = '';
    } else {
        message += ' ';
    }

    message += 'Expected SameValue(«' + String(actual) + '», «' + String(expected) + '») to be true';

    throw new Error(message);
};

assert.notSameValue = function (actual, unexpected, message) {
    if (!assert._isSameValue(actual, unexpected)) {
        return;
    }

    if (message === undefined) {
        message = '';
    } else {
        message += ' ';
    }

    message += 'Expected SameValue(«' + String(actual) + '», «' + String(unexpected) + '») to be false';

    throw new Error(message);
};

assert.throws = function (expectedErrorConstructor, func, message) {
    if (typeof func !== "function") {
        throw new Error('assert.throws requires two arguments: the error constructor ' +
            'and a function to run');
        return;
    }
    if (message === undefined) {
        message = '';
    } else {
        message += ' ';
    }

    try {
        func();
    } catch (thrown) {
        if (typeof thrown !== 'object' || thrown === null) {
            message += 'Thrown value was not an object!';
            throw new Error(message);
        } else if (thrown.constructor !== expectedErrorConstructor) {
            message += 'Expected a ' + expectedErrorConstructor.name + ' but got a ' + thrown.constructor.name;
            throw new Error(message);
        }
        return;
    }

    message += 'Expected a ' + expectedErrorConstructor.name + ' to be thrown but no exception was thrown at all';
    throw new Error(message);
};

"use strict";var __globalObject = Function("return this;")();function fnGlobalObject() {    return __globalObject;}function Test262Error(message) {  this.message = message || "";}IntlPolyfill.__applyLocaleSensitivePrototypes();function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 13.2.1_1
description: Tests that toLocaleString handles "this Number value" correctly.
author: Norbert Lindenberg
---*/

var invalidValues = [undefined, null, "5", false, {valueOf: function () { return 5; }}];
var validValues = [5, NaN, -1234567.89, -Infinity];

invalidValues.forEach(function (value) {
    var error;
    try {
        var result = Number.prototype.toLocaleString.call(value);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        throw new Error("Number.prototype.toLocaleString did not reject this = " + value + ".");
    } else if (error.name !== "TypeError") {
        throw new Error("Number.prototype.toLocaleString rejected this = " + value + " with wrong error " + error.name + ".");
    }
});

// for valid values, just check that a Number value and the corresponding
// Number object get the same result.
validValues.forEach(function (value) {
    var Constructor = Number; // to keep jshint happy
    var valueResult = Number.prototype.toLocaleString.call(value);
    var objectResult = Number.prototype.toLocaleString.call(new Constructor(value));
    if (valueResult !== objectResult) {
        throw new Error("Number.prototype.toLocaleString produces different results for Number value " +
            value + " and corresponding Number object: " + valueResult + " vs. " + objectResult + ".");
    }
});
 }