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

function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 6.4_b
description: Tests that invalid time zone names are not accepted.
author: Norbert Lindenberg
---*/

var invalidTimeZoneNames = [
    "",
    "MEZ", // localized abbreviation
    "Pacific Time", // localized long form
    "cnsha", // BCP 47 time zone code
    "invalid", // as the name says
    "Europe/İstanbul", // non-ASCII letter
    "asıa/baku", // non-ASCII letter
    "europe/brußels"  // non-ASCII letter
];

invalidTimeZoneNames.forEach(function (name) {
    var error;
    try {
        // this must throw an exception for an invalid time zone name
        var format = new IntlPolyfill.DateTimeFormat(["de-de"], {timeZone: name});
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        throw new Error("Invalid time zone name " + name + " was not rejected.");
    } else if (error.name !== "RangeError") {
        throw new Error("Invalid time zone name " + name + " was rejected with wrong error " + error.name + ".");
    }
});
 }