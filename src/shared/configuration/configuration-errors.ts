import { EventTrackerError } from '@/shared/error'

export function throwNoConfigurationProvided() {
  const message =
    process.env.NODE_ENV === 'production'
      ? '0'
      : `You've called configure function without a configuration object.`

  throw new EventTrackerError(message)
}
