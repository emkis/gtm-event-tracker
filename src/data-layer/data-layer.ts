import {
  throwIsNotArray,
  throwIsNotDefined,
  throwIsServer,
} from './data-layer-error'
import type { EventProperties, DataLayerFunctions } from './data-layer-types'

export function createDataLayer(): DataLayerFunctions {
  function addEvent(payload: EventProperties) {
    window.dataLayer.push(payload)
  }

  function assertIsAvailable() {
    const isServer = () => typeof window === 'undefined'
    const isDefined = () => typeof window.dataLayer !== 'undefined'
    const isArray = () => Array.isArray(window.dataLayer)

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
