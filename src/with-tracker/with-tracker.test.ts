import { createTrackerContext } from '@/tracker-context'
import { withTrackerContext } from './with-tracker'
import { dataLayer, EventProperties } from '@/shared/data-layer'

jest.mock('@/shared/data-layer')
const mockedDataLayer = jest.mocked(dataLayer)

function makeTracker(props?: EventProperties) {
  const context = createTrackerContext(props)
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
  const eventPayloadOverwriter = { id: 'def', from: 'trackEvent' }
  trackEvent(eventPayloadOverwriter)

  expect(mockedDataLayer.addEvent).toHaveBeenCalledTimes(1)
  expect(mockedDataLayer.addEvent).toHaveBeenNthCalledWith(1, {
    ...contextProps,
    ...eventPayloadOverwriter,
  })
})

it('should return a partial function when setRepeatedProps is called', () => {
  const { setRepeatedProps } = makeTracker()
  const result = setRepeatedProps({ greeting: 'eai' })
  expect(typeof result).toBe('function')
})

it('should inject repeated props in the events', () => {
  const contextProps = { from: 'context' }
  const tracker = makeTracker(contextProps)
  const trackCoolEvent = tracker.setRepeatedProps({ isRepeatedProp: 'yes' })

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
