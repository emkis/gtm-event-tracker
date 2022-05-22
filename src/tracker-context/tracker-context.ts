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
 * @param initialProps - Properties witch will initialize the context.
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
    const updatedProps = { ...props }
    context.value = updatedProps
  }

  function handleSetProps(props: EventProperties) {
    const currentProps = getProps()
    const newPropsCopy = { ...props }

    logContextUpdated({
      contextName: context.options.name,
      currentProps,
      newProps: newPropsCopy,
    })
    setProps(newPropsCopy)
  }

  logContextCreated({
    contextName: context.options.name,
    properties: getProps(),
  })

  return {
    context,
    setProps: handleSetProps,
  }
}
