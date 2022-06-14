import type { EventProperties } from '@/shared/data-layer'
import { loggerManager } from '@/shared/logger-manager'

export function logEvent(properties: EventProperties) {
  loggerManager.log({ type: 'event', properties })
}
