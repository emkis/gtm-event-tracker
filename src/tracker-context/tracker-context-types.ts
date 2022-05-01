import type { EventProperties } from '../data-layer'

/**
 * Options for customizing the Tracker Context.
 * @public
 */
export type TrackerContextOptions = {
  /**
   * Will log every interaction with this context, such as:
   * Context creation, Context updated, and Triggered events.
   */
  debug?: boolean

  /**
   * The name for this context.
   *
   * It can be helpful when you are using the Logger and your application has more than one context.
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
   * Sets context properties.
   *
   * It could be used to set or update properties in this context.
   * @public
   * @example
   * const context = createTrackerContext({ userId: 'not defined' })
   * context.setProps({ userId: '2f9kfo7', foo: 'bar' })
   */
  setProps: (props: EventProperties) => void
}>
