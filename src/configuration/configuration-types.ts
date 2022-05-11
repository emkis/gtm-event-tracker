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
 * All available configurations for this package.
 * @public
 */
export type Configurations = {
  logger: LoggerConfigurations
}
