import {
  throwIsNotArray,
  throwIsNotDefined,
  throwIsServer,
} from './data-layer-error'
import type { EventProperties, DataLayerFunctions } from './data-layer-types'

type DataLayerOptions = Partial<{
  targetProperty: EventProperties[]
}>

export function createDataLayer(
  options: DataLayerOptions = {}
): DataLayerFunctions {
  function getTargetProperty() {
    const defaultTarget: EventProperties[] = window.dataLayer
    return options.targetProperty ?? defaultTarget
  }

  function addEvent(payload: EventProperties) {
    const targetProperty = getTargetProperty()
    targetProperty.push(payload)
  }

  function assertIsAvailable() {
    const isServer = () => typeof window === 'undefined'
    const isDefined = () => typeof getTargetProperty() !== 'undefined'
    const isArray = () => Array.isArray(getTargetProperty())

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
