/**
 * Valid object format for track events properties.
 * @public
 */
export type EventProperties = Record<string, string | number>

/**
 * The type-safe and recommended way to interact with `window.dataLayer`.
 * @internal
 */
export type DataLayerFunctions = Readonly<{
  /**
   * Pushes an event to the target array.
   */
  addEvent: (payload: EventProperties) => void

  /**
   * Checks if the targetProperty is available.
   *
   * This array is injected in the `window` by Google Tag Manager, so you
   * just need to have this dependency installed correctly.
   */
  checkTargetPropertyAvailability: () => void
}>
