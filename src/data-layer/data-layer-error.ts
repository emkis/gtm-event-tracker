import { WarningError } from '../error'

export function throwIsServer() {
  throw new WarningError(
    'window.dataLayer is not available on server-side. Make sure to only trigger events after your app is running on the client-side.'
  )
}

export function throwIsNotDefined() {
  throw new WarningError(
    'window.dataLayer is not defined. Probably you forgot to add the Google Tag Manager script to your application.'
  )
}

export function throwIsNotArray() {
  throw new WarningError(
    'window.dataLayer is not an array. Make sure you installed Google Tag Manager correctly.'
  )
}
