import type { EventProperties } from '@/data-layer'
import { getLogger } from '@/logger'

export function logEvent(properties: EventProperties) {
  const logger = getLogger()
  logger.log({ type: 'event', properties })
}
