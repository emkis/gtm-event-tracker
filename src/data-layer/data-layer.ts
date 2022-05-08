import {
  throwIsNotArray,
  throwIsNotDefined,
  throwIsServer,
} from './data-layer-error'
import type { EventProperties, DataLayerFunctions } from './data-layer-types'

export function getDefaultTargetProperty() {
  return window.dataLayer
}

export function createDataLayer(): DataLayerFunctions {
  function addEvent(payload: EventProperties) {
    const targetProperty = getDefaultTargetProperty()
    targetProperty.push(payload)
  }

  function assertIsAvailable() {
    const isServer = () => typeof window === 'undefined'
    const isDefined = () => typeof getDefaultTargetProperty() !== 'undefined'
    const isArray = () => Array.isArray(getDefaultTargetProperty())

    if (isServer()) throwIsServer()
    else if (!isDefined()) throwIsNotDefined()
    else if (!isArray()) throwIsNotArray()
  }

  return {
    addEvent,
    assertIsAvailable,
  }
}

export const dataLayer: DataLayerFunctions = createDataLayer()
