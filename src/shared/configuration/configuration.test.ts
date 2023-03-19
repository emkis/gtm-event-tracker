import { createConfiguration } from './configuration'
import { EventTrackerError } from '@/shared/error'
import type { Configurations } from './configuration-types'

const defaultConfigurations = {
  debugAll: false,
  debugEvents: false,
  debugContext: false,
  targetProperty: expect.any(Function),
} as const

it('should initialize configuration with default values', () => {
  const configuration = createConfiguration()
  const initialConfigs = configuration.get()
  const defaultConfigs = configuration.defaults()

  expect(initialConfigs).toEqual(defaultConfigurations)
  expect(defaultConfigs).toEqual(defaultConfigurations)
})

it('should return a new object with default', () => {
  const configuration = createConfiguration()
  const defaultConfigsA = configuration.defaults()
  const defaultConfigsB = configuration.defaults()
  expect(defaultConfigsA).not.toBe(defaultConfigsB)
})

it('should return the same configuration reference', () => {
  const configuration = createConfiguration()
  const configsA = configuration.get()
  const configsB = configuration.get()
  expect(configsA).toBe(configsB)

  configuration.configure({
    debugEvents: true,
    debugAll: false,
    debugContext: false,
  })
  const configsC = configuration.get()
  expect(configsC).toBe(configsA)
})

it('should throw error if configure is called without arguments', () => {
  const configuration = createConfiguration()
  // @ts-expect-error I don't want to provide on purpose
  const setNoConfiguration = () => configuration.configure()

  expect(setNoConfiguration).toThrowError(EventTrackerError)
  expect(setNoConfiguration).toThrowError(`You've called configure function`)
})

it('should not throw error if configure is called with an argument', () => {
  const configuration = createConfiguration()
  const setConfiguration = () => configuration.configure({})
  expect(setConfiguration).not.toThrowError(EventTrackerError)
})

it('should not change any configurations', () => {
  const configuration = createConfiguration()

  configuration.configure({})
  expect(configuration.get()).toEqual(defaultConfigurations)

  configuration.configure({ debugAll: undefined })
  expect(configuration.get()).toEqual(defaultConfigurations)

  configuration.configure({ targetProperty: undefined })
  expect(configuration.get()).toEqual(defaultConfigurations)
})

it('should change specific configurations', () => {
  const configuration = createConfiguration()
  const modifiedConfigurations: Partial<Configurations> = {
    debugAll: true,
    debugContext: true,
    debugEvents: true,
    targetProperty: defaultConfigurations.targetProperty,
  }

  configuration.configure(modifiedConfigurations)
  const currentConfigurations = configuration.get()
  expect(currentConfigurations).not.toEqual(defaultConfigurations)
  expect(currentConfigurations).toEqual(modifiedConfigurations)
})
