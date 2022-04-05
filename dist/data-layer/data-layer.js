"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataLayer = exports.createDataLayerModule = void 0;
const data_layer_error_1 = require("./data-layer-error");
/**
 * Create the Data Layer module.
 * @internal
 */
function createDataLayerModule() {
    function addEvent(payload) {
        window.dataLayer.push(payload);
    }
    function assertIsAvailable() {
        const isServer = () => typeof window === 'undefined';
        const isDefined = () => typeof window.dataLayer !== 'undefined';
        const isArray = () => Array.isArray(window.dataLayer);
        if (isServer())
            (0, data_layer_error_1.throwIsServer)();
        else if (!isDefined())
            (0, data_layer_error_1.throwIsNotDefined)();
        else if (!isArray())
            (0, data_layer_error_1.throwIsNotArray)();
    }
    return {
        addEvent,
        assertIsAvailable,
    };
}
exports.createDataLayerModule = createDataLayerModule;
exports.dataLayer = createDataLayerModule();
//# sourceMappingURL=data-layer.js.map