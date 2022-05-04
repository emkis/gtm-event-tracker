import type { LoggerFunctions, Logger } from './types'

type LoggerOptions = {
  logger: Logger
  isEnabled?: boolean
}

export const defaultLogger: Logger = console
const disabledLogger: Logger = {
  log: () => null,
  warn: () => null,
  error: () => null,
}

export function createLogger(options: LoggerOptions): LoggerFunctions {
  const isLogsEnabled = options.isEnabled ?? false
  let logger: Logger = options.logger

  function getLogger() {
    return isLogsEnabled ? logger : disabledLogger
  }

  function setLogger(targetLogger: Logger) {
    logger = targetLogger
  }

  return { getLogger, setLogger }
}

const loggerFunctions = createLogger({ logger: defaultLogger })

/**
 * Sets a custom logger.
 * @public
 */
export const { setLogger } = loggerFunctions
export const { getLogger } = loggerFunctions
