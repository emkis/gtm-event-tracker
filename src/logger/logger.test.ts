import { createLogger, getLogger, defaultLogger } from './logger'
import type { Logger, LoggerAction } from './types'

function makeMockLogger(): Logger {
  return {
    log: jest.fn().mockName('log'),
    error: jest.fn().mockName('error'),
    warn: jest.fn().mockName('warn'),
  }
}

function makeLogger({ isLogsEnabled = true } = {}) {
  const mockLogger = makeMockLogger()
  return {
    mockLogger,
    ...createLogger({ logger: mockLogger, isEnabled: isLogsEnabled }),
  }
}

it('should create logger without throwing any errors', () => {
  const mockLogger = makeMockLogger()

  expect(() => {
    createLogger({ logger: mockLogger })
  }).not.toThrow()

  expect(() => {
    createLogger({ logger: mockLogger, isEnabled: true })
  }).not.toThrow()
})

it('should not return default logger when logs are disabled', () => {
  const logger = getLogger()
  expect(logger).not.toEqual(defaultLogger)
})

it('should return custom logger witch was provided as the custom logger', () => {
  const { mockLogger, getLogger } = makeLogger()
  const logger = getLogger()
  expect(logger).toBe(mockLogger)
})

it('should call logger methods correctly', () => {
  const { mockLogger, getLogger } = makeLogger()
  const logger = getLogger()

  const simpleLog: LoggerAction = {
    type: 'context-created',
    properties: { something: 'random' },
  }

  function callAllLogFunctions() {
    const logFunctions = [logger.log, logger.warn, logger.error]
    logFunctions.forEach((logFunction) => logFunction(simpleLog))
  }

  callAllLogFunctions()
  expect(mockLogger.log).toHaveBeenNthCalledWith(1, simpleLog)
  expect(mockLogger.warn).toHaveBeenNthCalledWith(1, simpleLog)
  expect(mockLogger.error).toHaveBeenNthCalledWith(1, simpleLog)
})

it('should set a different logger object', () => {
  const { getLogger, setLogger } = makeLogger()
  const initialLogger = getLogger()

  const customLogger: Logger = {
    log: () => null,
    error: () => null,
    warn: () => null,
  }

  setLogger(customLogger)
  const modifiedLogger = getLogger()

  expect(modifiedLogger).not.toBe(initialLogger)
  expect(modifiedLogger).toBe(customLogger)
})
