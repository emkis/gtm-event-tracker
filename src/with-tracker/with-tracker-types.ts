import type { EventProperties } from '@/data-layer'

/**
 * Will subtract `PropsToSubtract` type from `OriginalProps` type. And ensure
 * that those properties are compatible with a track event type.
 * @public
 */
export type SubtractEventProperties<OriginalProps, PropsToSubtract> = Omit<
  OriginalProps,
  keyof PropsToSubtract
> &
  EventProperties

/**
 * Functions responsible for triggering track events.
 * @public
 */
export type TrackModule<CustomEventProperties extends EventProperties> = {
  /**
   * Triggers a track event.
   *
   * Use this function if you don't need to trigger multiple events
   * with repeated properties.
   *
   * @param eventProps - Properties of your event.
   * @example
   * trackEvent({
   *   action: 'new account',
   *   category: 'pro plan',
   *   foo: 'bar',
   *   userId: '...',
   * })
   */
  trackEvent: (eventProps: CustomEventProperties & EventProperties) => void

  /**
   * A partial function that returns the `trackEvent` function with the
   * repeated properties injected as props.
   *
   * Use this function when you need to track multiple events with
   * the same properties.
   *
   * @param repeatedProps - Properties that you need in multiple events.
   * @example
   * const trackNewAccount = setRepeatedProps({
   *   action: 'new account'
   * })
   *
   * trackNewAccount({ category: 'pro plan', lorem: 'ipsum' })
   * trackNewAccount({ category: 'business plan', sit: 'dolor' })
   */
  setRepeatedProps: <RepeatedProps extends Partial<CustomEventProperties>>(
    repeatedProps: RepeatedProps
  ) => (
    remainingProps: SubtractEventProperties<
      CustomEventProperties,
      RepeatedProps
    >
  ) => void
}
