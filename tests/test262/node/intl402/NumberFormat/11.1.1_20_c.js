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

"use strict";var __globalObject = Function("return this;")();function fnGlobalObject() {    return __globalObject;}function Test262Error(message) {  this.message = message || "";}IntlPolyfill.__applyLocaleSensitivePrototypes();function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2011-2012 Norbert Lindenberg. All rights reserved.
// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 11.1.1_20_c
description: >
    Tests that the number of fractional digits is determined correctly
    for currencies.
author: Norbert Lindenberg
---*/

// data from http://www.currency-iso.org/dam/downloads/table_a1.xml, 2015-03-23
var currencyDigits = {
    AED: 2,
    AFN: 2,
    ALL: 2,
    AMD: 2,
    ANG: 2,
    AOA: 2,
    ARS: 2,
    AUD: 2,
    AWG: 2,
    AZN: 2,
    BAM: 2,
    BBD: 2,
    BDT: 2,
    BGN: 2,
    BHD: 3,
    BIF: 0,
    BMD: 2,
    BND: 2,
    BOB: 2,
    BOV: 2,
    BRL: 2,
    BSD: 2,
    BTN: 2,
    BWP: 2,
    BZD: 2,
    CAD: 2,
    CDF: 2,
    CHE: 2,
    CHF: 2,
    CHW: 2,
    CLF: 4,
    CLP: 0,
    CNY: 2,
    COP: 2,
    COU: 2,
    CRC: 2,
    CUC: 2,
    CUP: 2,
    CVE: 2,
    CZK: 2,
    DJF: 0,
    DKK: 2,
    DOP: 2,
    DZD: 2,
    EGP: 2,
    ERN: 2,
    ETB: 2,
    EUR: 2,
    FJD: 2,
    FKP: 2,
    GBP: 2,
    GEL: 2,
    GHS: 2,
    GIP: 2,
    GMD: 2,
    GNF: 0,
    GTQ: 2,
    GYD: 2,
    HKD: 2,
    HNL: 2,
    HRK: 2,
    HTG: 2,
    HUF: 2,
    IDR: 2,
    ILS: 2,
    INR: 2,
    IQD: 3,
    IRR: 2,
    ISK: 0,
    JMD: 2,
    JOD: 3,
    JPY: 0,
    KES: 2,
    KGS: 2,
    KHR: 2,
    KMF: 0,
    KPW: 2,
    KRW: 0,
    KWD: 3,
    KYD: 2,
    KZT: 2,
    LAK: 2,
    LBP: 2,
    LKR: 2,
    LRD: 2,
    LSL: 2,
    LYD: 3,
    MAD: 2,
    MDL: 2,
    MGA: 2,
    MKD: 2,
    MMK: 2,
    MNT: 2,
    MOP: 2,
    MRO: 2,
    MUR: 2,
    MVR: 2,
    MWK: 2,
    MXN: 2,
    MXV: 2,
    MYR: 2,
    MZN: 2,
    NAD: 2,
    NGN: 2,
    NIO: 2,
    NOK: 2,
    NPR: 2,
    NZD: 2,
    OMR: 3,
    PAB: 2,
    PEN: 2,
    PGK: 2,
    PHP: 2,
    PKR: 2,
    PLN: 2,
    PYG: 0,
    QAR: 2,
    RON: 2,
    RSD: 2,
    RUB: 2,
    RWF: 0,
    SAR: 2,
    SBD: 2,
    SCR: 2,
    SDG: 2,
    SEK: 2,
    SGD: 2,
    SHP: 2,
    SLL: 2,
    SOS: 2,
    SRD: 2,
    SSP: 2,
    STD: 2,
    SVC: 2,
    SYP: 2,
    SZL: 2,
    THB: 2,
    TJS: 2,
    TMT: 2,
    TND: 3,
    TOP: 2,
    TRY: 2,
    TTD: 2,
    TWD: 2,
    TZS: 2,
    UAH: 2,
    UGX: 0,
    USD: 2,
    USN: 2,
    UYI: 0,
    UYU: 2,
    UZS: 2,
    VEF: 2,
    VND: 0,
    VUV: 0,
    WST: 2,
    XAF: 0,
    XCD: 2,
    XOF: 0,
    XPF: 0,
    YER: 2,
    ZAR: 2,
    ZMW: 2,
    ZWL: 2
};

Object.getOwnPropertyNames(currencyDigits).forEach(function (currency) {
    var digits = currencyDigits[currency];
    var format = IntlPolyfill.NumberFormat([], {style: "currency", currency: currency});
    var min = format.resolvedOptions().minimumFractionDigits;
    var max = format.resolvedOptions().maximumFractionDigits;
    if (min !== digits) {
        throw new Error("Didn't get correct minimumFractionDigits for currency " +
            currency + "; expected " + digits + ", got " + min + ".");
    }
    if (max !== digits) {
        throw new Error("Didn't get correct maximumFractionDigits for currency " +
            currency + "; expected " + digits + ", got " + max + ".");
    }
});
 }