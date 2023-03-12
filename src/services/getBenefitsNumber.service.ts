import { Page } from 'puppeteer'
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
      throw new Error('Not find benefits item')
    }

    const benefitsItem = benefitsCard.querySelectorAll('ion-item')

    const benefitsNumbers: string[] = []

    benefitsItem.forEach((benefit) => {
      if (!benefit || !benefit.firstChild || !benefit.firstChild.textContent) {
        throw new Error('Not find benefits')
      }

      benefitsNumbers.push(benefit.firstChild.textContent)
    })

    return benefitsNumbers
  }, querySelectorsMap)

  return benefitsNumbers
}
