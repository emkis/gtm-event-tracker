import { createConfiguration } from './configuration'
import { InvalidConfigurationError } from '@/error'
import type { Configurations } from './configuration-types'

const defaultConfigurations = {
  logger: {
    debugAll: false,
    debugEvents: false,
    debugContext: false,
  },
} as const

it('should not change any configurations', () => {
  const configuration = createConfiguration()

  configuration.configure({})
  expect(configuration.get()).toEqual(defaultConfigurations)

  configuration.configure({ logger: undefined })
  expect(configuration.get()).toEqual(defaultConfigurations)
})

it('should change logger configurations', () => {
  const configuration = createConfiguration()
  const modifiedConfigurations: Partial<Configurations> = {
    logger: {
      debugAll: true,
      debugContext: true,
      debugEvents: true,
    },
  }

  configuration.configure(modifiedConfigurations)
  const currentConfigurations = configuration.get()
  expect(currentConfigurations).not.toEqual(defaultConfigurations)
  expect(currentConfigurations).toEqual(modifiedConfigurations)
})
