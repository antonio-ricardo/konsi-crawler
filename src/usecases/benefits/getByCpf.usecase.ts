import { GetBenefitsForCpfDto } from '../../dto/getBenefitsForCpf.dto'
import { NotFoundError } from '../../errors/notFound'
import { getBrowserInstance } from '../../helpers/getBrowserInstance.helper'
import { consultBenefitsForCpfService } from '../../services/consultBenefitsForCpf.service'
import { getBenefitsNumberService } from '../../services/getBenefitsNumber.service'
import { makeLoginService } from '../../services/makeLogin.service'

export const getBenefitsByCpfUsecase = async (input: GetBenefitsForCpfDto) => {
  const browser = await getBrowserInstance()

  const page = await browser.newPage()

  await page.goto(
    'http://ionic-application.s3-website-sa-east-1.amazonaws.com/'
  )

  await makeLoginService({
    page,
    login: input.login,
    password: input.password,
  })

  await consultBenefitsForCpfService({ cpf: input.cpf, page })

  const benefitsNumbers = await getBenefitsNumberService(page)

  await page.close()

  if (benefitsNumbers[0] === 'Matrícula não encontrada!') {
    throw new NotFoundError('Matrícula não encontrada!')
  }

  return { benefitsNumbers }
}
