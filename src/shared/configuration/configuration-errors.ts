import { InvalidConfigurationError } from '@/shared/error'

export function throwNoConfigurationProvided() {
  throw new InvalidConfigurationError(
    `You've called configure function without a configuration object.`
  )
}
