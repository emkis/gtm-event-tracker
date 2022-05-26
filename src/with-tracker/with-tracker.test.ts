import { createTrackerContext } from '@/tracker-context'
import { withTrackerContext } from './with-tracker'
import type { EventProperties } from '@/shared/data-layer'

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

  const [eventPayloadA, eventPayloadB, eventPayloadC] = window.dataLayer

  expect(window.dataLayer).toHaveLength(3)
  expect(eventPayloadA).toStrictEqual({ ...contextProps, ...eventPropertiesA })
  expect(eventPayloadB).toStrictEqual({ ...contextProps, ...eventPropertiesB })
  expect(eventPayloadC).toStrictEqual(contextProps)
})

it('should be able to overwrite context properties in track event', () => {
  const contextProps = { static: 'prop', from: 'context' }
  const { trackEvent } = makeTracker(contextProps)

  trackEvent({ foo: 'bar', from: 'trackEvent' })
  const [eventPayload] = window.dataLayer

  expect(window.dataLayer).toHaveLength(1)
  expect(eventPayload).toStrictEqual({
    static: 'prop',
    from: 'trackEvent',
    foo: 'bar',
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
  const [coolPayloadA, coolPayloadB, alonePayload] = window.dataLayer

  expect(coolPayloadA).toStrictEqual({
    from: 'context',
    isRepeatedProp: 'yes',
    isFromPartial: 'oh yes',
  })
  expect(coolPayloadB).toStrictEqual({
    from: 'context',
    isRepeatedProp: 'yes',
    soCool: 'true',
  })
  expect(alonePayload).toStrictEqual({ from: 'context', isAlone: 'true' })
  expect(window.dataLayer).toHaveLength(3)
})
