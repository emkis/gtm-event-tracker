"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTrackerContext = void 0;
const data_layer_1 = require("../data-layer");
/**
 * Accepts a context object returned from `createTrackerContext` function,
 * and returns the functions responsible for triggering the track events.
 *
 * @param trackerContext - The tracker context object.
 *
 * @public
 * @example
 * const appTrackerContext = createTrackerContext({
 *   someProperty: 'i need to have in every single event'
 *   appName: 'awesome-app',
 * })
 *
 * // using the tracker context to track events
 * const Tracker = withTrackerContext(appTrackerContext)
 *
 * Tracker.trackEvent({ foo: 'bar', baz: 'qux', })
 *
 * const trackMenuEvent = Tracker.setRepeatedProps({ category: 'menu' })
 * trackMenuEvent({ action: 'log in' })
 * trackMenuEvent({ action: 'log out' })
 */
function withTrackerContext({ context, }) {
    function trackEvent(eventProps) {
        data_layer_1.dataLayer.assertIsAvailable();
        data_layer_1.dataLayer.addEvent({ ...context.value, ...eventProps });
    }
    function setRepeatedProps(defaultProps) {
        return (remainingProps) => {
            trackEvent({
                ...context.value,
                ...defaultProps,
                ...remainingProps,
            });
        };
    }
    return { trackEvent, setRepeatedProps };
}
exports.withTrackerContext = withTrackerContext;
//# sourceMappingURL=with-tracker.js.map