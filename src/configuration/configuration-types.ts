import type { EventProperties } from '@/shared/data-layer'

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
 * Available options for events.
 * @public
 */
export type EventsConfigurations = {
  targetProperty: EventProperties[]
}

/**
 * All available configuration options.
 * @public
 */
export type Configurations = {
  logger: LoggerConfigurations
  events: EventsConfigurations
}
