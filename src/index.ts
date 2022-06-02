export type { EventProperties } from '@/shared/data-layer'

export { createTrackerContext } from '@/tracker-context'
export type { TrackerContext, TrackerContextOptions } from '@/tracker-context'

export { withTrackerContext } from '@/with-tracker'
export type { TrackModule, SubtractEventProperties } from '@/with-tracker'

export { setLogger } from '@/logger'
export type { Logger, LoggerAction } from '@/logger'

export { configure } from '@/configuration'
export type {
  Configurations,
  LoggerConfigurations,
  EventsConfigurations,
} from '@/configuration'
