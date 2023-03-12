import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import { logger } from '../helpers/logger'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next()
  }

  if (process.env.ENVIRONMENT === 'production') {
    logger.info(err)
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message })
  }

  const { status, message } = getErrorResponse(err)

  return res.status(status).json({ message })
}

const getErrorResponse = (err: Error) => {
  switch (err.name) {
    case 'BadRequestError':
      return { message: err.message, status: 400 }
    case 'NotFoundError':
      return { message: err.message, status: 400 }
    default:
      return { message: err.message, status: 500 }
  }
}
