import { NextFunction, Request, Response } from 'express'
import { BaseDto } from '../common/baseDto'

export const validateRequest = <T>(
  req: Request,
  res: Response,
  next: NextFunction,
  dto: BaseDto<T>
) => {
  req.body = {
    ...req.query,
    ...req.params,
    ...req.headers,
    ...req.body,
    ...res.locals,
  }

  const validateBody = dto(req.body)
  req.body = validateBody

  next()
}
