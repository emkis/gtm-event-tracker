import { createTrackerContext } from './tracker-context'

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
  const trackContext = createTrackerContext(contextProperties)

  expect(trackContext).toEqual({
    context: {
      value: expect.objectContaining(contextProperties),
    },
    setProps: expect.any(Function),
  })
})

it('should update context properties', () => {
  const initialContextProps = { appName: 'amet-niat', customerId: 'none' }
  const trackContext = createTrackerContext(initialContextProps)
  expect(trackContext.context.value).toMatchObject(initialContextProps)

  const updatedContextProps = { appName: 'amet-niat', customerId: 'ju-4d-da' }
  trackContext.setProps(updatedContextProps)
  expect(trackContext.context.value).toMatchObject(updatedContextProps)
})
