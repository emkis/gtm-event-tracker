/**
 * Valid object format for track events properties.
 * @public
 */
export type EventProperties = Record<string, string | number | boolean | null>

/**
 * The type-safe and recommended way to interact with the `targetProperty`.
 * By default the `targetProperty` is `window.dataLayer`.
 * @internal
 */
export type DataLayer = Readonly<{
  /**
   * Pushes an event to the `targetProperty`.
   */
  addEvent: (payload: EventProperties) => void
}>
