"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwIsNotArray = exports.throwIsNotDefined = exports.throwIsServer = void 0;
const error_1 = require("../error");
function throwIsServer() {
    throw new error_1.WarningError('window.dataLayer is not available on server-side. Make sure to only trigger events after your app is running on the client-side.');
}
exports.throwIsServer = throwIsServer;
function throwIsNotDefined() {
    throw new error_1.WarningError('window.dataLayer is not defined. Probably you forgot to add the Google Tag Manager script to your application.');
}
exports.throwIsNotDefined = throwIsNotDefined;
function throwIsNotArray() {
    throw new error_1.WarningError('window.dataLayer is not an array. Make sure you installed Google Tag Manager correctly.');
}
exports.throwIsNotArray = throwIsNotArray;
//# sourceMappingURL=data-layer-error.js.map