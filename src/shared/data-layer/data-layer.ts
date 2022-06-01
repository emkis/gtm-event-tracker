import {
  throwIsNotArray,
  throwIsNotDefined,
  throwIsServer,
} from './data-layer-error'
import { configuration, Configurations } from '@/configuration'
import type { EventProperties, DataLayer } from './data-layer-types'

type DataLayerOptions = Partial<{
  configurations: Configurations
}>

export function createDataLayer(options: DataLayerOptions = {}): DataLayer {
  function getConfiguration(): Configurations {
    return options.configurations ?? configuration.get()
  }

  function getTargetProperty() {
    const configurations = getConfiguration()
    return configurations.events.targetProperty()
  }

  function addEvent(payload: EventProperties) {
    checkTargetPropertyAvailability()
    const targetProperty = getTargetProperty()
    targetProperty.push(payload)
  }

  function checkTargetPropertyAvailability() {
    const isServer = () => typeof window === 'undefined'
    const isDefined = () => Boolean(getTargetProperty())
    const isArray = () => Array.isArray(getTargetProperty())

    if (isServer()) throwIsServer()
    else if (!isDefined()) throwIsNotDefined()
    else if (!isArray()) throwIsNotArray()
  }

  return { addEvent }
}

export const dataLayer: DataLayer = createDataLayer()
