import type { EventProperties } from '@/shared/data-layer'

/**
 * Available types of log actions.
 * @public
 */
export type LoggerAction =
  | {
      type: 'event'
      contextName?: string
      properties: EventProperties
    }
  | {
      type: 'context-created'
      contextName?: string
      properties: EventProperties
    }
  | {
      type: 'context-updated'
      contextName?: string
      previousProperties: EventProperties
      currentProperties: EventProperties
    }

/**
 * Available method for logs.
 * @public
 */
export type Logger = {
  log: (action: LoggerAction) => void
}

export type LoggerFunctions = Readonly<{
  /**
   * Gets the logger, which contains the methods for triggering logs.
   * @internal
   */
  getLogger: () => Logger

  /**
   * Sets a custom logger.
   * @public
   */
  setLogger: (targetLogger: Logger) => void
}>
