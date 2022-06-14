import type { EventProperties } from '@/shared/data-layer'

/**
 * All available configuration options.
 * @public
 */
export type Configurations = {
  /**
   * It logs everything, is equivalent of setting all `debug` options to `true`.
   */
  debugAll: boolean
  /**
   * It logs events. These events are logged when you call `trackEvent`.
   */
  debugEvents: boolean
  /**
   * It logs context operations.
   *
   * These events are logged when you call `createTrackerContext`,
   * and when you call `setProps` in a created tracker context.
   */
  debugContext: boolean
  /**
   * Array which events are going to be pushed into.
   *
   * The default value is `window.dataLayer`.
   */
  targetProperty: () => EventProperties[]
}
