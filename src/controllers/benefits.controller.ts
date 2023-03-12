import { SuccessResponse } from '../common/successResponse'
import { BaseRequest } from '../common/baseRequest'
import { Response } from 'express'
import { GetBenefitsForCpfDto } from '../dto/getBenefitsForCpf.dto'
import { getBenefitsByCpfUsecase } from '../usecases/benefits/getByCpf.usecase'

export default {
  async getByCpf(req: BaseRequest<GetBenefitsForCpfDto>, res: Response) {
    const finalCartsPositions = await getBenefitsByCpfUsecase(req.body)

    const { body, status } = SuccessResponse.create(finalCartsPositions)

    return res.status(status).json(body)
  },
}
