import { logContextCreated, logContextUpdated } from './tracker-context-logs'
import type { EventProperties } from '@/shared/data-layer'
import type {
  TrackerContext,
  TrackerContextOptions,
} from './tracker-context-types'

/**
 * Creates a context for track events.
 *
 * All properties in this context will be injected into every
 * track event that uses this context.
 *
 * @param initialProps - Properties which will initialize the context.
 * @param options - Options for customizing the Tracker Context.
 * @public
 * @example
 * createTrackerContext({
 *   appVersion: '1.2.7',
 *   userId: getUserIdFromSomewhere()
 *   // Properties you need to send in all track events
 * })
 */
export function createTrackerContext(
  initialProps: EventProperties = {},
  options: TrackerContextOptions = {}
): TrackerContext {
  const context = {
    options: { ...options },
    value: { ...initialProps },
  }

  function getProps(): EventProperties {
    return context.value
  }

  function setProps(props: EventProperties) {
    const currentProps = getProps()
    const nextProps = { ...props }

    logContextUpdated({
      contextName: context.options.name,
      currentProps,
      newProps: nextProps,
    })

    context.value = nextProps
  }

  logContextCreated({
    contextName: context.options.name,
    properties: getProps(),
  })

  return { context, setProps }
}
