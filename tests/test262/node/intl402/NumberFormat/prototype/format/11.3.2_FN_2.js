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

"use strict";var __globalObject = Function("return this;")();function fnGlobalObject() {    return __globalObject;}function Test262Error(message) {  this.message = message || "";}IntlPolyfill.__applyLocaleSensitivePrototypes();function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2012 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 11.3.2_FN_2
description: >
    Tests that IntlPolyfill.NumberFormat.prototype.format  handles NaN,
    Infinity, and -Infinity properly.
author: Roozbeh Pournader
---*/

// FIXME: We are only listing Numeric_Type=Decimal. May need to add more
// when the spec clarifies. Current as of Unicode 6.1.
var hasUnicodeDigits = new RegExp('.*([' +
    '0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F' +
    '\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF' +
    '\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9' +
    '\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819' +
    '\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59' +
    '\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9' +
    '\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19' +
    ']|' +
    '\uD801[\uDCA0-\uDCA9]|' +
    '\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9]|' +
    '\uD805[\uDEC0-\uDEC9]|' +
    '\uD835[\uDFCE-\uDFFF])');

var formatter = new IntlPolyfill.NumberFormat();
var formattedNaN = formatter.format(NaN);
var formattedInfinity = formatter.format(Infinity);
var formattedNegativeInfinity = formatter.format(-Infinity);

if (formattedNaN === formattedInfinity) {
    throw new Error('IntlPolyfill.NumberFormat formats NaN and Infinity the ' +
        'same way.');
}

if (formattedNaN === formattedNegativeInfinity) {
    throw new Error('IntlPolyfill.NumberFormat formats NaN and negative ' +
        'Infinity the same way.');
}

if (formattedInfinity === formattedNegativeInfinity) {
    throw new Error('IntlPolyfill.NumberFormat formats Infinity and ' +
        'negative Infinity the same way.');
}

if (hasUnicodeDigits.test(formattedNaN)) {
    throw new Error('IntlPolyfill.NumberFormat formats NaN using a digit.');
}

if (hasUnicodeDigits.test(formattedInfinity)) {
    throw new Error('IntlPolyfill.NumberFormat formats Infinity using a ' +
        'digit.');
}

if (hasUnicodeDigits.test(formattedNegativeInfinity)) {
    throw new Error('IntlPolyfill.NumberFormat formats negative Infinity ' + 
        'using a digit.');
}
 }