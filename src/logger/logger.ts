import type { LoggerFunctions, Logger } from './logger-types'

type LoggerOptions = Partial<{
  logger: Logger
}>

export function createLogger(options: LoggerOptions = {}): LoggerFunctions {
  const defaultLogger: Logger = console
  let logger: Logger = options.logger ?? defaultLogger

  function getLogger() {
    return logger
  }

  function setLogger(targetLogger: Logger) {
    logger = targetLogger
  }

  return { getLogger, setLogger }
}

const loggerFunctions = createLogger()

/**
 * Sets a custom logger.
 * @public
 */
export const { setLogger } = loggerFunctions
export const { getLogger } = loggerFunctions
