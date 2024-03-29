import { createDataLayer } from './data-layer'
import type { EventProperties } from './data-layer-types'
import { EventTrackerError } from '@/shared/error'
import { configuration, Configurations } from '@/shared/configuration'

type DataLayerFactory = Partial<{
  targetProperty: () => EventProperties[] | null | object
}>

function makeDataLayer(options?: DataLayerFactory) {
  const localTargetProperty: EventProperties[] = []
  const getLocalTargetProperty = () => localTargetProperty
  const targetProperty = options?.targetProperty ?? getLocalTargetProperty

  const mockConfiguration: Configurations = {
    ...configuration.defaults(),
    targetProperty: targetProperty as () => EventProperties[],
  }

  return {
    mockConfiguration,
    mockTargetProperty: targetProperty,
    dataLayer: createDataLayer({ configurations: mockConfiguration }),
  }
}

function getDefaultTargetProperty() {
  const { targetProperty } = configuration.defaults()
  return targetProperty()
}

it('should return different data layer objects', () => {
  const { dataLayer: dataLayerA } = makeDataLayer()
  const { dataLayer: dataLayerB } = makeDataLayer()
  const dataLayerC = createDataLayer()
  expect(dataLayerA).not.toBe(dataLayerB)
  expect(dataLayerB).not.toBe(dataLayerC)
})

it('should push events to custom target property', () => {
  const { dataLayer, mockTargetProperty } = makeDataLayer()
  const eventPayloadA = { hello: 'there', isTest: 'yes' }
  const eventPayloadB = { random: 'event', key: 'lorem' }

  dataLayer.addEvent(eventPayloadA)
  dataLayer.addEvent(eventPayloadB)
  expect(mockTargetProperty()).toHaveLength(2)
  expect(mockTargetProperty()).toEqual([eventPayloadA, eventPayloadB])
})

it('should push events to default target property', () => {
  const dataLayer = createDataLayer()
  const defaultTargetProperty = getDefaultTargetProperty()
  const eventPayloadA = { hello: 'there', isTest: 'yes' }
  const eventPayloadB = { random: 'event', key: 'lorem' }

  dataLayer.addEvent(eventPayloadA)
  dataLayer.addEvent(eventPayloadB)
  expect(defaultTargetProperty).toHaveLength(2)
  expect(defaultTargetProperty).toEqual([eventPayloadA, eventPayloadB])
})

it('should throw error if is server side', () => {
  const { window } = globalThis
  // @ts-expect-error removing to test this use case
  const removeWindowFromEnvironment = () => delete globalThis.window
  const restoreWindow = () => (globalThis.window = window)

  removeWindowFromEnvironment()
  const dataLayer = createDataLayer()
  expect(dataLayer.addEvent).toThrowError(EventTrackerError)
  restoreWindow()
})

it('should throw error if targetProperty is not available', () => {
  const { dataLayer } = makeDataLayer({ targetProperty: () => null })
  expect(dataLayer.addEvent).toThrowError(EventTrackerError)
})

it('should throw error if targetProperty is not an array', () => {
  const { dataLayer } = makeDataLayer({ targetProperty: () => ({}) })
  expect(dataLayer.addEvent).toThrowError(EventTrackerError)
})

it('should be able to push event when targetProperty is available', () => {
  const { dataLayer, mockConfiguration } = makeDataLayer({
    targetProperty: () => null,
  })
  expect(dataLayer.addEvent).toThrowError(EventTrackerError)

  const customTargetProperty: EventProperties[] = []
  mockConfiguration.targetProperty = () => customTargetProperty
  const eventPayload: EventProperties = { some: 'data' }
  expect(() => {
    dataLayer.addEvent(eventPayload)
  }).not.toThrow()
  expect(mockConfiguration.targetProperty()).toEqual([eventPayload])
})
