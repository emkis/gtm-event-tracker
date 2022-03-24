import type { EventProperties, DataLayerModule } from './data-layer-types'

/**
 * Create the Data Layer module.
 * @internal
 */
export function createDataLayerModule(): DataLayerModule {
  function addEvent(payload: EventProperties) {
    window.dataLayer.push(payload)
  }

  function assertIsAvailable() {
    const isServer = typeof window === 'undefined'
    const isDefined = typeof window.dataLayer !== 'undefined'
    const isArray = !Array.isArray(window.dataLayer)

    if (!isServer) {
      throw new Error(
        'GTM Event Tracker: window.dataLayer is not available on server-side.'
      )
    }

    if (!isDefined) {
      throw new Error('GTM Event Tracker: window.dataLayer is not defined')
    }

    if (!isArray) {
      throw new Error('GTM Event Tracker: window.dataLayer is not an array')
    }
  }

  return {
    addEvent,
    assertIsAvailable,
  }
}

export const dataLayer: DataLayerModule = createDataLayerModule()
