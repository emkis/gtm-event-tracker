import { EventProperties } from '../data-layer';
import type { TrackerContext } from '../tracker-context';
import type { TrackModule } from './with-tracker-types';
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
export declare function withTrackerContext<Properties extends EventProperties>({ context, }: TrackerContext): TrackModule<Properties>;
