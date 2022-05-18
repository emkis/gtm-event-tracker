import { createLogger } from './logger'
import type { Logger, LoggerAction } from './types'

function makeMockLogger(): Logger {
  return {
    log: jest.fn().mockName('log'),
  }
}

function makeLogger() {
  const mockLogger = makeMockLogger()
  return {
    mockLogger,
    ...createLogger({ logger: mockLogger }),
  }
}

it('should create logger without throwing any errors', () => {
  const mockLogger = makeMockLogger()

  expect(() => createLogger()).not.toThrow()
  expect(() => createLogger({ logger: mockLogger })).not.toThrow()
})

it('should return different logger objects', () => {
  const loggerA = createLogger()
  const loggerB = createLogger()
  const loggerC = createLogger({ logger: makeMockLogger() })
  expect(loggerA).not.toBe(loggerB)
  expect(loggerB).not.toBe(loggerC)
})

it('should return custom logger witch was provided as the custom logger', () => {
  const { mockLogger, getLogger } = makeLogger()
  const logger = getLogger()
  expect(logger).toBe(mockLogger)
})

it('should call logger methods correctly', () => {
  const { mockLogger, getLogger } = makeLogger()
  const logger = getLogger()
  const simpleLogPayload: LoggerAction = {
    type: 'context-created',
    properties: { something: 'random' },
  }

  function callAllLogFunctions() {
    const logFunctions = [logger.log]
    logFunctions.forEach((logFunction) => logFunction(simpleLogPayload))
  }

  callAllLogFunctions()
  expect(mockLogger.log).toHaveBeenNthCalledWith(1, simpleLogPayload)
})

it('should set a different logger object', () => {
  const { getLogger, setLogger } = makeLogger()
  const initialLogger = getLogger()

  const customLogger: Logger = {
    log: () => null,
  }

  setLogger(customLogger)
  const modifiedLogger = getLogger()

  expect(modifiedLogger).not.toBe(initialLogger)
  expect(modifiedLogger).toBe(customLogger)
})
