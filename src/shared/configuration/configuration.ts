import { throwNoConfigurationProvided } from './configuration-errors'
import { removeEmptyPropsFromObject } from './configuration-utils'
import type { Configurations } from './configuration-types'

export function createConfiguration() {
  const configurations: Configurations = defaults()

  function defaults(): Configurations {
    return {
      debugAll: false,
      debugEvents: false,
      debugContext: false,
      targetProperty: () => window.dataLayer,
    }
  }

  function get(): Configurations {
    return configurations
  }

  function setConfigurations(configs: object) {
    const safeConfigValues = removeEmptyPropsFromObject(configs)
    Object.assign(configurations, safeConfigValues)
  }

  function configure(customConfigs: Partial<Configurations>) {
    const isConfigDefined = Boolean(customConfigs)
    if (!isConfigDefined) throwNoConfigurationProvided()
    setConfigurations(customConfigs)
  }

  return { get, defaults, configure }
}

export const configuration = createConfiguration()

/**
 * It configures custom behaviors.
 * @public
 */
export const { configure } = configuration
