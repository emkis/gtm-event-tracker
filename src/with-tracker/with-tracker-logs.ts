import type { EventProperties } from '@/shared/data-layer'
import { loggerManager } from '@/shared/logger-manager'

type LogEventOptions = {
  properties: EventProperties
  contextName?: string
}

export function logEvent(options: LogEventOptions) {
  const { properties, contextName } = options
  loggerManager.log({ type: 'event', properties, contextName })
}
