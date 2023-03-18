import { EventTrackerError } from '@/shared/error'

export function throwIsServer() {
  throw new EventTrackerError(
    'Triggering events is not possible on server-side.' +
      '\n\n' +
      'Make sure to only trigger events after your app is running on the client-side.'
  )
}

export function throwIsNotDefined() {
  throw new EventTrackerError(
    'The targetProperty is not defined.' +
      '\n\n' +
      `Make sure you didn't forget to add Google Tag Manager's script in your application.` +
      '\n\n' +
      `If you did but you don't use the default 'window.dataLayer' array, you can set your custom targetProperty with the configure function.`
  )
}

export function throwIsNotArray() {
  throw new EventTrackerError(
    'The targetProperty is not an array.' +
      '\n\n' +
      `Either you didn't installed Google Tag Manager correctly or you configured the targetProperty incorrectly.`
  )
}
