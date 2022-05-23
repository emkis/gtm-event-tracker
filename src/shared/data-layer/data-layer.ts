import {
  throwIsNotArray,
  throwIsNotDefined,
  throwIsServer,
} from './data-layer-error'
import type { EventProperties, DataLayer } from './data-layer-types'

type DataLayerOptions = Partial<{
  targetProperty: EventProperties[]
}>

export function createDataLayer(options: DataLayerOptions = {}): DataLayer {
  function getTargetProperty() {
    const defaultTarget: EventProperties[] = window.dataLayer
    return options.targetProperty ?? defaultTarget
  }

  function addEvent(payload: EventProperties) {
    checkTargetPropertyAvailability()
    const targetProperty = getTargetProperty()
    targetProperty.push(payload)
  }

  function checkTargetPropertyAvailability() {
    const isServer = () => typeof window === 'undefined'
    const isDefined = () => typeof getTargetProperty() !== 'undefined'
    const isArray = () => Array.isArray(getTargetProperty())

    if (isServer()) throwIsServer()
    else if (!isDefined()) throwIsNotDefined()
    else if (!isArray()) throwIsNotArray()
  }

  return { addEvent }
}

export const dataLayer: DataLayer = createDataLayer()
