import { createDataLayer, getDefaultTargetProperty } from './data-layer'
import { WarningError } from '../error'

function makeDataLayer() {
  return createDataLayer()
}

function resetDefaultTargetProperty() {
  window.dataLayer = []
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setDefaultTargetProperty(value: any) {
  window.dataLayer = value
}

beforeEach(resetDefaultTargetProperty)

it('should return the correct default targetProperty', () => {
  const targetProperty = getDefaultTargetProperty()
  expect(targetProperty).toBe(window.dataLayer)
})

it('should push events to global data layer', () => {
  const dataLayer = makeDataLayer()
  const targetProperty = getDefaultTargetProperty()
  const eventPayloadA = { hello: 'there', isTest: 'yes' }
  const eventPayloadB = { random: 'event', key: 'lorem' }
  dataLayer.addEvent(eventPayloadA)
  dataLayer.addEvent(eventPayloadB)
  expect(targetProperty).toEqual([eventPayloadA, eventPayloadB])
})

it('should throw error if targetProperty is not available', () => {
  setDefaultTargetProperty(undefined)
  const dataLayer = makeDataLayer()
  expect(dataLayer.assertIsAvailable).toThrowError(WarningError)
  expect(dataLayer.assertIsAvailable).toThrowError(
    'The targetProperty is not defined.'
  )
})

it('should throw error if targetProperty is not an array', () => {
  setDefaultTargetProperty({})
  const dataLayer = makeDataLayer()
  expect(dataLayer.assertIsAvailable).toThrowError(WarningError)
  expect(dataLayer.assertIsAvailable).toThrowError(
    'The targetProperty is not an array.'
  )
})
