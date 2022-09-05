import type { EventProperties } from '@/shared/data-layer'

/**
 * All available configuration options.
 * @public
 */
export type Configurations = {
  /**
   * Enables logs for everything, is equivalent of setting all `debug*` options to `true`.
   */
  debugAll: boolean
  /**
   * Enables logging track events, these events are logged when the `trackEvent` function is called.
   */
  debugEvents: boolean
  /**
   * Enables logs for context operations.
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
