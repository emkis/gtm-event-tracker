/**
 * Valid object format for track events properties.
 * @public
 */
export type EventProperties = Record<string, string | number>

/**
 * The type-safe and recommended way to interact with `window.dataLayer`.
 * @internal
 */
export type DataLayer = Readonly<{
  /**
   * Pushes an event to the target array.
   */
  addEvent: (payload: EventProperties) => void
}>
