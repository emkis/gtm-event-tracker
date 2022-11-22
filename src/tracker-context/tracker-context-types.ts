import type { EventProperties } from '@/shared/data-layer'

/**
 * Options for customizing the Tracker Context.
 * @public
 */
export type TrackerContextOptions = {
  /**
   * The name of this tracker context that is used by the Logger.
   *
   * Is only useful if your application has more than one tracker context, and you want to be able to identify them by their names.
   */
  name?: string
}

/**
 * Tracker context scope.
 * @public
 */
export type TrackerContext = Readonly<{
  /**
   * An object containing the context properties.
   * @internal
   */
  context: {
    readonly value: EventProperties
    readonly options: TrackerContextOptions
  }

  /**
   * Updates the value of this tracker context.
   *
   * You have full control of the values of this tracker context with
   * this function, you  can change them completely. After this change,
   * all new track events that use this tracker context
   * with `withTrackerContext` will contain the updated data.
   * @public
   * @example
   * const context = createTrackerContext({ userId: 'not defined' })
   * context.setProps({ userId: '2f9kfo7', foo: 'bar' })
   */
  setProps(props: EventProperties): void
}>
