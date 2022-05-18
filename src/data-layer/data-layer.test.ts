import { createDataLayer } from './data-layer'
import type { EventProperties } from './data-layer-types'
import { WarningError } from '../error'

function makeDataLayer() {
  const mockTargetProperty: EventProperties[] = []
  return {
    mockTargetProperty,
    dataLayer: createDataLayer({ targetProperty: mockTargetProperty }),
  }
}

function getDefaultTargetProperty() {
  return window.dataLayer
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setDefaultTargetProperty(value: any) {
  window.dataLayer = value
}

beforeEach(() => {
  setDefaultTargetProperty([])
})

it('should return different data layer objects', () => {
  const { dataLayer: dataLayerA } = makeDataLayer()
  const { dataLayer: dataLayerB } = makeDataLayer()
  const dataLayerC = createDataLayer({ targetProperty: [] })
  expect(dataLayerA).not.toBe(dataLayerB)
  expect(dataLayerB).not.toBe(dataLayerC)
})

it('should push events to custom target property', () => {
  const { dataLayer, mockTargetProperty } = makeDataLayer()
  const eventPayloadA = { hello: 'there', isTest: 'yes' }
  const eventPayloadB = { random: 'event', key: 'lorem' }

  dataLayer.addEvent(eventPayloadA)
  dataLayer.addEvent(eventPayloadB)
  expect(mockTargetProperty).toHaveLength(2)
  expect(mockTargetProperty).toEqual([eventPayloadA, eventPayloadB])
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
  expect(dataLayer.assertIsAvailable).toThrowError(WarningError)
  expect(dataLayer.assertIsAvailable).toThrowError(
    'Triggering events is not possible on server-side.'
  )
  restoreWindow()
})

it('should throw error if targetProperty is not available', () => {
  setDefaultTargetProperty(undefined)

  const dataLayer = createDataLayer()
  expect(dataLayer.assertIsAvailable).toThrowError(WarningError)
  expect(dataLayer.assertIsAvailable).toThrowError(
    'The targetProperty is not defined.'
  )
})

it('should throw error if targetProperty is not an array', () => {
  setDefaultTargetProperty({})

  const dataLayer = createDataLayer()
  expect(dataLayer.assertIsAvailable).toThrowError(WarningError)
  expect(dataLayer.assertIsAvailable).toThrowError(
    'The targetProperty is not an array.'
  )
})
