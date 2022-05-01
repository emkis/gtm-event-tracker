import { createTrackerContext } from './tracker-context'
import { TrackerContextOptions } from './tracker-context-types'

it('should create context without error', () => {
  expect(() => {
    createTrackerContext({ appName: 'lorem-ipsum', isAnNiceAPI: 'true' })
  }).not.toThrow()

  expect(() => {
    createTrackerContext()
  }).not.toThrow()
})

it('should initialize context with expected properties', () => {
  const contextProperties = { appName: 'sit-dolor', hi: 'bye' }
  const contextOptions: TrackerContextOptions = { name: 'lorem ipsum' }
  const trackContext = createTrackerContext(contextProperties, contextOptions)

  expect(trackContext).toStrictEqual({
    context: {
      value: contextProperties,
      options: contextOptions,
    },
    setProps: expect.any(Function),
  })
})

it('should update context properties', () => {
  const initialContextProps = { appName: 'amet-niat', customerId: 'none' }
  const trackContext = createTrackerContext(initialContextProps)
  expect(trackContext.context.value).toStrictEqual(initialContextProps)

  const updatedContextProps = { appName: 'amet-niat', customerId: 'ju-4d-da' }
  trackContext.setProps(updatedContextProps)
  expect(initialContextProps).not.toEqual(updatedContextProps)
  expect(trackContext.context.value).toStrictEqual(updatedContextProps)
})
