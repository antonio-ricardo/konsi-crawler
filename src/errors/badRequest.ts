export class BadRequestError extends Error {
  constructor(
    message: string,
    public readonly reason?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'BadRequestError'
  }
}
