export class EventTrackerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EventTrackerError'
  }
}
