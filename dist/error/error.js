"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarningError = void 0;
class WarningError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Warning';
    }
}
exports.WarningError = WarningError;
//# sourceMappingURL=error.js.map