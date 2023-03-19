function createErrorMessage(message: string) {
  if (process.env.NODE_ENV === 'production') {
    const errorCode = message
    return `Minified EventTrackerError error #${errorCode}. Visit https://github.com/emkis/gtm-event-tracker#error-codes for the full message.`
  }

  return message
}

export class EventTrackerError extends Error {
  constructor(message: string) {
    const parsedMessage = createErrorMessage(message)
    super(parsedMessage)
    this.name = 'EventTrackerError'
  }
}
