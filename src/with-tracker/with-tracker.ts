import { dataLayer, EventProperties } from '@/shared/data-layer'
import { logEvent } from './with-tracker-logs'
import type { TrackerContext } from '@/tracker-context'
import type { TrackModule, SubtractEventProperties } from './with-tracker-types'

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
export function withTrackerContext<Properties extends EventProperties>({
  context,
}: TrackerContext): TrackModule<Properties> {
  function trackEvent(eventProps: Properties) {
    const eventProperties = { ...context.value, ...eventProps }

    dataLayer.assertIsAvailable()
    dataLayer.addEvent(eventProperties)
    logEvent(eventProperties)
  }

  function setRepeatedProps<T extends Partial<Properties>>(defaultProps: T) {
    return (remainingProps: SubtractEventProperties<Properties, T>) => {
      trackEvent({
        ...context.value,
        ...defaultProps,
        ...remainingProps,
      } as unknown as Properties)
    }
  }

  return { trackEvent, setRepeatedProps }
}
