export class InvalidConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidConfiguration'
  }
}
