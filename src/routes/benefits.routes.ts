import { Request, Router } from 'express'
import { validateRequest } from '../middlewares/validateRequest'
import {
  GetBenefitsForCpfDto,
  getBenefitsForCpfDto,
} from '../dto/getBenefitsForCpf.dto'
import benefitsController from '../controllers/benefits.controller'

const routes = Router()

routes.post(
  '/',
  (req, res, next) =>
    validateRequest<GetBenefitsForCpfDto>(
      req as Request,
      res,
      next,
      getBenefitsForCpfDto
    ),
  async (req, res) => await benefitsController.getByCpf(req, res)
)

export default routes
