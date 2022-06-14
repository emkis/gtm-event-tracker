import type { EventProperties } from '@/shared/data-layer'

/**
 * All available configuration options.
 * @public
 */
export type Configurations = {
  debugAll: boolean
  debugEvents: boolean
  debugContext: boolean
  targetProperty: () => EventProperties[]
}
