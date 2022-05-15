/**
 * Available options for the logger.
 * @public
 */
export type LoggerConfigurations = {
  debugAll: boolean
  debugEvents: boolean
  debugContext: boolean
}

/**
 * All available configuration options.
 * @public
 */
export type Configurations = {
  logger: LoggerConfigurations
}
