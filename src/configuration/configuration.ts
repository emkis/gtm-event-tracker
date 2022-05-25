import { merge } from 'lodash-es'
import { throwNoConfigurationProvided } from './configuration-errors'
import type { Configurations } from './configuration-types'
import type { PartialDeep } from 'type-fest'

export function createConfiguration() {
  const configurations: Configurations = defaults()

  function defaults(): Configurations {
    return {
      logger: {
        debugAll: false,
        debugEvents: false,
        debugContext: false,
      },
      events: {
        targetProperty: window.dataLayer,
      },
    }
  }

  function get(): Configurations {
    return configurations
  }

  function configure(customConfigs: PartialDeep<Configurations>) {
    const isConfigDefined = Boolean(customConfigs)
    if (!isConfigDefined) throwNoConfigurationProvided()
    merge(configurations, customConfigs)
  }

  return { get, defaults, configure }
}

export const configuration = createConfiguration()

/**
 * It configures custom behaviors.
 * @public
 */
export const { configure } = configuration
