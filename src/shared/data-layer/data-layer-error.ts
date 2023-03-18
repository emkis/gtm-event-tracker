import { EventTrackerError } from '@/shared/error'

export function throwIsServer() {
  const message =
    process.env.NODE_ENV === 'production'
      ? '1'
      : 'Triggering events is not possible on server-side. Make sure to only trigger events after your app is running on the client-side.'

  throw new EventTrackerError(message)
}

export function throwIsNotDefined() {
  const message =
    process.env.NODE_ENV === 'production'
      ? '1'
      : `The targetProperty is not defined. Make sure you didn't forget to add Google Tag Manager's script in your application. If you did but you don't use the default 'window.dataLayer' array, you can set your custom targetProperty with the configure function.`

  throw new EventTrackerError(message)
}

export function throwIsNotArray() {
  const message =
    process.env.NODE_ENV === 'production'
      ? '1'
      : `The targetProperty is not an array. Either you didn't installed Google Tag Manager correctly or you configured the targetProperty incorrectly.`

  throw new EventTrackerError(message)
}
