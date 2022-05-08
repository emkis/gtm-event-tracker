export class WarningError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Warning'
  }
}
