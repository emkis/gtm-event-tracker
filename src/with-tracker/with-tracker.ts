import { dataLayer } from '@/shared/data-layer'
import { logEvent } from './with-tracker-logs'
import type { TrackerContext } from '@/tracker-context'
import type { EventProperties } from '@/shared/data-layer'
import type { TrackModule, SubtractEventProperties } from './with-tracker-types'

/**
 * Accepts a tracker context as the first argument and returns
 * functions responsible for triggering the track events.
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
 * const tracker = withTrackerContext(appTrackerContext)
 *
 * tracker.trackEvent({ foo: 'bar', baz: 'qux', })
 *
 * const trackMenuEvent = tracker.partialTrackEvent({ category: 'menu' })
 * trackMenuEvent({ action: 'log in' })
 * trackMenuEvent({ action: 'log out' })
 */
export function withTrackerContext<Properties extends EventProperties>({
  context,
}: TrackerContext): TrackModule<Properties> {
  function trackEvent(eventProps: Properties) {
    const eventProperties = { ...context.value, ...eventProps }
    const contextName = context.options.name

    dataLayer.addEvent(eventProperties)
    logEvent({ properties: eventProperties, contextName })
  }

  function partialTrackEvent<T extends Partial<Properties>>(defaultProps: T) {
    return (remainingProps: SubtractEventProperties<Properties, T>) => {
      trackEvent({
        ...context.value,
        ...defaultProps,
        ...remainingProps,
      } as unknown as Properties)
    }
  }

  return { trackEvent, partialTrackEvent }
}
