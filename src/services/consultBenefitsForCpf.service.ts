import { Page } from 'puppeteer'
import { NotFoundError } from '../errors/notFound'
import { waitForSeconds } from '../helpers/waitForSeconds.helper'

interface ConsultBenefitsForCpfServiceInput {
  cpf: string;
  page: Page;
}

const querySelectorsMap = {
  benefitsCardSelector: 'ion-button:nth-child(12)',
  cpfOutInput:
    'ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-button',
}

export const consultBenefitsForCpfService = async ({
  cpf,
  page,
}: ConsultBenefitsForCpfServiceInput) => {
  await page.waitForSelector(querySelectorsMap.benefitsCardSelector)

  await page.evaluate((querySelectorsMap) => {
    const findBenefitsForCpfCard = document.querySelector(
      querySelectorsMap.benefitsCardSelector
    ) as HTMLButtonElement | null

    if (!findBenefitsForCpfCard) {
      throw new NotFoundError('Not find find benefits for cpf card')
    }

    findBenefitsForCpfCard.click()
  }, querySelectorsMap)

  const cpfOutInput = await page.waitForSelector(
    querySelectorsMap.cpfOutInput,
    { timeout: 10000 }
  )

  if (!cpfOutInput) {
    throw new NotFoundError('Not found cpf out input')
  }

  await cpfOutInput.click()

  const cpfInput = await page.waitForSelector('ion-input input', {
    timeout: 10000,
  })

  if (!cpfInput) {
    throw new NotFoundError('Not found cpf text input')
  }

  await cpfInput.type(cpf)

  await waitForSeconds({ seconds: 2 })

  await page.waitForSelector(querySelectorsMap.cpfOutInput)

  await page.evaluate((querySelectorsMap) => {
    const benefitsCard = document.querySelector(
      querySelectorsMap.cpfOutInput
    ) as HTMLElement

    if (!benefitsCard || !benefitsCard.shadowRoot) {
      throw new NotFoundError('Not found benefits card', { benefitsCard })
    }

    const button = benefitsCard.shadowRoot.querySelector('button')

    if (!button) {
      throw new NotFoundError('Not found search benefits button')
    }

    button.click()
  }, querySelectorsMap)
}
