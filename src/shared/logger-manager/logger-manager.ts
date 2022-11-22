import { getLogger } from '@/logger'
import { configuration } from '@/shared/configuration'
import type { Configurations } from '@/shared/configuration'
import type { Logger, LoggerAction } from '@/logger'

type LoggerManagerOptions = Partial<{
  configurations: Configurations
  getLogger: () => Logger
}>

export function createLoggerManager(
  options: LoggerManagerOptions = {}
): Logger {
  function getConfiguration(): Configurations {
    return options.configurations ?? configuration.get()
  }

  function getLocalLogger(): Logger {
    return options.getLogger ? options.getLogger() : getLogger()
  }

  function isActionTypeEnabled({ type }: LoggerAction) {
    const isAllEnabled = () => getConfiguration().debugAll
    const isContextEnabled = () => getConfiguration().debugContext
    const isEventsEnabled = () => getConfiguration().debugEvents

    const validate = (isEnabled: () => boolean): boolean => {
      return isAllEnabled() || isEnabled()
    }

    const validator = new Map<typeof type, boolean>([
      ['event', validate(isEventsEnabled)],
      ['context-created', validate(isContextEnabled)],
      ['context-updated', validate(isContextEnabled)],
    ])

    return validator.get(type)!
  }

  function log(action: LoggerAction) {
    const logger = getLocalLogger()
    isActionTypeEnabled(action) && logger.log(action)
  }

  return { log }
}

export const loggerManager = createLoggerManager()
