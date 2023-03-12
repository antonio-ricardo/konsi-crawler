import { Page } from 'puppeteer'
import { NotFoundError } from '../errors/notFound'
import { waitForSeconds } from '../helpers/waitForSeconds.helper'

const querySelectorsMap = {
  benefitsCardSelector:
    '#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card',
  benefitsCardSelectorItem:
    '#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-item',
}

export const getBenefitsNumberService = async (page: Page) => {
  await waitForSeconds({ seconds: 2 })

  await page.waitForSelector(querySelectorsMap.benefitsCardSelectorItem, {
    timeout: 10000,
  })

  const benefitsNumbers = await page.evaluate((querySelectorsMap) => {
    const benefitsCard = document.querySelector(
      querySelectorsMap.benefitsCardSelector
    )

    if (!benefitsCard) {
      return new NotFoundError('Not find benefits item')
    }

    const benefitsItem = benefitsCard.querySelectorAll('ion-item')

    const benefitsNumbers: string[] = []

    benefitsItem.forEach((benefit) => {
      if (!benefit || !benefit.firstChild || !benefit.firstChild.textContent) {
        return new NotFoundError('Not find benefits', { benefit })
      }

      benefitsNumbers.push(benefit.firstChild.textContent)
    })

    return benefitsNumbers
  }, querySelectorsMap)

  return benefitsNumbers
}
