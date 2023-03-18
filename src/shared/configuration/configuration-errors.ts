import { EventTrackerError } from '@/shared/error'

export function throwNoConfigurationProvided() {
  throw new EventTrackerError(
    `You've called configure function without a configuration object.`
  )
}
