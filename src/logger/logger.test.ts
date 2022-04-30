import { createLoggerModule, getLogger } from './logger'
import type { Logger } from './types'

function makeMockLogger(): Logger {
  return {
    log: jest.fn().mockName('log'),
    error: jest.fn().mockName('error'),
    warn: jest.fn().mockName('warn'),
  }
}

function makeLoggerModule() {
  const mockLogger = makeMockLogger()
  return {
    mockLogger,
    ...createLoggerModule({ logger: mockLogger }),
  }
}

it('should create logger module without throwing error', () => {
  const mockLogger = makeMockLogger()

  expect(() => {
    createLoggerModule({ logger: mockLogger })
  }).not.toThrow()
})

it('should initialize logger with default logger', () => {
  const logger = getLogger()
  expect(logger).toEqual(console)
})

it('should initialize logger module with provided logger', () => {
  const { mockLogger, getLogger } = makeLoggerModule()

  const logger = getLogger()
  expect(logger).toEqual(mockLogger)
})

it('should call logger methods correctly', () => {
  const { mockLogger, getLogger } = makeLoggerModule()
  const logger = getLogger()

  const simpleLog = 'simple log'
  const customizedLog = ['customized log', { type: 'initialized' }]

  function callAllLogMethods() {
    const logMethods = [logger.log, logger.warn, logger.error]

    logMethods.forEach((logMethod) => {
      logMethod(simpleLog)
      logMethod(...customizedLog)
    })
  }

  callAllLogMethods()
  expect(mockLogger.log).toHaveBeenNthCalledWith(1, simpleLog)
  expect(mockLogger.log).toHaveBeenNthCalledWith(2, ...customizedLog)
  expect(mockLogger.warn).toHaveBeenNthCalledWith(1, simpleLog)
  expect(mockLogger.warn).toHaveBeenNthCalledWith(2, ...customizedLog)
  expect(mockLogger.error).toHaveBeenNthCalledWith(1, simpleLog)
  expect(mockLogger.error).toHaveBeenNthCalledWith(2, ...customizedLog)
})

it('should set a different logger object', () => {
  const { getLogger, setLogger } = makeLoggerModule()
  const initialLogger = getLogger()

  const customLogger: Logger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  }

  setLogger(customLogger)
  const modifiedLogger = getLogger()
  expect(modifiedLogger).not.toBe(initialLogger)
})
