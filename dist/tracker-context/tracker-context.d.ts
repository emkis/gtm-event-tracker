import type { EventProperties } from '../data-layer';
import type { TrackerContext } from './tracker-context-types';
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
export declare function createTrackerContext(initialProps?: EventProperties): TrackerContext;
