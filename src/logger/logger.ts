import type { LoggerFunctions, Logger } from './types'

type LoggerOptions = Partial<{
  logger: Logger
}>

const defaultLogger: Logger = console

export function createLogger(options: LoggerOptions = {}): LoggerFunctions {
  let logger: Logger = options.logger ?? defaultLogger

  function getLogger() {
    return logger
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
