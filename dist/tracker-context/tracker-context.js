"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrackerContext = void 0;
/**
 * Creates a context for track events.
 *
 * All properties in this context will be injected into every
 * track event that uses this context.
 *
 * @param initialProps - Properties witch will initialize the context.
 * @public
 * @example
 * createTrackerContext({
 *   appVersion: '1.2.7',
 *   userId: getUserIdFromSomewhere()
 *   // Properties you need to send in all track events
 * })
 */
function createTrackerContext(initialProps = {}) {
    const context = { value: { ...initialProps } };
    function setProps(props) {
        context.value = { ...props };
    }
    return { context, setProps };
}
exports.createTrackerContext = createTrackerContext;
//# sourceMappingURL=tracker-context.js.map