export class NotFoundError extends Error {
  constructor(
    message: string,
    public readonly reason?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'NotFoundError'
  }
}
