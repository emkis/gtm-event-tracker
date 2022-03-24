/**
 * Valid object format for track events properties.
 * @public
 */
export type EventProperties = Record<string, string | number>

/**
 * The type-safe and recommended way for you to interact with `window.dataLayer`.
 * @public
 */
export type DataLayerModule = Readonly<{
  /**
   * Pushes an event to `window.dataLayer`.
   * @public
   */
  addEvent: (payload: EventProperties) => void

  /**
   * Asserts `window.dataLayer` is available.
   *
   * This array is injected in the `window` by Google Tag Manager, so you
   * just need to have this dependency installed correctly.
   * @public
   */
  assertIsAvailable: () => void
}>

/**
 * Options for customizing the Data Layer module.
 * @internal
 */
export type DataLayerModuleOptions = {
  debug?: boolean
}
