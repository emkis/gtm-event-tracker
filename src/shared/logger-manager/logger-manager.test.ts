import { faker } from '@faker-js/faker'
import { createLoggerManager } from './logger-manager'
import { configuration } from '@/shared/configuration'
import type { Logger } from '@/logger'

function makeLoggerManager(configurations = configuration.defaults()) {
  const mockLogger: Logger = { log: jest.fn().mockName('logger.log') }

  const loggerManager = createLoggerManager({
    getLogger: () => mockLogger,
    configurations,
  })

  return {
    loggerManager,
    mockLogger,
    mockConfigurations: configurations,
  }
}

function triggerContextCreated(manager: Logger) {
  manager.log({
    type: 'context-created',
    properties: {},
    contextName: faker.internet.domainName(),
  })
}

function triggerContextUpdated(manager: Logger) {
  manager.log({
    type: 'context-updated',
    previousProperties: {},
    currentProperties: {},
  })
}

function triggerEvent(manager: Logger) {
  manager.log({
    type: 'event',
    properties: {},
  })
}

function triggerInvalid(manager: Logger) {
  manager.log({
    // @ts-expect-error testing edge cases here
    type: faker.internet.domainName(),
    payload: 'invalid',
  })
}

it('should not log anything with default configurations', () => {
  const { loggerManager, mockLogger } = makeLoggerManager()

  triggerContextCreated(loggerManager)
  triggerContextUpdated(loggerManager)
  triggerEvent(loggerManager)
  triggerInvalid(loggerManager)

  expect(mockLogger.log).not.toHaveBeenCalled()
})

it('should not call logger with invalid log type', () => {
  const { loggerManager, mockLogger } = makeLoggerManager({
    targetProperty: () => [],
    debugAll: true,
    debugContext: true,
    debugEvents: true,
  })

  triggerInvalid(loggerManager)
  expect(mockLogger.log).not.toHaveBeenCalled()
})

it('should log everything when debugAll is true', () => {
  const { loggerManager, mockLogger } = makeLoggerManager({
    targetProperty: () => [],
    debugAll: true,
    debugContext: false,
    debugEvents: false,
  })

  triggerContextCreated(loggerManager)
  triggerContextUpdated(loggerManager)
  triggerEvent(loggerManager)

  expect(mockLogger.log).toHaveBeenCalledTimes(3)
})

it('should log events only when debugEvents is true', () => {
  const { loggerManager, mockLogger } = makeLoggerManager({
    targetProperty: () => [],
    debugEvents: true,
    debugAll: false,
    debugContext: false,
  })

  triggerContextUpdated(loggerManager)
  triggerEvent(loggerManager)

  expect(mockLogger.log).toHaveBeenCalledTimes(1)
  expect(mockLogger.log).toHaveBeenCalledWith(
    expect.objectContaining({ type: 'event' })
  )
})

it('should log context only when debugContext is true', () => {
  const { loggerManager, mockLogger } = makeLoggerManager({
    targetProperty: () => [],
    debugContext: true,
    debugEvents: false,
    debugAll: false,
  })

  triggerContextUpdated(loggerManager)
  triggerEvent(loggerManager)
  triggerContextCreated(loggerManager)

  expect(mockLogger.log).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({ type: 'context-updated' })
  )
  expect(mockLogger.log).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({ type: 'context-created' })
  )
  expect(mockLogger.log).toHaveBeenCalledTimes(2)
})
