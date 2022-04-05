import type { EventProperties } from '../data-layer';
/**
 * Tracker context scope.
 * @public
 */
export declare type TrackerContext = Readonly<{
    /**
     * Sets context properties.
     *
     * It could be used to set or update properties in this context.
     * @public
     * @example
     * const context = createTrackerContext({ userId: 'not defined' })
     * context.setProps({ userId: '2f9kfo7', foo: 'bar' })
     */
    setProps: (props: EventProperties) => void;
}>;
