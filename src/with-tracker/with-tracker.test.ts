import { createTrackerContext, TrackerContextOptions } from '@/tracker-context'
import { withTrackerContext } from './with-tracker'
import { dataLayer, EventProperties } from '@/shared/data-layer'
import { logEvent } from './with-tracker-logs'

jest.mock('@/shared/data-layer')
jest.mock('./with-tracker-logs')
const mockedDataLayer = jest.mocked(dataLayer)
const mockedLogEvent = jest.mocked(logEvent)

function makeTracker(
  props?: EventProperties,
  options: TrackerContextOptions = {}
) {
  const context = createTrackerContext(props, { name: options.name })
  return withTrackerContext(context)
}

it('should contain all composed properties in the events', () => {
  const contextProps = { foo: 'bar', baz: 'quz' }
  const { trackEvent } = makeTracker(contextProps)

  const eventPropertiesA = {
    action: 'new subscription',
    plan: 'business',
    lorem: 'ipsum',
  }
  const eventPropertiesB = {
    action: 'new subscription',
    plan: 'pro',
    random: 'something',
  }

  trackEvent(eventPropertiesA)
  trackEvent(eventPropertiesB)
  trackEvent({})

  expect(mockedDataLayer.addEvent).toHaveBeenNthCalledWith(1, {
    ...contextProps,
    ...eventPropertiesA,
  })
  expect(mockedDataLayer.addEvent).toHaveBeenNthCalledWith(2, {
    ...contextProps,
    ...eventPropertiesB,
  })
  expect(mockedDataLayer.addEvent).toHaveBeenNthCalledWith(3, contextProps)
  expect(mockedDataLayer.addEvent).toHaveBeenCalledTimes(3)
})

it('should be able to overwrite context properties in track event', () => {
  const contextProps = { static: 'prop', from: 'context' }
  const { trackEvent } = makeTracker(contextProps)
  const eventPayloadOverwritten = { id: 'def', from: 'trackEvent' }
  trackEvent(eventPayloadOverwritten)

  expect(mockedDataLayer.addEvent).toHaveBeenCalledTimes(1)
  expect(mockedDataLayer.addEvent).toHaveBeenNthCalledWith(1, {
    ...contextProps,
    ...eventPayloadOverwritten,
  })
})

it('should return a function when partialTrackEvent is called', () => {
  const { partialTrackEvent } = makeTracker()
  const result = partialTrackEvent({ greeting: 'eai' })
  expect(typeof result).toBe('function')
})

it('should inject repeated props in the events', () => {
  const contextProps = { from: 'context' }
  const tracker = makeTracker(contextProps)
  const trackCoolEvent = tracker.partialTrackEvent({ isRepeatedProp: 'yes' })

  trackCoolEvent({ isFromPartial: 'oh yes' })
  trackCoolEvent({ soCool: 'true' })
  tracker.trackEvent({ isAlone: 'true' })

  expect(mockedDataLayer.addEvent).toHaveBeenNthCalledWith(1, {
    from: 'context',
    isRepeatedProp: 'yes',
    isFromPartial: 'oh yes',
  })
  expect(mockedDataLayer.addEvent).toHaveBeenNthCalledWith(2, {
    from: 'context',
    isRepeatedProp: 'yes',
    soCool: 'true',
  })
  expect(mockedDataLayer.addEvent).toHaveBeenNthCalledWith(3, {
    from: 'context',
    isAlone: 'true',
  })
  expect(mockedDataLayer.addEvent).toHaveBeenCalledTimes(3)
})

it('should call the logger function when an event is triggered', () => {
  const trackerWithoutName = makeTracker()
  trackerWithoutName.trackEvent({ event: 'triggering 1st event' })

  const trackerWithName = makeTracker({ from: 'context' }, { name: 'sutjeska' })
  trackerWithName.trackEvent({ event: 'triggering 2nd event' })

  expect(mockedLogEvent).toHaveBeenNthCalledWith(1, {
    contextName: undefined,
    properties: { event: 'triggering 1st event' },
  })

  expect(mockedLogEvent).toHaveBeenNthCalledWith(2, {
    contextName: 'sutjeska',
    properties: { from: 'context', event: 'triggering 2nd event' },
  })

  expect(mockedLogEvent).toBeCalledTimes(2)
})
