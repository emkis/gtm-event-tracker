import { WarningError } from '../error'

export function throwIsServer() {
  throw new WarningError(
    `Triggering events is not possible on server-side.\n\nMake sure to only trigger events after your app is running on the client-side.`
  )
}

export function throwIsNotDefined() {
  throw new WarningError(
    `The targetProperty is not defined.\n\nMake sure you didn't forget to add Google Tag Manager's script in your application.\n\nIf you did but you don't use the default 'window.dataLayer' array, you can set your custom targetProperty with the configure function.`
  )
}

export function throwIsNotArray() {
  throw new WarningError(
    `The targetProperty is not an array.\n\nEither you didn't installed Google Tag Manager correctly or you configured the targetProperty incorrectly.`
  )
}
